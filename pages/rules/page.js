import publicApi from "../../api/public"

Page({
  data: {
    // rules: null
    type: null
  },
  onLoad(option) {
    // const rules = wx.getStorageSync('fundingRules');
    let {type} = option
    this.setData({type})

    let {rules} = getApp().store.getState()
    if (!rules) {
      publicApi.rules().then(res => {
        wx.setNavigationBarTitle({
          title: res.data[type].title
        })  
      })
    }else{
      wx.setNavigationBarTitle({
        title: rules[type].title
      })
    }
  }
})
