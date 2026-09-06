export function dispatchSoleSpectrumEvent(eventName, eventData = {}) {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function' || typeof window.CustomEvent !== 'function') return

  window.soleSpectrumEvent = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData,
  }

  window.dispatchEvent(
    new window.CustomEvent(eventName, {
      detail: window.soleSpectrumEvent,
    }),
  )

  if (import.meta.env.DEV) console.log('[SoleSpectrum event]', window.soleSpectrumEvent)

  return window.soleSpectrumEvent
}