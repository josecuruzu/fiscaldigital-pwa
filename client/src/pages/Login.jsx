import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codigo, setCodigo] = useState('');
  const [etapa, setEtapa] = useState('login'); // login o verify
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (etapa === 'login') {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, telefono })
      });

      if (res.ok) {
        setEtapa('verify');
        alert('Código generado. Revisa la consola del backend (localhost:5000)');
      } else {
        alert('Error: DNI o teléfono no registrado');
      }
    } else {
      const res = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, codigo })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('fiscal', JSON.stringify(data.fiscal));
        navigate('/carga');
      } else {
        alert('Código inválido');
      }
    }
  };

  return (
    <div className="page">
      <h2>🔐 Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {etapa === 'login' ? (
          <>
            <input
              placeholder="DNI (ej: 12345678)"
              value={dni}
              onChange={e => setDni(e.target.value)}
              required
            />
            <input
              placeholder="Teléfono (+549...)"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              required
            />
            <button type="submit">Enviar código</button>
          </>
        ) : (
          <>
            <input
              placeholder="Código (ver consola del backend)"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              required
            />
            <button type="submit">Verificar</button>
          </>
        )}
      </form>
    </div>
  );
}