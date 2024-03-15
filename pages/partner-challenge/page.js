// logs.js
// const util = require('../../utils/util.js')
import authApi from "../../utils/auth"
import challengeApi from "../../api/challenge"
import userApi from "../../api/user"
Page({
  data: {
    userInfo: {},
    levels: [],
    popup: false,
    popup_title: "",
    popup_text: "",    
    challenge: null,
    // current: 3000,
    type: null,
    options: [
      // { value: 3000, label: '缴纳3000元权益金立即开始挑战' },
      // { value: 500, label: '先缴纳500元占据前排座位，并与72小时内补齐3000元权益金。' }
      // {value: 'consumer',     label: "消费商"},
      // {value: 'car-manager',  label: "车管家"},
      // {value: 'car-owner',    label: "车东家"},
    ]
  },
  onLoad() {
    // this.setData({userInfo: authApi.getLocalUserInfo()})
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
  popup(e){
    console.log("click popup");
    console.log(e.target.dataset)
    this.setData({
      popup: true,
      popup_title: e.target.dataset.title,
      popup_text:  e.target.dataset.text
    });
  },  
  onVisibleChange(e){
    this.setData({
      popup: e.detail.visible,
    });
  },  
  onChange(event){
    const { value } = event.detail;

    this.setData({ type: value });
  },
  continueChallenge(){
    console.log("click continueChallenge")
    userApi.start_challenge({type: this.data.type}).then(res => {
      this.setData({challenge: res.data})
    })
  }
})
