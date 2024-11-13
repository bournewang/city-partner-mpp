// logs.js
// const util = require('../../utils/util.js')
import authApi from "../../utils/auth"
import userApi from "../../api/user"
import challengeApi from "../../api/challenge"
Page({
  data: {
    show_rank: false
  },
  onLoad() {
    userApi.challenge().then(res => {
      let {user} = getApp().store.getState()
      if (res.status != user.challenge_status) {
        userApi.info()
      }
    })
  },
  toggleRank(){
    this.setData({show_rank: !this.data.show_rank})
  },
  startChallenge(){
    userApi.start_challenge().then(res => {
      wx.navigateTo({
        url: '/pages/my/page',
      })
    })
  },
  officialChallenge(){
    return wx.navigateTo({
      url: "/pages/apply/page?type=challenge"
    })
  }
})
