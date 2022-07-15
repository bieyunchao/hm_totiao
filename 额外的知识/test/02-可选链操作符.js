// ?. 是 可选链操作符 ,如果前面对象里没有length,整个表达式原地返回 undefined
const obj = null
// 正常情况下 这种代码会报错 // TypeError: Cannot read properties of null (reading 'length')
// console.log(obj.length)

// 但是 用可选链 操作符就可以解决这个问题
console.log(obj?.length) // undefined
