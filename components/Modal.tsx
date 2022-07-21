import React from 'react';

interface IModal {
  title: string;
  content: string;
  primaryAction: () => void;
  primaryActionText: string;
  secondaryAction: () => void;
  secondaryActionText: string;
}

const Modal: React.FC<IModal> = ({
  title,
  content,
  primaryAction,
  secondaryAction,
  primaryActionText,
  secondaryActionText,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xs max-h-min z-50">
      <h2 className="mb-4 font-bold text-xl text-app-neutral-blue-dark">
        {title}
      </h2>
      <p className="text-app-neutral-blue-grayish mb-4">{content}</p>
      <footer className="flex items-center justify-end gap-2">
        <button
          className="bg-app-neutral-blue-grayish text-white px-4 py-2 rounded-lg"
          onClick={secondaryAction}
        >
          {secondaryActionText}
        </button>
        <button
          className="bg-app-primary-red-soft text-white px-4 py-2 rounded-lg"
          onClick={primaryAction}
        >
          {primaryActionText}
        </button>
      </footer>
    </div>
  );
};

export default Modal;
