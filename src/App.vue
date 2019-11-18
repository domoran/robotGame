<template>
  <div id="app">
      <Nav/>
      <Board msg='Hallo'/>
      <CodeEditor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from './components/Board.vue';
import Nav from './components/Nav.vue';
import CodeEditor from './components/CodeEditor.vue';


@Component({
  components: {
    Board,
    Nav,
    CodeEditor,
  },
})
export default class App extends Vue {

}
</script>

<style>
</style>
