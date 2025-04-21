document.getElementById("menu").addEventListener("click", function (e) {
    // 실제 클릭된 요소가 li인지 확인
    if (e.target.tagName === "LI") {
      console.log("선택한 메뉴:", e.target.textContent);
      console.log(e);

      console.log("this:", this);          // <ul> (리스너가 붙은 곳)
      console.log("target:", e.target);   // 클릭한 <li> 요소
    }
  });