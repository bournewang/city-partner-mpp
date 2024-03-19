// logs.js
// const util = require('../../utils/util.js')
import authApi from "../../utils/auth"
import userApi from "../../api/user"
import challengeApi from "../../api/challenge"
Page({
  data: {
    user: {},
    levels: [],
    challenge: {}
  },
  onLoad() {
    this.setData({user: authApi.getLocalUserInfo()})
    // challengeApi.levels().then(res => {
    //   this.setData({levels: res.data})
    // })    
    const {challenge} = getApp().store.getState()
    if (!challenge) {
      userApi.challenge()
    }
  }
})
