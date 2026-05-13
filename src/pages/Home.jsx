import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function Home() {
  // ✨ 저장된 홈 데이터를 꺼냅니다
  const cached = sessionStorage.getItem('home_cache');
  const [content, setContent] = useState(cached || '');
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(config => {
        if (config && config.home_data) {
          const html = typeof config.home_data === 'object' ? config.home_data.content : config.home_data;
          if (html !== content) {
            setContent(html);
            sessionStorage.setItem('home_cache', html || '');
          }
        }
      })
      .catch(error => console.error("Home load failed:", error))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
            Loading...
          </div>
        ) : (
          <div 
            className="home-content-render"
            dangerouslySetInnerHTML={{ __html: content || "<div style='padding: 100px; text-align: center;'>대시보드에서 홈 화면을 설정해 주세요.</div>" }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
