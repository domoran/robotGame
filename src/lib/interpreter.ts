export default class Interpreter {
  private actions;
  private config;
  private ip;
  private selectedRobot;


  public constructor(actions, config, selectedRobot) {
    this.actions = actions;
    this.config = config;
    this.selectedRobot = selectedRobot;
    this.ip = [0];
  }

  public forward() {
      let a = this.actions;
      let frames = [a];
      let action = null;

      if (this.ip === null) return;

      console.log("Interpreter forward");

      this.ip.forEach((ipVal,index) => {
          action = a[ipVal];
          if (!action) throw new Error("IP overflow!");

          if (index != this.ip.length-1 && action.type == "expression") {
            a = action.actions;
            frames.push(a);
          }
      });

      console.log("Executing Current Action:", action, "IP", this.ip);

      this.execute(action);

      // overflow?
      // step to parent frame
      while (frames.length != 0 && this.ip[this.ip.length-1] >= frames[frames.length-1].length) {
        this.ip.pop(); // pop current frame and IP
        frames.pop();

        // Check if we need to loop the last statement, otherwise increase IP on parent frame
        if (frames.length > 0) {
          let dropAction = frames[frames.length-1][this.ip[this.ip.length-1]];
          let loop = (dropAction.type == 'expression' && dropAction.loop);

          this.ip[this.ip.length-1] = this.ip[this.ip.length-1] + (loop ? 0 : 1)  // increase IP
        }
      }

      // We dropped in the void!
      if (frames.length == 0) {
        console.log("End of Program!");
        this.ip = null;
      }
  }

  private execute(action) {
      const robot  = this.config.robots[this.selectedRobot];
      console.log("Executing action ", action, "with", robot);

      if (action.type == "expression") {
          const sensorValue = this.executeSensor(robot, action.sensor);
          if (sensorValue) {
            this.ip.push(0);
          } else {
            this.ip[this.ip.length-1] = this.ip[this.ip.length-1] + 1  // increase IP
          }
          console.log("Executed Expression: ", action.sensor, "Sensor: " + sensorValue,  "Stepped to ", this.ip)
      } else {
        if (action.value == "V") { this.executeForward(robot) }
        if (action.value == "R") { robot.direction = (robot.direction + 1) % 4 }
        if (action.value == "L") { robot.direction = (robot.direction - 1) % 4 }
        if (robot.direction < 0) robot.direction += 4;

        this.ip[this.ip.length-1] = this.ip[this.ip.length-1] + 1  // increase IP
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
