export const PRICE_BANDS = ['budget', 'mid_range', 'premium']

export function classifyPriceBand(finalUnitPrice) {
  const price = Number(finalUnitPrice)
  if (!Number.isFinite(price) || price < 0) throw new Error('A valid non-negative price is required')
  if (price < 2000) return 'budget'
  if (price < 6000) return 'mid_range'
  return 'premium'
}

export function highestPriceBand(bands) {
  return bands.reduce((highest, band) => Math.max(highest, PRICE_BANDS.indexOf(band)), 0) >= 2 ? 'premium' : bands.includes('mid_range') ? 'mid_range' : 'budget'
}
