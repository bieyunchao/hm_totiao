import Vue from 'vue'
import {
  NavBar,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Col,
  Row,
  Badge,
  Search,
  Image as VanImage,
  Divider,
  Tag,
  Dialog,
  DatetimePicker,
  Loading,
  Lazyload
} from 'vant'

Vue.use(Loading)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Col)
Vue.use(Row)
Vue.use(Badge)
Vue.use(Search)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Lazyload, {
  preLoad: 0.8, // 屏幕高度的范围百分比 0-1
  error:
    'https://img.lovepik.com/free_png/32/49/56/40458PICI6fkEa82f7cvd_PIC2018.png_860.png' // 懒加载图片失败，使用错误提示的图片
})
