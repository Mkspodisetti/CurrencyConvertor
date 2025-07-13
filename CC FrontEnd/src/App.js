import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import './styles/base.css';
import './styles/navbar.css';
import './styles/converter.css';
import './styles/about.css';

function App() {
  return (
    <Router>
      <div className="header-container">
        <Navbar />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;