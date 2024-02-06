// logs.js
// const util = require('../../utils/util.js')
import { getLocalUserInfo, setLocalToken, setLocalUserInfo } from '../../utils/auth'
import { wxLogin } from '../../utils/request'

Page({
  data: {
    info: {}
  },
  onLoad() {
    var info = getLocalUserInfo()
    if (info) {
      this.setData({info})
    }
  },
  toLogin() {
    // wx.navigateTo({
    //   url: '/pages/login/page',
    // })
    console.log("info:", this.data.info)
    if (!this.data.info || !this.data.info.id){
      console.log("call wxLogin")
      wxLogin().then(res => {
        console.log("response ", res)
        if (res.mobile) {
          // this.setData({ type: 2 })
          console.log("set userinfo and token:", res.api_token)
          setLocalUserInfo(res)
          setLocalToken(res.api_token)
        }else{
          // wx.navigateBack()
        }
      }, loginRes => {
        console.log('reject login, goto login page', loginRes)
        wx.navigateTo({
          url: '/pages/login/page',
        })
        // this.setData({ loginRes, type: 2 })
      })
    }
  } 
})
