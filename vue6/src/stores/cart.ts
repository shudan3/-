import { reactive, computed } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  img: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const stored = uni.getStorageSync('cart')
const initialState: CartState = stored
  ? JSON.parse(stored)
  : { items: [] }

const state = reactive<CartState>(initialState)

function saveState() {
  uni.setStorageSync('cart', JSON.stringify(state))
}

export function useCart() {
  const items = computed(() => state.items)
  const totalCount = computed(() => state.items.reduce((sum, i) => sum + i.quantity, 0))
  const totalPrice = computed(() => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0))

  function addToCart(product: { id: number; name: string; price: number; img: string }) {
    const existing = state.items.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      state.items.push({ ...product, quantity: 1 })
    }
    saveState()
  }

  function removeFromCart(id: number) {
    state.items = state.items.filter((i) => i.id !== id)
    saveState()
  }

  function updateQuantity(id: number, qty: number) {
    const item = state.items.find((i) => i.id === id)
    if (item) {
      item.quantity = Math.max(1, qty)
      saveState()
    }
  }

  function clearCart() {
    state.items = []
    saveState()
  }

  return { items, totalCount, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart }
}
