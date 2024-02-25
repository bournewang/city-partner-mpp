// pages/user/center/login.js
import { redirect } from '../../utils/util'
import { wxLogin } from '../../utils/request'
import userApi from '../../api/user'
// import Message from '../../miniprogram_dist/message/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginRes: {},
    referer_id: undefined,
    store_id: undefined,
    type: 2, //1 注册， 2 获取手机号

    agree: 0,
    error: null,
    showPrivacy: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("enter login page")
    let referer_id = options.referer_id
    if (!referer_id) {
      referer_id = wx.getStorageSync('referer_id')
    }
    if (referer_id) {
      this.data.referer_id = referer_id
    }
  },

  onShow: function () {
  },
  async getUserInfo(e) {
    console.log('getUserInfo')
    if (!this.data.loginRes.session_key) {
      wx.navigateBack()
      return
    }
    wx.getUserInfo({
      lang: 'zh_CN',
      withCredentials: true,
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('profile', res)
        const formData = {
          session_key: wx.getStorageSync('session_key'),
          store_id: this.data.store_id,
          referer_id: this.data.referer_id,
          ...res
        }
        userApi.register(formData).then(res => {
          // wx.navigateBack()
          this.setData({ type: 2 })
        })
      },
      fail(res) {
        console.log('getUserProfile fail', res)
        wx.navigateBack()
      }
    })
  },
  async getPhoneNumber(e) {
    console.log('getPhoneNumber', e.detail.code)
    if (!e.detail.code) {
      return
    }
    // await wx.$loading.show()
    const formData = {
      session_key: wx.getStorageSync('session_key'),
      // store_id: this.data.store_id,
      referer_id: this.data.referer_id,
      code: e.detail.code
    }
    console.log('regesiter', formData)
    // return;
    const res = await userApi.register(formData).catch(_ => false)
    // const res = await mobile({ code: e.detail.code }).catch(_ => false)
    // wx.$loading.hide()
    if (res) {
      // wx.$message.success()
      wx.navigateBack()
    } else {
      wx.$message.error()
    }

  },
  tipAgree(){
    // this.setData({error: '请先同意隐私政策'})
  },
  showPrivacy(){
    this.setData({showPrivacy: 1})
  },
  agreePrivacy(){
    this.setData({agree: !this.data.agree})
  },
  confirmPrivacy(){
    this.setData({agree: 1, showPrivacy: 0})
  }
})