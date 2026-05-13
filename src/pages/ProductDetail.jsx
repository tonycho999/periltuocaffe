import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function ProductDetail() {
  const { id } = useParams(); // URL에서 제품 ID 추출
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // 전체 목록을 가져와서 해당 ID만 찾거나, Worker에 단일 조회 API를 만들 수 있습니다.
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
        const data = await response.json();
        const found = data.find(p => String(p.id) === String(id));
        setProduct(found);
      } catch (error) {
        console.error("Failed to load product detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Product not found.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: '1', maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', width: '100%', boxSizing: 'border-box' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', backgroundColor: '#eee', border: 'none', borderRadius: '4px' }}
        >
          ← Back to List
        </button>

        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* 제품 이미지 영역 */}
          <div style={{ flex: '1', minWidth: '300px', border: '1px solid #eee' }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', display: 'block' }} />
          </div>

          {/* 제품 정보 영역 */}
          <div style={{ flex: '1.2', minWidth: '300px' }}>
            <span style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase' }}>{product.category}</span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 30px' }}>{product.name}</h2>
            
            <div style={{ borderTop: '2px solid #333', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', color: '#555' }}>Product Description</h4>
              <div 
                style={{ lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>
            
            <button 
              onClick={() => window.location.href = '/contact'}
              style={{ marginTop: '40px', width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Inquiry for Purchase
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
