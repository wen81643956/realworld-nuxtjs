import { request } from '@/plugins/request'

export const getTags = (params) => {
  return request({
    url: '/api/tags',
    method: 'GET',
    params
  })
}