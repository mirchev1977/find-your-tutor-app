<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p
          v-if="!formIsValid" style="color: red;"
        >Please enter a valid email and password (must be at least 6 characters long).</p>
        <div v-if="mode !== 'login'">
          <div class="form-control">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" v-model.trim="firstName" />
          </div>
          <p
            v-if="!validFirstName" style="color: red;"
          >Please enter First Name!</p>
          <div class="form-control">
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" v-model.trim="lastName" />
            <p
              v-if="!validLastName" style="color: red;"
            >Please enter Last Name!</p>
          </div>
          <div class="form-control">
            <label for="pic">Picture</label>
            <input type="text" id="pic" v-model.trim="pic" />
            <p
              v-if="!validPic" style="color: red;"
            >Please provide an image of you!</p>
          </div>
        </div>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      validFirstName: true,
      lastName: '',
      validLastName: true,
      pic: '',
      validPic: true,
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      this.validLogin = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.validFirstName = true;
      if (this.mode == 'signup' && this.firstName === '') {
        this.validFirstName = false;
        return;
      }

      this.validLastName = true;
      if (this.mode == 'signup' && this.lastName === '') {
        this.validLastName = false;
        return;
      }

      this.validPic = true;
      if (this.mode == 'signup' && this.pic === '') {
        this.validPic = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        pic: this.pic
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'tutors');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
