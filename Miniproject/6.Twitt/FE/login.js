import { navbar } from './navbar.js';

navbar();

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    const response = await fetch('/Login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (result.success) {
        alert(result.message);
        window.location.href = '/';
    } else {
        alert('로그인 실패: ' + result.message);
    }
});