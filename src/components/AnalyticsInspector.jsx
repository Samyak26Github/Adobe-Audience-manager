import { useEffect, useState } from 'react'

export function AnalyticsInspector() {
  const [analytics, setAnalytics] = useState(() => window.__soleSpectrumLastAnalytics)
  useEffect(() => { const update = (event) => setAnalytics(event.detail); window.addEventListener('sole-spectrum-analytics', update); return () => window.removeEventListener('sole-spectrum-analytics', update) }, [])
  if (import.meta.env.PROD) return null
  return <aside className="analytics-inspector" aria-label="Development analytics inspector"><div className="inspector-heading"><span>Analytics / live</span><span className="live-dot" /></div><p>Adobe: <strong>{import.meta.env.VITE_ADOBE_ENABLED === 'true' ? 'configured' : 'demo mode'}</strong></p>{analytics ? <><p>Last event: <strong>{analytics.internalEvent.event}</strong></p><details><summary>Data layer object</summary><pre>{JSON.stringify(analytics.internalEvent, null, 2)}</pre></details><details><summary>XDM payload</summary><pre>{JSON.stringify(analytics.xdm, null, 2)}</pre></details><p>Status: <strong>{analytics.result.status}</strong></p></> : <p className="muted">Waiting for an interaction...</p>}</aside>
}
