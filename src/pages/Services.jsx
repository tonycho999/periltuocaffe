import Footer from '../components/layout/Footer';

export default function Services() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', flexGrow: 1 }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px' }}>Our Services</h2>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>🔧 머신 설치 및 캘리브레이션</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            새로운 머신 도입 시 전문가가 직접 방문하여 설치부터 최적의 커피 맛을 내기 위한 수온, 압력 캘리브레이션까지 완벽하게 세팅해 드립니다.
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>⚙️ 정기 유지보수 및 AS</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            카페 운영에 차질이 없도록 신속한 출장 수리 및 소모품 교체, 스케일링 등 정기적인 머신 관리 솔루션을 제공합니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
