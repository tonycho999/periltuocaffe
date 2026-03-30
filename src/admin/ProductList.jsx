import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // 나중에 만들 firebase.js와 연결됩니다.

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Firestore DB에서 제품 목록 불러오기
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // 최신 등록순으로 가져오기
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    } catch (error) {
      console.error("불러오기 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 화면에 나타날 때 한 번 실행
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ 제품 삭제 기능
  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 제품을 삭제하시겠습니까?')) return;
    
    try {
      await deleteDoc(doc(db, 'products', id));
      alert('🗑️ 삭제되었습니다.');
      fetchProducts(); // 목록 새로고침
    } catch (error) {
      console.error("삭제 에러:", error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <h3>📋 등록된 제품 목록</h3>
      <button onClick={fetchProducts} style={{ marginBottom: '15px', padding: '5px 10px', cursor: 'pointer' }}>
        🔄 목록 새로고침
      </button>

      {loading ? (
        <p>로딩 중...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#666' }}>등록된 제품이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {products.map((product) => (
            <li key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div>
                  <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>{product.category}</span>
                  <h4 style={{ margin: '5px 0 0 0' }}>{product.name}</h4>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(product.id)}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
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
