import axios from 'axios'

const API_URL = '/students'

export const getAllStudents = async () => {
  const response = await axios.get(API_URL + '/')
  return response.data
}

export const getStudentsByDepartment = async (department) => {
  const response = await axios.get(`${API_URL}/department/${department}`)
  return response.data
}

export const getStudentById = async (studentId) => {
  const response = await axios.get(`${API_URL}/${studentId}`)
  return response.data
}

export const getStudentSubjects = async (studentId) => {
  const response = await axios.get(`${API_URL}/${studentId}/subjects`)
  return response.data
}

export const createStudent = async (studentData) => {
  const response = await axios.post(API_URL + '/', studentData)
  return response.data
}

export const updateStudent = async (studentId, studentData) => {
  const response = await axios.put(`${API_URL}/${studentId}`, studentData)
  return response.data
}

export const deleteStudent = async (studentId) => {
  const response = await axios.delete(`${API_URL}/${studentId}`)
  return response.data
}
