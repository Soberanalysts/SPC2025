from dotenv import load_dotenv
from uuid import uuid4

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory


load_dotenv()

llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.1)

memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assitant."),
    MessagesPlaceholder(variable_name="history"),
    {"human", "{input}"}
])

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

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