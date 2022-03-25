export default {
  registerTutor(state, payload) {
    state.tutors.push(payload);
  },
  updateTutor(state, payload) {
    for (var i in state.tutors) {
      console.log(i, state.tutors[i]);
      if (state.tutors[i].id == payload.id) {
        state.tutors[i] = payload;
      }
    }
  },
  setTutors(state, payload) {
    state.tutors = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
