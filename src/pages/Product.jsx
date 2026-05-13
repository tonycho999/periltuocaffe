import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'semi-auto', name: 'Semi-Auto Machines' },
  { id: 'manual', name: 'Manual Machines' },
  { id: 'auto', name: 'Fully Auto Machines' },
  { id: 'grinder', name: 'Grinders' },
  { id: 'blender', name: 'Blenders & Smoothies' },
  { id: 'coffee', name: 'Coffee Beans' }
];

export default function Product() {
  // ✨ 1. 헤더가 미리 저장한 제품 데이터를 가져옵니다.
  const cachedProductsStr = sessionStorage.getItem('products_cache');
  const initialProducts = cachedProductsStr ? JSON.parse(cachedProductsStr) : [];

  // ✨ 2. 캐시 데이터가 있으면 바로 초기값으로 사용!
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [activeCat, setActiveCat] = useState('all');
  
  // 캐시가 있으면 로딩 화면을 안 띄웁니다.
  const [loading, setLoading] = useState(!cachedProductsStr);
  const navigate = useNavigate();

  // ✨ 3. 조용히 최신 데이터를 확인해서 다르면 업데이트합니다.
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
        const data = await response.json();
        const newDataStr = JSON.stringify(data);
        
        // 캐시된 데이터와 DB 최신 데이터가 다를 때만 화면 갱신
        if (newDataStr !== cachedProductsStr) {
          setProducts(data);
          sessionStorage.setItem('products_cache', newDataStr);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 카테고리 필터링 로직
  useEffect(() => {
    if (activeCat === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCat));
    }
  }, [activeCat, products]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff' }}>
      
      {/* 🖼️ 상단 히어로 섹션 */}
      <section style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/periltuocaffe.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '45vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>
          Our Products
        </h1>
        <p style={{ fontSize: '18px', fontWeight: '300', letterSpacing: '1px' }}>
          Premium lineup for your coffee business.
        </p>
      </section>

      <main style={{ flex: '1', maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* 🔘 카테고리 필터 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '60px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{
                padding: '12px 24px', borderRadius: '30px',
                border: activeCat === cat.id ? 'none' : '1px solid #ddd',
                backgroundColor: activeCat === cat.id ? '#000' : '#fff', 
                color: activeCat === cat.id ? '#fff' : '#555',           
                cursor: 'pointer', fontSize: '14px', fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: activeCat === cat.id ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#888' }}>Loading products...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '50px 30px' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} style={{ textAlign: 'center', cursor: 'pointer', group: 'true' }}>
                  <div style={{ border: '1px solid #f0f0f0', marginBottom: '20px', overflow: 'hidden', backgroundColor: '#fdfdfd', borderRadius: '8px' }}>
                    <img 
                      src={product.image_url} alt={product.name} 
                      style={{ width: '100%', height: '320px', objectFit: 'contain', transition: 'transform 0.5s ease', padding: '20px' }} 
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <h4 style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '10px', color: '#222' }}>{product.name}</h4>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6', height: '44px', overflow: 'hidden' }}>
                    {product.description?.replace(/<[^>]*>?/gm, '').substring(0, 60)}...
                  </p>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', color: '#999', fontSize: '16px' }}>
                No products found in this category.
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
