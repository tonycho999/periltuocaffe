import Footer from '../components/layout/Footer';

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', flexGrow: 1, textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Contact Us</h2>
        <p style={{ color: '#666', marginBottom: '40px' }}>
          For product inquiries, B2B supplies, or maintenance requests, please feel free to reach out to us.
        </p>

        <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '8px', display: 'inline-block', textAlign: 'left' }}>
          <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>📞 Phone:</strong> 0949 823 0007</p>
          <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>✉️ Email:</strong> periltuocaffe@gmail.com</p>
          <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>🏢 Business Hours:</strong> Mon-Fri 09:00 - 18:00 (Closed on Weekends/Holidays)</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
