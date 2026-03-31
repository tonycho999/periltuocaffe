import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div>
      <section style={{ 
        height: '70vh', 
        backgroundImage: 'url(/images/hero-bg.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#333'
      }}>
        <div>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px 0', letterSpacing: '4px' }}>
            PER IL TUO CAFFE
          </h1>
          <p style={{ fontSize: '20px', letterSpacing: '2px', fontWeight: '300' }}>
            Everything for your perfect coffee
          </p>
        </div>
      </section>

      <section style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '80px 20px' }}>
        <Link to="/consumer" style={cardLinkStyle}>
          <h3>Consumer</h3>
          <p>Premium Beans & Home Cafe Accessories</p>
        </Link>
        <Link to="/commercial" style={cardLinkStyle}>
          <h3>Commercial</h3>
          <p>Professional Espresso Machines & Grinders</p>
        </Link>
        <Link to="/services" style={cardLinkStyle}>
          <h3>Services</h3>
          <p>B2B Installation & Maintenance</p>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

const cardLinkStyle = {
  textDecoration: 'none',
  color: '#333',
  padding: '40px',
  border: '1px solid #eaeaea',
  borderRadius: '8px',
  textAlign: 'center',
  width: '250px',
  transition: 'transform 0.3s'
};
