export const stargazeStyles = `
  /* Force hardware acceleration and smooth animations */
  * {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px) translate3d(0, 0, 0);
    will-change: opacity, transform;
  }
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0) translate3d(0, 0, 0);
    }
  }
  @keyframes slowPulse {
    0%, 100% { 
      opacity: 0.3; 
      transform: scale(1) translate3d(0, 0, 0); 
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.05) translate3d(0, 0, 0); 
    }
  }
  @keyframes tvTurnOn {
    0% { 
      transform: translateX(-50%) scaleX(0) scaleY(0.01) translate3d(0, 0, 0);
      opacity: 1;
    }
    50% { 
      transform: translateX(-50%) scaleX(1) scaleY(0.01) translate3d(0, 0, 0);
      opacity: 1;
    }
    100% { 
      transform: translateX(-50%) scaleX(1) scaleY(1) translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes tvTurnOff {
    0% { 
      transform: translateX(-50%) scaleX(1) scaleY(1) translate3d(0, 0, 0);
      opacity: 1;
    }
    50% { 
      transform: translateX(-50%) scaleX(1) scaleY(0.01) translate3d(0, 0, 0);
      opacity: 1;
    }
    100% { 
      transform: translateX(-50%) scaleX(0) scaleY(0.01) translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  .tv-effect-dialog {
    transform-origin: center center;
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  .crt-viewport {
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    will-change: contents;
    contain: layout style paint;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 600px;
  }
  .crt-viewport::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, 
      transparent 0%, 
      transparent 68%, 
      rgba(0,0,0,0.01) 72%,
      rgba(0,0,0,0.03) 78%,
      rgba(0,0,0,0.06) 85%,
      rgba(0,0,0,0.12) 95%,
      rgba(0,0,0,0.2) 100%);
    pointer-events: none;
    z-index: 10;
    transform: translate3d(0, 0, 0);
    will-change: transform;
    backface-visibility: hidden;
  }
  .crt-content {
    transform: translate3d(0, 0, 0);
    will-change: transform;
    filter: contrast(1.02) brightness(0.98);
    backface-visibility: hidden;
    contain: layout style paint;
  }
  
  /* Additional performance optimizations */
  .constellation-star {
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
  
  .telescope-viewport {
    contain: layout style paint size;
    will-change: contents;
  }
`;
