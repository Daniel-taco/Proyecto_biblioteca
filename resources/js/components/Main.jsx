import React from "react";
import Card_C from "./Card_C";
import ListCards from "./ListCards";
import Menu from "./Menu";
import Login from "./Login";
import { Navigate, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import UserList from "./UserList";
import UserCard from "./UserCard";
import AddBookForm from "./AddBookForm";
import LendForm from "./LendForm";
import Profile from "./Profile";
import UserLends from "./UserLends";
import LendList from "./LendList";
import Home from "./Home";

function Main() {
  return (
    <Routes>
      {/* Ruta Principal */}
      <Route path="/Proyecto_biblioteca/public/" element={<Menu />}>
        <Route path="" element={<Home/>} />
        <Route path="ListCards" element={<ListCards />} />
        <Route path="LendList" element={<LendList />} />
        <Route path="UserList" element={<UserList />} />
        <Route path="AddBook" element={<AddBookForm/>}/>
        <Route path="lends" element={<LendForm/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="UserLends" element={<UserLends/>}/>
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
