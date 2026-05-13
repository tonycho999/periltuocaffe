import { useState, useEffect } from 'react';

// 카테고리 정의 (이미지에 나온 메뉴 구조 참고)
const CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'brand', name: '브랜드별 리스트' },
  { id: 'semi-auto', name: '반자동 커피머신' },
  { id: 'manual', name: '수동 커피머신' },
  { id: 'auto', name: '전자동 커피머신' },
  { id: 'grinder', name: '그라인더' },
  { id: 'blender', name: '블렌더·스무디머신' },
  { id: 'coffee', name: '원두' }
];

export default function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [loading, setLoading] = useState(true);

  // 1. 데이터 불러오기 (D1 DB와 연결된 Worker 호출)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 2. 카테고리 필터링 로직
  useEffect(() => {
    if (activeCat === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCat));
    }
  }, [activeCat, products]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* 타이틀 영역 */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>제품 종류</h2>
        <p style={{ color: '#666' }}>Per il tuo caffe의 엄선된 라인업을 만나보세요.</p>
      </div>

      {/* 카테고리 메뉴 (이미지 레이아웃 참고) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        borderTop: '1px solid #eee', 
        borderBottom: '1px solid #eee',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            style={{
              padding: '15px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeCat === cat.id ? 'bold' : 'normal',
              color: activeCat === cat.id ? '#0056b3' : '#333',
              borderBottom: activeCat === cat.id ? '2px solid #0056b3' : 'none'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 제품 리스트 영역 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '30px' 
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ overflow: 'hidden', backgroundColor: '#f4f4f4', marginBottom: '15px' }}>
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{ width: '100%', transition: '0.3s' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <h4 style={{ fontSize: '16px', margin: '10px 0' }}>{product.name}</h4>
              <p style={{ fontSize: '13px', color: '#888' }}>{product.description.substring(0, 50)}...</p>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#999' }}>
            해당 카테고리에 등록된 제품이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
