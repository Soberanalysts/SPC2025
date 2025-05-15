from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

# 1. 텍스트 문서 읽기기
pdf_filename = './PDF/Python_시큐어코딩_가이드.pdf'
loader = pyPDFLoader(pdf_filename)
documents = loader.load()


print(f"총페이지수: ", len(pages))
print(f"8페이지 내용 샘플:\n{pages[8].page_content}")

