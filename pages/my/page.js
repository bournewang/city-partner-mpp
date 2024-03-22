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
    linkIcon: {
      consumer: "cart",
      car_manager: "vehicle", 
      car_owner: "houses-2"
    },
    profileLink: {url: '/pages/profile/page'}
  },
  onLoad() {
    // var info = authApi.getLocalUserInfo()
    // if (info) {
    //   this.setData({info})
    // }else{
    //   userApi.info().then(res => {
    //     this.setData({info: res.data})
    //     authApi.setLocalUserInfo(res.data)
    //   })
    // }
    
    // const challenge = userApi.getLocalChallenge()
    let {user} = app.store.getState()
    if (user.challenge_id) {
      // this.setData({challenge})
      userApi.teamOverview().then(res => {
        this.setData({teamOverview: res.data})
      })
    }
  } 
})
