import { pushDataLayer } from './dataLayer'
import { sendToAdobe } from './adobeWebSdk'
import { buildXdmEvent } from './eventBuilder'

export async function trackEvent({ name, eventType, pageName, action, products = [], order, details = {} }) {
  const internalEvent = { event: name, timestamp: new Date().toISOString(), ...details, products, order }
  pushDataLayer(internalEvent)
  const xdm = buildXdmEvent({ eventType, pageName, action, products, order })
  const result = await sendToAdobe(xdm)
  window.__soleSpectrumLastAnalytics = { internalEvent, xdm, result }
  window.dispatchEvent(new CustomEvent('sole-spectrum-analytics', { detail: window.__soleSpectrumLastAnalytics }))
  return result
}
