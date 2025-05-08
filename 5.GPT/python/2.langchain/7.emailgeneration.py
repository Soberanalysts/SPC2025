from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 요청에 대한 SQL 쿼리문을 작성하시오. 설명없이 오직 SQL 를 보여주시오.\n\n{query}"

prompt = PromptTemplate(input_variables=["query"], template=template)
llm = OpenAI(temperature=0.3, max_tokens=1024)

chain = prompt | llm | RunnableLambda(lambda x: {"sql": x.strip()})

example_input = {
    "query": "List the name and email of users who signed up after Jan, 1, 2024"
}
result = chain.invoke(example_input)

print("생성된 쿼리문:", result["sql"])

print('-'*50)

recipients = [
    "개발팀",
    "마케팅팀",
    "인사팀",
    "총무팀",
    "재무팀",
]

topics = [
    "너희의 많은 버그로 인한 사용자 불만",
    "버그로 줄어드는 사용자를 다시 붙잡기 위한 전략",
    "버그를 만드는 개발자를 해고하기 위한 전략",
    "해고이후, 직원들의 동기부여를 위한 다과파티",
    "주주들에게 보내는 서한"
]

# for recipient, topic in recipients:
#     for topic in topics:
#         print(f"\nTo: {recipient} | Topic: {topic}")
for recipient in recipients:
    for topic in topics:
        print(f"\nTo: {recipient} | Topic: {topic}")