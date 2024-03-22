import carManagerApi from "../../api/car-manager"

Page({
  data: {
    rules: null
  },
  onLoad() {
    // const rules = wx.getStorageSync('fundingRules');
    let {fundingConfig} = getApp().store.getState()
    if (!fundingConfig) {
      carManagerApi.fundingConfig()
    }
  }
})
