import React, { useState, useEffect } from 'react'
import { getAllStudents, getStudentsByDepartment, deleteStudent } from '../../services/studentservice'
import StudentCard from '../Studentcard'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import { FiUsers, FiSearch, FiFilter } from 'react-icons/fi'

function StudentList() {
  const [students, setStudents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [departments, setDepartments] = useState([])
  const [activeDept, setActiveDept] = useState('All')

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(students)
    } else {
      const q = search.toLowerCase()
      setFiltered(
        students.filter(
          (s) =>
            s.name?.toLowerCase().includes(q) ||
            s.department?.toLowerCase().includes(q) ||
            String(s.student_id).includes(q)
        )
      )
    }
  }, [search, students])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const data = await getAllStudents()
      setStudents(data)
      // Extract unique departments
      const depts = [...new Set(data.map((s) => s.department))]
      setDepartments(depts)
      setActiveDept('All')
      setError(null)
    } catch (err) {
      setError('Failed to fetch students. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeptFilter = async (dept) => {
    setActiveDept(dept)
    setSearch('')
    try {
      setLoading(true)
      if (dept === 'All') {
        const data = await getAllStudents()
        setStudents(data)
      } else {
        const data = await getStudentsByDepartment(dept)
        setStudents(data)
      }
      setError(null)
    } catch (err) {
      setError('Failed to filter by department.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (deleteId) => {
    try {
      await deleteStudent(deleteId)
      setStudents((prev) => prev.filter((s) => {
        return String(s.student_id) !== String(deleteId) && s.id !== String(deleteId)
      }))
    } catch (err) {
      setError('Failed to delete student. Please try again.')
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-group">
          <FiUsers className="page-icon" />
          <div>
            <h1 className="page-title">Student Dashboard</h1>
            <p className="page-subtitle">{students.length} students enrolled</p>
          </div>
        </div>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, department, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Department Filter */}
      <div className="dept-filter">
        <FiFilter className="filter-icon" />
        <button
          className={`dept-btn ${activeDept === 'All' ? 'active' : ''}`}
          onClick={() => handleDeptFilter('All')}
        >
          All
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            className={`dept-btn ${activeDept === dept ? 'active' : ''}`}
            onClick={() => handleDeptFilter(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No students found. Add a new student to get started!</p>
        </div>
      ) : (
        <div className="students-grid">
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentList
