import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail'; // 상세 페이지 임포트
import Services from './pages/Services';
import Contact from './pages/Contact';
import SecretAdmin from './admin/SecretAdmin';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        {/* ✨ 제품 상세 페이지 라우트 추가 */}
        <Route path="/product/:id" element={<ProductDetail />} />
        
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pitc-product-upload" element={<SecretAdmin />} />
      </Routes>
    </Router>
  );
}
