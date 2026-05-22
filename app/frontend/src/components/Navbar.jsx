import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiUserPlus, FiAward } from 'react-icons/fi'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FiAward className="brand-icon" />
          <span>Student Results</span>
        </Link>
        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/add"
            className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}
          >
            <FiUserPlus />
            <span>Add Student</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
