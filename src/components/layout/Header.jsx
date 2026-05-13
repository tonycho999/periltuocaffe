import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-container" style={{ 
      borderBottom: '1px solid #eaeaea',
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div>
        <Link to="/">
          <img 
            src="/images/logo.png" 
            alt="Per il tuo caffe Logo" 
            style={{ height: '80px', objectFit: 'contain' }} 
          />
        </Link>
      </div>

      <nav className="header-nav">
        {/* ✨ Home 메뉴 추가 */}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/product" className="nav-link">Product</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}
