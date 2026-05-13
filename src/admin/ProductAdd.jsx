import { useState } from 'react';

export default function ProductAdd() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('semi-auto'); // 기본값: 반자동 커피머신
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // 실제 파일 객체
  const [previewUrl, setPreviewUrl] = useState(''); // 미리보기용 URL
  const [loading, setLoading] = useState(false);

  // 📸 이미지 선택 및 미리보기 처리 로직
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 용량 제한 체크 (700KB)
    if (file.size > 716800) {
      alert('🚨 사진 용량이 너무 큽니다! 700KB 이하의 사진을 올려주세요.');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    
    // 화면 표시용 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ☁️ Cloudflare Worker로 데이터 전송 (D1 DB & R2 Storage)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !imageFile) {
      return alert('제품 이름, 상세 설명, 사진을 모두 입력해주세요.');
    }

    setLoading(true);

    // 파일을 포함한 데이터를 보내기 위해 FormData 사용
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', imageFile); // 'image'라는 키로 파일 전송

    try {
      // 사장님의 워커 API 주소 (POST 요청)
      const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev', {
        method: 'POST',
        body: formData, // JSON.stringify를 사용하지 않고 formData 그대로 전송
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('✅ 제품이 D1 DB와 R2 저장소에 성공적으로 등록되었습니다!');
        
        // 입력창 초기화
        setName('');
        setCategory('semi-auto');
        setDescription('');
        setImageFile(null);
        setPreviewUrl('');
        e.target.reset(); // 파일 입력 칸 초기화
      } else {
        throw new Error(result.error || '서버 응답 오류');
      }
    } catch (error) {
      console.error("업로드 에러:", error);
      alert('등록에 실패했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '40px auto', 
      padding: '30px', 
      backgroundColor: '#fff', 
      borderRadius: '12px', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>➕ 새 제품 등록</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 제품 분류 (요청하신 메뉴 구성 반영) */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>제품 분류</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' }}
          >
            <option value="brand">브랜드별 리스트</option>
            <option value="semi-auto">반자동 커피머신</option>
            <option value="manual">수동 커피머신</option>
            <option value="auto">전자동 커피머신</option>
            <option value="grinder">그라인더</option>
            <option value="blender">블렌더·스무디머신</option>
            <option value="coffee">원두</option>
          </select>
        </div>

        {/* 제품 이름 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>제품 이름</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="제품명을 입력하세요"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* 제품 상세 설명 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>제품 상세 설명</label>
          <textarea 
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="이미지 클릭 시 나타날 상세 정보를 입력하세요. (HTML 태그 지원)"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', lineHeight: '1.6', fontFamily: 'inherit' }}
          />
        </div>

        {/* 사진 업로드 영역 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>대표 이미지 (700KB 이하)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#f8f8f8', 
              border: '1px dashed #aaa', 
              borderRadius: '6px',
              cursor: 'pointer' 
            }}
          />
          {previewUrl && (
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#28a745', marginBottom: '8px' }}>✓ 미리보기</p>
              <img 
                src={previewUrl} 
                alt="미리보기" 
                style={{ maxWidth: '100%', height: '150px', borderRadius: '8px', objectFit: 'contain', border: '1px solid #eee' }} 
              />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '10px',
            padding: '15px', 
            backgroundColor: loading ? '#ccc' : '#333', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: loading ? 'default' : 'pointer',
            fontSize: '17px',
            fontWeight: 'bold',
            transition: '0.2s'
          }}
        >
          {loading ? '데이터 전송 중...' : '제품 등록하기'}
        </button>
      </form>
    </div>
  );
}
