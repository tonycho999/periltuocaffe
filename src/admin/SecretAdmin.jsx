import { useState } from 'react';
import ProductAdd from './ProductAdd';
import ProductList from './ProductList';

export default function SecretAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 핀번호 확인 (사장님 전용 PIN)
    if (pin === '1234') { // 원하시는 번호로 수정 가능
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
      setPin('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
        <h2>☕ Per il tuo caffe 관리자 접속</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN 입력"
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>
            접속
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#333' }}>✅ 제품 관리 대시보드</h2>
        <button onClick={() => setIsAuthenticated(false)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#eee', border: '1px solid #ccc' }}>로그아웃</button>
      </div>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        제품 정보를 관리합니다. (사진은 Cloudflare R2에 저장됩니다)
      </p>
      
      {/* 제품 추가 폼 */}
      <ProductAdd />
      
      <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #eee' }} />
      
      {/* 등록된 제품 목록 */}
      <ProductList />
    </div>
  );
}
