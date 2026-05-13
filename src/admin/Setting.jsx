import { useState, useEffect } from 'react';

export default function Setting() {
  const [home, setHome] = useState({ title: '', subtitle: '', hero_img: '' });
  const [about, setAbout] = useState({ content: '' });
  const [loading, setLoading] = useState(false);

  // 1. 기존 데이터 불러오기
  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => {
        if (data.home_data) setHome(data.home_data);
        if (data.about_data) setAbout(data.about_data);
      });
  }, []);

  // 2. 이미지 파일 업로드 함수 (R2 저장용)
  const handleImageUpload = async (file, target) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 제품 등록할 때 썼던 Worker의 POST 기능을 그대로 활용합니다.
      const res = await fetch('https://periltuocaffe-api.tonycho999.workers.dev', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      
      // 업로드된 이미지 URL을 hero_img에 자동 입력
      if (result.success) {
        // 이미지 주소를 생성 (Worker 주소/images/파일명 형식)
        const uploadedUrl = `https://periltuocaffe-api.tonycho999.workers.dev/images/${result.fileName || ""}`; 
        // 실제로는 Worker가 리턴해주는 주소를 사용하거나 직접 조합합니다.
        setHome({ ...home, hero_img: uploadedUrl });
        alert("Image uploaded successfully!");
      }
    } catch (err) {
      alert("Image upload failed.");
    }
  };

  // 3. 설정값 저장 함수
  const saveSetting = async (key, value) => {
    setLoading(true);
    await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    setLoading(false);
    alert('Settings Saved!');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <section style={{ marginBottom: '50px' }}>
        <h3>🏠 Home Screen Settings</h3>
        <input type="text" value={home.title} onChange={e => setHome({...home, title: e.target.value})} placeholder="Main Title" style={inputStyle} />
        <input type="text" value={home.subtitle} onChange={e => setHome({...home, subtitle: e.target.value})} placeholder="Subtitle" style={inputStyle} />
        
        <label style={{ display: 'block', margin: '10px 0 5px' }}>Hero Background Image</label>
        <input type="text" value={home.hero_img} onChange={e => setHome({...home, hero_img: e.target.value})} placeholder="Image URL" style={inputStyle} />
        <input type="file" onChange={e => handleImageUpload(e.target.files[0])} style={{ marginBottom: '15px' }} />
        
        <button onClick={() => saveSetting('home_data', home)} disabled={loading} style={btnStyle}>Save Home Settings</button>
      </section>

      <section>
        <h3>📖 About Us Settings (HTML Supported)</h3>
        <textarea rows="10" value={about.content} onChange={e => setAbout({content: e.target.value})} style={inputStyle} placeholder="HTML content here..." />
        <button onClick={() => saveSetting('about_data', about)} disabled={loading} style={btnStyle}>Save About Us</button>
      </section>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
const btnStyle = { padding: '12px 25px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' };
