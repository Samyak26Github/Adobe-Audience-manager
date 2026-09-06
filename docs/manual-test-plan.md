# Manual Test Plan

- **Budget purchase**: buy Tide Runner; confirm item band `budget` and one purchase event.
- **Mid-range purchase**: buy Aero Pace; confirm `mid_range`.
- **Premium purchase**: buy Altitude Pro; confirm `premium`.
- **Mixed order**: buy one item from each band; confirm every item band and order highest band `premium`.
- **Discounted premium tier**: buy The Ledger; confirm product tier `mid_range` or `premium` remains separate and final price band is `mid_range`.
- **Cart only**: add a shoe, inspect data layer, abandon checkout; confirm no purchaser signal.
- **Refresh confirmation**: refresh the confirmation route; confirm the page remains and local tracking status stays once.
- **Anonymous purchase**: complete checkout as guest; confirm no synthetic identity appears in `identityMap`.
- **Synthetic purchase**: toggle `customer_1001`, complete checkout; confirm `ShoeStoreCustomerID` identity map entry.
- **Adobe unavailable**: keep `VITE_ADOBE_ENABLED=false`; confirm console payload and uninterrupted shopping.
- **Validation tools**: inspect `window.adobeDataLayer`, then use Debugger, Assurance, and Audience Manager Unused Signals after Adobe configuration.
