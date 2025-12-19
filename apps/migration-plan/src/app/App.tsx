import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ContextoGeneral from './pages/ContextoGeneral/ContextoGeneral';
import Fase1 from './pages/Fase1/Fase1';
import Fase2 from './pages/Fase2/Fase2';
import Fase3 from './pages/Fase3/Fase3';
import Riesgos from './pages/Riesgos/Riesgos';
import Estimacion from './pages/Estimacion/Estimacion';
import Hitos from './pages/Hitos/Hitos';
import Metricas from './pages/Metricas/Metricas';
import './styles/globals.scss';

// Componente interno con solo las rutas (para usar desde el shell)
// Rutas relativas para funcionar correctamente como nested routes
export function MigrationPlanRoutes() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Navigate to="contexto" replace />} />
        <Route path="contexto" element={<ContextoGeneral />} />
        <Route path="fase1" element={<Fase1 />} />
        <Route path="fase2" element={<Fase2 />} />
        <Route path="fase3" element={<Fase3 />} />
        <Route path="riesgos" element={<Riesgos />} />
        <Route path="estimacion" element={<Estimacion />} />
        <Route path="hitos" element={<Hitos />} />
        <Route path="metricas" element={<Metricas />} />
      </Routes>
    </Layout>
  );
}

// Componente principal con HashRouter (para static hosting en S3)
// HashRouter permite que la app funcione sin configuración de servidor
function App() {
  return (
    <HashRouter>
      <MigrationPlanRoutes />
    </HashRouter>
  );
}

export default App;

