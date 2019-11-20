<template>
  <div class="board">
    <b-card>
      <b-form inline>
      <b-form-input size="sm" placeholder="Roboter Name"></b-form-input>
      <b-form-input size="sm" placeholder="Width" v-model="size"></b-form-input>
      </b-form>
      <v-stage ref="stage" :config="{width:width,height:height  }">
        <v-layer>
           <GameField v-for="item in boardConfig.fields" :config="item" :width="fw" :height="fh" :bw="bw"/>
           <WallField v-for="wall in boardConfig.walls" :config="wall" :width="fw" :height="fh"  :bw="bw"/>
           <RobotField v-for="robot in boardConfig.robots" :config="robot" :width="fw" :height="fh" :bw="bw"/>
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


  @Watch('size') onSizeChange() {
    this.height = this.size * (this.fh + this.bw) +this.bw;
    this.width = this.size * (this.fw + this.bw) +this.bw;
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
  }

  mounted() {
    this.onSizeChange();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
