import { request } from '@/plugins/request'

export const userLogin = (data) => {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

export const userRegister = (data) => {
  return request({
    url: '/api/users',
    method: 'POST',
    data
  })
}