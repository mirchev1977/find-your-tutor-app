export default {
  addInquiry(state, payload) {
    state.inquiries.push(payload);
  },
  setInquiries(state, payload) {
    state.inquiries = payload;
  }
};
