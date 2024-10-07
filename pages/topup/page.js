import Toast from 'tdesign-miniprogram/toast/index';
import userApi from "../../api/user"

Page({
  data: {
    tab: 0,
    amount: 0,
    errors: {}
  },
  onLoad() {
    
  },
  onTabsChange(event) {
    this.setData({tab: event.detail.value})
  },  
  inputAmount(e){
    console.log("input amount: ", )
    this.setData({amount: e.detail.value})
  },
  submitTopup(){
    if (this.data.amount < 1) {
      this.setData({errors: {'amount': '请输入充值金额'}})
      return
    }
    userApi.topup(this.data.amount).then(res => {
      if (res.success){
        Toast({
          context: this,
          selector: '#t-toast',
          message: '提交成功，等待管理员审核',
          theme: 'success',
          direction: 'column',
        });    
      }else{
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.msg,
          theme: 'error',
          direction: 'column',
        });    
      }
    })
    
  }
})
