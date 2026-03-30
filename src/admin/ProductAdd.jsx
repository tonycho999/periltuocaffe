import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // 나중에 만들 firebase.js와 연결됩니다.

export default function ProductAdd() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('consumer');
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);

  // 📸 이미지 파일 용량 체크 및 Base64 변환
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 700KB = 716,800 bytes (Firestore 1MB 제한 대비 안전장치)
    if (file.size > 716800) {
      alert('🚨 사진 용량이 너무 큽니다! 700KB 이하의 사진을 올려주세요.\n(무료 이미지 압축 사이트를 이용해보세요)');
      e.target.value = ''; // 입력창 초기화
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // 변환된 텍스트 데이터를 저장
    };
    reader.readAsDataURL(file);
  };

  // 🔥 Firestore DB에 데이터 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageBase64) {
      return alert('제품 이름과 사진을 모두 입력해주세요.');
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        name,
        category,
        image: imageBase64,
        createdAt: new Date().toISOString()
      });
      
      alert('✅ 제품이 성공적으로 등록되었습니다!');
      setName('');
      setImageBase64('');
      // 파일 인풋 초기화를 위해 폼 리셋 유도
      e.target.reset(); 
    } catch (error) {
      console.error("업로드 에러:", error);
      alert('등록에 실패했습니다. 관리자에게 문의하세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
      <h3>➕ 새 제품 추가</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제품 분류</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px' }}>
            <option value="consumer">소비자용 (원두, 홈카페 용품)</option>
            <option value="commercial">상업용 (에스프레소 머신, 그라인더)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제품 이름</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="예: 과테말라 안티구아 원두 500g"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제품 사진 (700KB 이하)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          {imageBase64 && (
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '12px', color: 'green' }}>✓ 이미지 변환 완료</p>
              <img src={imageBase64} alt="미리보기" style={{ height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', backgroundColor: loading ? '#ccc' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          {loading ? '등록 중...' : '제품 등록하기'}
        </button>
      </form>
    </div>
  );
}
