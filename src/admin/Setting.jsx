import { useState, useEffect } from 'react';

export default function Setting() {
  const [home, setHome] = useState({ title: '', subtitle: '', hero_img: '' });
  const [about, setAbout] = useState({ content: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings')
      .then(res => res.json())
      .then(data => {
        if (data.home_data) setHome(data.home_data);
        if (data.about_data) setAbout(data.about_data);
      });
  }, []);

  const saveSetting = async (key, value) => {
    setLoading(true);
    await fetch('https://periltuocaffe-api.tonycho999.workers.dev/settings', {
      method: 'POST',
      body: JSON.stringify({ key, value })
    });
    setLoading(false);
    alert('저장되었습니다!');
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h3>🏠 홈 화면 설정</h3>
      <input type="text" value={home.title} onChange={e => setHome({...home, title: e.target.value})} placeholder="메인 타이틀" style={inputStyle} />
      <input type="text" value={home.subtitle} onChange={e => setHome({...home, subtitle: e.target.value})} placeholder="서브 타이틀" style={inputStyle} />
      <button onClick={() => saveSetting('home_data', home)} disabled={loading} style={btnStyle}>홈 설정 저장</button>

      <h3 style={{ marginTop: '40px' }}>📖 About Us 설정</h3>
      <textarea rows="10" value={about.content} onChange={e => setAbout({content: e.target.value})} style={inputStyle} />
      <button onClick={() => saveSetting('about_data', about)} disabled={loading} style={btnStyle}>About Us 저장</button>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer' };
