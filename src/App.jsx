import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
// 기존 Consumer, Commercial 임포트 삭제
import About from './pages/About'; // 새로 만들 About 페이지
import Product from './pages/Product'; // 새로 만들 Product 페이지
import Services from './pages/Services';
import Contact from './pages/Contact';
import SecretAdmin from './admin/SecretAdmin';

export default function App() {
  return (
    <Router>
      {/* Header는 라우트 밖에 두어 모든 페이지 상단에 항상 고정되게 합니다 */}
      <Header />
      
      {/* URL에 따라 바뀌는 실제 콘텐츠 영역 */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* 수정된 메뉴 경로 설정 */}
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* 🔒 사장님 전용 비밀 관리자 주소 */}
        <Route path="/pitc-product-upload" element={<SecretAdmin />} />
      </Routes>
    </Router>
  );
}
