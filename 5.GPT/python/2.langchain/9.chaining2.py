# from dotenv import load_dotenv
# from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
# from langchain_openai import OpenAI

# from langchain_core.runnables import RunnableLambda

# load_dotenv()

# chat_prompt1 = ChatPromptTemplate.from_template(
#     input_variables = ['product'],
#     # "너는 요리사야. 다음 질문에 대해서 답변해줘. \n\n[질문]: {input}"
#     template="나는 회사 이름을 전문적을 짓는 작명가야, 다음 상품/서비스를 갖는 회사명을 지어줘. 상품명: {product}"
# )
# chat_prompt2= ChatPromptTemplate.from_messages(
#     input_variables = ['company_name'],
#     template="이 회사를 잘 소개할 수 있는 슬로건(또는 catch-phrase)를 만들어줘. 회사명 :{company_name}"
# )

# llm = OpenAI(model="gpt-3.5-turbo", temperature=0.5)

# chain1 = chat_prompt1 | llm | RunnableLambda(lambda x: {"response": x.content})

# response1 = chain1.invoke({"input": "김치는 어떻게 만들어?"})["response"]
# print(response1)

# llm = OpenAI(model="gpt-4o", temperature=0.9)

# chain1 = (
#     chat_prompt1 | llm | RunnableLambda(lambda x: {"company_name": x.strip()}) | chat_prompt2 | llm | RunnableLambda(lambda x: {"company_name": x.strip()})
# )
# response1 = chain1.invoke({"product":"김치"})["catch_phrase"]
# print(response1)

from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda

load_dotenv()

chat_prompt1 = ChatPromptTemplate.from_template(
    input_variables=["product"],
    template="나는 회사 이름을 전문적으로 짓는 작명가야, 다음 상품/서비스를 갖는 회사명을 지어줘. 상품명: {product}"
)

chat_prompt2 = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("너는 회사 슬로건을 만드는 전문가야."),
    HumanMessagePromptTemplate.from_template("이 회사를 잘 소개할 수 있는 슬로건을 만들어줘. 회사명: {company_name}")
])

# 첫 번째 체인만 실행 (테스트용)
llm = OpenAI(model="gpt-3.5-turbo", temperature=0.5)
chain1 = chat_prompt1 | llm | RunnableLambda(lambda x: {"response": x.content})
response1 = chain1.invoke({"product": "김치는 어떻게 만들어?"})["response"]
print("응답1:", response1)

# 전체 체인 실행 (회사 이름 → 슬로건)
llm = OpenAI(model="gpt-4o", temperature=0.9)
chain2 = (
    chat_prompt1 |
    llm |
    RunnableLambda(lambda x: {"company_name": x.content.strip()}) |
    chat_prompt2 |
    llm |
    RunnableLambda(lambda x: {"catch_phrase": x.content.strip()})
)
response2 = chain2.invoke({"product": "김치"})["catch_phrase"]
print("응답2 (슬로건):", response2)
