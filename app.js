// app.js
import {store} from "./store"
App({
  store,
  onLaunch(option) {
    // 展示本地存储能力
    console.log("onShow, extraData: ====")
    const data = option.referrerInfo.extraData
    console.log(data)
    if (data) {
      let {nickname, name, mobile, avatar,uid} = data
      if (name || mobile) {
        store.setState({jump_user: {nickname, name, mobile, avatar, uid}})
      }
    }
  },
  globalData: {
    userInfo: null
  }
})
