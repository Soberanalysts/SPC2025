from dotenv import load_dotenv
from langchain_core.prompts import ChatOpenAI
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda, RunnablePassthrough

from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

load_dotenv()

llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.1)

memory = ConversationBufferMemory()

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

def chat(message):
    response = conversation.predict(input=message)
    return response

print(chat("안녕"))
print(chat("우리 무슨 일이지"))
print(chat("난 스포츠에 대한 이야기를 하고 싶어?"))
print(chat("근데, 우리 무슨이야기 하고 있었지?"))

prompt = ChatOpenAI(model="gpt-4o-model")