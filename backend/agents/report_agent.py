from backend.agents.base_agent import BaseAgent
from backend.schemas import (
    ReportOutput, ThreatOutput, PsychologyOutput, 
    EvidenceOutput, EducationOutput, RecommendationOutput
)

class ReportAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_name="ReportAgent", output_schema=ReportOutput)

    async def analyze(
        self,
        source_type: str,
        threat_analysis: ThreatOutput,
        psychology: PsychologyOutput,
        evidence: EvidenceOutput,
        education: EducationOutput,
        recommendation: RecommendationOutput
    ) -> ReportOutput:
        system_instruction = (
            "You are the ReportAgent, the final consensus synthesis engine in the SocialShield AI multi-agent defense system.\n"
            "Your job is to read the outputs of all preceding agents and compile a comprehensive, polished, and structured cybersecurity incident report.\n"
            "Combine and re-validate data:\n"
            "1. threat_summary: Write a detailed executive summary analyzing the incident.\n"
            "2. risk_score: Determine the final unified risk score (0-100), reconciling any discrepancies.\n"
            "3. scam_category: Set the final classified category name.\n"
            "4. manipulation_analysis: Synthesize how the psychology profile highlights manipulation vectors.\n"
            "5. extracted_evidence: Group all forensic indicators (urls, emails, phones, wallets, companies, persons, keywords, qr) into a dictionary structure.\n"
            "6. educational_notes: Condense the educational notes for presentation.\n"
            "7. recommendations: Final action checklist.\n"
            "8. final_verdict: Return 'SECURE' if risk_score < 25, 'SUSPICIOUS' if risk_score is 25-65, and 'COMPROMISED' if risk_score is 66-100.\n\n"
            "Produce professional, clear, and comprehensive output for the user's dashboard.\n"
            "You MUST respond ONLY in valid JSON matching the schema."
        )

        # Build prompt using JSON representations of previous outputs
        prompt = f"""
Source Type: {source_type}

Agent Outputs:
1. ThreatAnalysisAgent:
{threat_analysis.model_dump_json(indent=2)}

2. PsychologyAgent:
{psychology.model_dump_json(indent=2)}

3. EvidenceExtractionAgent:
{evidence.model_dump_json(indent=2)}

4. EducationAgent:
{education.model_dump_json(indent=2)}

5. RecommendationAgent:
{recommendation.model_dump_json(indent=2)}

Return a valid JSON object matching the ReportOutput schema:
{{
  "agent": "ReportAgent",
  "threat_summary": "<threat_summary_text>",
  "risk_score": <final_risk_score_int>,
  "scam_category": "<final_category>",
  "manipulation_analysis": "<manipulation_analysis_synthesis>",
  "extracted_evidence": {{
    "urls": [<urls>],
    "emails": [<emails>],
    "phones": [<phones>],
    "crypto_wallets": [<wallets>],
    "companies": [<companies>],
    "persons": [<persons>],
    "suspicious_keywords": [<keywords>],
    "qr_references": [<qr_refs>]
  }},
  "educational_notes": "<educational_notes_text>",
  "recommendations": [<action_items>],
  "final_verdict": "<SECURE|SUSPICIOUS|COMPROMISED>"
}}
"""
        return await self.generate_response(system_instruction, prompt)
