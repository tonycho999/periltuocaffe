import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings');
        const config = await response.json();
        if (config && config.service_data) {
          setServices(config.service_data);
        }
      } catch (error) {
        console.error("서비스 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    /* 1. 전체 컨테이너를 Flexbox로 설정하고 최소 높이를 100vh로 잡습니다. */
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      
      {/* 2. 본문 영역에 flex: 1을 주어 남는 공간을 모두 차지하게 만듭니다. */}
      <main style={{ 
        flex: '1', 
        padding: '80px 20px', 
        maxWidth: '800px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px' }}>Our Services</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>로딩 중...</p>
        ) : (
          services.map((item, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ lineHeight: '1.6', color: '#555', marginTop: '10px', whiteSpace: 'pre-wrap' }}>
                {item.description}
              </p>
            </div>
          ))
        )}
      </main>

      {/* 3. 이제 푸터는 본문이 짧아도 무조건 화면 바닥으로 밀려납니다. */}
      <Footer />
    </div>
  );
}
