const arr = [1, 2, 3, 4, 5, 2, 1, 3]
const set = new Set(arr)
const newArr = Array.from(set)
console.log(newArr) // [ 1, 2, 3, 4, 5 ]
