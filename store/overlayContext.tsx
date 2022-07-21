import React, { createContext, useState } from 'react';

type OverlayContextType = {
  shown: boolean;
  show: () => void;
  hide: () => void;
  toggleShown: () => void;
};

export const OverlayContext = createContext<OverlayContextType | null>(null);

type OverlayContextProviderProps = {
  children?: React.ReactNode;
};

const OverlayContextProvider: React.FC<OverlayContextProviderProps> = ({
  children,
}) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => setShown((previousState) => !previousState);

  const show = () => setShown(true);

  const hide = () => setShown(false);

  const context: OverlayContextType = {
    shown,
    show,
    hide,
    toggleShown,
  };
  return (
    <OverlayContext.Provider value={context}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayContextProvider;
