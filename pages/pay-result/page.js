Page({
  data: {
    result: "",
    title: "",
    description: ""
  },
  onLoad(option) {
    let {result} = option
    let title = ""
    let description = ""
    if (result == 'success') {
      title = "支付成功！"
      description = "请返回查看结果！"
    }else{
      title = "支付失败！"
      description = "请稍后重试！"
    }
    this.setData({result, title, description})
  }
})
