from backend.agents.base_agent import BaseAgent
from backend.schemas import RecommendationOutput, ThreatOutput, PsychologyOutput, EvidenceOutput

class RecommendationAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_name="RecommendationAgent", output_schema=RecommendationOutput)

    async def analyze(
        self, 
        threat_analysis: ThreatOutput, 
        psychology: PsychologyOutput, 
        evidence: EvidenceOutput
    ) -> RecommendationOutput:
        system_instruction = (
            "You are the RecommendationAgent in the SocialShield AI multi-agent pipeline.\n"
            "Your role is to formulate a specific, actionable security response checklist for the user.\n"
            "Assess the threat category, psychological factors, and forensic artifacts to build a checklist.\n"
            "Choose relevant action items, including:\n"
            "- Block sender\n"
            "- Report account / Report to platform support\n"
            "- Verify identity via independent channels\n"
            "- Avoid clicking links / Do not download attachments\n"
            "- Contact your bank if financial information was exposed\n"
            "- Preserve evidence (take screenshots, save headers, do not delete the communication)\n"
            "- Enable Multi-Factor Authentication (MFA) / Update passwords\n"
            "- Report to authorities (e.g. FTC, IC3, or local cyber police)\n\n"
            "Formulate 4-6 highly specific recommendations ordered by priority.\n"
            "Determine the mitigation urgency_rating: LOW, MEDIUM, HIGH, IMMEDIATE.\n"
            "You MUST respond ONLY in valid JSON matching the schema."
        )

        prompt = f"""
Prior Context:
- Scam Classification: {threat_analysis.scam_category}
- Risk Score: {threat_analysis.risk_score}
- Threat Level: {threat_analysis.threat_level}
- Urgency Level: {psychology.urgency_level}
- Extracted URLs: {len(evidence.urls)}
- Extracted Crypto Wallets: {len(evidence.crypto_wallets)}

Return a valid JSON object matching the RecommendationOutput schema:
{{
  "agent": "RecommendationAgent",
  "action_items": [<action_items_list>],
  "urgency_rating": "<LOW|MEDIUM|HIGH|IMMEDIATE>"
}}
"""
        return await self.generate_response(system_instruction, prompt)
