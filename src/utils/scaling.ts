export const updateScale = () => {
  const root = document.documentElement;
  const appWidth = 2556;
  const appHeight = 1179;
  
  const scaleX = window.innerWidth / appWidth;
  const scaleY = window.innerHeight / appHeight;
  const scale = Math.min(scaleX, scaleY);
  
  root.style.setProperty('--scale-ratio', scale.toString());
};

// Initialize scaling
export const initializeScaling = () => {
  updateScale();
  window.addEventListener('resize', updateScale);
};

// Cleanup
export const cleanupScaling = () => {
  window.removeEventListener('resize', updateScale);
}; 