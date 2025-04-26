uploadPost = () => {
    const input = document.getElementById('input-title').value;
    const textarea = document.getElementById('input-text').value;
    const image = document.getElementById('input-file');

    const file = image.files[0]; // 사용자가 선택한 첫 번째 파일
    const reader = new FileReader();

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
}

deletePost = (btn) => {
    const card = btn.closest(".card");      
    card.remove();
}


updatePost = (btn) => {
    const card = btn.closest(".card");

    const title = card.querySelector('.card-title').textContent;
    const context = card.querySelector('.card-text').textContent;
    const img = card.querySelector('.card-img-top')?.src;
    console.log('이미지',img);
    card.innerHTML = `
        <div class="card-body mb-4">
            <input class="form-control mb-2" value="${title}" id="edit-title">
            <textarea class="form-control mb-2" rows="2" id="edit-text">${context}</textarea>
            <input type="file" id="input-file" class="form-control">
            <img id="original-img" src="${img}" style="display:none;" />
            <button onclick="savePost(this)" class="btn btn-success">저장</button>
        </div> 
    `;

}
// savePost = (btn) => {
//     const card = btn.closest(".card");

//     let title = card.querySelector('#edit-title').value;
//     let context = card.querySelector('#edit-text').value; 
//     let imageDataUrl = card.querySelector('#input-file').value; 
//         console.log('이미지',imageDataUrl);

//     card.innerHTML = `
//         <div class="card-body mb-4">
//             <img src="${imageDataUrl}" class="card-img-top" alt="...">
//             <p class="card-title" id="input-title">${title}</p>
//             <p class="card-text" id="input-text">${context}</p>
//             <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
//             <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
//         </div>
//   `;
// }

savePost = (btn) => {
    const card = btn.closest(".card");
    const title = card.querySelector('.card-title').textContent;
    const context = card.querySelector('.card-text').textContent;

    const fileInput = card.querySelector('#input-file');
    const file = fileInput.files[0];
    let imageTag = '';

    // 이미지 변경 안 했을 경우
    if (!file) {
        const existingImg = card.querySelector('#original-img');
        const src = existingImg?.src;
        imageTag = `<img src="${src}" class="card-img-top" />`;
        
        card.innerHTML = `
        <div class="card-body mb-4">
        ${imageTag}
        <a class="card-title">${title}</a>
        <p class="card-text">${context}</p>
        <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
        <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
        </div>
    `;


    } else {
        // 새 이미지 미리보기 생성
        const reader = new FileReader();
        reader.onload = (e) => {
            const newSrc = e.target.result;
            imageTag = `<img src="${newSrc}" class="card-img-top" />`;
            
            card.innerHTML = `
            <div class="card-body mb-4">
            ${imageTag}
            <a class="card-title">${title}</a>
            <p class="card-text">${context}</p>
            <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
            <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
            </div>
        `;
            // 최종 카드 갱신
            // renderCard();
        };
        reader.readAsDataURL(file);
        return; // 이미지 비동기 처리 끝나면 나중에 renderCard 호출
    }

    // 이미지 없거나 기존 이미지 → 즉시 렌더링
    // renderCard();

    function renderCard() {
    card.innerHTML = `
        <div class="card-body mb-4">
        ${imageTag}
        <a class="card-title">${title}</a>
        <p class="card-text">${context}</p>
        <button type="button" onclick="updatePost(this)" class="btn btn-info">수정</button>
        <button type="button" onclick="deletePost(this)" class="btn btn-warning">삭제</button>
        </div>
    `;
    }
}