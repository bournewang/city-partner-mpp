// logs.js
// const util = require('../../utils/util.js')
import authApi from "../../utils/auth"
import userApi from "../../api/user"
Page({
  data: {
    user: {},
    challenge: {}
  },
  onLoad() {
    this.setData({user: authApi.getLocalUserInfo()})
    userApi.challenge().then(res => {
      this.setData({challenge: res.data})
    })      
  }
})
