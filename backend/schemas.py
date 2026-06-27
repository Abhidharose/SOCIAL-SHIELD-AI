from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AnalyzeRequest(BaseModel):
    source_type: str = Field(..., description="Source type, e.g., EMAIL, SMS, IM_CHAT, SOCIAL_DM, JOB_OFFER, SCREENSHOT_OCR")
    sender: Optional[str] = Field(None, description="Sender address/ID if available")
    subject: Optional[str] = Field(None, description="Subject if available")
    body: str = Field(..., description="Message body or OCR text to analyze")

class ThreatOutput(BaseModel):
    agent: str = Field(default="ThreatAnalysisAgent", description="Agent identifier")
    scam_category: str = Field(..., description="Detected scam category (e.g., Phishing, Fake Job Scam, OTP Scam, Romance Scam, Impersonation, Investment Fraud, None)")
    risk_score: int = Field(..., description="Calculated risk score from 0 to 100")
    threat_level: str = Field(..., description="Threat level: LOW, MEDIUM, HIGH, CRITICAL")
    confidence: float = Field(..., description="Confidence score from 0.0 to 1.0")
    reasoning: str = Field(..., description="Short explanation of classification reasoning")

class TacticDetail(BaseModel):
    tactic: str = Field(..., description="Name of the manipulation tactic (e.g., Fear, Urgency, Scarcity, Authority, Curiosity, Greed, Reciprocity, Emotional Manipulation, Social Proof)")
    explanation: str = Field(..., description="Explanation of how the attacker uses this tactic in the text")

class PsychologyOutput(BaseModel):
    agent: str = Field(default="PsychologyAgent", description="Agent identifier")
    manipulation_tactics: List[TacticDetail] = Field(..., description="List of detected manipulation tactics with explanations")
    urgency_level: str = Field(..., description="Urgency level assessment (e.g., LOW, MEDIUM, HIGH)")
    overall_manipulation_summary: str = Field(..., description="Summary of psychological manipulation tactics used")

class EvidenceOutput(BaseModel):
    agent: str = Field(default="EvidenceExtractionAgent", description="Agent identifier")
    urls: List[str] = Field(default_factory=list, description="Extracted URLs")
    emails: List[str] = Field(default_factory=list, description="Extracted email addresses")
    phones: List[str] = Field(default_factory=list, description="Extracted phone numbers")
    crypto_wallets: List[str] = Field(default_factory=list, description="Extracted cryptocurrency wallet addresses")
    companies: List[str] = Field(default_factory=list, description="Extracted company names")
    persons: List[str] = Field(default_factory=list, description="Extracted person names")
    suspicious_keywords: List[str] = Field(default_factory=list, description="Extracted suspicious keywords")
    qr_references: List[str] = Field(default_factory=list, description="Extracted references to QR codes")

class EducationOutput(BaseModel):
    agent: str = Field(default="EducationAgent", description="Agent identifier")
    scam_concepts: List[str] = Field(..., description="List of related educational concepts (e.g., Social Engineering, Phishing, Password Security, Multi-Factor Authentication, Fake Recruiter Scams, QR Scams, Deepfake Scams, AI-Powered Scams)")
    explanation: str = Field(..., description="A simple, educational explanation of how these concepts operate and how to protect against them")

class RecommendationOutput(BaseModel):
    agent: str = Field(default="RecommendationAgent", description="Agent identifier")
    action_items: List[str] = Field(..., description="List of personalized recommendation actions (e.g., Block sender, Report account, Verify identity, Avoid clicking links, Contact bank if necessary, Preserve evidence)")
    urgency_rating: str = Field(..., description="Mitigation urgency rating: LOW, MEDIUM, HIGH, IMMEDIATE")

class ReportOutput(BaseModel):
    agent: str = Field(default="ReportAgent", description="Agent identifier")
    threat_summary: str = Field(..., description="Synthesized summary of the threat")
    risk_score: int = Field(..., description="Final consensus risk score (0-100)")
    scam_category: str = Field(..., description="Final scam classification")
    manipulation_analysis: str = Field(..., description="Synthesized review of the manipulation tactics")
    extracted_evidence: Dict[str, List[str]] = Field(..., description="Grouped extracted evidence lists")
    educational_notes: str = Field(..., description="Synthesized safety & security education context")
    recommendations: List[str] = Field(..., description="Final checklist of action items")
    final_verdict: str = Field(..., description="Executive verdict (e.g., COMPROMISED, SUSPICIOUS, SECURE)")

class PipelineResult(BaseModel):
    session_id: str
    source_type: str
    threat_analysis: ThreatOutput
    psychology: PsychologyOutput
    evidence: EvidenceOutput
    education: EducationOutput
    recommendation: RecommendationOutput
    final_report: ReportOutput
