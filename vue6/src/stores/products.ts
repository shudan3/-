import { ref } from 'vue'

export interface Product {
  id: number
  name: string
  price: number
  old: number
  img: string
  cat: string
}

// 分类
export const cats = [
  { name: '手机数码', icon: 'camera' },
  { name: '服装鞋包', icon: 'fire' },
  { name: '食品生鲜', icon: 'map-pin' },
  { name: '家居生活', icon: 'home' },
  { name: '美妆护肤', icon: 'color' },
  { name: '图书文具', icon: 'wallet' },
  { name: '游戏娱乐', icon: 'pyq' },
  { name: '运动户外', icon: 'headphones' }
]

// 商品数据
export const goods = ref<Product[]>([
  { id: 1, name: '智能手机 Pro', price: 4999, old: 6999, img: '/static/image/phone1.jpg', cat: '手机数码' },
  { id: 2, name: '高清拍照手机', price: 2999, old: 3999, img: '/static/image/phone2.jpg', cat: '手机数码' },
  { id: 3, name: '商务轻薄手机', price: 1999, old: 2599, img: '/static/image/phone3.jpg', cat: '手机数码' },
  { id: 4, name: '潮流运动鞋', price: 329, old: 599, img: '/static/image/shoe1.jpg', cat: '服装鞋包' },
  { id: 5, name: '经典帆布鞋', price: 199, old: 369, img: '/static/image/shoe2.png', cat: '服装鞋包' },
  { id: 6, name: '加绒卫衣', price: 159, old: 289, img: '/static/image/hoodie.jpg', cat: '服装鞋包' },
  { id: 7, name: '新鲜水果礼盒', price: 89, old: 158, img: '/static/image/fruit1.jpg', cat: '食品生鲜' },
  { id: 8, name: '进口水果拼装', price: 128, old: 199, img: '/static/image/fruit2.webp', cat: '食品生鲜' },
  { id: 9, name: '零食大礼包', price: 69, old: 129, img: '/static/image/food1.webp', cat: '食品生鲜' },
  { id: 10, name: '北欧护眼台灯', price: 159, old: 299, img: '/static/image/home1.jpg', cat: '家居生活' },
  { id: 11, name: 'ins收纳套装', price: 79, old: 149, img: '/static/image/home2.jpg', cat: '家居生活' },
  { id: 12, name: '保湿精华液', price: 189, old: 369, img: '/static/image/skincare1.jpg', cat: '美妆护肤' },
  { id: 13, name: '焕亮面膜20片', price: 129, old: 259, img: '/static/image/skincare2.jpg', cat: '美妆护肤' },
  { id: 14, name: '洁面泡沫', price: 79, old: 149, img: '/static/image/skincare3.jpg', cat: '美妆护肤' },
  { id: 15, name: '文学名著精装', price: 68, old: 128, img: '/static/image/stationery1.jpg', cat: '图书文具' },
  { id: 16, name: '手帐礼盒套装', price: 49, old: 99, img: '/static/image/stationery2.webp', cat: '图书文具' },
  { id: 17, name: '学生文具组合', price: 39, old: 79, img: '/static/image/stationery3.jpg', cat: '图书文具' },
  { id: 18, name: '游戏手柄Pro', price: 399, old: 599, img: '/static/image/game1.jpg', cat: '游戏娱乐' },
  { id: 19, name: '电竞耳机7.1', price: 299, old: 459, img: '/static/image/game2.webp', cat: '游戏娱乐' },
  { id: 20, name: '掌上游戏机', price: 189, old: 349, img: '/static/image/game3.png', cat: '游戏娱乐' },
  { id: 21, name: '户外冲锋衣', price: 459, old: 899, img: '/static/image/outdoor1.jpg', cat: '运动户外' },
  { id: 22, name: '超轻跑步鞋', price: 329, old: 599, img: '/static/image/outdoor2.jpg', cat: '运动户外' },
  { id: 23, name: '速干运动T恤', price: 89, old: 169, img: '/static/image/outdoor3.jpg', cat: '运动户外' }
])
