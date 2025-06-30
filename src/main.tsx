import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppWrapper from './components/AppWrapper';
import './index.css';

// Critical loading operations for the application
const criticalOperations = [
  // Ensure fonts are loaded
  document.fonts.ready,
  // Preload critical images
  new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false); // Don't block on image errors
    img.src = '/src/assets/profile_img/dp.avif';
  }),
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper asyncOperations={criticalOperations} minimumLoadTime={10000}>
      <App />
    </AppWrapper>
  </StrictMode>
);
