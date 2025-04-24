uploadPost = () => {
    const input = document.getElementById('input-title').value;
    const textarea = document.getElementById('input-text').value;
    let postList = document.getElementById('card-list');

    postList.innerHTML +=`
            <div class="card col-md-4">
                <div class="card-body mb-4">
                    <a class="card-title" id="input-title">${input}</a>
                    <p class="card-text" id="input-text">${textarea}</p>
                    <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
                    <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
                </div>
            </div>`;
}

deletePost = (btn) => {
    const card = btn.closest(".card");
    card.remove();
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
            <a class="card-title" id="input-title">${title}</a>
            <p class="card-text" id="input-text">${context}</p>
            <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
            <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
        </div>
  `;
}