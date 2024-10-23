// src/context/LocalStorageContext.jsx
'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [ storedValue, setStoredValue ] = useState({});

  useEffect(() => {
    const value = localStorage.getItem('inputValue') ;
    if (value) {
      setStoredValue(value);
    }

  }, []);

  const updateStoredValue = (newValue) => {
    setStoredValue(newValue);
    localStorage.setItem('inputValue', newValue);
  };

  return (
    <LocalStorageContext.Provider value={{ storedValue, updateStoredValue }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export function useLocalStorage() {
  return useContext(LocalStorageContext);
}
