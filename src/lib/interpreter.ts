import EventBus from EventBus;

export default class Interpreter {
  private actions;
  private config;
  private ip;
  private selectedRobot;

  // The parsed tree has a structure like this, where instructions can be numbered like this:
  // |-action                        --> 1
  // |-expression.actions            --> 2
  // |   |-action                    --> 2.1
  // |   |-action                    --> 2.2
  // |   |-expression.actions        --> 2.3
  // |        |-action               --> 2.3.1
  // |-action                        --> 3

  // The interpreter maintains two arrays to track the current execution:
  //     ip = []   --> an array storing the hierarchical number in reverse, e.g. [1,3,2] means to point to instruction 2.3.1
  //     frames = [] --> an array storing the current executing action hierarchy, e.g.:
  //                     [ expression.actions 2.3.1, expression.actions 2, root ] stores the frames when IP points to 2.3.1
  //

  public constructor(actions, config, selectedRobot, events) {
    this.config = config;
    this.selectedRobot = selectedRobot;
    this.events = events;
    console.log("EVENT BUS:", this.events)

    this.ip = [0];
    this.frames = [actions];
    this.events.$emit('START');
    this.events.$emit('STEP', this.frames[0][this.ip[0]]);
  }

  public forward() {
      if (this.ip === null) return;
      if (!this.frames || this.frames.length == 0 || this.ip[0] >= this.frames[0].length) {
        console.log("IP OUT OF BOUNDS EXCEPTION!");
        return;
      }

      console.log("Interpreter Step");
      // Get current action from current frame
      const action = this.frames[0][this.ip[0]];
      console.log("Executing Current Action:", action, "IP", this.ip);

      // Execute the action, the actions has the responsibility to increase the IP
      this.execute(action);

      // overflow?
      // step to parent frame
      while (this.ip[0] >= this.frames[0].length) {
        this.ip.shift(); // pop current frame and IP
        this.frames.shift();

        // Check if we need to loop the last statement, otherwise increase IP on parent frame
        if (this.frames.length > 0) {
          let dropAction = this.frames[0][this.ip[0]];
          let loop = (dropAction.type == 'expression' && dropAction.loop);
          this.ip[0] = this.ip[0] + (loop ? 0 : 1)  // increase IP
        } else {
          break;
        }
      }

      // We dropped in the void!
      if (this.frames.length == 0) {
        this.ip = null;
        this.frames = null;
        this.events.$emit('STOP');
      } else {
        this.events.$emit('STEP', this.frames[0][this.ip[0]]);
      }
  }

  private execute(action) {
      const robot  = this.config.robots[this.selectedRobot];

      if (action.type == "expression") {
          const sensorValue = this.executeSensor(robot, action.sensor);
          if (sensorValue) {
            // step in expression
            this.ip.unshift(0);
            this.frames.unshift(action.actions);
          } else {
            // step over expression
            this.ip[0] = this.ip[0] + 1  // increase IP
          }
      } else {
        if (action.value == "V") { this.executeForward(robot) }
        if (action.value == "R") { robot.direction = (robot.direction + 1) % 4 }
        if (action.value == "L") { robot.direction = (robot.direction - 1) % 4 }
        if (robot.direction < 0) robot.direction += 4;

        this.ip[0] = this.ip[0] + 1  // increase IP
      }
  }

  private executeSensor(robot,sensor) {
    const field = this.forwardField(robot);
    const checkMatrix = {
      0: [[robot.x,robot.y], true],
      1: [field, false],
      2: [field, true],
      3: [[robot.x,robot.y], false],
    }

    const [f,h] = checkMatrix[robot.direction];

    const walls = this.config.walls.filter( w=> w.x == f[0] && w.y == f[1] && w.isHorizontal == h);

    return sensor == "W" ? walls.length > 0 : walls.length == 0;
  }

  private forwardField(robot) {
    const incX = { 0: 0, 1: 1, 2: 0, 3: -1 } // increase X by direction
    const incY = { 0: -1, 1: 0, 2: 1, 3: 0 } // increase Y by direction

    const x = robot.x + incX[robot.direction];
    const y = robot.y + incY[robot.direction];

    return [x,y]
  }

  private executeForward(robot) {
    console.log("Executing forward!");
    const wall = this.executeSensor(robot, "W");
    if (!wall) [robot.x,robot.y] = this.forwardField(robot);
    console.log("Moving Robot to ", robot.x, robot.y);
  }


}
