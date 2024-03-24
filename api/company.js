import request from '../utils/request'

function create(data)
{
  getApp().store.setState({loading: true})
  return request({
    uri: '/company',
    method: 'post',
    data
  }).then(res => {
    getApp().store.setState({company: res.data, loading: false})
    return res
  })
}

export default {
  create
}