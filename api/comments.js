import { request } from '@/plugins/request'

export const addComments = ({ slug, data }) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'POST',
    data
  })
}

export const getComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET'
  })
}

export const deleteComments = ({ slug, id }) => {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'DELETE'
  })
}