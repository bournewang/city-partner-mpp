import request from '../utils/request'

function get(id){
  return request({
    uri: `/tx/${id}`,
  })
}

function audit(id){
  return request({
    uri: `/tx/${id}/audit`,
    method: 'post'
  })
}
function cancel(id){
  return request({
    uri: `/tx/${id}/cancel`,
    method: 'post'
  })
}

export default {
  get,
  audit,
  cancel
}