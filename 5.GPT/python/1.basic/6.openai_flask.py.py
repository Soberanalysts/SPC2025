from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv
from langchain_openai import OpenAI
from flask import Flask, request, jsonify

# Load .env file
load_dotenv(dotenv_path='../.env')
app = Flask(__name__)
llm= OpenAI(temperature=0.9)


prompt = '회사 이름을 작명하고 싶어, 나의 회사는 아케이드 게임을 만드는 회사야.'


# @app.route("/generate", methods=["POST"])
# def generate():
#     data = request.get_json()
#     prompt = data.get("prompt", "")

#     result = llm.generate([prompt]*5)
#     results = []
#     for data in result.generations:
#         print(data[0].text)
#         results.append(data[0].text.strip())

#     return jsonify(({"response":results}))

@app.route("/api/company_name", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")

    result = llm.generate([prompt]*5)
    results = []
    for data in result.generations:
        print(data[0].text)
        results.append(data[0].text.strip())

    return jsonify(({"response":results}))

if __name__ == "__main__":
    app.run()