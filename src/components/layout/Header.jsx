import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 40px', 
      borderBottom: '1px solid #eaeaea',
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* 로고 영역 */}
      <div>
        <Link to="/">
          <img 
            src="/images/logo.png" 
            alt="Per il tuo caffe Logo" 
            style={{ height: '80px', objectFit: 'contain' }} 
            // 💡 로고 이미지가 없을 때를 대비한 대체 텍스트(alt) 속성입니다.
          />
        </Link>
      </div>

      {/* 메뉴 영역 */}
      <nav style={{ display: 'flex', gap: '30px' }}>
        <Link to="/consumer" style={linkStyle}>Consumer</Link>
        <Link to="/commercial" style={linkStyle}>Commercial</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </nav>
    </header>
  );
}

// 메뉴 링크 공통 스타일
const linkStyle = {
  textDecoration: 'none', 
  color: '#333', 
  fontWeight: '600',
  fontSize: '15px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase'
};
