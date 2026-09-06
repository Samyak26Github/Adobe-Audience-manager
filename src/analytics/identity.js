const CUSTOMER_NAMESPACE = import.meta.env.VITE_ADOBE_CUSTOMER_NAMESPACE || 'ShoeStoreCustomerID'

export function getIdentity() {
  const customerId = localStorage.getItem('sole-spectrum-customer')
  return customerId ? { customerId, namespace: CUSTOMER_NAMESPACE } : null
}

export function identityMap() {
  const identity = getIdentity()
  return identity ? { [identity.namespace]: [{ id: identity.customerId, authenticatedState: 'authenticated', primary: true }] } : undefined
}

export function setSyntheticCustomer(customerId) { localStorage.setItem('sole-spectrum-customer', customerId) }
export function clearSyntheticCustomer() { localStorage.removeItem('sole-spectrum-customer') }
