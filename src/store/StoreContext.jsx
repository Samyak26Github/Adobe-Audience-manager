import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'
import { cartKey } from '../utils/cart'
import { clearSyntheticCustomer, getIdentity, setSyntheticCustomer } from '../analytics/identity'

const StoreContext = createContext(null)

function readCart() {
  try { return JSON.parse(localStorage.getItem('sole-spectrum-cart') || '[]') } catch { return [] }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readCart)
  const [customer, setCustomer] = useState(getIdentity()?.customerId || null)
  useEffect(() => localStorage.setItem('sole-spectrum-cart', JSON.stringify(cart)), [cart])
  const addToCart = (product, size, color, quantity = 1) => setCart((items) => {
    const key = cartKey(product.id, size, color)
    const existing = items.find((item) => item.key === key)
    if (existing) return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
    return [...items, { ...product, key, size, color, quantity }]
  })
  const updateQuantity = (key, quantity) => setCart((items) => items.map((item) => item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
  const removeFromCart = (key) => setCart((items) => items.filter((item) => item.key !== key))
  const signIn = () => { setSyntheticCustomer('customer_1001'); setCustomer('customer_1001') }
  const signOut = () => { clearSyntheticCustomer(); setCustomer(null) }
  const value = useMemo(() => ({ products, cart, setCart, addToCart, updateQuantity, removeFromCart, customer, signIn, signOut }), [cart, customer])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export function useStore() { return useContext(StoreContext) }
