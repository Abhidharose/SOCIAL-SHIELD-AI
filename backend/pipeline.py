import time
import json
import logging
import asyncio
from typing import AsyncGenerator
from backend.schemas import AnalyzeRequest, PipelineResult
from backend.agents.threat_agent import ThreatAnalysisAgent
from backend.agents.psychology_agent import PsychologyAgent
from backend.agents.evidence_agent import EvidenceExtractionAgent
from backend.agents.education_agent import EducationAgent
from backend.agents.recommendation_agent import RecommendationAgent
from backend.agents.report_agent import ReportAgent

logger = logging.getLogger("SocialShield.Pipeline")

async def run_pipeline(request: AnalyzeRequest) -> AsyncGenerator[str, None]:
    """
    Executes the 6 cybersecurity agents sequentially, passing inputs from one to the next,
    and yields Server-Sent Events (SSE) detailing the pipeline progress and final output.
    """
    session_id = f"SS-{int(time.time() * 1000)}"
    logger.info(f"Starting analysis pipeline session {session_id} for source {request.source_type}")

    # Instantiate agents
    threat_agent = ThreatAnalysisAgent()
    psychology_agent = PsychologyAgent()
    evidence_agent = EvidenceExtractionAgent()
    education_agent = EducationAgent()
    recommendation_agent = RecommendationAgent()
    report_agent = ReportAgent()

    try:
        # 1. Threat Analysis Agent
        yield sse_event("agent_start", {"agent": "ThreatAnalysisAgent", "message": "Classifying threat type and calculating risk score..."})
        threat_output = await threat_agent.analyze(
            source_type=request.source_type,
            sender=request.sender,
            subject=request.subject,
            body=request.body
        )
        yield sse_event("agent_done", threat_output.model_dump())

        # 2. Psychology Agent
        yield sse_event("agent_start", {"agent": "PsychologyAgent", "message": "Profiling psychological manipulation vectors..."})
        psy_output = await psychology_agent.analyze(
            body=request.body,
            threat_analysis=threat_output
        )
        yield sse_event("agent_done", psy_output.model_dump())

        # 3. Evidence Extraction Agent
        yield sse_event("agent_start", {"agent": "EvidenceExtractionAgent", "message": "Extracting URLs, identifiers, and financial markers..."})
        evidence_output = await evidence_agent.analyze(
            body=request.body,
            threat_analysis=threat_output,
            psychology=psy_output
        )
        yield sse_event("agent_done", evidence_output.model_dump())

        # 4. Education Agent
        yield sse_event("agent_start", {"agent": "EducationAgent", "message": "Generating educational context for threat class..."})
        edu_output = await education_agent.analyze(
            body=request.body,
            threat_analysis=threat_output,
            evidence=evidence_output
        )
        yield sse_event("agent_done", edu_output.model_dump())

        # 5. Recommendation Agent
        yield sse_event("agent_start", {"agent": "RecommendationAgent", "message": "Compiling mitigation action checklist..."})
        rec_output = await recommendation_agent.analyze(
            threat_analysis=threat_output,
            psychology=psy_output,
            evidence=evidence_output
        )
        yield sse_event("agent_done", rec_output.model_dump())

        # 6. Report Agent
        yield sse_event("agent_start", {"agent": "ReportAgent", "message": "Synthesizing final consensus intelligence report..."})
        report_output = await report_agent.analyze(
            source_type=request.source_type,
            threat_analysis=threat_output,
            psychology=psy_output,
            evidence=evidence_output,
            education=edu_output,
            recommendation=rec_output
        )
        yield sse_event("agent_done", report_output.model_dump())

        # Final Merged Result
        final_result = PipelineResult(
            session_id=session_id,
            source_type=request.source_type,
            threat_analysis=threat_output,
            psychology=psy_output,
            evidence=evidence_output,
            education=edu_output,
            recommendation=rec_output,
            final_report=report_output
        )

        yield sse_event("pipeline_complete", final_result.model_dump())
        logger.info(f"Pipeline completed successfully for session {session_id}")

    except Exception as e:
        logger.error(f"Pipeline failed during execution of session {session_id}: {str(e)}")
        yield sse_event("error", {"message": str(e), "session_id": session_id})


def sse_event(event_name: str, data: dict) -> str:
    """Format dictionary payload into SSE event string."""
    return f"event: {event_name}\ndata: {json.dumps(data)}\n\n"
