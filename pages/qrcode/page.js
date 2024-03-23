Page({
  data: {
  },
  onLoad() {
    let {user} = getApp().store.getState()
    if (user.challenge_id) {
      wx.setNavigationBarTitle({
        title: '我的保荐码'
      })
    }
  }
})
