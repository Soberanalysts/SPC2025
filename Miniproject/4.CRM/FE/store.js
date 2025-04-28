let allPosts = [];  // 전체 게시글 저장하는 곳

///////////////////////게시글 조회///////////////////////////////
async function fetchPosts() {
    const response = await fetch("http://localhost:3000/api/store");

    const data = await response.json();

    allPosts = data;
    console.log("store",response);
    renderPosts();   // 처음 게시글도 같이 표시
    renderPagination();

}
function renderPosts() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ''; // 기존 내용 비우기

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지 게시글

    for (const post of currentPosts) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${post.Id}</td>
        <td>${post.Name}</td>
        <td>${post.Type}</td>
        <td>${post.Address}</td>
        `;
        tbody.appendChild(tr);
    }

}

//////////////////////페이징////////////////////////

const postsPerPage = 20;
let currentPage = 1;

// 페이지 이동 함수
function paginate(pageNumber) {
    if (pageNumber < 1 || pageNumber > Math.ceil(allPosts.length / postsPerPage)) return;
    currentPage = pageNumber;
    renderPosts();       
    renderPagination();  
  }
  
  // 페이지네이션 그리기
  function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
  
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(5 / 2));
    const endPage = Math.min(totalPages, startPage + 4);

    // 이전
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    const prevButton = document.createElement('button');
    prevButton.className = 'page-link';
    prevButton.innerText = '이전';
    prevButton.disabled = (currentPage === 1);
    prevButton.addEventListener('click', () => paginate(currentPage - 1));
    prevLi.appendChild(prevButton);
    paginationContainer.appendChild(prevLi);

    // 페이지 번호
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${currentPage === i ? 'active' : ''}`;
        const button = document.createElement('button');
        button.className = 'page-link';
        button.innerText = i;
        button.addEventListener('click', () => paginate(i));
        li.appendChild(button);
        paginationContainer.appendChild(li);
    }

    // 다음
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    const nextButton = document.createElement('button');
    nextButton.className = 'page-link';
    nextButton.innerText = '다음';
    nextButton.disabled = (currentPage === totalPages);
    nextButton.addEventListener('click', () => paginate(currentPage + 1));
    nextLi.appendChild(nextButton);
    paginationContainer.appendChild(nextLi);
}


fetchPosts();

document.getElementById('storeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const store = document.getElementById('store').value;
    try {
        const response = await fetch(`http://localhost:3000/searchstore?store=${encodeURIComponent(store)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log('서버 응답:', result);
    } catch (error) {
        console.error('에러 발생:', error);
    }
});