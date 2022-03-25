<template>
  <base-card>
    <h2>Find Your Tutor</h2>
    <span class="text-filter">
      <input type="text" v-model="textFilter" v-on:change="setTextFilter" />
    </span>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter', 'change-text-filter'],
  data() {
    return {
      textFilter: '',
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  methods: {
    setTextFilter() {
      this.$emit('change-text-filter', this.textFilter);
    },
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    }
  }
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-columns: repeat(12, 1fr);
}
h2 {
  margin: 0.5rem 0;
  grid-column: 1/7;
  grid-row: 1;
}

.text-filter {
  grid-column: 7/13;
  grid-row: 1;
}

.text-filter > input{
  width: 90% !important;
  height: 100% !important;
  border-radius: 10px;
  font-size: 2rem;
}

.filter-option {
  grid-row: 2;
  margin-right: 1rem;
  justify-self: center;
}

.filter-option:first-of-type {
  grid-column: 1/3;
}

.filter-option:nth-of-type(2) {
  grid-column: 3/5;
}
.filter-option:nth-of-type(3) {
  grid-column: 5/7;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
