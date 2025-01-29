"use client";
import { createContext, useContext, useRef, useState } from "react";

const LumosContext = createContext(null);

export const LumosProvider = ({ children }) => {
  const lightRef = useRef(null);
  const [trackMouse, setTrackMouse] = useState(true);

  return (
    <LumosContext.Provider
      value={{
        lightRef,
        trackMouse,
        setTrackMouse,
      }}
    >
      {children}
    </LumosContext.Provider>
  );
};

export const useLumos = () => {
  const context = useContext(LumosContext);
  if (!context) {
    throw new Error("useLumos doit être utilisé dans un LumosProvider");
  }
  return context;
};
