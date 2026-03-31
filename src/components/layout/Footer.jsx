export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#1a1a1a', 
      color: '#fff', 
      padding: '60px 20px 40px', 
      textAlign: 'center', 
      marginTop: '80px' 
    }}>
      <h3 style={{ margin: '0 0 10px 0', letterSpacing: '2px', fontSize: '20px' }}>
        PER IL TUO CAFFE
      </h3>
      <p style={{ margin: '0 0 30px 0', fontSize: '14px', color: '#aaa' }}>
        For Your Coffee
      </p>
      
      <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.8' }}>
        <p>Email: periltuocaffe@gmail.com | Tel: 0949 823 0007</p>
        <p>&copy; {new Date().getFullYear()} Per il tuo caffe. All rights reserved.</p>
      </div>
    </footer>
  );
}
