## Javascript
---

웹에서 넷스케이프 네비게이터에서만 돌아감

표준화단체 ESMAScript 표준을 수립하게됨

에크마 스크립트 (ECMA Script) = javascript



js의 목적 : 브라우저에서만 돌아감(여러 기능 추가하면서 백엔드구현까지 되게됨)

C, Java, Python 이 모든건 다 브라우저에서 돌아가지 않음

Node.js <-- 백엔드용 js

렌더링(rendering)

JS엔진(VM) 쪼끄만한 가상의 연산장치 (CPU/MEM)


### 반복문 표현법
---
1. 
for(let i=0;i<3;i++) {

} 
2.
reduce

3.
foreach

===============
console <-- 개발자 도구창(디버깅창)
document <-- 문서.. DOM문서
navigator <-- 브라우저
location <-- 브라우저의 주소창
window.width
history.back <-- 브라우저의 방문기록 (뒤로가기)

global object(전역객체)


글자를 숫자로 변환하는 함수

ParseInt

Number(문자)


innerHTML <-- html
innerText <-- 
textContent <-- 순수 글자만



이벤트

함수의 목적? 코드 재사용

Dom은 페이지를 받아왔을때 한번 그리고 끝난다

함수의 목적?
1. 이름이 있는 평범한 함수
2. 이름이 없는 익명함수
3. 화살표함수



하위호환성 유지

JAVA같은 애플리케이션은???

내가 만들고, 그때마다 패키징. 실행하게 만듦

java7 ==> 배포
java9 ====> 배포...

과거버전의 페이지가 존재하면서 오래동안 쓰임

브라우저 버전이 바뀌면서?
내가 쓰는 태그, 내가 쓰는 속성, 내가쓰는 js문법이 
어느 브라우저에서 지원 되는지 유무 신경쓰기
