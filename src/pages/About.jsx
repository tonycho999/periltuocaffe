import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

export default function About() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings');
        const config = await response.json();
        
        // 데이터가 있을 경우 처리
        if (config && config.about_data) {
          // 관리자 페이지 저장 방식에 따라 데이터가 객체일 수도, 문자열일 수도 있음
          const rawData = config.about_data;
          const finalHtml = typeof rawData === 'object' ? rawData.content : rawData;
          setContent(finalHtml);
        }
      } catch (error) {
        console.error("Failed to load About Us data:", error);
        setContent("<p style='color:red;'>데이터를 불러오는 중 오류가 발생했습니다.</p>");
      } finally {
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <main style={{ 
        flex: '1', 
        padding: '80px 20px', 
        maxWidth: '900px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          marginBottom: '60px', 
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '3px'
        }}>
          About Us
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#999' }}>Loading...</div>
        ) : (
          <div 
            className="about-content-area"
            style={{ 
              lineHeight: '1.8', 
              fontSize: '17px', 
              color: '#444',
              textAlign: 'center'
            }}
            /* ⭐ 중요: dangerouslySetInnerHTML를 사용해야 HTML 태그가 작동합니다. */
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
