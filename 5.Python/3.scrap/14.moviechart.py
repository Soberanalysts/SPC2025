import requests
from bs4 import BeautifulSoup

URL = "https://www.moviechart.co.kr/rank/realtime/index/image"
headers = {
    'user-Agent' : 'mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) '
    
}

response = requests.get(URL, headers=headers)
if(response.status_code == 200):
    print("정상")
response.raise_for_status() # 오류발생시 예외 발생

soup = BeautifulSoup(response.text, 'html.parser')

# 미션. 
# 제목, 이미지 URL, 상세페이지 링크

movie_cards = soup.select('div.movieBox li.movieBox-Item')
print('무비카드 개수: ', len(movie_cards))

