import React from "react";
import Card_C from "./Card_C";
import ListCards from "./ListCards";
import Menu from "./Menu";
import Login from "./Login";
import { Navigate, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import UserList from "./UserList";
import UserCard from "./UserCard";

function Main() {
  return (
    <Routes>
      {/* Ruta Principal */}
      <Route path="/Proyecto_biblioteca/public/" element={<Menu />}>
        <Route path="Card" element={<Card_C />} />
        <Route path="ListCards" element={<ListCards />} />
        <Route path="userList" element={<UserList />} />
        <Route path="users/:id" element={<UserCard />} />
        
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>

      {/* Ruta de Login */}
      <Route path="/Proyecto_biblioteca/public/login" element={<Login />} />

      {/* Ruta de Registro */}
      <Route
        path="/Proyecto_biblioteca/public/register"
        element={<RegistrationForm />}
      />
    </Routes>
  );
}

export default Main;
