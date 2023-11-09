import React from "react";
import Card_C from "./Card_C";
import ListCards from "./ListCards";
import Menu from "./Menu";
import Login from "./Login";
import { Navigate, Routes, Route } from "react-router-dom";

function Main() {
    return(
        <Routes>
            <Route path="/Proyecto_biblioteca/public/ListCards" element={<ListCards/>}></Route>

            <Route path="/Proyecto_biblioteca/public/" element={<Login/>}>
                <Route path="Card" element={<Card_C/>}/>
                <Route path="ListCards" element={<ListCards/>}/>
                <Route path="*" element={<Navigate replace to="/" />}/>
            </Route>
        </Routes>
    )
}

export default Main;