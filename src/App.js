import React, { Fragment } from 'react';
//? router
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ! Switch has been replaced with Routes (v6 react router)
//? css
import './App.css';
//? components
import Navbar from './components/Navbar';
//? pages
import { Home, NotFound } from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
