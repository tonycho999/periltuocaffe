export default function ProductCard({ product }) {
  return (
    <div style={{ 
      border: '1px solid #f0f0f0', 
      borderRadius: '2px', 
      overflow: 'hidden', 
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* 제품 사진 영역 */}
      <div style={{ 
        width: '100%', 
        paddingTop: '100%', /* 1:1 비율 유지 */
        position: 'relative',
        backgroundColor: '#fafafa'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </div>

      {/* 제품 정보 영역 */}
      <div style={{ padding: '20px', textAlign: 'center', flexGrow: 1 }}>
        <span style={{ 
          fontSize: '11px', 
          color: '#888', 
          textTransform: 'uppercase', 
          letterSpacing: '1px' 
        }}>
          {product.category === 'consumer' ? 'Consumer' : 'Commercial'}
        </span>
        <h3 style={{ 
          margin: '10px 0 0 0', 
          fontSize: '16px', 
          color: '#222',
          fontWeight: '500',
          lineHeight: '1.4'
        }}>
          {product.name}
        </h3>
      </div>
    </div>
  );
}
