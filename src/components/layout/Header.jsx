import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

  // ✨ 사이트에 접속하자마자 모든 데이터를 미리 불러와 브라우저에 저장
  useEffect(() => {
    if (!sessionStorage.getItem('all_data_cached')) {
      
      // 1. Home, About, Services 설정 데이터 불러오기
      fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
        .then(res => res.json())
        .then(config => {
          if (config.home_data) sessionStorage.setItem('home_cache', typeof config.home_data === 'object' ? config.home_data.content : config.home_data);
          if (config.about_data) sessionStorage.setItem('about_cache', typeof config.about_data === 'object' ? config.about_data.content : config.about_data);
          
          const serviceData = config.services_data || config.service_data;
          if (serviceData) sessionStorage.setItem('services_cache', typeof serviceData === 'object' ? serviceData.content : serviceData);
        })
        .catch(err => console.error("Settings Prefetch error:", err));

      // 2. ☕ 제품(Product) 전체 목록 불러오기
      fetch('https://periltuocaffe-api.tonycho999.workers.dev/products')
        .then(res => res.json())
        .then(data => {
          // 배열 데이터는 문자로 변환(JSON.stringify)해서 저장해야 합니다.
          sessionStorage.setItem('products_cache', JSON.stringify(data));
        })
        .catch(err => console.error("Products Prefetch error:", err));

      // 두 개 모두 요청을 보냈으니 완료 표시
      sessionStorage.setItem('all_data_cached', 'true');
    }
  }, []);

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
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/product" className="nav-link">Product</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}
