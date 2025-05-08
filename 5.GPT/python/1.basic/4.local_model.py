# from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
# from dotenv import load_dotenv

# load_dotenv(dotenv_path='../.env')

# model_name = "mistralai/Mistral-7B-Instruct-v0.3"

# tokeinzer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

# generator = pipeline("text-generation", model=model, tokenizer=tokeinzer)

# prompt = "What are good fitness tips?"
# outputs = generator(prompt)

# print(outputs[0]["generated_text"])

# pip install transformers 
# ~/.cache/huggingface 디렉토리 안에 모델들이 다운로드 됨
# pip install protobuf

# from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
# from dotenv import load_dotenv
# import os
# import torch

# load_dotenv(dotenv_path='../.env')
# hf_token = os.getenv("HUGGINGFACE_API_TOKEN")
# model_name = "mistralai/Mistral-7B-Instruct-v0.3"

# # model불러오기
# tokenizer = AutoTokenizer.from_pretrained(model_name, token=hf_token)
# model= AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto", token=hf_token )

# # 파이프라인 생성
# generator = pipeline("text-generation", model=model, tokenizer=tokenizer)


# # 질문
# prompt="what are good fitness tips?"
# outputs = generator(prompt)

# print(outputs[0]["generated_text"])

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv
import os
import torch
# Load .env file
load_dotenv(dotenv_path='../.env')
hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

model_name = "mistralai/Mistral-7B-Instruct-v0.3"

# Load model & tokenizer with proper token
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=hf_token)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, use_auth_token=hf_token)

generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# Prompt
prompt = "what are good fitness tips?"
outputs = generator(prompt, max_length=100)

print(outputs[0]["generated_text"])