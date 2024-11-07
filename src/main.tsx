import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RouterWrapper from "./Pages/RouterWrapper"
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>   
      <RouterWrapper /> {/* Use RouterWrapper instead of App */}
    </BrowserRouter>
  </StrictMode>,
);
