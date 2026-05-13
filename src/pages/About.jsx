import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function About() {
  const cached = sessionStorage.getItem('about_cache');
  const [content, setContent] = useState(cached || '');
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(config => {
        if (config && config.about_data) {
          const html = typeof config.about_data === 'object' ? config.about_data.content : config.about_data;
          if (html !== content) {
            setContent(html);
            sessionStorage.setItem('about_cache', html);
          }
        }
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1', padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>Loading...</div>
        ) : (
          <div 
            style={{ lineHeight: '2.0', fontSize: '18px', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: content || "<p style='text-align:center;'>내용을 등록해 주세요.</p>" }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
