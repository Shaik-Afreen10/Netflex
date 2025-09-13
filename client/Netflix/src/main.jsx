import { StrictMode, useTransition } from 'react'
import { createRoot } from 'react-dom/client'
import {useRef, useState,useEffect } from 'react'
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom'
import './main.css'
import Header from './components/common/header'
import MainContent from './components/common/mainContent';
import Register from './components/common/register';
import AdminDash from './components/adminUI/adminDash';
import AddMovie from  './components/adminUI/addMovie';
import AddGenre from  './components/adminUI/addGenre';
import ViewGenre from  './components/adminUI/viewGenre';
import ViewMovie from  './components/adminUI/viewMovie';
import WatchMovie from './components/userUI/watchMovies';
import ChangePassword from './components/common/changePass';
const root = document.getElementById('root');


createRoot(root).render(
  <BrowserRouter >
    <Header />
    <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/dashboard" element={<AdminDash/>} />
         <Route path="/signup" element={<Register/>} />
          <Route path="/add-movie" element={<AddMovie/>} />
           <Route path="/add-genre" element={<AddGenre/>} />
           <Route path="/view-genre" element={<ViewGenre/>} />
           <Route path="/watch-movie" element={<WatchMovie/>} />
            <Route path="/view-movie" element={<ViewMovie/>} />
            <Route path="/change-pass" element={<ChangePassword/>} />
    </Routes>

  </BrowserRouter>
)


