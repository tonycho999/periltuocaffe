import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function About() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(config => {
        if (config && config.about_data) {
          // 객체{content:''} 형태와 일반 텍스트 모두 대응
          const html = typeof config.about_data === 'object' ? config.about_data.content : config.about_data;
          setContent(html);
        }
      }).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1', padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', marginBottom: '60px', textTransform: 'uppercase' }}>
          About Us
        </h2>
        {loading ? <div style={{ textAlign: 'center' }}>Loading...</div> : (
          <div 
            style={{ lineHeight: '2.0', fontSize: '18px', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: content || "Coming Soon..." }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
