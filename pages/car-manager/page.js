// pages/car-manager/page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {label: "轻资产生活方式", icon: "sunny"},
      {label: "不贷款无月供", icon: "money"},
      {label: "每年2万使用费", icon: "saving-pot"},
      {label: "自驾搭乘均免费", icon: "vehicle"},
      {label: "买全险有保障", icon: "support"},
      {label: "维修保养皆省心", icon: "tools"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  goRules(){
    console.log("go rules")
    wx.navigateTo({
      url: '/pages/car-rules/page',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})