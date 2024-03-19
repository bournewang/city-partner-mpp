// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import challengeApi from "../../api/challenge"
import authApi from "../../utils/auth"
import userApi, { challenge } from "../../api/user"
import carManagerApi from "../../api/car-manager"
import { getScene } from "../../utils/util"

function fetchUserData(){
  userApi.challenge()
  userApi.crowdFunding()
}

Page({
  data: {
    scene: {
      referer_id: 0
    },    
    userInfo: {},
    challenge: null,
    tab: 0,
    type: null,
    options: [],
    challengeData: [],
    levels: [],
    level: 2,
    fabButton: {
      icon: 'info',
    },
    popup: false,
    popup_title: "",
    popup_text: "",
    confirmBtn: { content: '知道了', variant: 'base' },
  },
  methods: {
    
  },
  onLoad(options){
    console.log("options: ")
    console.log(options)
    if (options.scene) {
      const {referer_id} = getScene(options.scene)
      console.log('referer_id: ', referer_id)
      if (referer_id) {
        console.log("set referer_id: ", referer_id)
        wx.setStorageSync('referer_id', referer_id)
      }
    }
    challengeApi.stats().then(res => {
      console.log("===========res data", res.data)
      this.setData({challengeData: res.data.stats})
    })
    challengeApi.levels()
    // .then(res => {
      // this.setData({levels: res.data})
    // })
    carManagerApi.fundingStats().then(res => {
      this.setData({stats: res.data.stats})
    })  
    const {user, token, challenge, crowdFunding} = getApp().store.getState()
    if (!user || !token) {
      // userApi.info()
      authApi.wxLogin(fetchUserData)
    }
  },
  showRules(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/funding-rules/page',
    })
  },  
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },

  popup(e){
    console.log("click popup");
    console.log(e.target.dataset)
    this.setData({
      popup: true,
      popup_title: e.target.dataset.title,
      popup_text:  e.target.dataset.text
    });
  },
  closeDialog() {
    // const { dialogKey } = this.data;
    this.setData({ popup: false });
  },
  onVisibleChange(e){
    this.setData({
      popup: e.detail.visible,
    });
  },

  // challenge(){
  //   console.log("click continueChallenge")
  //   userApi.start_challenge({type: this.data.type}).then(res => {
  //     this.setData({challenge: res.data})
  //   })
  // },  
  goApply(e){
    console.log(e)
    let type = e.currentTarget.dataset.type
    return wx.navigateTo({
      url: "/pages/apply/page?type="+type
    })
  },
  goMyChallenge(){
    return wx.navigateTo({
      url: "/pages/my-challenge/page"
    })
  },  
  // goFunding(){
  //   return wx.navigateTo({
  //     url: "/pages/apply/page?type=funding"
  //   })
  // },
  goMyFunding(){
    return wx.navigateTo({
      url: "/pages/my-funding/page"
    })
  }
})
