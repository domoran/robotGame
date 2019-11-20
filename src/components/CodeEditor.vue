<template>
    <b-container  class="float-left">
      <b-row>
        <b-col col sm="6">
          <b-button size="sm"><v-icon name="fast-backward"/></b-button>
          <b-button size="sm"><v-icon name="backward"/></b-button>
          <b-button v-if="editing" @click="play" size="sm"><v-icon  name="play"/></b-button>
          <b-button v-if="!editing" @click="edit" size="sm"><v-icon  name="edit"/></b-button>
          <b-button size="sm"><v-icon name="forward"/></b-button>
          <b-button size="sm"><v-icon name="fast-forward"/></b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col col sm="6">
        <b-form-textarea v-if="editing" v-model="code"/>
      </b-col>
      </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CodeEditor extends Vue {
  private editing = true;

  private code = "FFF";

  play() {
    this.editing = !this.editing;
    console.log(this.editing);
  }

  edit() {
    this.editing = !this.editing;
    console.log(this.editing);
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
