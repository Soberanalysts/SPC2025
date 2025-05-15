from dotenv import load_dotenv
from uuid import uuid4

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv()

llm = ChatOpenAI(model='gpt-4o-mini')

prompt = ChatPromptTemplate.from_messages([
    ("system", "나는 친절한 AI 챗봇이야"),
    MessagesPlaceholder(variable_name="history"),
    {"human", "{input}"}
])

chain = prompt | llm | StrOutputParser()

memory = ChatMessageHistory()

chatbot = RunnableWithMessageHistory(
   chain,
   lambda _: memory,
   input_messages_key="input",
   history_messages_key="history" 
)

session_id="default"

print("AI챗봇에 오신 것을 환영합니다. '종료' 라고 입력하면 대화를 종료합니다.")
while True:
    user_input = input("나: ")
    if user_input.lower() in ["종료", "exit", "quit"]:
        print("대화를 종료합니다.")
        break      

    response = chatbot.invoke({"input": user_input}, config={"configurable": {"session_id": session_id}})
    print("AI: ", response)

def chat(message):
    response = chain.invoke({
        "input": message,
        "history": memory.messages
    })
    response = conversation.predict(input=message)
    return response

print(chain_with_memory.invoke({"input":"안녕"}, config={"configurable": {"session_id":"user1"}}))
print(chain_with_memory.invoke({"input":"우리 무슨 이야기를 할까?"}, config={"configurable": {"session_id":"user2"}}))
print(chain_with_memory.invoke({"input":"난 스포츠에 대한 이야기를 하고싶어?"}, config={"configurable": {"session_id":"user1"}}))
print(chain_with_memory.invoke({"input":"근데, 우리 무슨 이야기 하고 있었지?"}, config={"configurable": {"session_id":"user1"}}))

print(chat("우리 무슨 일이지"))
print(chat("난 스포츠에 대한 이야기를 하고 싶어?"))
print(chat("근데, 우리 무슨이야기 하고 있었지?"))

prompt = ChatOpenAI(model="gpt-4o-model")