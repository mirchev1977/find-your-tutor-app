<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Inquiries Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasInquiries && !isLoading">
          <inquiry-item
            v-for="req in receivedInquiries"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
            :fromUserId="req.fromUserId"
          ></inquiry-item>
        </ul>
        <h3 v-else>You haven't received any inquiries yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import InquiryItem from '../../components/inquiries/InquiryItem.vue';

export default {
  components: {
    InquiryItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedInquiries() {
      return this.$store.getters['inquiries/inquiries'];
    },
    hasInquiries() {
      return this.$store.getters['inquiries/hasInquiries'];
    },
  },
  created() {
    this.loadInquiries();
  },
  methods: {
    async loadInquiries() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('inquiries/fetchInquiries');
      } catch (error) {
        this.error = error.message || 'Something failed!';
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
