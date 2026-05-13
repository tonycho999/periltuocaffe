import { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

// Category definitions in English
const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'brand', name: 'By Brand' },
  { id: 'semi-auto', name: 'Semi-Auto Machines' },
  { id: 'manual', name: 'Manual Machines' },
  { id: 'auto', name: 'Fully Auto Machines' },
  { id: 'grinder', name: 'Grinders' },
  { id: 'blender', name: 'Blenders & Smoothies' },
  { id: 'coffee', name: 'Coffee Beans' }
];

export default function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Cloudflare D1
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 2. Category filtering logic
  useEffect(() => {
    if (activeCat === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCat));
    }
  }, [activeCat, products]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <main style={{ 
        flex: '1', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '60px 20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Title Area */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase' }}>Our Products</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>Discover our premium selection for the perfect coffee experience.</p>
        </div>

        {/* Category Menu */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          borderTop: '1px solid #eee', 
          borderBottom: '1px solid #eee',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{
                padding: '15px 25px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeCat === cat.id ? 'bold' : 'normal',
                color: activeCat === cat.id ? '#000' : '#888',
                borderBottom: activeCat === cat.id ? '2px solid #000' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product List Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '40px' 
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ 
                    overflow: 'hidden', 
                    backgroundColor: '#fff', 
                    marginBottom: '20px',
                    border: '1px solid #f0f0f0' 
                  }}>
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      style={{ 
                        width: '100%', 
                        height: '300px', 
                        objectFit: 'contain', 
                        transition: '0.4s' 
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', margin: '15px 0 5px' }}>{product.name}</h4>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.5' }}>
                    {product.description?.substring(0, 80)}...
                  </p>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', color: '#999' }}>
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
