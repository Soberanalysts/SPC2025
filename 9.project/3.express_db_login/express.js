const express = require('express');
const sqlite = requier('sqlite3');
const bettersqlite = requier('better-sqlite3');

const app = express();
const port = 3000;
const db = new sqlite.Database('users.db');

// let db = new sqlite3.Database('user.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Connected to the mydb database.');
//     }
// });
app.use(express.static( 'public' ));

app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("폼에서 받은 데이터:", username, password);
    res.send("로그인 완료!");
  });

// 라우트를 만드는 과정
// 사용자는 나의 앱에 루트 디렉토리(/) 에 GET 으로 요청을 할 수 있다.
app.get('/', (req, res) => {
    // 이걸 통해서 기본 header와 body가 잘~ 만들어짐..
    res.send('Hello, Express!');
});

app.get('/user', (req, res) => {
    // 이걸 통해서 기본 header와 body가 잘~ 만들어짐..
    res.send('Hello, User!');
});

app.get('/login', (req, res) => {
    // 이걸 통해서 기본 header와 body가 잘~ 만들어짐..
    req.body === res.body ? res.send('로그인 성공'):res.send('로그인 실패') ;
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 준비됨. ${port} 포트에서...`);
});
