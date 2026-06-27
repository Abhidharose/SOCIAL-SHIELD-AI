from backend.agents.base_agent import BaseAgent
from backend.schemas import EducationOutput, ThreatOutput, EvidenceOutput

class EducationAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_name="EducationAgent", output_schema=EducationOutput)

    async def analyze(self, body: str, threat_analysis: ThreatOutput, evidence: EvidenceOutput) -> EducationOutput:
        system_instruction = (
            "You are the EducationAgent in the SocialShield AI multi-agent pipeline.\n"
            "Your role is to educate users on the threat mechanics they have encountered.\n"
            "Identify the relevant concepts from this list:\n"
            "- Social Engineering\n"
            "- Phishing\n"
            "- Password Security\n"
            "- Multi-Factor Authentication\n"
            "- Fake Recruiter Scams\n"
            "- QR Scams\n"
            "- Deepfake Scams\n"
            "- AI-Powered Scams\n\n"
            "Formulate a friendly, plain-language educational breakdown. Explain:\n"
            "1. How this style of attack operates technically and psychologically.\n"
            "2. Why the extracted indicators (keywords, URLs, etc.) trigger security red flags.\n"
            "3. Best practices to protect themselves against these specific threats.\n\n"
            "You MUST respond ONLY in valid JSON matching the schema."
        )

        prompt = f"""
Input Message Snippet:
\"\"\"
{body[:300]}...
\"\"\"

Prior Context:
- Scam Classification: {threat_analysis.scam_category}
- Threat Level: {threat_analysis.threat_level}
- Extracted Keywords: {", ".join(evidence.suspicious_keywords)}
- QR References Found: {len(evidence.qr_references) > 0}

Return a valid JSON object matching the EducationOutput schema:
{{
  "agent": "EducationAgent",
  "scam_concepts": [<relevant_scam_concepts_list>],
  "explanation": "<educational_explanation_text>"
}}
"""
        return await self.generate_response(system_instruction, prompt)
