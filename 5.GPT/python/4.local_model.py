from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

model_name = "mistralai/Mistral-7B-Instruct-v0.3"

tokeinzer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

generator = pipeline("text-generation", model=model, tokenizer=tokeinzer)

prompt = "What are good fitness tips?"
outputs = generator(prompt)

print(outputs[0]["generated_text"])