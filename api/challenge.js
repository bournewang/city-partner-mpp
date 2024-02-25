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

function levels(data) {
  return request({
    uri: '/challenge/levels',
    data
  })
}

function range() {
  return request({
    uri: '/challenge/range'
  })
}

export default {
  successList, 
  stats,
  levels,
  range
}