import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ☁️ 1. 제품 목록 불러오기
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
      if (!response.ok) throw new Error('목록을 불러오는데 실패했습니다.');
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("불러오기 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ 2. 제품 완벽 삭제 (DB + 이미지 모두 삭제)
  const handleDelete = async (product) => {
    if (!window.confirm(`[${product.name}] 제품을 정말 삭제하시겠습니까?\n서버의 이미지 파일도 함께 삭제됩니다.`)) return;
    
    try {
      // 1) DB에서 제품 정보 삭제
      const response = await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 2) R2 서버에서 썸네일 이미지 파일도 깔끔하게 삭제
        try {
          if (product.image_url) {
            const fileName = product.image_url.split('/').pop();
            await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/upload?file=${fileName}`, {
              method: 'DELETE',
            });
          }
        } catch (imgErr) {
          console.log("이미지는 서버에 없거나 이미 지워졌습니다.");
        }

        alert('🗑️ 제품이 완벽하게 삭제되었습니다.');
        fetchProducts(); // 목록 새로고침
        
        // 홈페이지 측 캐시(sessionStorage)도 지워야 즉시 반영됨
        sessionStorage.removeItem('all_data_cached');
        sessionStorage.removeItem('products_cache');
      } else {
        throw new Error('삭제 실패');
      }
    } catch (error) {
      console.error("삭제 에러:", error);
      alert('삭제 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>📋 등록된 제품 목록 ({products.length})</h2>
        <button 
          onClick={fetchProducts} 
          style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold' }}
        >
          🔄 목록 새로고침
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '50px', color: '#888' }}>데이터를 불러오는 중입니다...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '50px', border: '2px dashed #eee', borderRadius: '8px' }}>현재 등록된 제품이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {products.map((product) => (
            <li key={product.id} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '15px 20px', backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '8px'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }} 
                />
                <div>
                  <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', fontWeight: 'bold' }}>{product.category}</span>
                  <h4 style={{ margin: '5px 0 0 0', fontSize: '18px', color: '#222' }}>{product.name}</h4>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(product)}
                style={{ 
                  backgroundColor: '#fff', color: '#ff4d4f', border: '1px solid #ff4d4f', 
                  padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: '0.2s'
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#ff4d4f'; e.target.style.color = '#fff'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#ff4d4f'; }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
