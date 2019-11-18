<template>
    <v-group>
    <v-circle :config="{
      x: (config.x-0.5) * (width + bw)+bw*0.5,
      y: (config.y-0.5) * (height + bw)+bw*0.5,
      radius: (width+height+2*bw)/4-1,
      fill:  'red',
      strokeWidth: 0 }">
    </v-circle>

      <v-circle :visible="config.direction==1 || config.direction==2" :config="{
        x: (config.x-0.5) * (width + bw)+bw*0.5+width/4,
        y: (config.y-0.5) * (height + bw)+bw*0.5+height/4,
        radius: eyeR,
        fill:  'blue',
        strokeWidth: 0 }"/>

      <v-circle :visible="config.direction==1 || config.direction==0" :config="{
        x: (config.x-0.5) * (width + bw)+bw*0.5+width/4,
        y: (config.y-0.5) * (height + bw)+bw*0.5-height/4,
        radius: eyeR,
        fill:  'blue',
        strokeWidth: 0 }"/>

      <v-circle :visible="config.direction==2 || config.direction==3" :config="{
        x: (config.x-0.5) * (width + bw)+bw*0.5-width/4,
        y: (config.y-0.5) * (height + bw)+bw*0.5+height/4,
        radius: eyeR,
        fill:  'blue',
        strokeWidth: 0 }"/>

      <v-circle :visible="config.direction==3 || config.direction==0" :config="{
        x: (config.x-0.5) * (width + bw)+bw*0.5-width/4,
        y: (config.y-0.5) * (height + bw)+bw*0.5-height/4,
        radius: eyeR,
        fill:  'blue',
        strokeWidth: 0 }"/>


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

  private eyeR = 3;

  mounted() {
     console.log("Robot", this.config.x,this.config.y,this.config.isHorizontal, this.config.bw);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
