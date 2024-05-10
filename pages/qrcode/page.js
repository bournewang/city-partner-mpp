Page({
  data: {
  },
  onLoad() {
    let {user} = getApp().store.getState()
    if (user.is_challenging) {
      wx.setNavigationBarTitle({
        title: '东家通路权益卡'
      })
    }
  },
  goChallenge(){
    wx.navigateTo({
      url: '/pages/my-challenge/page',
    })
  },
  goBack(){
    wx.navigateBack()
  }
})
