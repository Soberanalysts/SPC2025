const board = () => {
    const myContainer = document.getElementById('container');
    const item = document.createElement('div');
    item.textContent = '내용';
    item.classList.add('tweet'); // 디자인 속성 추가
    myContainer.appendChild(item);
}


