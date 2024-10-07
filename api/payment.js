import request from '../utils/request'

function registerConsumer(data){
  return request({
    uri: '/payment/register-consumer',
    method: 'POST',
    data
  })
}

export default {
  registerConsumer
}