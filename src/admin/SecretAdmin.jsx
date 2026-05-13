import { useState } from 'react';
import ProductAdd from './ProductAdd';
import ProductList from './ProductList';
import Setting from './Setting'; // 세팅 컴포넌트 임포트

export default function SecretAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // 'products' 또는 'settings'

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong PIN number.');
      setPin('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
        <h2>Admin Access</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Dashboard</h2>
        <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>

      {/* 탭 메뉴: 여기서 제품 관리와 사이트 설정을 전환합니다 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #eee' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ ...tabStyle, borderBottom: activeTab === 'products' ? '3px solid #000' : 'none' }}
        >
          Product Management
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{ ...tabStyle, borderBottom: activeTab === 'settings' ? '3px solid #000' : 'none' }}
        >
          Site Settings (Home/About)
        </button>
      </div>
      
      {/* 탭 내용 출력 */}
      {activeTab === 'products' ? (
        <>
          <ProductAdd />
          <hr style={{ margin: '40px 0', opacity: 0.2 }} />
          <ProductList />
        </>
      ) : (
        <Setting />
      )}
    </div>
  );
}

const tabStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold'
};
