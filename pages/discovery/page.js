// logs.js
// const util = require('../../utils/util.js')
import "../../api/challenge";
import challengeApi from "../../api/challenge";
import carManagerApi from "../../api/car-manager"
Page({
  data: {
    tab: 0,
    challengeStats: [],
    challengeActivity: [],
    fundingStats: [],
    fundingActivity: [],
    loading: true
  },
  onLoad() {
    // challengeApi.activity().then(res => {
    //   this.setData({ challengeList: res.data, loading: false })
    // })
    challengeApi.stats("include_activity").then(res => {
      this.setData({
        challengeStats:     res.data.stats, 
        challengeActivity:  res.data.activity, 
        loading: false
      })
    }) 
    carManagerApi.fundingStats("include_activity").then(res => {
      this.setData({
        fundingStats:     res.data.stats, 
        fundingActivity:  res.data.activity
      })
    })
    // carManagerApi.fundingActivity().then(res => {
    //   this.setData({stats: res.data})
    // })           
    // 
    
  }
})
