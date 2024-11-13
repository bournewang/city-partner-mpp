import userApi from "../../api/user"
Page({
  data: {
    items: [],
    // total: 0,
    // pages: 0,
    hasMorePages: false,
    page: 0,
    noMore: false
  },
  onLoad() {
    userApi.recommends(1).then(res => {
      let {items, page, hasMorePages} = res.data
      this.setData({items, page, hasMorePages})
    })

    let {user} = getApp().store.getState()
    if (user.is_challenging) {
      wx.setNavigationBarTitle({
        title: '我的保荐'
      })
    }

  },
  onReachBottom(){
    console.log("onReachBottom ====")
    let {page, hasMorePages} = this.data
    console.log("page : "+page)
    if (hasMorePages) {
      page++
      console.log("page + 1: "+page)
      userApi.recommends(page).then(res => {
        let {items, page, hasMorePages} = res.data
        items = this.data.items.concat(items)
        // this.setData({items, pages, page, total})
        this.setData({items, page, hasMorePages})
      })
    }else{
      // this.setData({noMore: true})
    }
  },
  showUser(e){
    console.log(e)
    // console.log()
    let {userid} = e.currentTarget.dataset
    console.log("userid: "+userid)
    let {user} = getApp().store.getState()
    if (user.is_challenging) {
      wx.navigateTo({
        url: '/pages/consumer/page?user_id='+userid,
      })
    }
  },
  goWidthdraw()
  {
    wx.navigateTo({
      url: "/pages/widthdraw/page"
    })
  }
})
