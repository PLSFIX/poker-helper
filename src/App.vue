<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column">
          <Table
            name="Odds to Equity"
            inputPlaceholder="Bet %"
            v-bind:col-names="['Bet Size %', 'Equity % / Fold %']"
            v-bind:calc-function="calcEq"
            v-bind:calcRatio="true"
            v-bind:ratioFunction="calcRatio"
          />
        </div>
        <div class="column">
          <Table
            name="Equity to Odds (FoldEq)"
            inputPlaceholder="Fold %"
            v-bind:col-names="['Fold % / Equity %', 'MinEVbet %']"
            v-bind:calc-function="calcMinEVBet"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calcEq, calcRatio, calcMinEVBet } from './utils/calc';
import Table from './components/Table';
import '../node_modules/bulma/css/bulma.css';

export default {
  name: 'App',
  components: {
    Table,
  },
  data() {
    return {
      calcEq,
      calcRatio,
      calcMinEVBet,
    };
  },
};
</script>

<style scoped>
  .container {
    margin-top: 25px;
  }
</style>

