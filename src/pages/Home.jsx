import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { trackEvent } from '../analytics/trackEvent'

export function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4)
  return <main><section className="hero"><p className="eyebrow">A considered collection for every stride</p><h1>Find the colour<br />of your <em>movement.</em></h1><p className="hero-copy">Thoughtfully selected shoes, from first light runs to late-night plans.</p><Link className="button button-dark" to="/products">Explore the collection <span>↗</span></Link></section><section className="section-block"><div className="section-heading"><div><p className="eyebrow">01 / The edit</p><h2>Chosen for the<br /><em>everyday.</em></h2></div><Link to="/products" className="text-link">View all shoes ↗</Link></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} onClick={() => trackEvent({ name: 'productClick', eventType: 'web.webpagedetails.pageViews', action: 'productView', pageName: 'Home', products: [product] })} />)}</div></section><section className="bands-section"><p className="eyebrow">02 / Shop by feeling</p><div className="band-links"><Link to="/products?band=budget"><span>01</span><strong>Budget</strong><small>under INR 2,000</small><i>↗</i></Link><Link to="/products?band=mid_range"><span>02</span><strong>Mid-range</strong><small>INR 2,000 — 5,999</small><i>↗</i></Link><Link to="/products?band=premium"><span>03</span><strong>Premium</strong><small>INR 6,000 and up</small><i>↗</i></Link></div></section></main>
}
