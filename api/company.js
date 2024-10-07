import request from '../utils/request'

function save(data)
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

export function partnerAsset(companyId, data)
{
  getApp().store.setState({loading: true})
  return request({
    uri: '/company/'+companyId+"/partner-asset",
    method: "post",
    data
  }).then(res => {
    getApp().store.setState({partnerAsset: res.data, loading: false})
    return res
  })  
}

export function topups()
{
  return request({
    uri: '/company/topups',
    method: 'get'
  })
}

export default {
  save,
  partnerAsset,
  topups
}