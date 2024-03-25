import user from "../../api/user"
import userApi from "../../api/user"
Page({
  data: {
    first: 1,
    third: 1
  },
  onLoad() {
    userApi.agent()
  },
  onThirdChange(e) {
    this.setData({ third: e.detail.current });
  },
})
