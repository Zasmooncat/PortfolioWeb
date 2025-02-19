import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './js/layout.jsx'; // Importa Layout

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout /> {/* Renderiza Layout */}
  </StrictMode>,
);
