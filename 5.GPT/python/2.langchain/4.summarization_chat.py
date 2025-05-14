from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()
# template = "다음의 글을 3문장으로 요약하시오:\n\n{article}"
template = "다음의 글을 3문장으로 요약하시오. 각 줄은 50글자 이하로 작성하시오: {article}"

prompt = PromptTemplate(
    input_variables=["aritcle"],
    template=template
)
llm = OpenAI(temperature=0.5)

chain = prompt | llm | RunnableLambda(lambda x: {"response": x.strip()})
input_text = {
    "article": """파리생제르맹(PSG·프랑스)이 아스널(잉글랜드)을 꺾고 유럽축구연맹(UEFA) 챔피언스리그 결승에 올랐다. 이강인은 교체 명단에 이름을 올렸으나 기회는 얻지 못했다.

PSG는 8일(한국 시간) 프랑스 파리의 파르크 데 프랭스에서 치러진 챔피언스리그 준결승 2차전 홈 경기에서 아스널을 2대1로 꺾었다. 지난달 30일 1차전 원정 경기에서 1대0으로 이겼던 PSG는 1·2차전 합계 점수 3-1로 결승으로 향했다.

PSG는 전반 27분 파비안 루이스의 선제골로 앞서갔다. 프리킥에서 아스널 수비가 걷어낸 공을 루이스가 잡아 가슴으로 공을 ‘툭’ 친 뒤 왼발로 차 넣었다. 여기에 아슈라프 하키미가 후반 27분 우스만 뎀벨레의 도움을 받아 오른발슛으로 추가골을 넣었다. 아스널은 후반 31분 부카요 사카가 한 골을 만회했지만 역전에는 실패했다.

PSG로서는 5년 만의 재도전이다. PSG는 2019-2020시즌 결승에 올랐으나 바이에른 뮌헨(독일)에 0대1로 져 준우승에 그쳤다. 상대는 전날 바르셀로나(스페인)를 1·2차전 합계 점수 7-6으로 누르고 결승에 진출한 인터밀란(이탈리아)이다. 두 팀은 오는 6월 1일 오전 4시 독일 뮌헨의 알리안츠 아레나에서 대회 우승을 놓고 최후의 한판을 벌인다.
"""
}

result = chain.invoke(input_text)

print(f"최종결과: {result["response"]}")

# from langchain_core.prompts import PromptTemplate
# from langchain_openai import OpenAI
# from dotenv import load_dotenv
# from langchain_core.runnables import RunnableLambda

# load_dotenv()

# template = "Summarize the following article in 3 sentences:\n\n{article}"
# prompt = PromptTemplate(
#     input_variables=["article"],
#     template=template
# )

# llm = OpenAI(temperature=0.5)

# chain = prompt | llm | RunnableLambda(lambda x: {"response": x.strip()})

# input_text = {
#     "article": """Paris Saint-Germain (PSG, France) defeated Arsenal (England) and won the UEFA Champions League finals, but Lee Kang-in was named on the list of replacements but did not get a chance.

# PSG defeated Arsenal 2-1 in the second leg of the Champions League semi-finals in Paris on the 8th. Having won 1-0 in the first leg, PSG advanced to the final with a total score of 3-1.

# Fabian Ruiz scored the opening goal in the 27th minute, and Achraf Hakimi added another. Although Arsenal scored once, it wasn't enough. PSG now faces Inter Milan in the final on June 1."""
# }

# result = chain.invoke(input_text)

# print(f"Final result: {result['response']}")