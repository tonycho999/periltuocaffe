import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
  // DB에서 불러올 홈 화면 데이터 상태 관리
  const [data, setData] = useState({
    title: 'PER IL TUO CAFFE', // 기본값
    subtitle: 'Everything for your perfect coffee',
    hero_img: '/images/hero-bg.jpg'
  });
  const [loading, setLoading] = useState(true);

  // ☁️ Cloudflare Worker에서 설정값 불러오기
  useEffect(() => {
    async function fetchHomeSettings() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings');
        const config = await response.json();
        
        // DB에 home_data가 있으면 해당 값으로 업데이트
        if (config && config.home_data) {
          setData(config.home_data);
        }
      } catch (error) {
        console.error("홈 설정 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeSettings();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>로딩 중...</div>;

  return (
    <div>
      {/* 📸 관리자가 설정한 이미지와 텍스트가 반영되는 히어로 섹션 */}
      <section className="hero-section" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${data.hero_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
            {data.title}
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '20px' }}>
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* 🔗 주요 카테고리 링크 섹션 */}
      <section className="home-cards" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        padding: '60px 20px', 
        flexWrap: 'wrap' 
      }}>
        <Link to="/product" className="card-link" style={cardStyle}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Product</h3>
          <p style={{ color: '#666' }}>Premium Beans & Machines</p>
        </Link>
        
        <Link to="/services" className="card-link" style={cardStyle}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Services</h3>
          <p style={{ color: '#666' }}>B2B Installation & Maintenance</p>
        </Link>
        
        <Link to="/about" className="card-link" style={cardStyle}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>About Us</h3>
          <p style={{ color: '#666' }}>Our Story and Philosophy</p>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

// 간단한 카드 스타일
const cardStyle = {
  flex: '1',
  minWidth: '250px',
  maxWidth: '350px',
  padding: '40px 20px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  textDecoration: 'none',
  color: '#333',
  transition: 'transform 0.3s',
  border: '1px solid #eee'
};
