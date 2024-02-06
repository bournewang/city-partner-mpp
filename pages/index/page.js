// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import {stats} from "../../api/challenge"

Page({
  data: {
    challengeData: []
  },
  methods: {
    
  },
  onLoad(){
    stats().then(res => {
      console.log("===========res data", res.data)
      this.setData({challengeData: res.data})
    })
  },
  challengePartner(){
    wx.navigateTo({
      url: '/pages/partner-checkout/page',
    })
  },
  
})
