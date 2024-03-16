// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import challengeApi from "../../api/challenge"
import authApi from "../../utils/auth"
import userApi from "../../api/user"
import { getScene } from "../../utils/util"

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
      this.setData({challengeData: res.data})
    })
    challengeApi.levels().then(res => {
      this.setData({levels: res.data})
    })
    challengeApi.types().then(res => {
      console.log("challenge types === ")
      console.log(res)
      // this.setData({types: res.data})
      const keys = Object.keys(res.data)
      var options = []
      for (var i=0; i<keys.length; i++) {
        options.push({value: keys[i], label: res.data[keys[i]]})
      }
      this.setData({options})
    })
    userApi.challenge().then(res => {
      this.setData({challenge: res.data})
    })    
  },
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },

  onStickyScroll(event) {
    console.log(event.detail);
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
  
  // challengePartner(){
  //   var info =authApi.getLocalUserInfo()
  //   var token = authApi.getLocalToken()
  //   if (!info && !token) {
  //     authApi.wxLogin("need_register")
  //   }
  //   this.setData({tab: 1})
  //   // wx.navigateTo({
  //   //   url: '/pages/partner-challenge/page',
  //   // })
  // },
  onChange(event){
    const { value } = event.detail;

    this.setData({ type: value });
  },
  challenge(){
    console.log("click continueChallenge")
    userApi.start_challenge({type: this.data.type}).then(res => {
      this.setData({challenge: res.data})
    })
  },  
  gotoOneCarbon(){
    return wx.navigateToMiniProgram({
      appId: "wx2abd98b5a29e8fa3"
    })
  }
})
