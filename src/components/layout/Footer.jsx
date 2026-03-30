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
        당신의 커피를 위하여
      </p>
      
      <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.8' }}>
        <p>Email: contact@periltuocaffe.com | Tel: 02-1234-5678</p>
        <p>&copy; {new Date().getFullYear()} Per il tuo caffe. All rights reserved.</p>
      </div>
    </footer>
  );
}
