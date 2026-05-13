import { useState, useEffect } from 'react';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'about', 'services'
  const [home, setHome] = useState({ title: '', subtitle: '', hero_img: '' });
  const [about, setAbout] = useState({ content: '' });
  const [services, setServices] = useState({ content: '' });
  
  const [uploadedImages, setUploadedImages] = useState([]); // 업로드된 이미지 목록
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => {
        if (data.home_data) setHome(data.home_data);
        if (data.about_data) setAbout(data.about_data);
        if (data.service_data) setServices(data.service_data);
      });
  }, []);

  // 📸 이미지 업로드 처리 (R2 저장)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('https://periltuocaffe-api.tonycho999.workers.dev/', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      
      if (result.success) {
        // 이미지 URL 생성 (Worker 도메인 기준)
        const imageUrl = `https://periltuocaffe-api.tonycho999.workers.dev/images/${result.fileName}`;
        setUploadedImages(prev => [...prev, imageUrl]);
      }
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // 📋 URL 복사 함수
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  // 💾 설정 저장 함수
  const saveSetting = async (key, value) => {
    setLoading(true);
    await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    setLoading(false);
    alert('Settings saved successfully!');
  };

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
        {/* 왼쪽: 내용 입력 영역 */}
        <div style={{ flex: '1.5', minWidth: '400px' }}>
          {activeTab === 'home' && (
            <div>
              <h3>Home Screen Settings</h3>
              <input type="text" value={home.title} onChange={e => setHome({...home, title: e.target.value})} placeholder="Main Title" style={inputStyle} />
              <input type="text" value={home.subtitle} onChange={e => setHome({...home, subtitle: e.target.value})} placeholder="Subtitle" style={inputStyle} />
              <input type="text" value={home.hero_img} onChange={e => setHome({...home, hero_img: e.target.value})} placeholder="Hero Image URL (Copy from right)" style={inputStyle} />
              <button onClick={() => saveSetting('home_data', home)} style={saveBtnStyle}>Save Home Settings</button>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h3>About Us Settings (HTML)</h3>
              <textarea rows="15" value={about.content} onChange={e => setAbout({content: e.target.value})} style={inputStyle} placeholder="Enter HTML content..." />
              <button onClick={() => saveSetting('about_data', about)} style={saveBtnStyle}>Save About Us</button>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h3>Services Settings (HTML)</h3>
              <textarea rows="15" value={services.content} onChange={e => setServices({content: e.target.value})} style={inputStyle} placeholder="Enter HTML content..." />
              <button onClick={() => saveSetting('service_data', services)} style={saveBtnStyle}>Save Services Settings</button>
            </div>
          )}
        </div>

        {/* 오른쪽: 이미지 업로드 및 URL 복사 영역 */}
        <div style={{ flex: '1', minWidth: '300px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>🖼️ Image Gallery</h3>
          <p style={{ fontSize: '12px', color: '#666' }}>Upload images to use in your content.</p>
          
          <div style={{ marginBottom: '20px' }}>
            <input type="file" id="file-upload" onChange={handleImageUpload} style={{ display: 'none' }} />
            <label htmlFor="file-upload" style={uploadBtnStyle}>
              {loading ? 'Uploading...' : '+ Upload New Image'}
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {uploadedImages.map((url, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '10px', border: '1px solid #eee' }}>
                <img src={url} style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt="uploaded" />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <p style={{ fontSize: '10px', margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{url}</p>
                </div>
                <button onClick={() => copyToClipboard(url)} style={copyBtnStyle}>Copy</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 스타일 정의
const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' };
const saveBtnStyle = { padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%' };
const uploadBtnStyle = { display: 'block', padding: '10px', backgroundColor: '#eee', textAlign: 'center', cursor: 'pointer', border: '1px dashed #aaa', fontWeight: 'bold' };
const copyBtnStyle = { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', fontSize: '11px', cursor: 'pointer' };
