// logs.js
// const util = require('../../utils/util.js')
import authApi from "../../utils/auth"
import userApi from "../../api/user"
import {getScene} from "../../utils/util"

Page({
  data: {
    privacy_agree: false,
    showPrivacyError: false,
    referer_id: null,
    info: {}
  },
  onLoad(options) {
    if (options.scene) {
      const {referer_id} = getScene(options.scene)
      console.log('referer_id: ', referer_id)
      if (referer_id) {
        console.log("set referer_id: ", referer_id)
        wx.setStorageSync('referer_id', referer_id)
        this.setData({referer_id})
      }
      authApi.wxLogin()
    }else{
      userApi.info("include_images").then(res => {
        this.setData({info: res.data})
      })
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
  onAgreeChange(e){
    console.log("checked: "+e.detail.value)
    this.setData({privacy_agree: e.detail.value})
  },
  saveProfile() {
    if (!this.data.privacy_agree) {
      this.setData({showPrivacyError: true});
      return;
    }
    let { nickname, avatar, name, id_no, mobile } = this.data.info
    //console.log({nickname, avatar, name, id_no, mobile})
    userApi.saveInfo({nickname, avatar, name, id_no, mobile}).then(res => {
      // authApi.setLocalUserInfo(res.data)
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
