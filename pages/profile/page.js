// logs.js
// const util = require('../../utils/util.js')
import Toast from 'tdesign-miniprogram/toast/index';
import authApi from "../../utils/auth"
import userApi from "../../api/user"
import {getScene} from "../../utils/util"
import user from '../../api/user';

Page({
  data: {
    info: {}
  },
  onLoad(options) {
    if (options.scene) {
      const {referer_id} = getScene(options.scene)
      console.log('referer_id: ', referer_id)
      if (referer_id) {
        console.log("set referer_id: ", referer_id)
        wx.setStorageSync('referer_id', referer_id)
      }
      authApi.wxLogin()
    }
    let {user} = getApp().store.getState()    
    if (!user.id_card_front || !user.id_card_front.preview) {
      userApi.info("include_images")
    }
  },
  chooseAvatar(e) {
    //console.log(e)
    this.setData({ 'info.avatar': e.detail.avatarUrl })
    userApi.uploadImage(e.detail.avatarUrl, "head-img")
  },  
  bindInputNickname(e) {
    //console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.nickname': e.detail.value })
  },  
  bindInputName(e) {
    //console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.name': e.detail.value })
  },
  bindInputIdNo(e) {
    //console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.id_no': e.detail.value })
  },
  bindInputMobile(e) {
    //console.log(e.type +"," + e.detail.value)
    this.setData({ 'info.mobile': e.detail.value })
  },
  
  saveProfile() {
    let { nickname, avatar, name, id_no, mobile } = this.data.info
    //console.log({nickname, avatar, name, id_no, mobile})
    userApi.saveInfo({nickname, avatar, name, id_no, mobile}).then(res => {
      authApi.setLocalUserInfo(res.data)
      Toast({
        context: this,
        selector: '#t-toast',
        message: '保存成功！',
      });
      wx.navigateTo({url: "/pages/my/page"})
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
