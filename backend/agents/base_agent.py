import json
import logging
import asyncio
from typing import Type, TypeVar, Optional
import google.generativeai as genai
from pydantic import BaseModel
from backend.config import settings

T = TypeVar('T', bound=BaseModel)

logger = logging.getLogger("SocialShield.BaseAgent")

class BaseAgent:
    def __init__(self, agent_name: str, output_schema: Type[T]):
        self.agent_name = agent_name
        self.output_schema = output_schema
        self.model_name = settings.gemini_model

        # Configure API key if present
        if settings.gemini_api_key:
            genai.configure(api_key=settings.gemini_api_key)
        else:
            logger.warning(f"GEMINI_API_KEY is not configured. Agent {self.agent_name} will fail execution.")

    async def generate_response(self, system_instruction: str, prompt: str) -> T:
        """
        Sends instructions and prompt to Google Gemini API and parses the structured JSON output.
        """
        if not settings.gemini_api_key:
            raise ValueError(
                f"GEMINI_API_KEY is missing. Please set your GEMINI_API_KEY in backend/.env "
                f"to enable live agent scanning."
            )

        # Set up generation config to require JSON output
        generation_config = {
            "response_mime_type": "application/json",
            "temperature": 0.2,
        }

        # Initialize model
        model = genai.GenerativeModel(
            model_name=self.model_name,
            generation_config=generation_config,
            system_instruction=system_instruction
        )

        max_retries = 3
        backoff_delay = 1.0

        for attempt in range(1, max_retries + 1):
            try:
                # Call Gemini async API
                logger.info(f"[{self.agent_name}] Sending prompt to model {self.model_name} (Attempt {attempt}/{max_retries})...")
                response = await model.generate_content_async(prompt)
                
                response_text = response.text
                if not response_text:
                    raise ValueError("Gemini returned an empty response.")
                
                # Parse response into the Pydantic schema
                logger.debug(f"[{self.agent_name}] Raw response: {response_text}")
                
                # Strip potential markdown fences if present
                clean_json_str = response_text.strip()
                if clean_json_str.startswith("```json"):
                    clean_json_str = clean_json_str[7:]
                if clean_json_str.endswith("```"):
                    clean_json_str = clean_json_str[:-3]
                clean_json_str = clean_json_str.strip()

                parsed_data = self.output_schema.model_validate_json(clean_json_str)
                return parsed_data

            except Exception as e:
                logger.error(f"[{self.agent_name}] Error on attempt {attempt}: {str(e)}")
                if attempt == max_retries:
                    raise e
                await asyncio.sleep(backoff_delay)
                backoff_delay *= 2.0

        raise RuntimeError(f"[{self.agent_name}] Failed to generate response after {max_retries} attempts.")
