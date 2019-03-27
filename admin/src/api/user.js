/*
 * @Author: johnwang
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 * 用户相关接口
 * @since: 2019-03-27 16:50:46
 * @lastTime: 2019-03-27 18:39:52
 */
import {request} from '../utils/request'

export const requestLogin = params => {
  return request('/api/user/login', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}

export const requestRegister = params => {
  return request('/api/user/register', params)
}

export const requestUserInfo = params => {
  return request('/api/user/info', params).then((data) => {
    sessionStorage.setItem('user-info', JSON.stringify(data))
    return data
  })
}

export const requestLogout = params => {
  return request('/api/user/logout', params)
}

export const requestChangePassword = params => {
  return request('/api/user/changePassword', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}

export const requestUserQuery = params => {
  return request('/api/user/query', params)
}

export const requestPermissionsQuery = params => {
  return request('/api/user/permissions', params)
}
