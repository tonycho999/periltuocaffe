import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function Services() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(config => {
        // ✨ 해결: DB에 services_data로 저장되어 있을 수도 있으므로 둘 다 안전하게 찾습니다.
        const serviceData = config.services_data || config.service_data;

        if (serviceData) {
          const html = typeof serviceData === 'object' ? serviceData.content : serviceData;
          setContent(html || '');
        }
      })
      .catch(err => console.error("데이터를 불러오지 못했습니다:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1', padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* ✨ 고정되어 있던 <h2>Our Services</h2> 제목을 지웠습니다. (대시보드의 HTML이 대신 출력됩니다) */}
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>Loading...</div>
        ) : (
          <div 
            style={{ lineHeight: '2.0', fontSize: '18px', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: content || "<p style='text-align:center;'>대시보드에서 서비스 내용을 등록해 주세요.</p>" }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
