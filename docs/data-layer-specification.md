# Data Layer Specification

The application initializes `window.adobeDataLayer = window.adobeDataLayer || []`. Each entry has `event`, `timestamp`, and contextual fields. Product entries retain SKU, name, brand, category, merchandising tier, original price, final price, quantity, size, and colour. Purchase entries include `purchaseId`, order total, and item lines.

Example:

```js
{
  event: 'purchase',
  timestamp: '2026-09-06T12:00:00.000Z',
  order: { purchaseId: 'SS-ABC123', total: 11200 },
  products: [{ sku: 'SS-FRM-707', finalUnitPrice: 5599, purchasePriceBand: 'mid_range' }]
}
```

`src/analytics/trackEvent.js` is the only public tracking boundary. UI components do not call Alloy directly. `src/analytics/eventBuilder.js` maps the normalized object to XDM. Custom paths under `_${VITE_ADOBE_TENANT_NAMESPACE}.shoe` are placeholders, not production-ready schema paths.
