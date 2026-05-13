import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ☁️ Cloudflare D1에서 제품 목록 불러오기
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Worker 코드에서 설정한 /products 경로로 GET 요청
      const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
      if (!response.ok) throw new Error('목록을 불러오는데 실패했습니다.');
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("불러오기 에러:", error);
      alert('데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ 제품 삭제 기능
  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 제품을 삭제하시겠습니까?')) return;
    
    try {
      // DELETE 요청을 처리하도록 Worker API를 호출 (id를 함께 전송)
      const response = await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('🗑️ 삭제되었습니다.');
        fetchProducts(); // 목록 새로고침
      } else {
        throw new Error('삭제 실패');
      }
    } catch (error) {
      console.error("삭제 에러:", error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>📋 등록된 제품 목록 ({products.length})</h3>
        <button onClick={fetchProducts} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          🔄 새로고침
        </button>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>등록된 제품이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {products.map((product) => (
            <li key={product.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '15px', 
              backgroundColor: '#fff', 
              border: '1px solid #ddd', 
              borderRadius: '8px' 
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f9f9f9' }} 
                />
                <div>
                  <span style={{ fontSize: '11px', color: '#0056b3', fontWeight: 'bold' }}>{product.category}</span>
                  <h4 style={{ margin: '5px 0 0 0', fontSize: '16px' }}>{product.name}</h4>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(product.id)}
                style={{ 
                  backgroundColor: '#ff4d4f', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 12px', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
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
