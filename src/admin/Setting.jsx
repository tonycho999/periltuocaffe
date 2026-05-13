import { useState, useEffect } from 'react';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('home');
  const [home, setHome] = useState({ content: '' });
  const [about, setAbout] = useState({ content: '' });
  const [services, setServices] = useState({ content: '' });
  const [uploadedImages, setUploadedImages] = useState([]); 
  const [loading, setLoading] = useState(false);

  // ✨ 1. DB에서 저장된 데이터 불러와서 텍스트창에 채워넣기 (수정된 부분)
  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => {
        // Home 데이터 채우기
        if (data.home_data) {
          setHome(typeof data.home_data === 'object' ? data.home_data : { content: data.home_data });
        }
        // About 데이터 채우기
        if (data.about_data) {
          setAbout(typeof data.about_data === 'object' ? data.about_data : { content: data.about_data });
        }
        // Services 데이터 채우기 (service_data, services_data 둘 다 확인)
        const sData = data.services_data || data.service_data;
        if (sData) {
          setServices(typeof sData === 'object' ? sData : { content: sData });
        }
      })
      .catch(err => console.error("설정 불러오기 실패:", err));
  }, []);

  // 📸 이미지 갤러리 업로드
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
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
        setUploadedImages(prev => [imageUrl, ...prev]);
      }
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
      e.target.value = ''; // 같은 파일 다시 올릴 수 있게 초기화
    }
  };

  // 🗑️ 갤러리 이미지 삭제
  const deleteImage = async (url) => {
    if (!window.confirm("이미지를 서버에서 완전히 삭제하시겠습니까?")) return;
    const fileName = url.split('/').pop(); 
    try {
      const res = await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/upload?file=${fileName}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setUploadedImages(prev => prev.filter(img => img !== url));
      }
    } catch (err) {
      alert("삭제 실패");
    }
  };

  // 📋 URL 복사
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("이미지 주소가 복사되었습니다!");
  };

  // ☁️ 데이터 저장 (Home, About, Services)
  const saveSetting = async (key, value) => {
    setLoading(true);
    try {
      await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      });
      
      // ✨ 캐시 초기화 (헤더에서 저장한 임시 데이터를 지워서 즉시 반영되게 함)
      sessionStorage.removeItem('settings_cached');
      sessionStorage.removeItem('home_cache');
      sessionStorage.removeItem('about_cache');
      sessionStorage.removeItem('services_cache');
      
      alert(`✅ ${key.replace('_data', '').toUpperCase()} 설정이 저장되었습니다!`);
    } catch (error) {
      alert("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const currentData = activeTab === 'home' ? home : activeTab === 'about' ? about : services;
  const setCurrentData = activeTab === 'home' ? setHome : activeTab === 'about' ? setAbout : setServices;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      
      {/* 탭 메뉴 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #eee' }}>
        {['home', 'about', 'services'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '10px 20px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent',
              fontWeight: 'bold', textTransform: 'uppercase', fontSize: '15px',
              borderBottom: activeTab === tab ? '3px solid #000' : 'none',
              color: activeTab === tab ? '#000' : '#aaa'
            }}
          >
            {tab === 'home' ? '🏠 Home' : tab === 'about' ? '📖 About Us' : '🛠️ Services'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* 왼쪽: 텍스트 입력창 */}
        <div style={{ flex: '1.5', minWidth: '400px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>{activeTab.toUpperCase()} Content (HTML)</h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
            HTML 코드를 입력하세요. 이미지는 우측 갤러리에서 주소를 복사하여 넣을 수 있습니다.
          </p>
          <textarea 
            rows="22" 
            value={currentData.content || ''} 
            onChange={e => setCurrentData({ content: e.target.value })} 
            style={inputStyle} 
            placeholder={`${activeTab.toUpperCase()} 화면에 보여줄 내용을 입력하세요...`} 
          />
          <button onClick={() => saveSetting(`${activeTab}_data`, currentData)} style={saveBtnStyle} disabled={loading}>
            {loading ? '저장 중...' : `Save ${activeTab.toUpperCase()} Settings`}
          </button>
        </div>

        {/* 오른쪽: 이미지 갤러리 */}
        <div style={{ flex: '1', minWidth: '300px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxHeight: '85vh', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0 }}>🖼️ Gallery</h3>
          <div style={{ marginBottom: '20px' }}>
            <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <label htmlFor="file-upload" style={uploadBtnStyle}>
              {loading ? '업로드 중...' : '+ 이미지 업로드'}
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {uploadedImages.map((url, index) => (
              <div key={index} style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '8px', position: 'relative' }}>
                <button onClick={() => deleteImage(url)} style={deleteBtnStyle} title="삭제">&times;</button>
                <img src={url} style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '10px', background: '#f0f0f0', borderRadius: '4px' }} alt="preview" />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input readOnly value={url} style={{ flex: 1, fontSize: '10px', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  <button onClick={() => copyToClipboard(url)} style={copyBtnStyle}>Copy</button>
                </div>
              </div>
            ))}
            {uploadedImages.length === 0 && (
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', padding: '20px 0' }}>업로드된 이미지가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '15px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'monospace', lineHeight: '1.5' };
const saveBtnStyle = { padding: '15px 24px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px', borderRadius: '8px' };
const uploadBtnStyle = { display: 'block', padding: '15px', backgroundColor: '#fff', textAlign: 'center', cursor: 'pointer', border: '2px dashed #ccc', fontWeight: 'bold', borderRadius: '8px' };
const copyBtnStyle = { padding: '5px 12px', backgroundColor: '#333', color: '#fff', border: 'none', fontSize: '12px', cursor: 'pointer', borderRadius: '4px' };
const deleteBtnStyle = {
  position: 'absolute', top: '5px', right: '5px', width: '24px', height: '24px',
  borderRadius: '50%', backgroundColor: '#ff4d4f', color: 'white', border: 'none',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', zIndex: 1
};
