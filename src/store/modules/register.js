export default({
  namespaced: true,
  state: {},
  mutations: {
  },
  actions: {
    async register({rootState}, payload) {
      return await rootState.axios.post("/api/register", payload);
    }
  }
})