from fastapi import APIRouter
from app.models.student_model import Student
from app.services.student_service import (
    create_student,
    get_students,
    get_students_by_department,
    get_student,
    get_student_subjects,
    update_student,
    delete_student,
)

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

@router.post("/")
def add_student(student: Student):
    return create_student(student.dict())

@router.get("/")
def fetch_students():
    return get_students()

@router.get("/department/{department}")
def fetch_students_by_department(department: str):
    return get_students_by_department(department)

@router.get("/{student_id}")
def fetch_single_student(student_id: str):
    return get_student(student_id)

@router.get("/{student_id}/subjects")
def fetch_student_subjects(student_id: str):
    return get_student_subjects(student_id)

@router.put("/{student_id}")
def modify_student(student_id: str, student: Student):
    return update_student(student_id, student.dict())

@router.delete("/{student_id}")
def remove_student(student_id: str):
    return delete_student(student_id)