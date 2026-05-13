import { useState, useEffect } from 'react';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'about', 'services'
  const [home, setHome] = useState({ content: '' }); // 일괄 수정을 위해 객체 구조 변경
  const [about, setAbout] = useState({ content: '' });
  const [services, setServices] = useState({ content: '' });
  
  const [uploadedImages, setUploadedImages] = useState([]); 
  const [loading, setLoading] = useState(false);

  // 1. 데이터 불러오기
  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => {
        // 기존에 title/subtitle로 저장된 데이터가 있어도 content로 안전하게 변환하여 가져옵니다.
        if (data.home_data) setHome(typeof data.home_data === 'object' && data.home_data.content ? data.home_data : { content: '' });
        if (data.about_data) setAbout(data.about_data);
        if (data.service_data) setServices(data.service_data);
      });
  }, []);

  // 📸 이미지 업로드 처리 (Worker의 /upload 경로 사용)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // ✨ 중요: 경로를 /upload로 변경하여 단독 업로드 처리
      const res = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      
      if (result.success) {
        const imageUrl = `https://periltuocaffe-api.tonycho999.workers.dev/images/${result.fileName}`;
        // 최신 이미지가 위로 오도록 추가
        setUploadedImages(prev => [imageUrl, ...prev]);
      }
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied!");
  };

  const saveSetting = async (key, value) => {
    setLoading(true);
    await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    setLoading(false);
    alert(`${key.replace('_data', '').toUpperCase()} Settings saved!`);
  };

  // 현재 활성화된 탭의 데이터와 상태 변경 함수 결정
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
              fontWeight: 'bold', textTransform: 'uppercase',
              borderBottom: activeTab === tab ? '3px solid #000' : 'none',
              color: activeTab === tab ? '#000' : '#aaa'
            }}
          >
            {tab === 'home' ? '🏠 Home' : tab === 'about' ? '📖 About Us' : '🛠️ Services'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* 왼쪽: HTML 일괄 편집 영역 */}
        <div style={{ flex: '1.5', minWidth: '400px' }}>
          <h3>{activeTab.toUpperCase()} Content (HTML)</h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
            Enter your HTML code here. Use images by copying URLs from the gallery on the right.
          </p>
          <textarea 
            rows="20" 
            value={currentData.content} 
            onChange={e => setCurrentData({ content: e.target.value })} 
            style={inputStyle} 
            placeholder={`Enter HTML for your ${activeTab} page...`} 
          />
          <button onClick={() => saveSetting(`${activeTab}_data`, currentData)} style={saveBtnStyle}>
            Save {activeTab.toUpperCase()} Settings
          </button>
        </div>

        {/* 오른쪽: 이미지 갤러리 */}
        <div style={{ flex: '1', minWidth: '300px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0 }}>🖼️ Image Gallery</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <input type="file" id="file-upload" onChange={handleImageUpload} style={{ display: 'none' }} />
            <label htmlFor="file-upload" style={uploadBtnStyle}>
              {loading ? 'Processing...' : '+ Upload Image'}
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {uploadedImages.map((url, index) => (
              <div key={index} style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                <img src={url} style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '10px', background: '#f0f0f0' }} alt="preview" />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input readOnly value={url} style={{ flex: 1, fontSize: '10px', padding: '5px' }} />
                  <button onClick={() => copyToClipboard(url)} style={copyBtnStyle}>Copy</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'monospace' };
const saveBtnStyle = { padding: '15px 24px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px' };
const uploadBtnStyle = { display: 'block', padding: '15px', backgroundColor: '#fff', textAlign: 'center', cursor: 'pointer', border: '2px dashed #ccc', fontWeight: 'bold', borderRadius: '4px' };
const copyBtnStyle = { padding: '5px 12px', backgroundColor: '#333', color: '#fff', border: 'none', fontSize: '12px', cursor: 'pointer', borderRadius: '3px' };
