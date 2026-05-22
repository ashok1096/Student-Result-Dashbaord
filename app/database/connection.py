from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

print(MONGO_URL)
print(DB_NAME)

client = MongoClient(MONGO_URL)

db = client[DB_NAME]

student_collection = db["students"]

print("MongoDB Connected")