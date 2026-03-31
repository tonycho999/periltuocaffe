import Footer from '../components/layout/Footer';

export default function Services() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', flexGrow: 1 }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px' }}>Our Services</h2>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>🔧 Machine Installation & Calibration</h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginTop: '10px' }}>
            When introducing a new machine, our experts visit directly to provide perfect setup from installation to water temperature and pressure calibration for the optimal coffee taste.
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>⚙️ Regular Maintenance & Support</h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginTop: '10px' }}>
            We provide prompt on-site repairs, parts replacement, and scaling solutions to ensure your cafe operations run smoothly without interruption.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
