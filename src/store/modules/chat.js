export default ({
  namespaced: true,
  state: {
    curRelationInfo: {},
    historyMsg: []
  },
  mutations: {
    updateCurRelationInfo(state, cur) {
      state.curRelationInfo = cur;
    },
    pushMsg(state, msg){
      state.historyMsg.push(msg)
    }
  },
  actions: {
    async getRelationList({ rootState }, payload) {
      return await rootState.axios.post("/api/getRelationList", payload);
    },
    async addGroupToUser({ rootState }, payload) {
      return await rootState.axios.post("/api/addUser", payload);
    },
    async addFriend({ rootState }, payload){
      return await rootState.axios.post("/api/addFriend",payload)
    },
  }
})