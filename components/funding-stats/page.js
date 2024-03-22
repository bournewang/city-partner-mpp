
import carManagerApi from "../../api/car-manager"

Component({
  data: {
    stats: []
  },
  ready: function(){
    const {fundingStats} = getApp().store.getState()
    if (!fundingStats) {
      carManagerApi.fundingStats().then(res => {
        // this.setData({stats: res.data.stats})
        getApp().store.setState({fundingStats: res.data.stats})
      }) 
    }
  }
})
