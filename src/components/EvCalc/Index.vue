<template>
  <div class="content">
    <h2 class="title is-4">EV calculator</h2>
    <div class="columns">
      <div class="column is-three-quarters">
        <Row
          v-for="(row, index) in computedRows.rows"
          v-bind:key="row.key"
          v-bind:parent-index="index"
          v-bind:initial-data="values[index]"
          v-on:data="listenChild"
        />
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" v-on:click="addRow">Add case</button>
          </div>
          <div class="control" v-if="showRemoveBtn">
            <button class="button is-primary" v-on:click="removeRow">Remove case</button>
          </div>
        </div>
      </div>
      <div class="column">
        <span class="ev">{{ this.ev }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid/v4';
import Row from './Row';

export default {
  components: { Row },
  data() {
    return {
      rowsCount: 2,
      values: [
        [0, 0],
        [0, 0],
      ],
      ev: '',
    };
  },
  methods: {
    addRow() {
      this.rowsCount += 1;
      this.values.push([0, 0]);
      this.calcResult();
    },
    removeRow() {
      if (this.showRemoveBtn) {
        this.rowsCount -= 1;
        this.values.splice(this.values.length - 1, 1);
        this.calcResult();
      }
    },
    listenChild(data) {
      const rowIndex = data[0];
      const inputIndex = data[1];
      const value = +data[2];

      this.values[rowIndex][inputIndex] = value;
      this.calcResult();
    },
    calcResult() {
      const values = this.values;
      let percentSum = 0;
      const hasAllfields = values.every((row) => {
        percentSum += row[1];

        return row[0] && row[1] !== 0;
      });

      if (!hasAllfields) {
        this.ev = 'Fill all fields';
      } else if (percentSum !== 100) {
        this.ev = 'Total probability must be equal to 100%';
      } else if (hasAllfields && percentSum === 100) {
        this.ev = values.reduce((prev, current) => {
          const part = current[0] * (current[1] / 100);
          return part + prev;
        }, 0);
      }
    },
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

