import uvicorn
from app.main_hybrid import app

if __name__ == "__main__":
    uvicorn.run(
        "app.main_hybrid:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )