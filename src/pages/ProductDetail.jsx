import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ✨ 이미지 확대(Zoom) 상태 관리
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
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
      
      <main style={{ flex: '1', maxWidth: '1000px', margin: '60px auto', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* ⬆️ 상단 영역: 왼쪽(이미지) + 오른쪽(기본 정보) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'flex-start' }}>
          
          {/* 📸 왼쪽: 제품 이미지 (크기 고정) & 확대 버튼 */}
          <div style={{ 
            width: '100%', maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' 
          }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '1 / 1', // 완벽한 정사각형 비율 유지
              backgroundColor: '#fdfdfd',
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              padding: '20px',
              boxSizing: 'border-box'
            }}>
              <img 
                src={product.image_url} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            {/* 확대 버튼 */}
            <button 
              onClick={() => setIsZoomed(true)}
              style={{ 
                padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', 
                cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#555', transition: '0.2s',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#ccc'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#ddd'; }}
            >
              🔍 크게 보기 (Zoom)
            </button>
          </div>

          {/* 📝 오른쪽: 카테고리 및 제품명 */}
          <div style={{ flex: '1', minWidth: '300px', paddingTop: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '15px 0 25px 0', color: '#222', letterSpacing: '-0.5px' }}>
              {product.name}
            </h1>
            
            <hr style={{ border: 'none', borderTop: '2px solid #222', width: '50px', marginLeft: 0 }} />
          </div>
          
        </div>

        {/* ⬇️ 하단 영역: 상세 설명 (가로폭 전체 사용) */}
        <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>제품 상세 설명</h3>
          
          <div 
            style={{ lineHeight: '1.8', fontSize: '16px', color: '#444', width: '100%' }}
            dangerouslySetInnerHTML={{ __html: product.description }} 
          />
        </div>

        {/* 돌아가기 버튼 */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/product')}
            style={{ padding: '12px 30px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}
          >
            ← Back to Products
          </button>
        </div>

      </main>

      <Footer />

      {/* ✨ 모달(팝업): 이미지 크게 보기 */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, 
            display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out'
          }}
        >
          <img 
            src={product.image_url} 
            alt="Zoomed" 
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }} 
          />
          {/* 닫기 버튼 */}
          <button 
            onClick={() => setIsZoomed(false)}
            style={{ position: 'absolute', top: '30px', right: '40px', background: 'none', border: 'none', color: '#fff', fontSize: '40px', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>
      )}

    </div>
  );
}
