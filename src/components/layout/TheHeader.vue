<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Find Your Tutor</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/tutors">All Tutors</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/inquiries">Inquiries({{ inquiriesNumber }})</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
      <p v-if="isLoggedIn" class="names">Hello, {{ firstName }} {{ lastName }}</p>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    firstName() {
      return this.$store.getters.firstName;
    },
    lastName() {
      return this.$store.getters.lastName;
    },
    inquiriesNumber() {
      if (this.isLoggedIn) {
        this.loadInquiries();
        const inquiries = this.$store.getters['inquiries/inquiries'];
        return inquiries.length;
      }
      return 0;
    }
  },
  methods: {
    async loadInquiries() {
        try {
          await this.$store.dispatch('inquiries/fetchInquiries');
        } catch(e) {
          console.log('error loading inquiries');
        }
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/tutors');
    }
  }
}
</script>

<style scoped>
.names {
  position: absolute;
  right: 20px;
  top: -14px;
  padding-right: 20px;
  color: #fff;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008dbf;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
