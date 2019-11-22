<template>
  <div class="board">
    <b-card>
      <b-form inline>
      <b-form-input size="sm" placeholder="Roboter Name"></b-form-input>
      <b-form-input size="sm" placeholder="Width" v-model="size"></b-form-input>
      </b-form>
      <v-stage v-if="boardConfig" ref="stage" :config="{width:width,height:height  }">
        <v-layer  @mousemove="handleMouseMove" @click="handleMouseClick">
           <GameField v-for="item in boardConfig.fields" :config="item" :width="fw" :height="fh" :bw="bw"/>
           <WallField v-for="wall in boardConfig.walls" :config="wall" :width="fw" :height="fh"  :bw="bw"/>
           <RobotField v-for="robot,index in boardConfig.robots" :config="robot" :index="index" :width="fw" :height="fh" :bw="bw"/>
           <WallField v-if="editWall" :config="editWall" :width="fw" :height="fh"  :bw="bw"/>
        </v-layer>
     </v-stage>
    </b-card>
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

    if (this.isWall) this.editWall = new Wall(fieldX, fieldY, horizontal);
    else this.editWall = null;
  }

  @Watch('size') onSizeChange() {
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

    this.boardConfig.wall(new Wall(5,4,true));

    this.boardConfig.robot(new Robot(3,3,0));
    this.boardConfig.robot(new Robot(3,4,1));
    this.boardConfig.robot(new Robot(3,5,2));
    this.boardConfig.robot(new Robot(3,6,3));

    this.boardConfig.wall(new Wall(5,5,false));
    this.boardConfig.wall(new Wall(4,5,true));

    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        this.boardConfig.field(new Field(x,y));
      }
    }

    this.$emit("config", this.boardConfig);
  }

  mounted() {
    this.onSizeChange();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
