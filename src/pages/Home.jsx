import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div>
      {/* 🌟 메인 히어로 배너 영역 */}
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
        backgroundColor: '#333' // 이미지가 없을 때를 대비한 기본 배경색
      }}>
        <div>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px 0', letterSpacing: '4px' }}>
            PER IL TUO CAFFE
          </h1>
          <p style={{ fontSize: '20px', letterSpacing: '2px', fontWeight: '300' }}>
            당신의 완벽한 커피를 위한 모든 것
          </p>
        </div>
      </section>

      {/* 🚀 빠른 링크 영역 */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '80px 20px' }}>
        <Link to="/consumer" style={cardLinkStyle}>
          <h3>Consumer</h3>
          <p>프리미엄 원두와 홈카페 용품</p>
        </Link>
        <Link to="/commercial" style={cardLinkStyle}>
          <h3>Commercial</h3>
          <p>전문가용 에스프레소 머신 및 그라인더</p>
        </Link>
        <Link to="/services" style={cardLinkStyle}>
          <h3>Services</h3>
          <p>B2B 설치 및 유지보수</p>
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
