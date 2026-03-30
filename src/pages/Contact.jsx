import Footer from '../components/layout/Footer';

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', flexGrow: 1, textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Contact Us</h2>
        <p style={{ color: '#666', marginBottom: '40px' }}>
          제품 구매, 납품 문의, AS 접수 등 궁금한 점이 있으시면 언제든 연락 주세요.
        </p>

        <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '8px', display: 'inline-block', textAlign: 'left' }}>
          <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>📞 전화 문의:</strong> 02-1234-5678</p>
          <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>✉️ 이메일:</strong> contact@periltuocaffe.com</p>
          <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>🏢 운영 시간:</strong> 평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
