<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Mein Roboter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
          <b-nav-item-dropdown text="Spielfeld" right>
            <b-dropdown-item href="#">Hinzufügen</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Code" right>
            <b-dropdown-item href="#">Speichern</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Board extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
