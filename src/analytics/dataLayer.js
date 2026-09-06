export function initializeDataLayer() {
  window.adobeDataLayer = window.adobeDataLayer || []
  return window.adobeDataLayer
}

export function pushDataLayer(event) {
  const dataLayer = initializeDataLayer()
  dataLayer.push(event)
  window.__soleSpectrumLastEvent = event
  return event
}
