from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 문장을 한국어로 번역해줘 : \n\n{sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)
llm = OpenAI(
    temperature=0.3,
    max_tokens=1024,
    )

chain = prompt | llm | RunnableLambda(lambda x : {'translated': x.strip()})

result = chain.invoke({'sentence': """Many people underestimate the power of a simple walk. Walking just 30 minutes a day can have a significant impact on both physical and mental health. It strengthens the heart, improves circulation, and can even lower the risk of diseases such as diabetes and high blood pressure.

Besides the physical benefits, walking is also good for your mind. It can reduce stress, boost your mood, and increase creativity. Some people find that a walk helps them think more clearly or solve problems they’ve been stuck on.

Best of all, walking requires no special equipment or gym membership. Just put on a comfortable pair of shoes and step outside. Whether you walk alone, with a friend, or while listening to music, it's a simple habit that can lead to a healthier, happier life."""})

print('한글번역본: ', result['translated'])