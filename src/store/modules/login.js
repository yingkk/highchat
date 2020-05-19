export default({
  namespaced: true,
  state: {},
  mutations: {
  },
  actions: {
    async login({rootState}, payload) {
      return await rootState.axios.post("/api/login", payload);
    }
  }
})