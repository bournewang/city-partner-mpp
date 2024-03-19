import Store from "wxministore";
let store = new Store({
  state: {
    msg: "这是一个全局状态",
    token: null,
    user: {},
    challenge: null,
    challengeStats: null,
    challengeLevels: null
  },
});
console.log(store.getState().msg); //这是一个全局状态 1.2.6+
console.log(store.$state.msg); //这是一个全局状态 （不推荐）

export {
  store
}