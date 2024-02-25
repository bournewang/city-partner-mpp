Component({
  data: {
    // value: 'label_1',
    list: [
      { value: '/pages/index/page', label: '城市合伙人', icon: 'home' },
      // { value: '/pages/car-manager/page', label: '车管家', icon: 'app' },
      { value: '/pages/range/page', label: '排行榜', icon: 'app' },
      { value: '/pages/discovery/page', label: '动态', icon: 'chat' },
      { value: '/pages/my/page', label: '我的', icon: 'user' },
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
