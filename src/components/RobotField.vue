<template>

    <v-group :config="{
      x:(config.x-0.5) * (width + bw)+bw*0.5,
      y:(config.y-0.5) * (height + bw)+bw*0.5,
      rotation: 90*config.direction
    }">

    <v-circle :config="{
      x: 0,
      y: 0,
      radius: (width+height+2*bw)/4-1,
      fill:  'red',
      strokeWidth: 0 }">
    </v-circle>
      <v-circle  :config="{
        x: width/4,
        y: -height/4,
        radius: eyeR,
        fill:  'blue',
        strokeWidth: 0 }"/>


      <v-circle :config="{
        x: -width/4,
        y: -height/4,
        radius: eyeR,
        fill:  'blue',
        strokeWidth: 0 }"/>

        <v-text :config="{text: index+ '', fontStyle:'bold', fontSize: 8} "/>

    </v-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameField extends Vue {
  @Prop() private config;
  @Prop() private height;
  @Prop() private width;
  @Prop() private bw;
  @Prop() private index;

  private eyeR = (this.width+this.height)/15;

  mounted() {
     // console.log("Robot", this.config.x,this.config.y,this.config.isHorizontal, this.config.bw);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
