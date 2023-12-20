import React from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Registration from './Registration.js';

export default function RouterPage(){
    return(
        <Router>
            <Routes>
            <Route exact path ='/Login' element = {<Login/>} />
            <Route path = '/Registration' element ={<Registration />} />
            </Routes>
        </Router>
    )
}