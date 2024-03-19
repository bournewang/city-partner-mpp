import carManagerApi from "../../api/car-manager"

Page({
  data: {
    rules: null
  },
  onLoad() {
    const rules = wx.getStorageSync('fundingRules');
    if (rules) {
      this.setData({rules})
    }else{
      carManagerApi.fundingRules().then(res => {
        this.setData({rules: res.data})
      })
    }
  }
})
