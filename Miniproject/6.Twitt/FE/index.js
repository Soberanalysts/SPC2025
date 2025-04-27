import { navbar } from './navbar.js';
navbar();

// let state = [{ user_id: '', board_id: false, like_flag: false }];
const likeStates = {};

async function fetchPosts() {
    const response = await fetch("http://localhost:3000/board");
    const loggedin = await fetch('/check-login');

    const data = await response.json();
    const result = await loggedin.json();
    console.log('result',result);

    console.log(data);
    const posts = data;
    const container = document.getElementById('container');

    for (const post of posts) {
        const div = document.createElement("div");
        const userResponse = await fetch(`/users/${post.user_id}`);
        const userData = await userResponse.json();
        const writtenUser = userData.username;
        console.log('post',post);

        const likeButtonOrLoginLink = result.loggedIn
      ? `<button class="btn btn-primary" id="like-Button-${post.id}" onclick="likeClick(${result.user_id}, ${post.id})">Like</button>`
      : `<p><a href="/Login">Log in to like</a></p>`;

        div.innerHTML = `
                    <div class="tweet">
                        <!-- 트윗 본문과 삭제 버튼 -->
                        <div class="tweet-body-row">
                            <p class="tweet-content">${post.content}.</p>
                        </div>
                        <!-- 작성자 정보 -->
                        <p class="tweet-author">- ${writtenUser} -</p>
                        <!-- 좋아요 영역 -->
                        <div class="tweet-actions">
                               ${likeButtonOrLoginLink}
                            <span class="likes-count">Likes: ${post.likes_count}</span>
                        </div>
                    </div>
                `;
        container.appendChild(div);
        }
    }
    // const likeButton = document.getElementById("like-Button")
    // likeButton.className = "btn btn-primary";
    // likeButton.innerText = "Like";
    
    // likeButton.addEventListener("click", async () => {
    //   await likeClick(post.id); // post.id나 필요한 데이터 넘겨줌
    //   console.log('좋아요');
    // });
    
async function likeClick(user_id, board_id) {
    const currentLike = likeStates[board_id] || false;

      // 상태 반전
    likeStates[board_id] = !currentLike;

    // 버튼 찾아서 텍스트 업데이트
    const likeButton = document.getElementById(`like-Button-${board_id}`);
    if (likeButton) {
        likeButton.innerText = likeStates[board_id] ? 'Unlike' : 'Like';
    }
    
    const liked = fetch("http://localhost:3000/like",{
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, board_id })
    });
}    

fetchPosts();
window.likeClick = likeClick;

