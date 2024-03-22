import publicApi from "../../api/public"

Component({
  properties: {
    showError: {type: Boolean, default: false}
  },
  data: {
    popup: false,
    privacy_agree: false
  },
  ready: function(options){
    let {privacy} = getApp().store.getState()
    if (!privacy)
      publicApi.privacy()    
  },
  methods:{  
    onPrivacyChange(e){
      console.log(e.detail.value)
      this.setData({privacy_agree: e.detail.value.length})
      this.triggerEvent('agreeChange', {value: !!e.detail.value.length});
    },
    popup(e){
      console.log("click show popup, set popup: true ")
      this.setData({popup: true});
    },
    closeDialog() {
      this.setData({ popup: false });
    },
    onVisibleChange(e){
      this.setData({
        popup: e.detail.visible,
      });
    },  
  }
})
