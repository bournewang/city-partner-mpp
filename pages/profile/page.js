// logs.js
// const util = require('../../utils/util.js')
import Toast from '../../tdesign-miniprogram/toast/index';
import authApi from "../../utils/auth"
import userApi from "../../api/user"
Page({
  data: {
    nickname: null,
    info: {
      nickname: null,
      avatar: null
    }
  },
  onLoad() {
    // var info = authApi.getLocalUserInfo()
    this.setData({info: authApi.getLocalUserInfo()})
  },
  chooseAvatar(e) {
    console.log(e)
    this.setData({ 'info.avatar': e.detail.avatarUrl })
  },
  bindInputNickname(e) {
    console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.nickname': e.detail.value })
  },  
  bindInputMobile(e) {
    console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.mobile': e.detail.value })
  },   
  saveProfile() {
    let { nickname, avatar, mobile } = this.data.info
    // var nickname = this.data.nickname
    console.log("nickname: "+nickname)
    console.log("avatar: "+avatar)
    console.log("mobile: "+mobile)
    userApi.saveInfo({nickname, avatar, mobile}).then(res => {
      authApi.setLocalUserInfo(res.data)
      Toast({
        context: this,
        selector: '#t-toast',
        message: '保存成功！',
      });
      // wx.navigateBack({delta: 1})
    })
  },
  logout(){
    authApi.removeLocalUserInfo()
    authApi.removeLocalToken()
    wx.navigateTo({
      url: '/pages/index/page',
    })
  }
})
