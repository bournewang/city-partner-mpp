// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import challengeApi from "../../api/challenge"
import authApi from "../../utils/auth"

Page({
  data: {
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
  onLoad(){
    challengeApi.stats().then(res => {
      console.log("===========res data", res.data)
      this.setData({challengeData: res.data})
    })
    challengeApi.levels().then(res => {
      this.setData({levels: res.data})
    })
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
  challengePartner(){
    var info =authApi.getLocalUserInfo()
    var token = authApi.getLocalToken()
    if (!info && !token) {
      authApi.wxLogin("need_register")
    }
    
    wx.navigateTo({
      url: '/pages/partner-challenge/page',
    })

  },
  
})
