# XDM Field Mapping

| Application value | XDM demonstration path |
|---|---|
| event name/type | `eventType` |
| page URL/name | `web.webPageDetails.URL`, `web.webPageDetails.name` |
| page view | `web.webPageDetails.pageViews.value` |
| product view | `commerce.productViews.value` |
| add/remove | `commerce.productListAdds.value`, `commerce.productListRemovals.value` |
| checkout | `commerce.checkouts.value` |
| purchase | `commerce.purchases.value` |
| order ID/total/currency | `commerce.order.purchaseID`, `priceTotal`, `currencyCode` |
| line item | `productListItems[].SKU`, `name`, `quantity`, `priceTotal`, `currencyCode` |
| purchase band | `productListItems[].purchasePriceBand` and placeholder tenant shoe field |
| synthetic identity | `identityMap[ShoeStoreCustomerID][]` |

The custom shoe fields are illustrative: brand, category, productTier, color, size, originalUnitPrice, finalUnitPrice, discountPercentage, and purchasePriceBand. Create and validate the matching custom field group in the target AEP sandbox before changing `VITE_ADOBE_TENANT_NAMESPACE`.
