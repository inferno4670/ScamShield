
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { AboutPage } from './pages/AboutPage';
import { DeepfakePage } from './pages/DeepfakePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="analyzer" element={<AnalyzerPage />} />
          <Route path="deepfake" element={<DeepfakePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
