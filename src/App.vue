<template>
  <div id="app">
      <Nav/>
      <Board @config="configChange"/>
      <CodeEditor @codeChange="onCodeChange" @stepping="stepping" :configuration="boardConfiguration"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from './components/Board.vue';
import Nav from './components/Nav.vue';
import CodeEditor from './components/CodeEditor.vue';

import Interpreter from '@/lib/Interpreter';


@Component({
  components: {
    Board,
    Nav,
    CodeEditor,
  },
})
export default class App extends Vue {
  private boardConfiguration = null;

  private interpreter = null;

  private actions = []

  public stepping(action) {
    console.log("Stepping", action);
    if (action == "forward" && this.interpreter)
      this.interpreter.forward();

    if (action == "stop") this.interpreter = null;
  }

  public onCodeChange(actions, selectedRobot) {
    console.log("Code Change: ", actions);
    this.actions = actions;
    this.interpreter = new Interpreter(actions, this.boardConfiguration, selectedRobot);
  }

  public configChange(event) {
      console.log("Config Change", event);
      this.boardConfiguration = event;
  }


}
</script>

<style>
</style>
