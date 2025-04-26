uploadPost = () => {
    const input = document.getElementById('input-title').value;
    const textarea = document.getElementById('input-text').value;
    const image = document.getElementById('input-file');

    const file = image.files[0]; // 사용자가 선택한 첫 번째 파일

    const reader = new FileReader();
    console.log(reader);

    reader.onload = (e) =>  {
    const imageDataUrl = e.target.result; // base64 인코딩된 이미지 데이터
    let postList = document.getElementById('card-list');
    postList.innerHTML +=`
            <div class="card col-md-4">
                <div class="card-body mb-4">
                    <img src="${imageDataUrl}" class="card-img-top" alt="...">
                    <p class="card-title" id="input-title">${input}</p>
                    <p class="card-text" id="input-text">${textarea}</p>
                    <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
                    <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
                </div>
            </div>`;
        };
    reader.readAsDataURL(file); // ✅ 이미지 파일을 base64 URL로 변환

    fetch("/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: "${file}" }),
    })
}

deletePost = (btn) => {
    const card = btn.closest(".card");
    
    // fetch("/delete", {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ filename: "216bbb95741d2052441368c60ca1a4226b25fcf710d7139faba4195e82b0fd06.png" }),
    //   });

      
    card.remove();
}


updatePost = (btn) => {
    const card = btn.closest(".card");

    const title = card.querySelector('.card-title').textContent;
    const context = card.querySelector('.card-text').textContent;
    const img = card.querySelector('.card-img-top');
    // console.log('이미지',img);
    card.innerHTML = `
        <div class="card-body mb-4">
            <input class="form-control mb-2" value="${title}" id="edit-title">
            <textarea class="form-control mb-2" rows="2" id="edit-text">${context}</textarea>
            <input type="file" id="input-file" value=${img} class="form-control">
            <button onclick="savePost(this)" class="btn btn-success">저장</button>
        </div> 
    `;

}
savePost = (btn) => {
    const card = btn.closest(".card");

    let title = card.querySelector('#edit-title').value;
    let context = card.querySelector('#edit-text').value; 
    let imageDataUrl = card.querySelector('#input-file').value; 
        console.log('이미지',imageDataUrl);

    card.innerHTML = `
        <div class="card-body mb-4">
            <img src="${imageDataUrl}" class="card-img-top" alt="...">
            <p class="card-title" id="input-title">${title}</p>
            <p class="card-text" id="input-text">${context}</p>
            <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
            <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
        </div>
  `;
}