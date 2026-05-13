import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function About() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => setContent(data.about_data.content));
  }, []);

  return (
    <div>
      <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>About Us</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} style={{ lineHeight: '1.8' }} />
      </main>
      <Footer />
    </div>
  );
}
