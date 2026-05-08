from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#schema
class GuestRequest(BaseModel):
    guest_name: str

#api
@app.post("/api/create_guest_account")
def create_guest(data: GuestRequest):
    print(f"name: {data.guest_name}")
    print(f"message: {data.guest_name} 게스트 계정 생성 완료!!")
    
    return {"message": f"{data.guest_name} 게스트 계정 생성 완료!!"}