Component({
  data: {
    // value: 'label_1',
    list: [
      { value: '/pages/index/page', label: '首页', icon: 'home' },
      { value: '/pages/projects/page', label: '数据中心', icon: 'assignment' },
      // { value: '/pages/range/page', label: '排行榜', icon: 'app' },
      { value: '/pages/discovery/page', label: '信息中心', icon: 'notification' },
      { value: '/pages/my/page', label: '我的权益', icon: 'user' },
    ],
  },
  properties:{
    value: "/pages/index/page"
  },

  methods: {
    onChange(e) {
      console.log(e)
      this.setData({
        value: e.detail.value,
      });
      console.log("navigate to "+e.detail.value)
      wx.navigateTo({
        url: e.detail.value,
      })
    },
  },
});
