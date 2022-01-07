import { request } from '@/plugins/request'

export const getListArticles = (params) => {
  return request({
    url: '/api/articles',
    method: 'GET',
    params
  })
}

export const getUserArticles = (params) => {
  return request({
    url: '/api/articles/feed',
    method: 'GET',
    params
  })
}

export const addFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST'
  })
}

export const deleteFavorite = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE'
  })
}

export const getArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET'
  })
}

export const createArticle = (data) => {
  return request({
    url: `/api/articles`,
    method: 'POST',
    data
  })
}

export const updateArticle = ({ slug, data }) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'PUT',
    data
  })
}

export const deleteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'DELETE'
  })
}