// 我们经常使用 splice() 结合 findIndex() 来删除 数组中指定下标的元素
const arr = ['a', 'b', 'c', 'd']
const index = arr.findIndex((item) => item === 'c')
arr.splice(index, 1)
console.log(arr) // [ 'a', 'b', 'd' ]
