import React from "react";
import ListCards from "./ListCards";
import Menu from "./Menu";
import Login from "./Login";
import { Navigate, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import UserList from "./UserList";
import AddBookForm from "./AddBookForm";
import LendForm from "./LendForm";
import Profile from "./Profile";
import UserLends from "./UserLends";
import LendList from "./LendList";
import Home from "./Home";
import CategoryList from "./CategoryList";
import AddCategoryForm from "./AddCategoryForm";

function Main() {
  return (
    <Routes>
      {/* Ruta Principal */}
      <Route path="/Proyecto_biblioteca/public/" element={<Menu />}>
        <Route path="" element={<Home/>} />
        <Route path="ListCards" element={<ListCards />} />
        <Route path="CategoryList" element={<CategoryList />} />
        <Route path="LendList" element={<LendList />} />
        <Route path="UserList" element={<UserList />} />
        <Route path="AddCategory" element={<AddCategoryForm/>}/>
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
