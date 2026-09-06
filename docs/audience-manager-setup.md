# Audience Manager Setup

Verify the actual incoming signal names in Audience Manager's **Unused Signals** report before creating final production rules. The conceptual signals from the purchase payload are:

- `c_purchase_price_band = budget`
- `c_purchase_price_band = mid_range`
- `c_purchase_price_band = premium`

Traits:

1. **Shoe Store - Purchased Budget Shoe**: `c_purchase_price_band == "budget"`
2. **Shoe Store - Purchased Mid-Range Shoe**: `c_purchase_price_band == "mid_range"`
3. **Shoe Store - Purchased Premium Shoe**: `c_purchase_price_band == "premium"`

Segments use highest-value-wins logic:

- **Budget Customer**: budget trait exists; mid-range and premium traits do not exist.
- **Mid-Range Customer**: mid-range trait exists; premium trait does not exist.
- **Premium Customer**: premium trait exists.

A suggested lookback is 30 days. The final lookback and exclusion policy are business decisions. Confirm that the Web SDK-to-Audience Manager path and tenant mapping produce the expected signal before publishing.
