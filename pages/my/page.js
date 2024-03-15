// logs.js
// const util = require('../../utils/util.js')
import authApi from '../../utils/auth'
import { wxLogin } from '../../utils/request'
import userApi from "../../api/user"

Page({
  data: {
    info: {},
    teamOverview: [],
    challenge: {}
  },
  onLoad() {
    // var info = authApi.getLocalUserInfo()
    // if (info) {
    //   this.setData({info})
    // }
    userApi.info().then(res => {
      this.setData({info: res.data})
      authApi.setLocalUserInfo(res.data)
    })
    userApi.teamOverview().then(res => {
      this.setData({teamOverview: res.data})
    })
    userApi.challenge().then(res => {
      console.log("====== challenge data", res.data)
      this.setData({challenge: res.data})
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/page',
    })
    // console.log("info:", this.data.info)
    // if (!this.data.info || !this.data.info.id){
    //   console.log("call wxLogin")
    //   wxLogin().then(res => {
    //     console.log("response ", res)
    //   }, loginRes => {
    //     console.log('reject login, goto login page', loginRes)
    //     wx.navigateTo({
    //       url: '/pages/login/page',
    //     })
    //     // this.setData({ loginRes, type: 2 })
    //   })
    // }
  } 
})
