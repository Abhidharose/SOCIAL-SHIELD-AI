from backend.agents.base_agent import BaseAgent
from backend.schemas import ThreatOutput

class ThreatAnalysisAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_name="ThreatAnalysisAgent", output_schema=ThreatOutput)

    async def analyze(self, source_type: str, sender: str, subject: str, body: str) -> ThreatOutput:
        system_instruction = (
            "You are the ThreatAnalysisAgent, the primary triage specialist of SocialShield AI.\n"
            "Your role is to analyze suspicious messages and classify threats. Detect scams such as:\n"
            "- Phishing (credential theft, fake login pages, lookalike sender address)\n"
            "- Fake Job Scam (remote work offer with high pay, training fees, deposit demands)\n"
            "- OTP Scam (attacker requesting verification codes sent to phone)\n"
            "- Romance Scam (financial requests from online friends/lovers, excuses not to show face)\n"
            "- Impersonation (pretending to be government, bank, boss, tech support)\n"
            "- Investment Fraud (get rich quick, crypto tokens, guarantees, high returns)\n"
            "- None (safe, normal message)\n\n"
            "Calculate: \n"
            "1. risk_score: integer 0-100 indicating danger level.\n"
            "2. threat_level: LOW (0-25), MEDIUM (26-50), HIGH (51-75), or CRITICAL (76-100).\n"
            "3. confidence: float 0.0-1.0 representing your confidence.\n"
            "4. reasoning: short summary of clues/reasoning.\n\n"
            "You MUST respond ONLY in valid JSON matching the schema."
        )

        prompt = f"""
Analyze the following input:
Source Type: {source_type}
Sender: {sender or "Unknown"}
Subject: {subject or "N/A"}
Message Body:
\"\"\"
{body}
\"\"\"

Return a valid JSON object matching the ThreatOutput schema:
{{
  "agent": "ThreatAnalysisAgent",
  "scam_category": "<scam_category>",
  "risk_score": <risk_score_int>,
  "threat_level": "<threat_level>",
  "confidence": <confidence_float>,
  "reasoning": "<reasoning>"
}}
"""
        return await self.generate_response(system_instruction, prompt)
