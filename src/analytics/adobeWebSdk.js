export async function sendToAdobe(xdm) {
  const enabled = import.meta.env.VITE_ADOBE_ENABLED === 'true'
  const debug = import.meta.env.VITE_ADOBE_DEBUG !== 'false'
  const alloy = typeof window !== 'undefined' ? window.alloy : undefined
  const result = { status: 'logged', sent: false, enabled, xdm }
  if (!enabled || typeof alloy !== 'function') {
    if (debug) console.info('[SoleSpectrum demo] Adobe Web SDK payload', xdm)
    return result
  }
  try {
    await alloy('sendEvent', { xdm })
    return { ...result, status: 'sent', sent: true }
  } catch (error) {
    console.warn('[SoleSpectrum] Adobe sendEvent failed; shopping continues.', error)
    return { ...result, status: 'error', error: error.message }
  }
}
