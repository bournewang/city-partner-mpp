// logs.js
// const util = require('../../utils/util.js')
import authApi from '../../utils/auth'
import { wxLogin } from '../../utils/request'
import userApi from "../../api/user"
const app = getApp()
Page({
  data: {
    info: {},
    teamOverview: [],
    challenge: null,
    profileLink: {url: '/pages/profile/page'}
  },
  onLoad() {
    app.store.setState({msg: "hahaah"})
    var info = authApi.getLocalUserInfo()
    if (info) {
      this.setData({info})
    }else{
      userApi.info().then(res => {
        this.setData({info: res.data})
        authApi.setLocalUserInfo(res.data)
      })
    }
    
    const challenge = userApi.getLocalChallenge()
    if (challenge) {
      this.setData({challenge})

      userApi.teamOverview().then(res => {
        this.setData({teamOverview: res.data})
      })
    }else{
      userApi.challenge().then(res => {
        // console.log("====== challenge data", res.data)
        this.setData({challenge: res.data})
      })
    }
    

  } 
})
