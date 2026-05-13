import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
  const [data, setData] = useState({
    title: 'PER IL TUO CAFFE',
    subtitle: 'Everything for your perfect coffee',
    hero_img: '/images/hero-bg.jpg'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeSettings() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings');
        const config = await response.json();
        if (config && config.home_data) {
          setData(config.home_data);
        }
      } catch (error) {
        console.error("Home load failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeSettings();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1' }}>
        {/* 📸 Hero Section: Dynamic Data from DB */}
        <section className="hero-section" style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${data.hero_img}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '65vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>
              {data.title}
            </h1>
            <p style={{ fontSize: '22px', fontWeight: '300' }}>{data.subtitle}</p>
          </div>
        </section>

        {/* 🔗 Category Cards */}
        <section style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '80px 20px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/product" style={cardStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Product</h3>
            <p style={{ color: '#666' }}>Premium Beans & Machines</p>
          </Link>
          <Link to="/services" style={cardStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Services</h3>
            <p style={{ color: '#666' }}>B2B Installation & Support</p>
          </Link>
          <Link to="/about" style={cardStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>About Us</h3>
            <p style={{ color: '#666' }}>Our Story and Philosophy</p>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const cardStyle = {
  flex: '1', minWidth: '280px', maxWidth: '350px', padding: '60px 30px', textAlign: 'center',
  backgroundColor: '#fff', textDecoration: 'none', color: '#333', border: '1px solid #eee', transition: '0.3s'
};
