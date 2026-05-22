import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <FiAlertCircle className="error-icon" />
      <p>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  )
}

export default ErrorMessage
