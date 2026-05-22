import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStudentById, getStudentSubjects } from '../../services/studentservice'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import { FiArrowLeft, FiUser, FiBook } from 'react-icons/fi'

function StudentDetail() {
  const { studentId } = useParams()
  const [student, setStudent] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudent()
  }, [studentId])

  const fetchStudent = async () => {
    try {
      setLoading(true)
      const data = await getStudentById(studentId)
      const subjectData = await getStudentSubjects(studentId)
      setStudent(data)
      setSubjects(subjectData.subjects || [])
      setError(null)
    } catch (err) {
      setError('Failed to fetch student details.')
    } finally {
      setLoading(false)
    }
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

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!student) return <ErrorMessage message="Student not found." />

  return (
    <div className="page-container">
      <Link to="/" className="back-link">
        <FiArrowLeft /> Back to Dashboard
      </Link>

      <div className="detail-hero">
        <div className="detail-avatar">
          {student.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="detail-hero-info">
          <h1 className="detail-name">{student.name}</h1>
          <p className="detail-dept">
            <FiBook /> {student.department}
          </p>
          <span className="student-id-badge">Student ID: {student.student_id}</span>
        </div>
        <div className="detail-summary">
          <div className={`result-badge-lg ${student.result === 'Pass' ? 'badge-pass' : 'badge-fail'}`}>
            {student.result}
          </div>
          <div className="detail-grade">{getGradeLabel(student.cgpa)}</div>
        </div>
      </div>

      <div className="detail-stats-row">
        <div className="detail-stat-card">
          <span className="detail-stat-label">Total GP</span>
          <span className="detail-stat-value">{student.total} / 50</span>
        </div>
        <div className="detail-stat-card">
          <span className="detail-stat-label">CGPA</span>
          <span className={`detail-stat-value ${getCgpaColorClass(student.cgpa)}`}>{student.cgpa}</span>
        </div>
        <div className="detail-stat-card">
          <span className="detail-stat-label">Grade</span>
          <span className="detail-stat-value">{getGradeLabel(student.cgpa)}</span>
        </div>
      </div>

      <div className="marks-table-card">
        <h2 className="section-title">
          <FiUser /> Subject-wise CGPA
        </h2>
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>CGPA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.key}>
                <td>{sub.name}</td>
                <td>{sub.grade_point}</td>
                <td>
                  <span className={`mark-status ${sub.status.toLowerCase()}`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentDetail

