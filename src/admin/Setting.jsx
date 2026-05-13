import { useState, useEffect } from 'react';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('home');
  const [home, setHome] = useState({ content: '' });
  const [about, setAbout] = useState({ content: '' });
  const [services, setServices] = useState({ content: '' });
  const [uploadedImages, setUploadedImages] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => {
        if (data.home_data) setHome(typeof data.home_data === 'object' && data.home_data.content ? data.home_data : { content: '' });
        if (data.about_data) setAbout(data.about_data);
        if (data.service_data) setServices(data.service_data);
      });
  }, []);

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
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✨ 이미지 삭제 함수 추가
  const deleteImage = async (url) => {
    if (!window.confirm("이미지를 완전히 삭제하시겠습니까? (이미 사용 중인 곳에서 이미지가 깨질 수 있습니다.)")) return;
    
    const fileName = url.split('/').pop(); // URL에서 파일명 추출
    try {
      const res = await fetch(`https://periltuocaffe-api.tonycho999.workers.dev/upload?file=${fileName}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setUploadedImages(prev => prev.filter(img => img !== url));
        alert("Deleted successfully.");
      }
    } catch (err) {
      alert("Delete failed.");
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

  const currentData = activeTab === 'home' ? home : activeTab === 'about' ? about : services;
  const setCurrentData = activeTab === 'home' ? setHome : activeTab === 'about' ? setAbout : setServices;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
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
        <div style={{ flex: '1.5', minWidth: '400px' }}>
          <h3>{activeTab.toUpperCase()} Content (HTML)</h3>
          <textarea 
            rows="20" 
            value={currentData.content} 
            onChange={e => setCurrentData({ content: e.target.value })} 
            style={inputStyle} 
            placeholder={`Enter HTML content...`} 
          />
          <button onClick={() => saveSetting(`${activeTab}_data`, currentData)} style={saveBtnStyle}>
            Save {activeTab.toUpperCase()} Settings
          </button>
        </div>

        <div style={{ flex: '1', minWidth: '300px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0 }}>🖼️ Gallery</h3>
          <div style={{ marginBottom: '20px' }}>
            <input type="file" id="file-upload" onChange={handleImageUpload} style={{ display: 'none' }} />
            <label htmlFor="file-upload" style={uploadBtnStyle}>
              {loading ? 'Processing...' : '+ Upload Image'}
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {uploadedImages.map((url, index) => (
              <div key={index} style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                {/* ❌ 삭제 버튼 추가 */}
                <button 
                  onClick={() => deleteImage(url)}
                  style={deleteBtnStyle}
                  title="Delete image from server"
                >
                  &times;
                </button>
                
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

// 🗑️ 삭제 버튼 스타일
const deleteBtnStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#ff4d4f',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  zIndex: 1
};
