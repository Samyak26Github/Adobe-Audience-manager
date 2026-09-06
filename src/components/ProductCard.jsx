import { Link } from 'react-router-dom'
import { formatINR } from '../utils/cart'
import { classifyPriceBand } from '../utils/classifyPriceBand'

export function ProductCard({ product, onClick }) {
  const band = classifyPriceBand(product.finalUnitPrice)
  return <article className="product-card"><Link to={`/products/${product.id}`} onClick={onClick}><div className="product-image-wrap"><img src={product.image} alt={product.name} /><span className={`band band-${band}`}>{band.replace('_', ' ')}</span></div><div className="product-card-info"><div><p className="product-brand">{product.brand} · {product.category}</p><h3>{product.name}</h3></div><div className="price"><strong>{formatINR(product.finalUnitPrice)}</strong>{product.discountPercentage > 0 && <del>{formatINR(product.originalUnitPrice)}</del>}</div></div></Link></article>
}
