export default {
  inquiries(state, _, _2, rootGetters) {
    const tutorId = rootGetters.userId;
    return state.inquiries.filter(req => req.tutorId === tutorId);
  },
  hasInquiries(_, getters) {
    return getters.inquiries && getters.inquiries.length > 0;
  }
};
