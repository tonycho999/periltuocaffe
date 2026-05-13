import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function Home() {
  // 이제 개별 필드가 아닌 content 하나로 관리합니다.
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings');
        const config = await response.json();
        
        if (config && config.home_data) {
          // 데이터가 객체 { content: "..." } 형태면 추출, 아니면 문자열 그대로 사용
          const html = typeof config.home_data === 'object' ? config.home_data.content : config.home_data;
          setContent(html || '');
        }
      } catch (error) {
        console.error("Home load failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
            Loading...
          </div>
        ) : (
          /* ⭐ 대시보드에서 작성한 HTML이 이 자리에 그대로 나타납니다. */
          <div 
            className="home-content-render"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
