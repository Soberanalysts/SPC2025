from dotenv import load_dotenv

from langchain_openai import OpenAI

from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools

llm = OpenAI()

tools = load_tools(['goolge-search'])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

result = agent.invoke({"input": "서울"})
print(result["output"])