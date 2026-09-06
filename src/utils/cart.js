export function getCartSubtotal(cart) { return cart.reduce((sum, item) => sum + item.originalUnitPrice * item.quantity, 0) }
export function getCartTotal(cart) { return cart.reduce((sum, item) => sum + item.finalUnitPrice * item.quantity, 0) }
export function getCartDiscount(cart) { return getCartSubtotal(cart) - getCartTotal(cart) }
export function formatINR(value) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value) }
export function cartKey(productId, size, color) { return `${productId}::${size}::${color}` }
