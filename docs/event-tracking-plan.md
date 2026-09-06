# Event Tracking Plan

| Event | Trigger | Required data | Notes |
|---|---|---|---|
| `pageView` | route changes | page name, URL | Strict Mode guarded |
| `productClick` | product card click | product | not a purchaser |
| `productDetailView` | detail route | product | not a purchaser |
| `search` | non-empty search | query | interaction only |
| `filterInteraction` | category/band change | filter/value | interaction only |
| `addToCart` | add button | line item and selection | not a purchaser |
| `removeFromCart` | remove action | line item | not a purchaser |
| `cartView` | cart route | cart | available for extension |
| `checkoutInitiation` | continue checkout | cart | not a purchaser |
| `purchase` | order confirmation | purchase ID, all lines | only purchaser event |
| `syntheticLogin/logout` | identity toggle | synthetic ID | no email or ECID fabrication |

The event adapter returns `logged`, `sent`, or `error`. Adobe failures are reported to the console and never block checkout.
