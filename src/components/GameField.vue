<template>
  <v-group :config="{x: bw/2,y:bw/2}">
    <v-rect :config="{
      x: (width+bw)*config.x,
      y: (height+bw)*config.y,
      width:width+bw,
      height:height+bw,
      fill:'lightgray',
      stroke: 'darkgray',
      strokeWidth: 1 }"/>
</v-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameField extends Vue {
  @Prop() private config;
  @Prop() private width;
  @Prop() private height;
  @Prop() private bw;


  mounted() {
//     console.log("Field", this.config.x,this.config.y,this.config.width,this.config.height);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
