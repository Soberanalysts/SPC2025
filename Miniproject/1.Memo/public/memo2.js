uploadPost = () => {
    const input = document.getElementById('input-title').value;
    const textarea = document.getElementById('input-text').value;
    const postList = document.getElementById('card-list');

    const cardCount = postList.querySelectorAll(".card").length + 1; // 지금 추가할 것까지 포함
    console.log("카드갯수",cardCount);
    
    if (cardCount <= 3) {
        postList.className = "row row-cols-3";
    } else {
        postList.className = "row row-cols-2";
    }
    // const colClass = cardCount <= 3 ? "col-md-4" : "col-6"; // 3개까지는 3열, 그 이상은 2열
    console.log(postList.className);
 
    // 🔹 1. 요소 만들기
    // const col = document.createElement('div');
    // col.className = 'col';

    // const card = document.createElement('div');
    // card.className = 'card w-100';

    // const cardBody = document.createElement('div');
    // cardBody.className = 'card-body';

    // // 🔹 2. 내용 넣기
    // const title = document.createElement('a');
    // title.className = 'card-title';
    // title.textContent = input;

    // const text = document.createElement('p');
    // text.className = 'card-text';
    // text.textContent = textarea;

    // const updateBtn = document.createElement('button');
    // updateBtn.className = 'btn btn-info';
    // updateBtn.textContent = '수정';
    // updateBtn.onclick = () => updatePost(updateBtn);

    // const deleteBtn = document.createElement('button');
    // deleteBtn.className = 'btn btn-warning';
    // deleteBtn.textContent = '삭제';
    // deleteBtn.onclick = () => deletePost(deleteBtn);

    // // 🔹 3. 조립하기
    // cardBody.appendChild(title);
    // cardBody.appendChild(text);
    // cardBody.appendChild(updateBtn);
    // cardBody.appendChild(deleteBtn);

    // card.appendChild(cardBody);
    // col.appendChild(card);
    // postList.appendChild(col);
}

deletePost = (btn) => {
    const postList = document.getElementById('card-list');
    const card = btn.closest(".col");
    card.remove();
    const cardCount = postList.querySelectorAll(".col").length - 1; // 지금 추가할 것까지 포함
    console.log("카드갯수",cardCount);
    
    if (cardCount <= 3) {
        postList.className = "row row-cols-3";
    } else {
        postList.className = "row row-cols-2";
    }
    console.log(postList.className);

}


updatePost = (btn) => {
    const card = btn.closest(".card");
    let title = card.querySelector('.card-title').textContent;
    let context = card.querySelector('.card-text').textContent;

    card.innerHTML = `
        <div class="card-body mb-4">
            <input class="form-control mb-2" value="${title}" id="edit-title">
            <textarea class="form-control mb-2" rows="2" id="edit-text">${context}</textarea>
            <button onclick="savePost(this)" class="btn btn-success">저장</button>
        </div> 
 
    `;

}
savePost = (btn) => {
    const card = btn.closest(".card");
    let title = card.querySelector('#edit-title').value;
    let context = card.querySelector('#edit-text').value; 

    card.innerHTML = `
        <div class="card-body mb-4">
            <a class="card-title" id="card-title">${title}</a>
            <p class="card-text" id="card-text">${context}</p>
            <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
            <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
        </div>
  `;
}