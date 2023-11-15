import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [id_rol, setId_rol] = useState();

  const setGlobalToken = (value) => {
    setToken(value);
  };
  const setGlobalId = (value) => {
    setId(value);
  };
  const setGlobalId_rol = (value) => {
    setId_rol(value);
  };

  return (
    <MyContext.Provider value={{ token, id, id_rol, setGlobalToken, setGlobalId, setGlobalId_rol }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
