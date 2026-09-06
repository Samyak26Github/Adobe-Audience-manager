import { describe, expect, it, beforeEach } from 'vitest'
import { classifyPriceBand, highestPriceBand } from '../utils/classifyPriceBand'
import { getCartDiscount, getCartSubtotal, getCartTotal } from '../utils/cart'
import { buildXdmEvent } from '../analytics/eventBuilder'
import { sendToAdobe } from '../analytics/adobeWebSdk'
import { buildPurchaseEventData, hasTrackedPurchase, markPurchaseTracked } from '../utils/purchaseTracking'
import { dispatchSoleSpectrumEvent } from '../analytics/dispatchSoleSpectrumEvent'

const item = { sku: 'SS-1', name: 'Test shoe', brand: 'Test', category: 'running', productTier: 'premium', originalUnitPrice: 7000, discountPercentage: 20, finalUnitPrice: 5600, quantity: 2, size: '8', color: 'Sage' }

describe('price bands', () => {
  it.each([[1999, 'budget'], [2000, 'mid_range'], [5999, 'mid_range'], [6000, 'premium']])('classifies %i as %s', (price, band) => expect(classifyPriceBand(price)).toBe(band))
  it('calculates highest value in a mixed order', () => expect(highestPriceBand(['budget', 'mid_range', 'premium'])).toBe('premium'))
})

describe('cart and purchase payloads', () => {
  it('calculates discounted totals', () => { const cart = [{ ...item }]; expect(getCartSubtotal(cart)).toBe(14000); expect(getCartTotal(cart)).toBe(11200); expect(getCartDiscount(cart)).toBe(2800) })
  it('preserves item price band in the XDM payload', () => { const xdm = buildXdmEvent({ eventType: 'commerce.purchases', pageName: 'Confirmation', products: [item], order: { purchaseId: 'SS-1', total: 11200, items: [item] } }); expect(xdm.commerce.order.purchaseID).toBe('SS-1'); expect(xdm.productListItems[0].purchasePriceBand).toBe('mid_range'); expect(xdm.productListItems[0]._YOUR_TENANT_NAMESPACE.shoe.purchasePriceBand).toBe('mid_range') })
})

describe('analytics safety', () => {
  beforeEach(() => localStorage.clear())
  it('falls back without alloy', async () => { const result = await sendToAdobe({ eventType: 'test' }); expect(result.status).toBe('logged'); expect(result.sent).toBe(false) })
  it('prevents a purchase from being tracked twice', () => { expect(hasTrackedPurchase('SS-1')).toBe(false); markPurchaseTracked('SS-1'); expect(hasTrackedPurchase('SS-1')).toBe(true) })
})

describe('browser custom events', () => {
  it('stores and dispatches the event payload', () => {
    let received
    window.addEventListener('soleSpectrumAddToCart', (event) => { received = event.detail }, { once: true })
    const result = dispatchSoleSpectrumEvent('soleSpectrumAddToCart', { quantity: 2, itemTotal: 11200 })
    expect(result).toBe(window.soleSpectrumEvent)
    expect(result.event).toBe('soleSpectrumAddToCart')
    expect(result.quantity).toBe(2)
    expect(result.itemTotal).toBe(11200)
    expect(received).toBe(result)
    expect(result.timestamp).toEqual(expect.any(String))
  })
  it('supports remove-from-cart payload fields', () => {
    const result = dispatchSoleSpectrumEvent('soleSpectrumRemoveFromCart', { removedQuantity: 1, removedItemTotal: 1899, removalType: 'full_removal' })
    expect(result.event).toBe('soleSpectrumRemoveFromCart')
    expect(result.removedQuantity).toBe(1)
    expect(result.removedItemTotal).toBe(1899)
    expect(result.removalType).toBe('full_removal')
  })
})

describe('purchase tracking safety', () => {
  beforeEach(() => localStorage.clear())
  it.each([[1999, 'budget'], [2000, 'mid_range'], [5999, 'mid_range'], [6000, 'premium']])('supports purchase price boundary %i as %s', (price, band) => {
    const data = buildPurchaseEventData({ purchaseId: 'SS-BOUNDARY', items: [{ ...item, finalUnitPrice: price, quantity: 1 }] }, '/confirmation')
    expect(data.products[0].purchasePriceBand).toBe(band)
  })
  it('prevents duplicate purchase events for the same purchase ID', () => {
    const purchaseId = 'SS-TEST-001'
    expect(hasTrackedPurchase(purchaseId)).toBe(false)
    markPurchaseTracked(purchaseId)
    expect(hasTrackedPurchase(purchaseId)).toBe(true)
  })
  it('calculates mixed-order totals and the highest purchase band', () => {
    const data = buildPurchaseEventData({ purchaseId: 'SS-MIXED', items: [{ ...item, finalUnitPrice: 1999, quantity: 2 }, { ...item, sku: 'SS-2', finalUnitPrice: 6000, quantity: 1 }] }, '/confirmation')
    expect(data.priceTotal).toBe(9998)
    expect(data.totalQuantity).toBe(3)
    expect(data.highestPriceBand).toBe('premium')
    expect(data.purchasePriceBand).toBe('premium')
    expect(data.products.map((product) => product.purchasePriceBand)).toEqual(['budget', 'premium'])
    expect(data.products[0].itemTotal).toBe(3998)
  })
  it('does not create a purchase payload for an empty order', () => { expect(buildPurchaseEventData({ purchaseId: 'SS-EMPTY', items: [] }, '/confirmation')).toBeNull() })
})
