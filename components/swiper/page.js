import publicApi from "../../api/public"

Component({
  data: {
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
    swiperList: [],
    banners: []
  },
  ready(){
    publicApi.banners().then(res => {
      let banners = res.data;
      let list = [];
      banners.map(item => {list.push(item.image)})
      this.setData({
        swiperList: list, 
        banners
      })
    })
  },
  methods: {
    onTap(e) {
      const { index } = e.currentTarget.dataset;
      console.log(index);
      let {banners} = this.data
      const banner = banners[index]
      console.log(banners[index])
      if (!banner || !banner.url) {
        return
      }
      if (banner.type == "inner_url") {
        wx.navigateTo({url: banner.url})
      }else if (banner.type == "outer_url") {
        wx.navigateTo({url: "/pages/web/page?url="+banner.url})
      }else if (banner.type == "mpp") {
        wx.navigateToMiniProgram({appId: banner.url})
      }
    },
    onChange(e) {
      const { current, source } = e.detail;

      console.log(current, source);
    },
    onImageLoad(e) {
      console.log(e.detail.index);
    },
  },
});
