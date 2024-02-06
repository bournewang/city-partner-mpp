import request from '../utils/request'

function successList(data) {
  return request({
    uri: '/challenge/success',
    data
  })
}

function stats(data) {
  return request({
    uri: '/challenge/stats',
    data
  })
}

export {
  successList, 
  stats
}