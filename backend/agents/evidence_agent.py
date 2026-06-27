from backend.agents.base_agent import BaseAgent
from backend.schemas import EvidenceOutput, ThreatOutput, PsychologyOutput

class EvidenceExtractionAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_name="EvidenceExtractionAgent", output_schema=EvidenceOutput)

    async def analyze(self, body: str, threat_analysis: ThreatOutput, psychology: PsychologyOutput) -> EvidenceOutput:
        system_instruction = (
            "You are the EvidenceExtractionAgent in the SocialShield AI multi-agent pipeline.\n"
            "Your role is to scan the text of a message and extract forensic artifacts and indicators of compromise (IoC).\n"
            "Extract elements into these lists:\n"
            "1. urls: Any HTTP/HTTPS links, domains, or suspicious lookalike URL strings (e.g. paypa1-auth.xyz).\n"
            "2. emails: Any email addresses found in headers or message body.\n"
            "3. phones: Phone numbers, short codes, or messenger IDs.\n"
            "4. crypto_wallets: Cryptocurrency wallet addresses (e.g. BTC, ETH, SOL addresses or ENS names).\n"
            "5. companies: Brand names, bank names, or company names mentioned (legitimate or spoofed).\n"
            "6. persons: Names of individuals mentioned or claimed by the sender.\n"
            "7. suspicious_keywords: Single words or short phrases that carry high risk or manipulation signatures (e.g. 'verify', 'instant refund', 'suspend').\n"
            "8. qr_references: Any text referencing scanning a QR code, barcode, or image link (e.g., 'scan the code below', 'QR code').\n\n"
            "If none are found for a category, return an empty list [].\n"
            "You MUST respond ONLY in valid JSON matching the schema."
        )

        prompt = f"""
Input Message:
\"\"\"
{body}
\"\"\"

Prior Context:
- Scam Classification: {threat_analysis.scam_category}
- Threat Level: {threat_analysis.threat_level}
- Urgency Level: {psychology.urgency_level}
- Primary Tactics: {", ".join([t.tactic for t in psychology.manipulation_tactics])}

Return a valid JSON object matching the EvidenceOutput schema:
{{
  "agent": "EvidenceExtractionAgent",
  "urls": [<extracted_urls>],
  "emails": [<extracted_emails>],
  "phones": [<extracted_phones>],
  "crypto_wallets": [<extracted_wallets>],
  "companies": [<extracted_companies>],
  "persons": [<extracted_persons>],
  "suspicious_keywords": [<extracted_keywords>],
  "qr_references": [<extracted_qr_references>]
}}
"""
        return await self.generate_response(system_instruction, prompt)
