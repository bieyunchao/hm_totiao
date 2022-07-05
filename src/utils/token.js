// 此文件封装三个方法，专门用于操作 token的
const key = 'geek-itheima'

// 设置 Token
export const setToken = (token) => localStorage.setItem(key, `Bearer ${token}`)

// 获取 Token
export const getToken = () => localStorage.getItem(key)

// 删除 Token
export const removeToken = () => localStorage.removeItem(key)
