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





#### container 아래에 있는 item*/
.container .item {
    float: left;
    width: 100px;
}
#### 
.container> .item {

}