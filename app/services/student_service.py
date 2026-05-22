from app.database.connection import student_collection
from app.schemas.student_schema import (
    student_serializer,
    student_info_serializer,
    student_subjects_serializer,
    students_serializer,
)
from bson import ObjectId


def create_student(data):

    last_student = student_collection.find_one(
        {"student_id": {"$exists": True}},
        sort=[("student_id", -1)]
    )

    next_id = (
        last_student["student_id"] + 1
    ) if last_student else 1

    data["student_id"] = next_id

    result = student_collection.insert_one(data)

    student = student_collection.find_one(
        {"_id": result.inserted_id}
    )

    return student_serializer(student)


def get_students():

    students = student_collection.find()

    return students_serializer(students)


def get_students_by_department(department):

    students = student_collection.find(
        {"department": {"$regex": f"^{department}$", "$options": "i"}}
    )

    return students_serializer(students)


def _find_student(student_id):
    if student_id.isdigit():
        student = student_collection.find_one(
            {"student_id": int(student_id)}
        )
    else:
        try:
            student = student_collection.find_one(
                {"_id": ObjectId(student_id)}
            )
        except Exception:
            student = None
    return student


def get_student(student_id):

    student = _find_student(student_id)

    if student:
        return student_info_serializer(student)
    return {"error": "Student not found"}


def get_student_subjects(student_id):

    student = _find_student(student_id)

    if student:
        return student_subjects_serializer(student)
    return {"error": "Student not found"}


def update_student(student_id, data):

    if student_id.isdigit():
        query = {"student_id": int(student_id)}
    else:
        query = {"_id": ObjectId(student_id)}

    student_collection.update_one(query, {"$set": data})

    student = student_collection.find_one(query)

    return student_serializer(student)


def delete_student(student_id):

    if student_id.isdigit():
        result = student_collection.delete_one(
            {"student_id": int(student_id)}
        )
    else:
        try:
            result = student_collection.delete_one(
                {"_id": ObjectId(student_id)}
            )
        except Exception:
            return {"message": "Invalid student ID"}

    if result.deleted_count > 0:
        return {"message": "Student deleted successfully"}
    return {"message": "Student not found"}