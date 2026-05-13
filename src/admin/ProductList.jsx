import { useState } from 'react';

export default function ProductAdd() {
  // --- 기존 폼 상태 관리 ---
  const [name, setName] = useState('');
  const [category, setCategory] = useState('semi-auto'); // 기본값: 반자동
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // 썸네일(대표) 이미지
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // --- 추가된 갤러리 상태 관리 ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  // 📸 대표 이미지(썸네일) 선택 로직
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 716800) {
      alert('🚨 대표 이미지 용량이 너무 큽니다! 700KB 이하의 사진을 올려주세요.');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  // ☁️ 제품 등록 (POST /)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !imageFile) {
      return alert('제품 이름, 상세 설명, 대표 이미지를 모두 입력해주세요.');
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', imageFile); 

    try {
      const response = await fetch('https://periltuocaffe-api.tonycho999.workers.dev', {
        method: 'POST',
        body: formData, 
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('✅ 제품이 성공적으로 등록되었습니다!');
        
        // 초기화
        setName('');
        setCategory('semi-auto');
        setDescription('');
        setImageFile(null);
        setPreviewUrl('');
        e.target.reset(); 
        
        // 페이지 새로고침하여 목록 갱신 유도
        window.location.reload();
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

  // 🖼️ 갤러리 이미지 업로드 (POST /upload)
  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGalleryLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      
      if (result.success) {
        const imageUrl = `https://periltuocaffe-api.tonycho999.workers.dev/images/${result.fileName}`;
        setGalleryImages(prev => [imageUrl, ...prev]);
      }
    } catch (err) {
      alert("갤러리 업로드에 실패했습니다.");
    } finally {
      setGalleryLoading(false);
      e.target.value = ''; // 입력창 초기화
    }
  };

  // 🗑️ 갤러리 이미지 삭제 (DELETE /upload)
  const deleteGalleryImage = async (url) => {
    if (!window.confirm("이 이미지를 서버에서 영구 삭제하시겠습니까?")) return;
    const fileName = url.split('/').pop();
    
    try {
      await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/upload?file=${fileName}`, {
        method: 'DELETE',
      });
      setGalleryImages(prev => prev.filter(img => img !== url));
    } catch (err) {
      alert("이미지 삭제 실패");
    }
  };

  // 📋 URL 복사
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("이미지 주소가 복사되었습니다! 상세 설명(HTML) 칸에 붙여넣으세요.");
  };

  return (
    <div style={{ margin: '40px auto', display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      
      {/* 🔴 왼쪽: 제품 등록 폼 */}
      <div style={{ 
        flex: '1.5', minWidth: '400px', padding: '30px', 
        backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>➕ 새 제품 등록</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={labelStyle}>제품 분류</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
              <option value="semi-auto">반자동 커피머신</option>
              <option value="manual">수동 커피머신</option>
              <option value="auto">전자동 커피머신</option>
              <option value="grinder">그라인더</option>
              <option value="blender">블렌더·스무디머신</option>
              <option value="coffee">원두</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>제품 이름</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="제품명을 입력하세요" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>제품 상세 설명 (HTML)</label>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '-5px', marginBottom: '10px' }}>
              오른쪽 갤러리에서 이미지 주소를 복사한 뒤, &lt;img src="복사한주소" /&gt; 태그를 사용해 보세요.
            </p>
            <textarea 
              rows="10" value={description} onChange={(e) => setDescription(e.target.value)} 
              placeholder="예: <img src='주소' style='width:100%;' /><br><p>최고의 커피머신입니다.</p>" 
              style={{ ...inputStyle, fontFamily: 'monospace', lineHeight: '1.5' }} 
            />
          </div>

          <div>
            <label style={labelStyle}>대표 썸네일 이미지 (700KB 이하)</label>
            <input type="file" accept="image/*" onChange={handleMainImageChange} style={fileInputStyle} />
            {previewUrl && (
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#28a745', marginBottom: '8px' }}>✓ 미리보기</p>
                <img src={previewUrl} alt="미리보기" style={{ maxWidth: '100%', height: '150px', borderRadius: '8px', objectFit: 'contain', border: '1px solid #eee' }} />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} style={submitBtnStyle(loading)}>
            {loading ? '등록 중...' : '제품 등록하기'}
          </button>
        </form>
      </div>

      {/* 🔵 오른쪽: 상세 설명용 갤러리 */}
      <div style={{ 
        flex: '1', minWidth: '300px', padding: '20px', 
        backgroundColor: '#f9f9f9', borderRadius: '12px', border: '1px solid #eee'
      }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>🖼️ 상세 설명용 갤러리</h3>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
          상세 설명란에 넣을 추가 이미지들을 여기에 업로드하고 주소를 복사하세요.
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <input type="file" id="gallery-upload" accept="image/*" onChange={handleGalleryUpload} style={{ display: 'none' }} />
          <label htmlFor="gallery-upload" style={{ ...fileInputStyle, textAlign: 'center', fontWeight: 'bold' }}>
            {galleryLoading ? '업로드 중...' : '+ 추가 이미지 업로드'}
          </label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
          {galleryImages.map((url, index) => (
            <div key={index} style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', position: 'relative' }}>
              <button 
                onClick={() => deleteGalleryImage(url)}
                style={deleteBtnStyle}
                title="삭제"
              >&times;</button>
              
              <img src={url} style={{ width: '100%', height: '100px', objectFit: 'contain', marginBottom: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} alt="gallery" />
              
              <div style={{ display: 'flex', gap: '5px' }}>
                <input readOnly value={url} style={{ flex: 1, fontSize: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
                <button onClick={() => copyToClipboard(url)} style={copyBtnStyle}>복사</button>
              </div>
            </div>
          ))}
          {galleryImages.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#999', padding: '20px 0' }}>업로드된 추가 이미지가 없습니다.</p>
          )}
        </div>
      </div>

    </div>
  );
}

// --- 스타일 정의 ---
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '15px' };
const fileInputStyle = { display: 'block', width: '100%', padding: '15px', backgroundColor: '#fff', border: '2px dashed #aaa', borderRadius: '6px', cursor: 'pointer', boxSizing: 'border-box' };
const submitBtnStyle = (loading) => ({
  marginTop: '10px', padding: '15px', backgroundColor: loading ? '#ccc' : '#222', color: '#fff',
  border: 'none', borderRadius: '6px', cursor: loading ? 'default' : 'pointer', fontSize: '17px', fontWeight: 'bold'
});
const copyBtnStyle = { padding: '5px 12px', backgroundColor: '#333', color: '#fff', border: 'none', fontSize: '12px', cursor: 'pointer', borderRadius: '4px' };
const deleteBtnStyle = {
  position: 'absolute', top: '5px', right: '5px', width: '22px', height: '22px',
  borderRadius: '50%', backgroundColor: '#ff4d4f', color: '#fff', border: 'none',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', zIndex: 1
};
