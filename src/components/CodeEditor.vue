<template>
    <b-container  class="float-left">
      <b-alert v-if="!configuration.robots && configuration.robots.length == 0" variant="danger" show>Bitte füge einen Roboter hinzu!</b-alert>

      <b-row v-if="configuration.robots && configuration.robots.length > 0">
        <b-col col sm="6">
          <b-button v-if="!editing" @click="fastBackward" size="sm"><v-icon name="fast-backward"/></b-button>
          <b-button v-if="!editing" @click="backward" size="sm"><v-icon name="backward"/></b-button>
          <b-button v-if="editing" @click="play" size="sm"><v-icon  name="play"/></b-button>
          <b-button v-if="!editing" @click="edit" size="sm"><v-icon  name="stop"/></b-button>
          <b-button v-if="!editing" @click="forward" size="sm"><v-icon name="forward"/></b-button>
          <b-button  v-if="!editing"  @click="fastForward" size="sm"><v-icon name="fast-forward"/></b-button>
          <b-dropdown v-if="!!configuration && editing" id="dropdown-1" :text="'Robot ' + selectedRobot" class="m-md-2">
              <b-dropdown-item :active="selectedRobot == index" @click="selectedRobot=index" v-for="bot,index in configuration.robots">Robot {{index}}</b-dropdown-item>
          </b-dropdown>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import Parser from '@/lib/Parser'

@Component
export default class CodeEditor extends Vue {
  private editing = true;
  private code = "{WV}R";
  private selectedRobot = 0;

  @Prop() configuration = null;

  play() {
    this.editing = !this.editing;
    const parser = new Parser();
    const actions = parser.parse(this.code);
    this.$emit('codeChange', actions, this.selectedRobot);
  }

  @Watch("configuration") onConfig(config) {
      this.configuration = config;
      this.editing = true;
  }

  edit() {
    this.editing = !this.editing;
  }

  @Watch("editing") onEdit() {
    this.$emit('stepping', this.editing ? 'stop' : 'start');
  }

  backward() { this.$emit('stepping', 'backward'); }
  fastBackward() { this.$emit('stepping', 'fastBackward'); }
  forward() { this.$emit('stepping', 'forward'); }
  fastForward() { this.$emit('stepping', 'fastForward'); }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
