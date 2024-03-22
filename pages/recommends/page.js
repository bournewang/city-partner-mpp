import userApi from "../../api/user"
Page({
  data: {
    challengeStats: [],
    challengeActivity: []
  },
  onLoad() {
    userApi.recommends()
  }
})
