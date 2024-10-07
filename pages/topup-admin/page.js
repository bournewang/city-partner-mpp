import companyApi from "../../api/company"

Page({
  data: {
    txes: {}
  },
  onLoad() {
    companyApi.topups().then(res => {
      if (res.success){
        this.setData({txes: res.data})
      }
    })
  },
  topupAudit(e){
    const id = e.currentTarget.dataset.id
    console.log("id: ", id)
    wx.navigateTo({
      url: '/pages/topup-audit/page?tx_id='+id,
    })
  }
})
