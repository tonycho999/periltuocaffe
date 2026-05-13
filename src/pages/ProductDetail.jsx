import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function ProductDetail() {
  const { id } = useParams(); // URL에서 제품 ID 가져오기
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 제품 전체 목록을 가져와서 해당 ID의 제품만 찾기
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/products')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p.id.toString() === id);
        setProduct(foundProduct);
      })
      .catch(err => console.error("제품 상세 로드 실패:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#888' }}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>제품을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/product')} style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>목록으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff' }}>
      
      {/* 본문 영역 */}
      <main style={{ 
        flex: '1', 
        maxWidth: '1200px', 
        margin: '60px auto', 
        padding: '0 20px', 
        width: '100%', 
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '60px',
        alignItems: 'flex-start'
      }}>
        
        {/* 📸 왼쪽: 제품 이미지 (크기 고정 적용) */}
        <div style={{ 
          flex: '1', 
          minWidth: '350px', 
          textAlign: 'center', 
          padding: '30px',
          backgroundColor: '#fdfdfd',
          border: '1px solid #f0f0f0',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src={product.image_url} 
            alt={product.name} 
            style={{ 
              maxWidth: '100%',     // 가로 폭은 화면을 넘지 않게
              maxHeight: '500px',   // ✨ 핵심! 상하 폭을 최대 500px로 제한 (크면 줄어듦)
              width: 'auto',        // 비율 유지
              height: 'auto',       // 비율 유지 (작은 이미지는 억지로 커지지 않음)
              objectFit: 'contain'  // 찌그러짐 방지
            }} 
          />
        </div>

        {/* 📝 오른쪽: 제품 정보 및 설명 */}
        <div style={{ flex: '1', minWidth: '350px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 20px 0', color: '#222', letterSpacing: '-0.5px' }}>
            {product.name}
          </h1>
          
          <hr style={{ border: 'none', borderTop: '2px solid #222', marginBottom: '30px', width: '50px' }} />

          {/* HTML 상세 설명 렌더링 */}
          <div 
            style={{ lineHeight: '1.8', fontSize: '16px', color: '#444' }}
            dangerouslySetInnerHTML={{ __html: product.description }} 
          />

          <button 
            onClick={() => navigate('/product')}
            style={{ 
              marginTop: '50px', 
              padding: '12px 25px', 
              backgroundColor: '#fff', 
              border: '1px solid #ccc', 
              borderRadius: '30px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#555'
            }}
          >
            ← Back to Products
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
