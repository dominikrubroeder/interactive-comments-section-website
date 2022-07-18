import React from 'react';

interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/70 z-50 cursor-pointer"
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
