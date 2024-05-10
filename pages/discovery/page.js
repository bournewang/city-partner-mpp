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
    page: 1,
    hasMorepages: false,
    fundingStats: [],
    fundingActivity: [],
    loading: true
  },
  onLoad() {
    challengeApi.activity().then(res => {
      this.setData({ 
        challengeActivity: res.data.items, 
        hasMorepages: res.data.hasMorepages,
        loading: false 
      })
    })
    challengeApi.stats().then(res => {
      this.setData({
        challengeStats:     res.data.stats, 
        // challengeActivity:  res.data.activity, 
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
    
  },
  onReachBottom(){
    console.log("onReachBottom ====")
    let {hasMorepages, page, challengeActivity} = this.data
    console.log("page : "+page)
    if (hasMorepages) {
      page++
      console.log("page + 1: "+page)
      challengeApi.activity(page).then(res => {
        challengeActivity = challengeActivity.concat(res.data.items)
        this.setData({ 
          challengeActivity, 
          page: res.data.page,
          hasMorepages: res.data.hasMorepages,
          loading: false 
        })
      })
    }else{
    }
  },
})
