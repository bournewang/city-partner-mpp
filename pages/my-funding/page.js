import userApi from "../../api/user"
import carManagerApi from "../../api/car-manager"

Page({
  data: {
  },
  onLoad() {
    userApi.crowdFunding()
    if (!getApp().store.getState().fundingConfig) {
      carManagerApi.fundingConfig()
    }
  }
})
