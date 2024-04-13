import request from '../utils/request'

function managers() {
  getApp().store.setState({loading: true})
  return request({
    uri: '/managers',
  }).then(res => {
    getApp().store.setState({
      managers: res.data,
      loading: false
    })
    return res
  })
}

function manager(id) {
  getApp().store.setState({loading: true})
  return request({
    uri: '/managers/'+id,
  }).then(res => {
    getApp().store.setState({loading: false})
    return res
  })
}

export default {
  managers,
  manager
}