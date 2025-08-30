export default function CargaActa() {
  return (
    <div className="page">
      <h2>📊 Cargar Resultados del Acta</h2>
      <p>Funcionalidad en desarrollo (próximo paso).</p>
      <button onClick={() => localStorage.removeItem('token') || (window.location.href = '/')}>
        Cerrar sesión
      </button>
    </div>
  );
}