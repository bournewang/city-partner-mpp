import userApi from "../../api/user"
Page({
  data: {
    challengeStats: [],
    challengeActivity: []
  },
  onLoad() {
    userApi.recommends()

    let {user} = getApp().store.getState()
    if (user.challenge_id) {
      wx.setNavigationBarTitle({
        title: '我的保荐'
      })
    }

  }
})
