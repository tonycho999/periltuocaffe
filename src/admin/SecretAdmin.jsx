import { useState } from 'react';
import ProductAdd from './ProductAdd';
import ProductList from './ProductList';

export default function SecretAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');

  // 🔒 설정된 비밀번호
  const SECRET_PIN = '1234';

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === SECRET_PIN) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
      setPin('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
        <h2>Per il tuo caffe 관리자 접속</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="비밀번호 입력"
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>접속</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>✅ 제품 관리 대시보드</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        제품을 추가하거나 삭제할 수 있습니다. (사진은 반드시 700KB 이하로 올려주세요)
      </p>
      
      {/* 제품 추가 폼 */}
      <ProductAdd />
      
      <hr style={{ margin: '40px 0', border: '1px solid #eee' }} />
      
      {/* 등록된 제품 목록 */}
      <ProductList />
    </div>
  );
}
