import { classifyPriceBand, highestPriceBand } from '../utils/classifyPriceBand'
import { identityMap } from './identity'

const tenant = import.meta.env.VITE_ADOBE_TENANT_NAMESPACE || 'YOUR_TENANT_NAMESPACE'
const customFields = (item) => ({
  [`_${tenant}`]: {
    shoe: {
      brand: item.brand,
      category: item.category,
      productTier: item.productTier,
      color: item.color,
      size: item.size,
      originalUnitPrice: item.originalUnitPrice,
      finalUnitPrice: item.finalUnitPrice,
      discountPercentage: item.discountPercentage,
      purchasePriceBand: classifyPriceBand(item.finalUnitPrice),
    },
  },
})

export function buildXdmEvent({ eventType = 'web.webpagedetails.pageViews', pageName, action, products = [], order }) {
  const xdm = { eventType, timestamp: new Date().toISOString(), web: { webPageDetails: { name: pageName || document.title, URL: window.location.href } }, identityMap: identityMap() }
  if (eventType.includes('pageViews')) xdm.web.webPageDetails.pageViews = { value: 1 }
  if (action === 'productView') xdm.commerce = { productViews: { value: 1 } }
  if (action === 'addToCart') xdm.commerce = { productListAdds: { value: 1 } }
  if (action === 'removeFromCart') xdm.commerce = { productListRemovals: { value: 1 } }
  if (action === 'checkout') xdm.commerce = { checkouts: { value: 1 } }
  if (order) {
    xdm.commerce = { purchases: { value: 1 }, order: { purchaseID: order.purchaseId, priceTotal: order.total, currencyCode: 'INR' } }
  }
  if (products.length) xdm.productListItems = products.map((item) => {
    const priceBand = classifyPriceBand(item.finalUnitPrice)
    return { SKU: item.sku, name: item.name, quantity: item.quantity || 1, priceTotal: item.finalUnitPrice * (item.quantity || 1), currencyCode: 'INR', ...customFields(item), purchasePriceBand: priceBand }
  })
  if (order) xdm._orderSummary = { highestPriceBand: highestPriceBand(order.items.map((item) => classifyPriceBand(item.finalUnitPrice))) }
  return xdm
}
