from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

client = InferenceClient(model="mistral/Mistral-7B-Instruct-v0.3")

prompt = "너 한국말 할 줄 알아?"
response = client.text_generation(prompt)

print(response)
