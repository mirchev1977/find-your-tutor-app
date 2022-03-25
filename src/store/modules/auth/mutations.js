export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.pic = payload.pic;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
