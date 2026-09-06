import { classifyPriceBand, highestPriceBand } from './classifyPriceBand'

const prefix = 'sole-spectrum-tracked-'
export function hasTrackedPurchase(purchaseId) { if (!purchaseId) return false; try { return Boolean(localStorage.getItem(`${prefix}${purchaseId}`)) } catch { return false } }
export function markPurchaseTracked(purchaseId) { if (!purchaseId) return; try { localStorage.setItem(`${prefix}${purchaseId}`, 'true') } catch (storageError) { void storageError } }
export function buildPurchaseEventData(order, pageURL) {
	if (!order?.purchaseId || !Array.isArray(order.items) || !order.items.length) return null
	const products = order.items.map((item) => {
		const originalUnitPrice = Number(item.originalUnitPrice)
		const discountPercentage = Number(item.discountPercentage)
		const finalUnitPrice = Number(item.finalUnitPrice)
		const quantity = Number(item.quantity)
		return { sku: item.sku, productName: item.name, brand: item.brand, category: item.category, productTier: item.productTier, originalUnitPrice, discountPercentage, finalUnitPrice, purchasePriceBand: classifyPriceBand(finalUnitPrice), currency: item.currency, quantity, selectedSize: item.size, selectedColor: item.color, itemTotal: finalUnitPrice * quantity }
	})
	const validProducts = products.every((item) => Object.values(item).every((value) => typeof value !== 'number' || Number.isFinite(value))) && products.every((item) => item.quantity > 0 && item.finalUnitPrice >= 0 && item.originalUnitPrice >= 0 && item.discountPercentage >= 0)
	if (!validProducts) return null
	const bands = products.map((item) => item.purchasePriceBand)
	const highestBand = highestPriceBand(bands)
	return { pageName: 'SoleSpectrum Order Confirmation', pageURL, purchaseID: order.purchaseId, currencyCode: 'INR', priceTotal: products.reduce((sum, item) => sum + item.itemTotal, 0), totalQuantity: products.reduce((sum, item) => sum + item.quantity, 0), highestPriceBand: highestBand, purchasePriceBand: highestBand, products }
}
