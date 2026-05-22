import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentList from './components/Pages/StudentList'
import AddStudent from './components/Pages/AddStudent'
import StudentDetail from './components/Pages/StudentDetail'
import './styles/app.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/student/:studentId" element={<StudentDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
