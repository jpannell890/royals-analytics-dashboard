from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Royals Dashboard API is running!"}

@app.get("/team")
def team_info():
    return {
        "team": "Kansas City Royals",
        "status": "Backend is working"
    }