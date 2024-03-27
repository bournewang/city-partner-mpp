Page({

  data: {
    url: null
  },
  onLoad(options) {
    let {url, avatar, name, mobile} = options 
    let query = [
      // "url=" + data, 
      "avatar=" + avatar,
      "name=" + name,
      "mobile=" + mobile
    ]
    const path = url+"?"+query.join("&")
    console.log("open url: "+path)
    this.setData({url: path})
    getApp().store.setState({loading: true})
  },
  ready(){
    getApp().store.setState({loading: false})
  }
})
