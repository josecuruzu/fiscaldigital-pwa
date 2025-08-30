import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CargaActa from './pages/CargaActa';
import Panel from './pages/Panel';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>🗳️ FiscalDigital</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/carga" element={<PrivateRoute><CargaActa /></PrivateRoute>} />
            <Route path="/panel" element={<PrivateRoute><Panel /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

export default App;