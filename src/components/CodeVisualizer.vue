<template>
    <ul class="list-group">
        <li :class="{'list-group-item': true, activeitem: action==current || action==currentAction}" v-for="action in actions">
            {{getTitle(action)}}
            <CodeVisualizer v-if="action.type == 'expression'" :actions="action.actions" :current="currentAction" :isChild="true"/>
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { EventBus } from '@/lib/EventBus';

@Component({
  components: {
    CodeVisualizer,
  },
})
export default class CodeVisualizer extends Vue {
  @Prop() actions;
  @Prop() isChild;
  @Prop() current;

  private currentAction = null;

  getTitle(action) {
    if (action.type == "action") {
      return action.value;
    }

    if (action.type == "expression") {
      return action.sensor;
    }

    return action.type;
  }

  @Watch('current') onCurrent(action) {
    this.currentAction = action;
  }

  handleStep (action) {
      console.log("STEP", action);
      this.currentAction = action;
  }

  beforeDestroy() {
    EventBus.$off(this.handleStep);
  }

  mounted() {
    if (!this.isChild) {
      EventBus.$on("STEP", this.handleStep);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .activeitem { color: #0707ff; background-color: #c6c6ff}
</style>
