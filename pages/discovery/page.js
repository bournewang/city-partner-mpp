// logs.js
// const util = require('../../utils/util.js')
import "../../api/challenge";
import challengeApi from "../../api/challenge";
// import carManagerApi from "../../api/car-manager"
import publicApi from "../../api/public"
Page({
  data: {
    tab: 1,
    challengeStats: [],
    challengeActivity: [],
    page: 1,
    hasMoreChallenges: false,
    hasMoreUsers: false,
    // fundingStats: [],
    // fundingActivity: [],
    userActivity: [],
    loading: true,
    keyword: ""
  },
  onLoad() {
    challengeApi.activity().then(res => {
      console.log("hasMorepages: "+res.data.hasMorepages)
      this.setData({ 
        challengeActivity: res.data.items, 
        hasMoreChallenges: res.data.hasMorepages,
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
    publicApi.userActivity(1, "").then(res => {
      this.setData({
        // fundingStats:     res.data.stats, 
        userActivity:  res.data.items,
        // challengeActivity: res.data.items, 
        hasMoreUsers: res.data.hasMorepages,        
      })
    })
    // carManagerApi.fundingActivity().then(res => {
    //   this.setData({stats: res.data})
    // })           
    // 
    
  },
  onReachBottom(){
    console.log("onReachBottom ====")
    let {tab, hasMoreChallenges, hasMoreUsers, page, challengeActivity, userActivity} = this.data
    console.log(`page : ${page}, hasmoreChallenge: ${hasMoreChallenges}, hasMoreUsers: ${hasMoreUsers}`)
    if (tab == 0 && hasMoreChallenges) {
      page++
      console.log("page + 1: "+page)
      challengeApi.activity(page).then(res => {
        challengeActivity = challengeActivity.concat(res.data.items)
        this.setData({ 
          challengeActivity, 
          page: res.data.page,
          hasMoreChallenges: res.data.hasMoreChallenges,
          loading: false 
        })
      })
    }else if (tab == 1 && hasMoreUsers) {
        page++
        publicApi.userActivity(page, this.data.keyword).then(res => {
          userActivity = userActivity.concat(res.data.items)
          console.log("user activity length: ", userActivity.length)
          this.setData({
            // fundingStats:     res.data.stats, 
            userActivity,
            page: res.data.page,
            hasMoreUsers: res.data.hasMorepages,        
            loading: false
          })
        })
    }
  },
  onTabsChange(event) {
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value, page: 1})
  },  
  search(e){
    let keyword = e.detail.value
    console.log("keyword change, search: "+keyword)
    this.setData({keyword, page: 1})
    publicApi.userActivity(1, keyword).then(res => {
      this.setData({
        userActivity: res.data.items,
        hasMoreUsers: res.data.hasMorepages,        
      })
    })
  }
})
