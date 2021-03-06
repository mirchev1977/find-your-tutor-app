<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <tutor-filter @change-filter="setFilters" @change-text-filter="setTextFilter"></tutor-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadTutors(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Tutor</base-button>
          <base-button v-if="isLoggedIn && !isTutor && !isLoading" link to="/register">Register as Tutor</base-button>
          <base-button v-if="isLoggedIn && isTutor && !isLoading" link to="/register/edit">Edit your Tutor Registration</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasTutors">
          <tutor-item
            v-for="tutor in filteredTutors"
            :key="tutor.id"
            :id="tutor.id"
            :first-name="tutor.firstName"
            :last-name="tutor.lastName"
            :rate="tutor.hourlyRate"
            :areas="tutor.areas"
          ></tutor-item>
        </ul>
        <h3 v-else>No tutors found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import TutorItem from '../../components/tutors/TutorItem.vue';
import TutorFilter from '../../components/tutors/TutorFilter.vue';

export default {
  components: {
    TutorItem,
    TutorFilter,
  },
  data() {
    return {
      textFiltered: [],
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isTutor() {
      return this.$store.getters['tutors/isTutor'];
    },
    filteredTutors() {
      let tutors = this.$store.getters['tutors/tutors'];
      if (this.textFiltered.length > 0) {
        tutors = this.textFiltered;
      }
      return tutors.filter((tutor) => {
        if (this.activeFilters.frontend && tutor.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && tutor.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && tutor.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasTutors() {
      return !this.isLoading && this.$store.getters['tutors/hasTutors'];
    },
  },
  created() {
    this.loadTutors();
  },
  methods: {
    setTextFilter(textFilter) {
      if (textFilter === '') {
        this.textFiltered = [];
        return;
      }
      const checkBoxFiltered = this.filteredTutors;
      this.textFiltered = checkBoxFiltered.filter(tutor => {
        if (tutor.firstName.match(new RegExp(textFilter, "i"))) {
          return true;
        }
        if (tutor.lastName.match(new RegExp(textFilter, "i"))) {
          return true;
        }
        return false;
      });
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadTutors(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('tutors/loadTutors', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  justify-content: center;
  column-gap: 20%;
}
</style>