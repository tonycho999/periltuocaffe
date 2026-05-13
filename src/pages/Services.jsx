import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function Services() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(config => {
        if (config && config.service_data) {
          const html = typeof config.service_data === 'object' ? config.service_data.content : config.service_data;
          setContent(html);
        }
      }).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1', padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', marginBottom: '60px', textTransform: 'uppercase' }}>
          Our Services
        </h2>
        {loading ? <div style={{ textAlign: 'center' }}>Loading...</div> : (
          <div 
            style={{ lineHeight: '2.0', fontSize: '18px', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: content || "Service information will be updated soon." }} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
