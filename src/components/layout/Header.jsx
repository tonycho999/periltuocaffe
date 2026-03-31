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
            style={{ height: '40px', objectFit: 'contain' }} 
          />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/consumer" className="nav-link">Consumer</Link>
        <Link to="/commercial" className="nav-link">Commercial</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}
