// 封装本地存储的方式
// 整个项目使用 localStorage 还是 sessionStorage，还是 Cookie
// 只需改变这里即可
// 封装为了同一个管理，方便以后的替换而会修改
export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const getStorage = (key) => {
  return localStorage.getItem(key)
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
