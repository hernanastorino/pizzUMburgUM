import React from 'react';

const NextButton = ({ onClick, show = true }) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '90px',
        right: '30px',
        padding: '12px 24px',
        background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1em',
        fontFamily: 'Angel Club, sans-serif',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 8px rgba(142, 45, 226, 0.7), 0 0 16px rgba(142, 45, 226, 0.4)',
        zIndex: 500,  // Cambiado de 1000 a 500 para quedar detrás del overlay
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 0 10px rgba(142, 45, 226, 0.9), 0 0 20px rgba(142, 45, 226, 0.6)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 0 8px rgba(142, 45, 226, 0.7), 0 0 16px rgba(142, 45, 226, 0.4)';
      }}
    >
      → Siguiente
    </button>
  );
};

export default NextButton;
