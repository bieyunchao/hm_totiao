// 筛选数据的几种方案
const arr1 = [1, 2, 3, 4, 5, 6]
const arr2 = [2, 4, 6, 2]

// 适用于数组中存储的是简单类型的数据
const result = arr1.filter((item) => {
  if (arr2.indexOf(item) === -1) return true
})

// const result = arr1.filter((item) => {
//   if (
//     arr2.findIndex((ele) => {
//       return ele === item
//     }) === -1
//   ) {
//     return true
//   }
// })

// const result = arr1.filter((item) => {
//   if (
//     arr2.filter((ele) => {
//       return ele === item
//     }).length === 0
//   ) {
//     return true
//   }
// })

// const result = arr1.filter((item) => {
//   if (
//     !arr2.some((ele) => {
//       return ele === item
//     })
//   ) {
//     return true
//   }
// })

console.log(result)
