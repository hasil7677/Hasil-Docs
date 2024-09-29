import { useState } from 'react'
import './index.css';
import './App.css'
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; // For icons

import Navbar from './components/Navbar/navbar'
import Editor from './components/Editor/Editor';
import HomePage from './pages/home';
import SignInPage from './pages/signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/signup';
import { AuthProvider } from './context/authContext';
import ProfilePage from './pages/profile';
import Document from './components/Document/document';

function App() {

  return (
    <AuthProvider>
 
 <Router>
   <Navbar />
            <Routes>
                <Route path="/document" element={<Document />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
        </AuthProvider>

  )
}

export default App
