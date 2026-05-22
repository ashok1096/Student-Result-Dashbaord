import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudent } from '../../services/studentservice'
import { FiUserPlus, FiSave } from 'react-icons/fi'

function AddStudent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    sub1: '',
    sub2: '',
    sub3: '',
    sub4: '',
    sub5: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const subjects = [
    { key: 'sub1', label: 'Subject 1 (Maths)' },
    { key: 'sub2', label: 'Subject 2 (Physics)' },
    { key: 'sub3', label: 'Subject 3 (Chemistry)' },
    { key: 'sub4', label: 'Subject 4 (English)' },
    { key: 'sub5', label: 'Subject 5 (Computer)' },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate
    if (!formData.name.trim() || !formData.department.trim()) {
      setError('Name and Department are required.')
      return
    }

    for (const s of subjects) {
      const val = Number(formData[s.key])
      if (isNaN(val) || val < 0 || val > 10) {
        setError(`${s.label}: Enter a valid CGPA between 0–10.`)
        return
      }
    }

    try {
      setLoading(true)
      const payload = {
        name: formData.name.trim(),
        department: formData.department.trim(),
        sub1: Number(formData.sub1),
        sub2: Number(formData.sub2),
        sub3: Number(formData.sub3),
        sub4: Number(formData.sub4),
        sub5: Number(formData.sub5),
      }
      await createStudent(payload)
      navigate('/')
    } catch (err) {
      setError('Failed to add student. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-group">
          <FiUserPlus className="page-icon" />
          <div>
            <h1 className="page-title">Add New Student</h1>
            <p className="page-subtitle">Fill in the details below</p>
          </div>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              name="department"
              placeholder="e.g. Computer Science"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3 className="form-section-title">Subject CGPA (out of 10)</h3>
        <div className="form-grid marks-grid">
          {subjects.map((s) => (
            <div className="form-group" key={s.key}>
              <label htmlFor={s.key}>{s.label}</label>
              <input
                id={s.key}
                type="number"
                name={s.key}
                placeholder="0 – 10"
                min="0"
                max="10"
                step="0.1"
                value={formData[s.key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          <FiSave />
          {loading ? 'Saving...' : 'Save Student'}
        </button>
      </form>
    </div>
  )
}

export default AddStudent
