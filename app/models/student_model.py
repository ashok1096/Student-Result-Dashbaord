from pydantic import BaseModel

class Student(BaseModel):
    name: str
    department: str
    sub1: float
    sub2: float
    sub3: float
    sub4: float
    sub5: float