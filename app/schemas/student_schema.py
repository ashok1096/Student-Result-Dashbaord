SUBJECT_NAMES = {
    "sub1": "Mathematics",
    "sub2": "Physics",
    "sub3": "Chemistry",
    "sub4": "English",
    "sub5": "Computer Science",
}


def student_serializer(student) -> dict:

    grades = [
        student.get("sub1", 0),
        student.get("sub2", 0),
        student.get("sub3", 0),
        student.get("sub4", 0),
        student.get("sub5", 0),
    ]

    total = round(sum(grades), 2)
    cgpa = round(total / 5, 2)

    result = "Pass" if all(g >= 4.0 for g in grades) else "Fail"

    return {
        "id": str(student["_id"]),
        "student_id": student.get("student_id", "N/A"),
        "name": student.get("name", "Unknown"),
        "department": student.get("department", "Unknown"),
        "sub1": student.get("sub1", 0),
        "sub2": student.get("sub2", 0),
        "sub3": student.get("sub3", 0),
        "sub4": student.get("sub4", 0),
        "sub5": student.get("sub5", 0),
        "total": total,
        "cgpa": cgpa,
        "result": result,
    }


def student_info_serializer(student) -> dict:
    grades = [
        student.get("sub1", 0),
        student.get("sub2", 0),
        student.get("sub3", 0),
        student.get("sub4", 0),
        student.get("sub5", 0),
    ]

    total = round(sum(grades), 2)
    cgpa = round(total / 5, 2)
    result = "Pass" if all(g >= 4.0 for g in grades) else "Fail"

    return {
        "id": str(student["_id"]),
        "student_id": student.get("student_id", "N/A"),
        "name": student.get("name", "Unknown"),
        "department": student.get("department", "Unknown"),
        "total": total,
        "cgpa": cgpa,
        "result": result,
    }


def student_subjects_serializer(student) -> dict:
    subjects = []
    for key, name in SUBJECT_NAMES.items():
        gp = student.get(key, 0)
        subjects.append({
            "key": key,
            "name": name,
            "grade_point": gp,
            "status": "Pass" if gp >= 4.0 else "Fail",
        })
    return {"student_id": student.get("student_id", "N/A"), "subjects": subjects}


def students_serializer(students) -> list:
    return [student_serializer(student) for student in students]