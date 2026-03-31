import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div>
      <section className="hero-section" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
        <div>
          <h1 className="hero-title">PER IL TUO CAFFE</h1>
          <p className="hero-subtitle">Everything for your perfect coffee</p>
        </div>
      </section>

      <section className="home-cards">
        <Link to="/consumer" className="card-link">
          <h3>Consumer</h3>
          <p style={{ marginTop: '10px' }}>Premium Beans & Home Cafe Accessories</p>
        </Link>
        <Link to="/commercial" className="card-link">
          <h3>Commercial</h3>
          <p style={{ marginTop: '10px' }}>Professional Espresso Machines & Grinders</p>
        </Link>
        <Link to="/services" className="card-link">
          <h3>Services</h3>
          <p style={{ marginTop: '10px' }}>B2B Installation & Maintenance</p>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
