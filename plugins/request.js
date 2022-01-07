import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/'
})


export default ({ store }) => {
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    const err = error.response && error.response.data && error.response.data.errors
    console.dir(error, 123);
    return err ? Promise.reject(Object.keys(err).map(msg => `${msg} ${err[msg].join('')}`)) : Promise.reject(error)
  })
}