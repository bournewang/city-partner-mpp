// index.js
import publicApi from "../../api/public"
import challengeApi from "../../api/challenge"
import authApi from "../../utils/auth"
import userApi, { challenge } from "../../api/user"
import carManagerApi from "../../api/car-manager"
import { getScene } from "../../utils/util"
import Toast from 'tdesign-miniprogram/toast/index';

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
    marquee: {
      speed: 60,
      loop: -1,
      delay: 0,
    },
    popup: false,
    popup_title: "",
    popup_text: "",
    confirmBtn: { content: '知道了', variant: 'base' },
  },
  methods: {
    
  },
  onLoad(options){
    //console.log("options: ")
    //console.log(options)
    if (options.scene) {
      const {referer_id} = getScene(options.scene)
      //console.log('referer_id: ', referer_id)
      if (referer_id) {
        //console.log("set referer_id: ", referer_id)
        wx.setStorageSync('referer_id', referer_id)
      }
    }
    publicApi.index()
    // challengeApi.stats().then(res => {
    //   //console.log("===========res data", res.data)
    //   this.setData({challengeData: res.data.stats})
    // })
    // challengeApi.levels()
    // .then(res => {
      // this.setData({levels: res.data})
    // })

    const {user, token, challenge, crowdFunding} = getApp().store.getState()
    if (!user || !token) {
      // userApi.info()
      authApi.wxLogin()
    }
  },
  showRules(e) {
    let {type} = e.currentTarget.dataset
    console.log(type);
    wx.navigateTo({
      url: '/pages/rules/page?page=challenge&type='+type,
    })
  },
  onTabsChange(event) {
    //console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },

  popup(e){
    //console.log("click popup");
    //console.log(e.target.dataset)
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
  //   //console.log("click continueChallenge")
  //   userApi.start_challenge({type: this.data.type}).then(res => {
  //     this.setData({challenge: res.data})
  //   })
  // },  
  goApply(e){
    let type = e.currentTarget.dataset.type
    let {user} = getApp().store.getState()
    if (type == 'funding' && user.level < 11) {
      return Toast({
        context: this,
        selector: '#t-toast',
        message: '请先取得消费者管家资格',
      });
    }
    return wx.navigateTo({
      url: "/pages/apply/page?type="+type
    })
  },
  goMyChallenge(){
    return wx.navigateTo({
      url: "/pages/my-challenge/page"
    })
  },  
  carOwnerCertity(){
    let {user} = getApp().store.getState()
    if (!user || !user.agent_id) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请先取得车东家运营资格',
      });
      return
    }
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
