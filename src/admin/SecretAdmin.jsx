import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase'; 
import ProductAdd from './ProductAdd';
import ProductList from './ProductList';

export default function SecretAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 1단계: 화면상의 핀번호 확인 (사장님이 입력하실 PIN 번호 - 기존 1234)
    if (pin !== '1234') {
      alert('비밀번호가 틀렸습니다.');
      setPin('');
      return;
    }

    setLoading(true);
    try {
      // 2단계: 백그라운드에서 Firebase 실제 계정으로 자동 로그인
      // ✨ 비밀번호가 202604로 변경되었습니다!
      await signInWithEmailAndPassword(auth, 'a@a.com', '202604');
      setIsAuthenticated(true);
    } catch (error) {
      console.error("로그인 에러:", error);
      alert('관리자 인증에 실패했습니다. Firebase에 계정이 등록되어 있는지 확인해주세요.');
    } finally {
      setLoading(false);
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
            placeholder="PIN 입력"
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            {loading ? '인증 중...' : '접속'}
          </button>
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
