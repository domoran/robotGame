<template>
    <v-rect :config="{
      x: config.x * (width + bw) + (config.isHorizontal ? 0.5*bw : 1),
      y: config.y * (height + bw) + (!config.isHorizontal ? 0.5*bw : 1),
      width :config.isHorizontal ? (width+bw-1): (bw-2),
      height:config.isHorizontal ? (bw-2) : (height+bw-1),
      fill:  'black',
      strokeWidth: 0 }"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameField extends Vue {
  @Prop() private config;
  @Prop() private height;
  @Prop() private width;
  @Prop() private bw;

  mounted() {
     // console.log("Wall", this.config.x,this.config.y,this.config.isHorizontal, this.config.bw);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
