import { useState } from 'react';
// Cloudflare DB(D1 등)를 연동할 경우 보통 API(fetch)를 통해 통신하므로 firebase import는 추후 제거하게 됩니다.
// import { db } from '../firebase'; 

export default function ProductAdd() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('consumer');
  const [description, setDescription] = useState(''); // 📝 제품 설명 추가
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);

  // 📸 이미지 처리 로직 (이전과 동일)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 716800) {
      alert('🚨 사진 용량이 너무 큽니다! 700KB 이하로 올려주세요.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  // ☁️ Cloudflare DB 연동을 위한 전송 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !imageBase64) {
      return alert('제품 이름, 설명, 사진을 모두 입력해주세요.');
    }

    setLoading(true);

    try {
      /** * [Cloudflare 전환 포인트] 
       * Firestore 대신 Cloudflare Worker 에 설정한 API 주소로 보냅니다.
       */
      const response = await fetch('https://your-worker-api.workers.dev/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          description, // HTML이나 마크다운 텍스트
          image: imageBase64,
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('✅ Cloudflare DB에 등록 완료!');
        setName('');
        setCategory('consumer');
        setDescription('');
        setImageBase64('');
        e.target.reset();
      } else {
        throw new Error('전송 실패');
      }
    } catch (error) {
      console.error("업로드 에러:", error);
      alert('등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
      <h3>➕ 새 제품 추가 (Cloudflare DB)</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* 분류 선택 */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제품 분류</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px' }}>
            <option value="consumer">소비자용 (원두, 홈카페 용품)</option>
            <option value="commercial">상업용 (머신, 그라인더)</option>
            <option value="services">서비스 (A/S, 컨설팅)</option>
          </select>
        </div>

        {/* 제품 이름 */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제품 이름</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="제품명을 입력하세요"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

        {/* 제품 설명 (텍스트 + 이미지 태그 가능) */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제품 상세 설명</label>
          <textarea 
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="제품에 대한 상세 설명을 입력하세요. (HTML 태그를 사용하여 이미지를 삽입할 수도 있습니다)"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
          <p style={{ fontSize: '12px', color: '#666' }}>
            * 팁: 이미지 주소가 있다면 &lt;img src="주소" /&gt; 형태로 넣을 수 있습니다.
          </p>
        </div>

        {/* 메인 대표 사진 */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>대표 이미지 (700KB 이하)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          {imageBase64 && (
            <div style={{ marginTop: '10px' }}>
              <img src={imageBase64} alt="미리보기" style={{ height: '100px', borderRadius: '4px' }} />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', backgroundColor: loading ? '#ccc' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? '데이터 전송 중...' : '제품 등록하기'}
        </button>
      </form>
    </div>
  );
}
