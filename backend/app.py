from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.royals import router as royals_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # allow all frontend origins
    allow_methods=["*"],      # allow GET, POST, etc.
    allow_headers=["*"],      # allow all headers
)

@app.get("/")
def root():
    return {"message": "Royals Dashboard API is running!"}

@app.get("/team")
def team_info():
    return {
        "team": "Kansas City Royals",
        "status": "Backend is working"
    }

app.include_router(royals_router)