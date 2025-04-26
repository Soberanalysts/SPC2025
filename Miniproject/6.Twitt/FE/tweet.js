const board = () => {
    const myContainer = document.getElementById('container');
    const item = document.createElement('div');
    item.textContent = '내용';
    item.classList.add('tweet'); // 디자인 속성 추가
    myContainer.appendChild(item);
}

async function fetchPosts() {
    const response = await fetch("http://localhost:3000/board");
    const data = await response.json();
    console.log(data);
    const posts = data;
    const container = document.getElementById('container');

    for (const post of posts) {
        const div = document.createElement("div");
        div.innerHTML = `
                    <div class="tweet">
                        <!-- 트윗 본문과 삭제 버튼 -->
                        <div class="tweet-body-row">
                            <p class="tweet-content">${post.content}.</p>
                        </div>
                        <!-- 작성자 정보 -->
                        <p class="tweet-author">- user1 ${post.user_id} -</p>
                        <!-- 좋아요 영역 -->
                        <div class="tweet-actions">
                                <p><a href="/tweet/login">Log in to like</a></p>
                            <span class="likes-count">Likes: ${post.likes_count}</span>
                        </div>
                    </div>
                `;
        container.appendChild(div);
        }
    }
fetchPosts();
