import userApi from "../../api/user"
Page({
  data: {
    challengeStats: [],
    challengeActivity: []
  },
  onLoad() {
    userApi.recommends()

    let {user} = getApp().store.getState()
    if (user.is_challenging) {
      wx.setNavigationBarTitle({
        title: '我的保荐'
      })
    }

  },
  showUser(e){
    console.log(e)
    // console.log()
    let {userid} = e.currentTarget.dataset
    console.log("userid: "+userid)
    let {user} = getApp().store.getState()
    if (user.is_challenging) {
      wx.navigateTo({
        url: '/pages/consumer/page?user_id='+userid,
      })
    }
  }
})
