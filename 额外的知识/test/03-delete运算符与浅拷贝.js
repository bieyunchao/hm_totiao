/**
 * 相关知识：
 * delete 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。
 * 注意：delete 操作符会彻底删除内存中这个对象的属性
 *  */

// 还原场景：当我们添加频道时，后台要求我们传的数据类型是id和seq(顺序序号) [{id: 1, seq: 1}, {id: 2, seq: 2}]
// 但是我们现有的数据的数据长这样 [{id: 1, name: 'Java'}, {id: 2, name: 'html'}]
// 我们怎样做呢？
// 注意：我们使用方法时传递的临时变量其实都是数组中对象的引用，所以我们操作的都是内存中的真实对象，
// 所以我们需要更改数据，但又不影响原有数据时，我们需要拷贝对象，这里因为对象里面的属性都是简单数据类型，
// 所以只使用了浅拷贝如果需要的话，我们必须使用深拷贝
const arr = [
  { id: 1, name: 'Java' },
  { id: 2, name: 'html' }
]
// 第一次尝试：我们使用 forEach + delete 操作符
// 表面上我们实现了需求，但是因为组件中仍需要用到 name 属性，但是 name 属性被我们彻底删除掉了，所以影响到了其他功能
/* console.log(arr)
arr.forEach((item, index) => {
  delete item.name
  item.seq = index
})
console.log('------------')
console.log(arr) */

// 第二次尝试：我们使用 map() + delete + 数组浅拷贝(只拷贝了一层) + 对象解构
const res = arr.map((item, index) => {
  const obj = { ...item }
  delete obj.name
  obj.seq = index
  return obj
})
console.log(arr)
console.log('------')
console.log(res)
