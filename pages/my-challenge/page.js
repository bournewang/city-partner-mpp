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
    userApi.challenge()
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
  }
})
