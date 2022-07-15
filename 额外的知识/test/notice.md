1. 删除接口返回状态码 204(Not Content) 无返回内容

2. 长姿势：当我们给一个组件添加 ref="xxRef" 并且通过 this.$refs.xxRef 拿到的是 “组件的实例对象”

3. 长姿势：v-model 的本质 是给 标签绑定 input 事件，当触发 input 事件时 会把表单项内的 value 赋给绑定的 v-model 绑定的属性

   - 注意：组件双向绑定的原理也是这样，组件也可以触发 input 事件

```js
// 触发 v-model 绑定的 input 事件
// 把值传出去绑定给 v-model 对应的 vue 变量
this.$emit('input', channelObj.id)
```

```xml
<ChannelEdit v-model="channelId"></ChannelEdit>
```

4. 在遇到一个新页面时，我们不仅可以将他作为一个路由来实现，还可以用一个弹出层来实现

5. 在 van-serch 组件中使用我们自定义的 v-focus 指令实现自动聚集，但是 van-search 本质是一个 div 我们 v-focus 只有绑定在
   input 标签上才能生效，我们采用的解决办法是 通过那个被绑定的 div 获取到内部的 input 再调用 input.focus()

```js
Vue.directive('focus', {
  // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted(el, binding) {
    const input = el.querySelector('input')
    input.focus()
  }
})
```

6. Vue.use()作用：执行目标对象的 install 方法并传入 Vue 类

7. 处理字符串关键字高亮的方法

```js
    // 专门处理字符串高亮关键字
    lightFn(originStr, target) {
      // originStr: 原来字符串
      // target: 关键字
      // 因为在正则表达式中需要使用到变量，所以定义正则时不能采用语法糖的形式
      const reg = new RegExp(target, 'ig')
      // replace() 第二个为参数可以传递一个回调函数，我们用这种方法解决了把repalce修改原数据的问题
      return originStr.replace(reg, (match) => {
        return `<span style="color: red">${match}</span>`
      })
    }
```

8. 使用外部组件时，我们能不能在标签上监听事件，我们需要翻阅文档看这个组件支持什么事件

9. 重磅思想：准备复用的组件，我们尽量不要在里面发送网络请求，往里面传数据就行，因为后面我们要复用，数据肯定不一样

10. 时间修饰符 .native 作用：给组件内的根标签，绑定原生的 click 点击事件

```xml
@click.native="itemClickFn(item.art_id)"
```

11. axios 只针对 params 参数，如果发现键值对值为 null，会忽略此参数名和值不携带 url?后面
    但是 data 如果发现键值对值为 null，不会忽略此参数名

12. 原生 DOM.nodeName 可以拿到标签的名字（注意：大写的字母）

13. 动态 class 语法结构：

```xml
:class="{ 'art-cmt-container-1': true }"
```

14. 在js文件中 router.currentRoute 相当于 Vue文件中的 this.$route

15. 像一个js对象中添加属性  是静态的我们可以采用 obj.key = value 的形式 如果 key 是动态的化， 我们就必须采用 obj[key] = value 的形式