import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Layout } from './components/Layout'
// import { AnalyticsInspector } from './components/AnalyticsInspector'
import { StoreProvider } from './store/StoreContext'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { About } from './pages/About'
import { trackEvent } from './analytics/trackEvent'

export default function App() {
  return <StoreProvider><PageTracking /><Layout><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/products/:id" element={<ProductDetail />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/confirmation" element={<Confirmation />} /><Route path="/about" element={<About />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></Layout>{/* <AnalyticsInspector /> */}</StoreProvider>
}

function PageTracking() {
  const location = useLocation()
  const trackedPath = useRef(null)
  useEffect(() => { if (trackedPath.current === location.pathname) return; trackedPath.current = location.pathname; trackEvent({ name: 'pageView', eventType: 'web.webpagedetails.pageViews', pageName: location.pathname }) }, [location.pathname])
  return null
}
