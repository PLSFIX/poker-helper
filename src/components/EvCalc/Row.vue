<template>
  <div class="field is-grouped">
    <div class="control">
      <label class="label">Result</label>
      <input
        class="input is-primary"
        type="text"
        v-bind:value="initialData[0] ? initialData[0] : ''"
        v-on:input="gatherData($event.target.value, 0)"
      >
    </div>
    <div class="control">
      <label class="label">Probability %</label>
      <input
        class="input is-primary"
        type="text"
        v-bind:value="initialData[1] ? initialData[1] : ''"
        v-on:input="gatherData($event.target.value, 1)"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parentIndex: Number,
    initialData: Array,
  },
  methods: {
    gatherData(data, index) {
      this.$emit('data', [this.parentIndex, index, data]);
    },
  },
};
</script>


<style scoped>
  .field .control {
    flex-shrink: 1;
  }
</style>
