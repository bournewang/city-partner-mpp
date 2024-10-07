import paymentApi from "../../api/payment"
Page({
  data: {
  },
  onLoad() {
  },
  callPayment(){
    paymentApi.registerConsumer().then(res => {
      console.log(res)
      if (res.success){
        console.log(res.data)
        // const {appId, nonceStr, package, paySign, signType} = res.data
        let data = res.data
        data.success =  (res) => { 
          console.log("payment success, ", res)
          wx.navigateTo({
            url: '/pages/pay-result/page?result=success'
          })
        }
        data.fail = (res) => {
          console.log("payment fail, ", res)
          wx.navigateTo({
            url: '/pages/pay-result/page?result=error'
          })
        }
        wx.requestPayment(data)
      }
    })
  }
})
