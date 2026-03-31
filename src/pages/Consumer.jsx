import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ui/ProductCard';
import Footer from '../components/layout/Footer';

export default function Consumer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsumerProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'), 
          where('category', '==', 'consumer')
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // 메모리 상에서 최신순 정렬 (Firestore 복합 인덱스 오류 방지)
        // Sort by newest in memory to prevent Firestore composite index errors
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumerProducts();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '10px' }}>Consumer</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px' }}>Premium coffee beans and equipment for your home cafe</p>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No products available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
