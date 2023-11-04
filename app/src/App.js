import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cards from './component/cards';
import Navigation from './component/navbar';
import Login from './login';
import SignUp from './Signup';
import Saved from './saved';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
function App() {
  return (
    <div className="main-body">
      <Navigation />
      <Routes>
        <Route element={<Cards/>} path='/home'></Route>
        <Route element={<Login/>} path='/login'></Route>
        <Route element={<SignUp/>} path='/signup'></Route>
        <Route element={<Saved/>} path='/saved'></Route>
        <Route element={ <Cards/>} path='/'></Route>
      </Routes>

    </div>
  );
}

export default App;

/*
      <BrowserRouter>
        <Routes>
          <Route path='/login' element = {<Login />} />
          <Route path='/signup' element = {<Login />} />
          <Route path='/home' element = {<Login />} />
        </Routes>
      </BrowserRouter>
*/

