from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.student_router import router

app = FastAPI(
    title="Student Result Dashboard"
)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Student Result Dashboard API"
    }