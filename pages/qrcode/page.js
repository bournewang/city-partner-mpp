Page({
  data: {
  },
  onLoad() {
    let {user} = getApp().store.getState()
    if (user.is_challenging) {
      wx.setNavigationBarTitle({
        title: '我的保荐码'
      })
    }
  }
})
