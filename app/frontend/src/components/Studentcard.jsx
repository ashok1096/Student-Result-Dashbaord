import React from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiTrash2 } from 'react-icons/fi'

function StudentCard({ student, onDelete }) {
  const deleteId = (student.student_id && student.student_id !== 'N/A')
    ? student.student_id
    : student.id

  const getResultClass = () => {
    return student.result === 'Pass' ? 'badge-pass' : 'badge-fail'
  }

  const getGradeLabel = (cgpa) => {
    if (cgpa >= 9.0) return 'O'
    if (cgpa >= 8.0) return 'A+'
    if (cgpa >= 7.0) return 'A'
    if (cgpa >= 6.0) return 'B+'
    if (cgpa >= 5.0) return 'B'
    if (cgpa >= 4.0) return 'C'
    return 'F'
  }

  const getCgpaColorClass = (cgpa) => {
    if (cgpa >= 8.5) return 'cgpa-green'
    if (cgpa >= 7.0) return 'cgpa-yellow'
    return 'cgpa-red'
  }

  return (
    <div className="student-card">
      <div className="card-header">
        <div className="student-avatar">
          {student.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <p className="student-dept">{student.department}</p>
          <span className="student-id-badge">ID: {student.student_id}</span>
        </div>
        <span className={`result-badge ${getResultClass()}`}>
          {student.result}
        </span>
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-label">Total GP</span>
          <span className="stat-value">{student.total}/50</span>
        </div>
        <div className="stat">
          <span className="stat-label">CGPA</span>
          <span className={`stat-value cgpa-highlight ${getCgpaColorClass(student.cgpa)}`}>{student.cgpa}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Grade</span>
          <span className="stat-value grade">{getGradeLabel(student.cgpa)}</span>
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/student/${deleteId}`} className="btn btn-view">
          <FiEye /> View Details
        </Link>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(deleteId)}
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  )
}

export default StudentCard
