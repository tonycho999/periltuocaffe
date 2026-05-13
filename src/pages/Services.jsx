import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function Services() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServiceData() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings');
        const config = await response.json();
        
        if (config && config.service_data) {
          // 데이터가 객체({content: '...'})면 content를 추출, 아니면 통째로 사용
          const finalHtml = typeof config.service_data === 'object' ? config.service_data.content : config.service_data;
          setContent(finalHtml);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServiceData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1', padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '50px' }}>Our Services</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading...</div>
        ) : (
          <div 
            style={{ lineHeight: '1.8', fontSize: '18px' }}
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
