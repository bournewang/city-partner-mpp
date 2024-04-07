import publicApi from "../../api/public"

Page({
  data: {
    // rules: null
    page: null,
    type: null
  },
  onLoad(option) {
    // const rules = wx.getStorageSync('fundingRules');
    let {page, type} = option
    this.setData({page, type})

    let {rules} = getApp().store.getState()
    if (!rules) {
      publicApi.rules().then(res => {
        wx.setNavigationBarTitle({
          title: res.data[page][type].title
        })  
      })
    }else{
      wx.setNavigationBarTitle({
        title: rules[page][type].title
      })
    }
  }
})
