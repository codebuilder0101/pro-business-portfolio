import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Servicos from './pages/Servicos';
import Contato from './pages/Contato';
import Mercado from './pages/Blog';
import NewsDetail from './pages/NewsDetail';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { useTrackPageview } from './hooks/useAnalytics';
import './index.css';

function PublicChrome({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  useTrackPageview();
  if (isAdmin) return <main>{children}</main>;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <Router>
      <PublicChrome>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/mercado" element={<Mercado />} />
          <Route path="/mercado/:id" element={<NewsDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </PublicChrome>
    </Router>
  );
}

export default App;
