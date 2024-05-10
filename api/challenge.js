import request from '../utils/request'

function successList(data) {
  return request({
    uri: '/challenge/success',
    data
  })
}

function stats(include_activity) {
  getApp().store.setState({loading: true})
  return request({uri: '/challenge/stats' + (include_activity ? "?activity=1" : "")}).then(res => {
    getApp().store.setState({loading: false})
    return res
  })
}

function activity(page=1) {
  getApp().store.setState({loading: true})
  return request({uri: '/challenge/activity?page='+page}).then(res => {
    getApp().store.setState({loading: false})
    return res
  })
}

function levels() {
  let app = getApp();
  if (!app.store.getState().challengeLevels) {
    return request({uri: '/challenge/levels'}).then(res => {
      if (res.success) {
        getApp().store.setState({challengeLevels: res.data})
      }
    })
  }
}

function types() {
  return request({
    uri: '/challenge/types'
  })
}

function range() {
  return request({
    uri: '/challenge/range'
  })
}

export default {
  activity,
  successList, 
  stats,
  levels,
  types,
  range
}