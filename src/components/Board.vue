<template>
  <div class="board">
    <b-card>
      <b-row class="my-1">
   <b-col sm="2">
     <label for="input-small">Small:</label>
   </b-col>
   <b-col sm="10">
     <b-form-input id="input-small" size="sm" placeholder="Enter your name"></b-form-input>
   </b-col>
 </b-row>
 <b-row>
   <v-stage :config="{width:width+40,height:height+40}">
     <v-layer>
         <GameField v-for="item in fields" :config="item" :width="fw" :height="fh" :bw="bw"/>
         <WallField v-for="wall in walls" :config="wall" :width="fw" :height="fh"  :bw="bw"/>
         <RobotField v-for="robot in robots" :config="robot" :width="fw" :height="fh" :bw="bw"/>
     </v-layer>
   </v-stage>

 </b-row>
</b-card>
{{walls}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameField from './GameField.vue';
import WallField from './WallField.vue';
import RobotField from './RobotField.vue';
import Field from '@/lib/Field'
import Wall from '@/lib/Wall'
import Robot from '@/lib/Robot'

@Component({
  components: {
    GameField,
    WallField,
    RobotField
  },
})
export default class Board extends Vue {
  @Prop() private msg!: string;

  private height = 500;
  private width = 500;

  private fw=20;
  private fh=20;
  private bw=5;

  private fields = []
  private walls  = []
  private robots = []

  mounted() {
      for (var x = 0; x < 10; x++){
        this.walls.push(new Wall(x,0,true));
        this.walls.push(new Wall(x,10,true));

        this.walls.push(new Wall(0,x,false));
        this.walls.push(new Wall(10,x,false));
      }

      this.robots.push(new Robot(3,3,0))
      this.robots.push(new Robot(3,4,1))
      this.robots.push(new Robot(3,5,2))
      this.robots.push(new Robot(3,6,3))

      this.walls.push(new Wall(5,5,false));
      this.walls.push(new Wall(4,5,true));

      for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
          this.fields.push(new Field(x,y));
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
