import request from '../utils/request'

function successList(data) {
  return request({
    uri: '/challenge/success',
    data
  })
}

function activity() {
  return request({
    uri: '/challenge/activity',
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