import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ☁️ Cloudflare D1에서 제품 목록 불러오기
  const fetchProducts = async () => {
    setLoading(true);
    try {
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

  // 🗑️ 제품 삭제 기능 (DB 삭제 + R2 이미지 삭제 요청)
  const handleDelete = async (product) => {
    if (!window.confirm(`[${product.name}] 제품을 삭제하시겠습니까?\n서버의 이미지 파일도 함께 삭제됩니다.`)) return;
    
    try {
      // 1. DB에서 제품 정보 삭제 (기존 로직)
      const response = await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 2. R2에서도 이미지 파일 삭제 (추가 보완)
        // 이미지 URL에서 파일명만 추출 (예: 17155...-image.jpg)
        const fileName = product.image_url.split('/').pop();
        
        await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/upload?file=${fileName}`, {
          method: 'DELETE',
        });

        alert('🗑️ 제품과 이미지가 모두 삭제되었습니다.');
        fetchProducts(); // 목록 새로고침
      } else {
        throw new Error('삭제 실패');
      }
    } catch (error) {
      console.error("삭제 에러:", error);
      alert('삭제 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>📋 등록된 제품 목록 ({products.length})</h3>
        <button 
          onClick={fetchProducts} 
          style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', fontSize: '13px' }}
        >
          🔄 새로고침
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '40px', border: '1px dashed #ccc' }}>등록된 제품이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {products.map((product) => (
            <li key={product.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '12px 15px', 
              backgroundColor: '#fff', 
              border: '1px solid #eee', 
              borderRadius: '8px',
              transition: '0.2s'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#fdfdfd', border: '1px solid #f0f0f0' }} 
                />
                <div>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>{product.category}</span>
                  <h4 style={{ margin: '3px 0 0 0', fontSize: '15px', color: '#333' }}>{product.name}</h4>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(product)} // 객체 전체를 전달하도록 수정
                style={{ 
                  backgroundColor: '#fff', 
                  color: '#ff4d4f', 
                  border: '1px solid #ff4d4f', 
                  padding: '6px 12px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 'bold'
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
