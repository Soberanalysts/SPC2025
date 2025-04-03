# CSS(Cascade Style Sheet) 강의내용 

## CSS 셀렉터
---
tag, ===> <>
id, ===> #
class ===> .

==========================

#### self-Closing Tags
---


예시) <img>, <input>





RGB ===> 빛의 3원색

------------

box모델
Content를 감싸고 있는 구성요소
패딩
마진
보더

-------------

F12 / Ctrl+Shift+I 크롬 개발자 도구

ctrl + shift + c



floating 속성(떠있음)

사이트 대부분 div로 감싸져 있음
좋은 사이트는 시맨틱태그로 감싸져 있음

### 시맨틱태그
---
기능상 영향을 미치지 않으나 의미를 가지고 있는 태그
콘텐츠의 의미를 나타내는 태그로, 개발자와 브라우저, 검색엔진, 보조기기 등이 구조를 더 잘 이해할 수 있게 도와주는 태그

✅ 시맨틱 태그가 SEO에 좋은 이유

1. 검색엔진이 페이지 구조를 더 잘 이해함
Google, Bing 같은 검색엔진 크롤러는 HTML을 읽어서 페이지 내용을 분석하는데,

<div>는 “이게 뭐하는 영역인지” 알 수 없음 ❌

반면 <header>, <nav>, <article> 등은 명확한 의미를 전달함 ✅

2. 중요한 콘텐츠를 파악하기 쉬움
검색엔진은 콘텐츠 중 어떤 부분이 핵심인지 판단해야 해요.
시맨틱 태그는 콘텐츠의 우선순위와 역할을 알려주기 때문에,
검색 결과에 더 적절한 요약/미리보기를 제공할 수 있어요.

예를 들어:

<main>에 핵심 콘텐츠

<article>에 독립적인 글

<nav>는 메뉴 (탐색용이니 검색엔진은 중요 콘텐츠에서 제외할 수도 있음)

3. 접근성 + SEO = 상호 보완
접근성이 좋은 사이트는 사용자 만족도가 높고, 이는 간접적인 SEO 신호로 이어져요.

시맨틱 태그를 쓰면 화면 낭독기도 내용을 잘 설명해줘서 사용자 체류시간이 늘어날 수 있음

검색엔진은 이런 사용자 행동도 긍정적인 평가로 반영

### 로렘 입숨
---



div 등등 대부분의 태그들은 블럭요서

span 같은것은 인라인 요소



id가 유닉한 가장 디테일한것
class가 그룹에 

적용순서
1. inline
2. ID 선택자
3. 클래스, 속성, 가상클래스 선택자
4. 태그(요소) 선택자
5. 전체선택자 *
6. 중요도





#### container 아래에 있는 item
.container .item {
    float: left;
    width: 100px;
}
#### container 바로 아래에 있는 item
.container> .item {

}


### 폰트학습
---
타이포그래피
세리프(Serif)
센세리프(sans-serif)



### 이미지 불러오기
해당 사이트 -> url 가져오기(ctrl + shift + c)

넷플릭스 이미지 url
https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web_tall_panel/KR-ko-20250331-TRIFECTA-perspective_24ade3c6-d3bb-42ca-bcf4-7e931555c963_large.jpg

### keyframes
---
페이지 한장씩 넘기면서 보여주는 애니메이션 컨셉



### SEO
div가 아닌 header body footer로 나눠야 SEO 검색최적화에 좋다


### 오픈소스 라이센스(면접용)
MIT, Apache, GPL 계열


### checksum
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

CDN에 아이콘에 특이한 문자열이 있는 이유?

체크섬

무결성 검증(다운받을때 악성코드로 인해 변조유무 확인)

나의 파일에 hash를 계산해서 적어둔것
내 5.3.3을 내 원본 출처가 아닌 다른곳에서 가져왔으면?


doc <- 워드문서
docx <- 워드문서의 xml포맷

xls <- 엑셀
xlsx <- 엑셀의 xml포맷

jpg <- 
jpeg <- 


png <- 
docx <- 



