// logs.js
// const util = require('../../utils/util.js')
import Toast from '../../tdesign-miniprogram/toast/index';
import authApi from "../../utils/auth"
import userApi from "../../api/user"
import user from '../../api/user';

Page({
  data: {
    info: {}
  },
  onLoad() {
    userApi.info("include_images").then(res => {
      this.setData({info: res.data})
    })
    
  },
  chooseAvatar(e) {
    console.log(e)
    this.setData({ 'info.avatar': e.detail.avatarUrl })
    userApi.uploadImage(e.detail.avatarUrl, "head-img")
  },  
  bindInputNickname(e) {
    console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.nickname': e.detail.value })
  },  
  bindInputName(e) {
    console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.name': e.detail.value })
  },
  bindInputIdNo(e) {
    console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.id_no': e.detail.value })
  },
  bindInputMobile(e) {
    console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.mobile': e.detail.value })
  },
  
  saveProfile() {
    let { nickname, avatar, name, id_no, mobile } = this.data.info
    console.log({nickname, avatar, name, id_no, mobile})
    userApi.saveInfo({nickname, avatar, name, id_no, mobile}).then(res => {
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
