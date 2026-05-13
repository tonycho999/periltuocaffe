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
        
        if (config && config.about_data) {
          setContent(config.about_data.content);
        }
      } catch (error) {
        console.error("Failed to load About Us data:", error);
        setContent("Information not found.");
      } finally {
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  return (
    /* 🛠️ 푸터 고정을 위한 레이아웃: 화면 전체 높이를 확보합니다. */
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      
      {/* 🛠️ 본문 영역: flex: 1을 주어 내용이 적어도 푸터를 바닥으로 밀어냅니다. */}
      <main style={{ 
        flex: '1', 
        padding: '80px 20px', 
        maxWidth: '1000px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Title */}
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          marginBottom: '50px', 
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          About Us
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>Loading...</div>
        ) : (
          <div 
            style={{ 
              lineHeight: '2.2', 
              fontSize: '18px', 
              color: '#333',
              whiteSpace: 'pre-wrap', // 관리자에서 입력한 줄바꿈 유지
              textAlign: 'center'    // 브랜드 이미지에 맞춰 중앙 정렬 추천
            }}
            // dangerouslySetInnerHTML을 사용하여 관리자 페이지에서 넣은 HTML 태그를 해석합니다.
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}
      </main>

      {/* 이제 본문이 비어있어도 푸터는 무조건 화면 맨 아래에 위치합니다. */}
      <Footer />
    </div>
  );
}
