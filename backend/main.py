import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from backend.schemas import AnalyzeRequest
from backend.config import settings
from backend.pipeline import run_pipeline

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("SocialShield.Main")

# Initialize FastAPI App
app = FastAPI(
    title="SocialShield AI Backend",
    description="Multi-Agent Threat Intelligence Consensus Pipeline using Google Gemini API",
    version="1.0.0"
)

# Configure CORS to allow access from frontend local servers (typically port 5173 or similar)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    """
    Checks backend service status and verifies if the Gemini API key is configured.
    """
    key_configured = bool(settings.gemini_api_key)
    logger.info(f"Health check invoked. Gemini key loaded: {key_configured}")
    return {
        "status": "healthy",
        "gemini_api_key_configured": key_configured,
        "model": settings.gemini_model,
        "message": "SocialShield AI Agent Backend is operational." if key_configured else "Warning: GEMINI_API_KEY is not configured in backend/.env"
    }

@app.post("/api/analyze")
async def analyze_message(request: AnalyzeRequest):
    """
    Starts the sequential multi-agent pipeline to analyze a message.
    Streams events: agent_start, agent_done, pipeline_complete, or error via SSE.
    """
    logger.info(f"Received analysis request for source type: {request.source_type}")
    
    # Return StreamingResponse with SSE headers
    return StreamingResponse(
        run_pipeline(request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream",
            "X-Accel-Buffering": "no"  # Disable buffering for Nginx if any
        }
    )

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting server on port {settings.backend_port}...")
    uvicorn.run("main:app", host="0.0.0.0", port=settings.backend_port, reload=True)
