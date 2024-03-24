import Store from "wxministore";
import {IMAGE_URL} from "./config"
let store = new Store({
  state: {
    loading: null,
    IMAGE_URL: IMAGE_URL,
    token: null,
    user: null,
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