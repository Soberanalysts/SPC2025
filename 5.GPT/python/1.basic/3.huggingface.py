# from huggingface_hub import InferenceClient
# from dotenv import load_dotenv

# load_dotenv(dotenv_path='../.env')

# client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.3")

# prompt = "너 한국말 할 줄 알아?"
# response = client.text_generation(prompt)

# print(response)


# pip install huggingface_hub
# HUGGINGFACEHUB_API_TOKEN=각자계정의키

from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import os

load_dotenv(dotenv_path='../.env')
hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# 가장 일반적으로 범용적으로 쓸수 있는 언어모델
client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.3", token=hf_token)


prompt = "너 한국어 할 줄 알아?"
response = client.text_generation(prompt)

print(response)
