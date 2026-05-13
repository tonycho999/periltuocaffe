import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
        const data = await response.json();
        // ID가 일치하는 제품 찾기
        const found = data.find(p => String(p.id) === String(id));
        setProduct(found);
      } catch (error) {
        console.error("Detail load error:", error);
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
        <button onClick={() => navigate(-1)} style={{ marginBottom: '30px', cursor: 'pointer', padding: '10px 20px' }}>
          ← Back to List
        </button>

        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', border: '1px solid #eee' }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%' }} />
          </div>
          <div style={{ flex: '1.2', minWidth: '300px' }}>
            <p style={{ color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>{product.category}</p>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>{product.name}</h2>
            <div style={{ borderTop: '2px solid #000', paddingTop: '20px' }}>
              <p style={{ lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }} 
                 dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
