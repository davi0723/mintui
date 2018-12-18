/**
 * Created by jerry on 2017/6/9.
 */
import axios from 'axios'
import qs from 'qs'
import { bus } from '../bus.js'

axios.defaults.withCredentials = true
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

// 添加一个响应拦截器
axios.interceptors.response.use(function(response) {
  if (response.data.ret === 0 && /^session*/.test(response.data.data)) {
    //未登录
    console.log('session过期')
    bus.$emit('goto', '/login')
  }
  return response
}, function(error) {
  console.log('session过期2')
  // Do something with response error
  return Promise.reject(error)
})

export const POSTJSON = (url, params) => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    data: params,
    url,
  }
  return axios(options).then(res => res.data)
}
export const POST = (url, params) => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: qs.stringify(params),
    url,
  }
  return axios(options).then(res => res.data)
}
export const POSTIMG = (url, data) => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data' },
    data,
    url,
  }
  return axios(options).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${url}`, { params: params }).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${url}`, { params: params }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${url}`, params).then(res => res.data)
}
