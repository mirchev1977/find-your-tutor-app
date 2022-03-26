<template>
  <li>
    <div v-if="!fromUser">
      <a :href="emailLink">{{ email }}</a>
    </div>
    <div v-if="fromUser">
      <!-- <base-button mode="outline" link :to="tutorContactLink">Contact</base-button> -->
      <!-- <a mode="outline" :href="tutorContactLink">{{ email }}</a> -->
      <router-link :to="tutorContactLink">{{ email }}</router-link>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ['email', 'message', 'fromUserId'],
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    },
    fromUser() {
      return this.fromUserId;
    },
    tutorContactLink() {
      return  '/tutors/' + this.fromUser + '/cont?answer=true'; // /tutors/t1/cont
    },
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
