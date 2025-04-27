let allPosts = [];  // 전체 게시글 저장하는 곳

///////////////////////게시글 조회///////////////////////////////
async function fetchPosts() {
    const response = await fetch("http://localhost:3000/user");

    const data = await response.json();
    const tbody = document.getElementById("tbody");

    data.shift();
    allPosts = data;
    renderPosts();   // 처음 게시글도 같이 표시
    renderPagination();
    // for (const post of data) {
    //     const tr = document.createElement("tr");
    //     tr.innerHTML = `
    //         <td>${post.field1}</td>
    //         <td>${post.field2}</td>
    //         <td>${post.field3}</td>
    //         <td>${post.field4}</td>
    //         <td>${post.field5}</td>
    //     `;
    //     tbody.appendChild(tr);
    // }
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
        <td>${post.field1}</td>
        <td>${post.field2}</td>
        <td>${post.field3}</td>
        <td>${post.field4}</td>
        <td>${post.field5}</td>
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
// const paginationContainer = document.getElementById('pagination');

// // 초기 상태
// const totalPages = 10;
// const visiblePages = 5; // 한 번에 보여줄 페이지 수

// let currentPage =1;
// const postsPerPage = 20;

// const indexOfLastPost = currentPage * postsPerPage;
// const indexOfFirstPost = indexOfLastPost - postsPerPage;
// const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

// // const paginate = (pageNumber) => {
// //     // const totalPages = Math.ceil(posts.length / postsPerPage);
// //     if (pageNumber < 1) pageNumber = 1;
// //     if (pageNumber > totalPages) pageNumber = totalPages;
// //     currentPage=pageNumber;
// // };

// function paginate(pageNumber) {
//     if (pageNumber < 1 || pageNumber > totalPages) return; // 범위 벗어나면 무시
//     currentPage = pageNumber;
//     console.log("현재 페이지:", currentPage);
//     renderPagination();
// }

// // const totalPages = Math.ceil(posts.length / postsPerPage);
// const startPage = Math.max(1, Math.floor((currentPage - 1) / 5) * 5 + 1);
// const endPage = Math.min(startPage + 4, totalPages);


// // 페이징 UI 그리는 함수
// function renderPagination() {
//     paginationContainer.innerHTML = ''; // 기존 버튼 초기화

//     const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
//     const endPage = Math.min(totalPages, startPage + visiblePages - 1);

//     // 이전 버튼
//     const prevLi = document.createElement('li');
//     prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
//     prevLi.style.margin = '0 5px';

//     const prevButton = document.createElement('button');
//     prevButton.className = 'page-link';
//     prevButton.innerText = '이전';
//     prevButton.disabled = (currentPage === 1);
//     prevButton.addEventListener('click', () => paginate(currentPage - 1));

//     prevLi.appendChild(prevButton);
//     paginationContainer.appendChild(prevLi);

//     // 페이지 번호 버튼들

//     for (let i = startPage; i <= endPage; i++) {
//         const li = document.createElement('li');
//         li.className = `page-item ${currentPage === i ? 'active' : ''}`;
//         li.style.margin = '0 5px';
    
//         const button = document.createElement('button');
//         button.className = 'page-link';
//         button.innerText = i;
//         button.addEventListener('click', () => paginate(i));
    
//         li.appendChild(button);
//         paginationContainer.appendChild(li);
//     }
//     // 다음 버튼
//     const nextLi = document.createElement('li');
//     nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
//     nextLi.style.margin = '0 5px';

//     const nextButton = document.createElement('button');
//     nextButton.className = 'page-link';
//     nextButton.innerText = '다음';
//     nextButton.disabled = (currentPage === totalPages);
//     nextButton.addEventListener('click', () => paginate(currentPage + 1));

//     nextLi.appendChild(nextButton);
//     paginationContainer.appendChild(nextLi);
// }

  // 최초 렌더링
// renderPagination();

fetchPosts();

document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;

    try {
        const response = await fetch(`http://localhost:3000/search?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}`, {
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