import challengeApi from "../../api/challenge"
Page({
  data: {
    challengeStats: [],
    challengeActivity: []
  },
  onLoad() {
    challengeApi.stats("include_activity").then(res => {
      this.setData({
        challengeStats:     res.data.stats, 
        challengeActivity:  res.data.activity, 
        loading: false
      })
    })     
  }
})
