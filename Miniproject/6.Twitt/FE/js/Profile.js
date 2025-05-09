import { navbar } from './navbar.js';
navbar();

async function loadProfile() {
  try {
    const response = await fetch('/Profile/profile'); // 서버에 프로필 요청
    if (!response.ok) {
      throw new Error('로그인 정보 없음');
    }
    const data = await response.json();
    console.log(data);

    document.querySelectorAll('h3')[0].innerText = `사용자 이름: ${data.username}`;
    document.querySelectorAll('h3')[1].innerText = `이메일: ${data.email}`;

  } catch (error) {
    console.error(error);
    // 로그인 안되어있으면 로그인 페이지로 리다이렉트
    window.location.href = '/Login';
  }
}

loadProfile();