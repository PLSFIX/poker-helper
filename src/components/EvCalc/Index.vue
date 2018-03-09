<template>
  <div class="content">
    <h2 class="title is-4">EV calculator</h2>
    <div class="columns">
      <div class="column is-three-quarters">
        <Row v-for="row in computedRows.rows" v-bind:key="row.key" />
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" v-on:click="addRow">Add case</button>
          </div>
          <div class="control" v-if="showRemoveBtn">
            <button class="button is-primary" v-on:click="removeRow">Remove case</button>
          </div>
        </div>
      </div>
      <div class="column">1</div>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid/v4';
import Row from './Row';

export default {
  components: {
    Row,
  },
  methods: {
    addRow() {
      this.rowsCount += 1;
    },
    removeRow() {
      if (this.showRemoveBtn) {
        this.rowsCount -= 1;
      }
    },
  },
  data() {
    return {
      rowsCount: 2,
    };
  },
  computed: {
    computedRows() {
      const rows = [];
      for (let i = 0; i < this.rowsCount; i += 1) {
        rows.push({ key: uuid() });
      }

      return { rows };
    },
    showRemoveBtn() {
      return this.rowsCount > 2;
    },
  },
};
</script>

<style scoped>
</style>

