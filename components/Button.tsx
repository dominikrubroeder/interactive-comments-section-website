import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  /** Contained (default), text, ... */
  variant?: string;
  /** Base (default), desctructive, ... this determents the color of the text button */
  actionType?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  children,
  onClick,
  actionType = 'base',
  className,
}) => {
  if (variant === 'text') {
    return (
      <button
        className={`flex items-center gap-2 absolute bottom-6 right-4 ${
          actionType === 'destructive'
            ? 'text-app-primary-red-soft'
            : 'text-app-primary-blue-moderate'
        } hover:opacity-70 sm:relative sm:top-auto sm:right-auto sm:bottom-auto ${
          className ? className : ''
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`bg-app-primary-blue-moderate text-white py-3 px-6 rounded-xl uppercase hover:opacity-70 ${
        className ? className : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
