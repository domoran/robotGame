<template>
  <div class="board" oncontextmenu="return false;" >
    <b-card>
      <b-form inline>
      <b-form-input size="sm" placeholder="Roboter Name"></b-form-input>
      <b-form-input type="number" min="1" max="20" size="sm" placeholder="Width" v-model="size"></b-form-input>
      <b-button size="sm" v-b-modal.modal-1>Save</b-button>
      <b-button size="sm" v-b-modal.modal-2>Load</b-button>
      </b-form>
      <v-stage v-if="boardConfig" ref="stage" :config="{width:width,height:height  }">
        <v-layer @mousemove="handleMouseMove" @click="handleMouseClick" @mouseleave="handleMouseLeave">
           <GameField v-for="item in boardConfig.fields" :config="item" :width="fw" :height="fh" :bw="bw"/>
           <WallField v-for="wall in boardConfig.walls" :config="wall" :width="fw" :height="fh"  :bw="bw"/>
           <RobotField v-for="robot,index in boardConfig.robots" :config="robot" :index="index" :width="fw" :height="fh" :bw="bw"/>
           <WallField v-if="editWall" :config="editWall" :width="fw" :height="fh"  :bw="bw"/>
           <RobotField v-if="isRobot" :config="isRobot" index="" :width="fw" :height="fh" :bw="bw"/>
        </v-layer>
     </v-stage>
    </b-card>

    <b-modal id="modal-1" title="Save Board" @ok="handleSave">
      <label for="savebutton">Save as</label>
      <b-form-input id="savebutton" size="sm" v-model="selectedGameNameSave" placeholder="Board Name"></b-form-input>
    </b-modal>

    <b-modal id="modal-2" title="Load Board" @show="loadGames" @ok="handleLoad">
      <label for="loadbutton">Load</label>
       <b-form-select id="loadbutton" :options="availableGames" v-model="selectedGameNameLoad"></b-form-select>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import GameField from './GameField.vue';
import WallField from './WallField.vue';
import RobotField from './RobotField.vue';
import Field from '@/lib/Field'
import Wall from '@/lib/Wall'
import Robot from '@/lib/Robot'
import GameConfig from '@/lib/GameConfig'

@Component({
  components: {
    GameField,
    WallField,
    RobotField
  },
})
export default class Board extends Vue {
  @Prop() private msg!: string;

  private size = 10;

  private height = 1;
  private width = 1;

  private fw=20;
  private fh=20;
  private bw=5;

  private boardConfig = new GameConfig();


  private isWall = false;
  private editX = 0;
  private editY = 0;
  private editWall = null;
  private isRobot = null;

  private availableGames = ["A", "B", "C"];
  private selectedGameNameLoad = "";
  private selectedGameNameSave = "";

  handleMouseLeave() {
    this.editWall = null;
    this.isRobot = null;
  }

  handleLoad() {
    if (!localStorage) { alert("No local store found!"); return }
    let tehBoard = null;
    if (localStorage.boards) {
      const boards = JSON.parse(localStorage.boards);
      if (boards[this.selectedGameNameLoad]) {
        tehBoard = boards[this.selectedGameNameLoad];
      }
    }

    if (!tehBoard) {
      alert("No board called " + this.selectedGameNameLoad);
      return;
    }

    this.size = tehBoard.size;
    // var self = this;
    // Wait for the size change to be executed!
    Vue.nextTick(() => {
        this.boardConfig = new GameConfig(tehBoard.config);
        this.$emit("config", this.boardConfig);
    });

  }

  handleSave() {
    const config = { size: this.size, config: this.boardConfig }
    let boards = {}
    if (!localStorage) { alert("No local store found!"); return }

    if (localStorage.boards) {
      boards = JSON.parse(localStorage.boards);
    }

    boards[this.selectedGameNameSave] = config;

    localStorage.boards = JSON.stringify(boards);

    this.loadGames();
  }

  loadGames () {
    if (localStorage && localStorage.boards) {
        const boards = JSON.parse(localStorage.boards);
        this.availableGames = Object.keys(boards);
    }
  }

  handleMouseClick(event) {

    if (this.editWall) {
      this.boardConfig.walls.forEach( (w,i) => {
        if (this.editWall && w.x == this.editWall.x && w.y == this.editWall.y && w.isHorizontal == this.editWall.isHorizontal) {
            this.editWall = null;
            this.boardConfig.walls.splice(i,1);
            return false;
          }
      });
      if (this.editWall) this.boardConfig.walls.push(this.editWall);
      this.editWall = null;
    }
    if (this.isRobot) {
      this.boardConfig.robots.forEach( (w,i) => {
        if (this.isRobot && w.x == this.isRobot.x && w.y == this.isRobot.y) {
            this.isRobot = null;
            if (event.evt.button == 2) {
              // right click, rotate robot
              this.boardConfig.robots[i].direction = (this.boardConfig.robots[i].direction+1)%4;
            } else {
              this.boardConfig.robots.splice(i,1);
            }
            return false;
          }
      });
      if (this.isRobot) this.boardConfig.robots.push(this.isRobot);
      this.isRobot = null;
    }
    if (event.evt.button == 2) return event.cancelBubble = true;
  }

  handleMouseMove(event) {
    const mousePos = this.$refs.stage.getStage().getPointerPosition();
    const x = mousePos.x;
    const y = mousePos.y;

    let fx = x/(this.fw+this.bw);
    let fy = y/(this.fh+this.bw);
    let fieldY = Math.floor(fy);
    let fieldX = Math.floor(fx);
    this.isWall = false;

    fy = fy-fieldY;
    fx = fx-fieldX;
    let horizontal = false;

    if (fy <= 0.2 && fx >= 0.2) { this.isWall = true; horizontal = true; }
    if (fx <= 0.2 && fy < 0.8) { this.isWall = true; horizontal = false; }
    if (fx >= 0.8 && fy < 0.8) { this.isWall = true; horizontal = false; fieldX += 1 }
    if (fx >= 0.2 && fy > 0.8) { this.isWall = true; horizontal = true; fieldY += 1 }
    if (fx >= 0.3 && fx < 0.6 && fy >= 0.3 && fy <= 0.8) {
        this.isRobot = new Robot(fieldX,fieldY, 0);
    } else {
        this.isRobot = null;
    }

    if (this.isWall) this.editWall = new Wall(fieldX, fieldY, horizontal);
    else this.editWall = null;
  }

  @Watch('size', { immediate: true}) onSizeChange() {
    console.log("Size Change!");
    this.height = this.size * (this.fh + this.bw) + this.bw;
    this.width = this.size * (this.fw + this.bw) + this.bw;
    this.setupBoard();
  }

  setupBoard() {
    this.boardConfig.clear();
    for (var x = 0; x < this.size; x++){
      this.boardConfig.wall(new Wall(x,0,true));
      this.boardConfig.wall(new Wall(x,this.size,true));

      this.boardConfig.wall(new Wall(0,x,false));
      this.boardConfig.wall(new Wall(this.size,x,false));
    }

    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        this.boardConfig.field(new Field(x,y));
      }
    }

    this.$emit("config", this.boardConfig);
  }

  mounted() {
    this.onSizeChange();
    this.loadGames();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
