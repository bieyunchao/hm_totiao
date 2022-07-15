// 对 Vue 的全局指令进行封装
// 封装中间件函数的插件
const directiveObj = {
  install(Vue) {
    Vue.directive('focus', {
      // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      // 指令所在标签，被插入到真实DOM时才触发的，如果标签使用 display: none 隐藏再出现，不会触发inserted
      inserted(el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          const input = el.querySelector('input')
          const textarea = el.querySelector('textarea')
          if (input) input.focus()
          if (textarea) textarea.focus()
        }
      },
      // 指令所在标签被更新时触发
      update(el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          const input = el.querySelector('input')
          const textarea = el.querySelector('textarea')
          if (input) input.focus()
          if (textarea) textarea.focus()
        }
      }
    })
  }
}

export default directiveObj
