import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [showCreate, setShowCreate] = useState(false);

  const openCreate = () => setShowCreate(true);
  const closeCreate = () => setShowCreate(false);

  return (
    <UIContext.Provider value={{ showCreate, openCreate, closeCreate }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);