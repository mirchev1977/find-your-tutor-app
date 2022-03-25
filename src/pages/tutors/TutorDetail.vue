<template>
  <div>
    <section>
      <base-card>
        <div class="grid">
          <h2 class="name">{{ fullName }}</h2>
          <h3 class="rate">My rate is: ${{ rate }}/hour</h3>
          <img class="pic" :src="pic"/>
        </div>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedTutor: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedTutor.firstName + ' ' + this.selectedTutor.lastName;
    },
    pic() {
      return this.selectedTutor.pic;
    },
    areas() {
      return this.selectedTutor.areas;
    },
    rate() {
      return this.selectedTutor.hourlyRate;
    },
    description() {
      return this.selectedTutor.description;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
  },
  created() {
    this.selectedTutor = this.$store.getters['tutors/tutors'].find(
      (tutor) => tutor.id === this.id
    );
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.pic {
    grid-column: 11;
    width: 300px;
    grid-row: 1/5;
    border: 14px solid #5c3996;
    border-radius: 30%;
}

.name {
  grid-row: 2;
  grid-column: 2/5;
}

.rate {
  grid-row: 3/5;
  grid-column: 7/9;
}
</style>
