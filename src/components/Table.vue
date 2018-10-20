<template>
  <div class="content">
    <h2 class="title is-4">{{name}}</h2>
    <div class="field is-horizontal">
      <div class="control">
        <button class="button is-info" v-on:click="toggleFullMode">
          {{ fullMode ? 'Toggle default mode' : 'Toggle full mode' }}
        </button>
      </div>
      <div class="control bet-amount">
        <input
          type="text"
          class="input is-primary"
          :placeholder="inputPlaceholder"
          v-on:input="manualCalc($event.target.value)"
        />
      </div>
    </div>
    <table class="table is-bordered">
      <tbody>
        <tr>
          <th>{{ colNames[0] }}</th>
          <th v-if="calcRatio">Ratio</th>
          <th>{{ colNames[1] }}</th>
        </tr>
        <template v-if="calcMode">
          <tr>
            <td>{{ customResult[0] }}%</td>
            <td v-if="calcRatio">{{ customResult[2] }}</td>
            <td>{{ customResult[1] }}%</td>
          </tr>
        </template>
        <template v-else-if="fullMode">
          <tr v-for="value in fullList.values" v-bind:key="value[3]">
            <td>{{ value[0] }}%</td>
            <td v-if="calcRatio">{{ value[2] }}</td>
            <td>{{ value[1] }}%</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="value in defaultList.values" v-bind:key="value[3]">
            <td>{{ value[0] }}%</td>
            <td v-if="calcRatio">{{ value[2] }}</td>
            <td>{{ value[1] }}%</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import uuid from 'uuid/v4';

export default {
  props: {
    name: String,
    colNames: {
      type: Array,
      default() {
        return ['x', 'y'];
      },
    },
    inputPlaceholder: {
      type: String,
      default() {
        return '';
      },
    },
    defaultSet: {
      type: Array,
      default() {
        return [20, 25, 33, 50, 66, 75, 100];
      },
    },
    calcFunction: {
      type: Function,
      default: value => value,
    },
    calcRatio: {
      type: Boolean,
      default: false,
    },
    ratioFunction: {
      type: Function,
      default: value => value,
    },
  },
  methods: {
    toggleFullMode() {
      this.fullMode = !this.fullMode;
    },
    manualCalc(value) {
      if (value === '') {
        this.calcMode = false;
      } else if (/^\d{1,3}$/g.test(value)) {
        this.calcMode = true;
        const intValue = +value;
        this.customResult = [
          intValue,
          this.calcFunction(intValue),
          (this.calcRatio && this.ratioFunction(intValue)),
        ];
      }
    },
  },
  data() {
    return {
      fullMode: false,
      calcMode: false,
      foldEqMode: false,
      betAmount: '',
      customResult: [0, 0],
    };
  },
  computed: {
    fullList() {
      const values = [];
      for (let i = 1; i <= 100; i += 1) {
        const subArr = [
          i,
          this.calcFunction(i),
          (this.calcRatio && this.ratioFunction(i)),
          uuid(),
        ];
        values.push(subArr);
      }

      return { values };
    },
    defaultList() {
      const values = this.defaultSet.map(point => [
        point,
        this.calcFunction(point),
        (this.calcRatio && this.ratioFunction(point)),
        uuid(),
      ]);

      return { values };
    },
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table {
    margin-top: 15px;
  }
  .field {
    position: relative;
  }
  .control:not(:last-child) {
    margin-right: 10px;
  }
  .checkbox {
    line-height: 36px;
  }
  .bet-amount {
    width: 70px;
    position: absolute;
    right: 0;
  }
</style>
