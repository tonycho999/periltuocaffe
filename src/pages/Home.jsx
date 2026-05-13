import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
  // DB에서 불러올 홈 화면 데이터 상태 관리 (초기값 영어 설정)
  const [data, setData] = useState({
    title: 'PER IL TUO CAFFE',
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
        
        // DB에 home_data가 객체 형태로 들어있으므로 체크 후 반영
        if (config && config.home_data) {
          setData(config.home_data);
        }
      } catch (error) {
        console.error("Failed to load home settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeSettings();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px' }}>
      Loading...
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' // 화면 전체 높이 확보
    }}>
      {/* 본문 영역이 남는 공간을 모두 차지하도록 flex: 1 적용 */}
      <main style={{ flex: '1' }}>
        
        {/* 📸 히어로 섹션: DB에서 불러온 이미지와 텍스트 적용 */}
        <section className="hero-section" style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${data.hero_img})`,
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
            <h1 className="hero-title" style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {data.title}
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '22px', fontWeight: '300' }}>
              {data.subtitle}
            </p>
          </div>
        </section>

        {/* 🔗 카테고리 링크 섹션 */}
        <section className="home-cards" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          padding: '80px 20px', 
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Link to="/product" className="card-link" style={cardStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>Product</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Premium Beans &<br/>Professional Machines</p>
          </Link>
          
          <Link to="/services" className="card-link" style={cardStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>Services</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>B2B Installation &<br/>Technical Support</p>
          </Link>
          
          <Link to="/about" className="card-link" style={cardStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>About Us</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Our Story and<br/>Coffee Philosophy</p>
          </Link>
        </section>
      </main>

      {/* 푸터가 항상 화면 맨 아래에 위치하게 됩니다. */}
      <Footer />
    </div>
  );
}

// 카드 디자인 스타일
const cardStyle = {
  flex: '1',
  minWidth: '280px',
  maxWidth: '350px',
  padding: '60px 30px',
  textAlign: 'center',
  backgroundColor: '#fff',
  borderRadius: '0px', // 더 모던한 느낌을 위해 사각형 유지
  textDecoration: 'none',
  color: '#333',
  transition: 'all 0.3s ease',
  border: '1px solid #eee',
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
};
