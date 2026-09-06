import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import { trackEvent } from '../analytics/trackEvent'

export function Layout({ children }) {
  const { cart, customer, signIn, signOut } = useStore()
  const toggleIdentity = () => { if (customer) { signOut(); trackEvent({ name: 'syntheticLogout', eventType: 'userSession.logout', pageName: 'Global navigation' }) } else { signIn(); trackEvent({ name: 'syntheticLogin', eventType: 'userSession.login', pageName: 'Global navigation', details: { customerId: 'customer_1001' } }) } }
  return <div className="app-shell">
    <header className="site-header">
      <Link className="brand" to="/">SOLE<span>/</span>SPECTRUM</Link>
      <nav className="main-nav" aria-label="Primary navigation"><NavLink to="/products">Collection</NavLink><NavLink to="/about">Manifesto</NavLink><Link to="/cart" className="cart-link">Cart <b>{cart.reduce((sum, item) => sum + item.quantity, 0)}</b></Link></nav>
      <button className="identity-toggle" onClick={toggleIdentity} aria-label={customer ? 'Sign out synthetic customer' : 'Use synthetic customer identity'}>{customer ? 'customer_1001 · sign out' : 'guest · test identity'}</button>
    </header>
    {children}
    <footer className="site-footer"><span>SOLE/SPECTRUM</span><span>Made for moving through the day.</span><span>INR · Demo store</span></footer>
  </div>
}
