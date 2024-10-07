import Toast from 'tdesign-miniprogram/toast/index';
import txApi from "../../api/tx"

Page({
  data: {
    tx: {}
  },
  onLoad(options) {
    txApi.get(options.tx_id).then(res => {
      if (res.success) {
        this.setData({tx: res.data})
      }
    })
  },
  cancelTx(){
    const id = this.data.tx.id
    txApi.cancel(id).then(res => {
      if (res.success) {
        this.setData({tx: res.data})
        Toast({
          context: this,
          selector: '#t-toast',
          message: "已取消该笔充值！",
          theme: 'success',
          direction: 'column',
        });
      }
    })    
  },
  auditTx(){
    const id = this.data.tx.id
    txApi.audit(id).then(res => {
      if (res.success) {
        this.setData({tx: res.data})
        Toast({
          context: this,
          selector: '#t-toast',
          message: "已确认该笔充值！",
          theme: 'success',
          direction: 'column',
        });  
      }
    })
  }
})
