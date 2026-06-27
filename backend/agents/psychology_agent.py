from backend.agents.base_agent import BaseAgent
from backend.schemas import PsychologyOutput, ThreatOutput
from typing import Dict, Any

class PsychologyAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_name="PsychologyAgent", output_schema=PsychologyOutput)

    async def analyze(self, body: str, threat_analysis: ThreatOutput) -> PsychologyOutput:
        system_instruction = (
            "You are the PsychologyAgent in the SocialShield AI multi-agent pipeline.\n"
            "Your role is to perform a psychological profile of the incoming message to detect manipulative pressure tactics.\n"
            "Identify the presence of any of the following manipulation techniques:\n"
            "- Fear (threats of account closure, legal action, financial loss)\n"
            "- Urgency (demands for immediate action, 24-hour deadlines)\n"
            "- Scarcity (limited availability of prizes, token airdrops)\n"
            "- Authority (claiming to be IRS, PayPal, USPS, executive management, or tech support)\n"
            "- Curiosity (click to see a secret, strange package delivery, or photo link)\n"
            "- Greed (promises of easy money, high-salary simple jobs, free gift cards, free crypto)\n"
            "- Reciprocity (claiming to give you something if you complete a small task)\n"
            "- Emotional Manipulation (romance appeals, guilt trips, sob stories)\n"
            "- Social Proof (claiming 'many others have already done this', fake reviews, popularity claims)\n\n"
            "Analyze how the sender attempts to influence the victim's emotional state.\n"
            "You MUST respond ONLY in valid JSON matching the schema."
        )

        prompt = f"""
Input Message:
\"\"\"
{body}
\"\"\"

Context from ThreatAnalysisAgent:
- Scam Category: {threat_analysis.scam_category}
- Risk Score: {threat_analysis.risk_score}
- Threat Level: {threat_analysis.threat_level}

Return a valid JSON object matching the PsychologyOutput schema:
{{
  "agent": "PsychologyAgent",
  "manipulation_tactics": [
    {{
      "tactic": "<tactic_name>",
      "explanation": "<how_tactic_is_used>"
    }}
  ],
  "urgency_level": "<LOW|MEDIUM|HIGH>",
  "overall_manipulation_summary": "<summary_explanation>"
}}
"""
        return await self.generate_response(system_instruction, prompt)
