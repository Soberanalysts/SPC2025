from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

# 1. 텍스트 문서 읽기기
PERSIST_DIR = "./chroma_db"
COLLECTION_NAMES = ["secure_coding_python", "travel"]

embeddings = OpenAIEmbeddings()

store = Chroma(
    collection_name = COLLECTION_NAMES,
    embedding_function = embeddings,
    persist_directory = PERSIST_DIR
)

count = store._collection.count()
print(f"저장된 문서 개수: {count}")

results = store._collection.get()
ids = results["ids"]
docs = results["documents"]
metadatas = results["metadatas"]

for i, doc in enumerate(docs):
    print(f"[문서]: {i+1}")
    print(f"[문서ID]: {ids[i]}")
    print(f"[내용(앞100글자)]: {doc[:100]}")
    print(f"[메타데이터]]: {doc.metadatas}")

print("\n\n------------\n\n")
