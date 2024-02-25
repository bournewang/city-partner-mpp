// logs.js
// const util = require('../../utils/util.js')
import authApi from "../../utils/auth"
import challengeApi from "../../api/challenge"
import userApi from "../../api/user"
Page({
  data: {
    userInfo: {},
    levels: [],
    challenge: null,
    current: 3000,
    options: [
      { value: 3000, label: '缴纳3000元权益金立即开始挑战' },
      { value: 500, label: '先缴纳500元占据前排座位，并与72小时内补齐3000元权益金。' }
    ]
  },
  onLoad() {
    // this.setData({userInfo: authApi.getLocalUserInfo()})
    challengeApi.levels().then(res => {
      this.setData({levels: res.data})
    })
    userApi.challenge().then(res => {
      this.setData({challenge: res.data})
    })
  },
  onChange(event){
    const { value } = event.detail;

    this.setData({ current: value });
  },
  continueChallenge(){
    console.log("click continueChallenge")
    userApi.start_challenge().then(res => {
      this.setData({challenge: res.data})
    })
  }
})
