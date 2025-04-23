const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require("path");
const sqlite3 = require("sqlite3").verbose();



const app = express();
const port = 3000;
const db = new sqlite3.Database("users.db");


const users = [
    {id: 1, username:'user1', password:'password1'},
    {id: 2, username:'user2', password:'password2'},
    {id: 3, username:'user3', password:'password3'}
]

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //index.html로 부터 데이터를 가져오기 위해

app.use(session({
    
}))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html')); // path필요
})
app.get('/logout', (req,res) => {
    req.session.destroy();
    res.send('안녕히가세요....');
});

app.post('/login', (req,res) => {
    const { username, password } = req.body;
    console.log(req.body);

    // const user = users.find((u) => u.username === username && u.password === password);
    // console.log('유저: ', user);
    // if (user) {
    //     res.json({ message: '로그인 성공'});
    // } else {
    //     res.status(401).json({message: '로그인 실패'});
    // }
    

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(sql, [username, password], (err, row) => {
      if (err) {
        console.error("DB 에러:", err);
        return res.status(500).send("서버 오류");
      }
  
      if (row) {
        res.send(`✅ 로그인 성공! 환영합니다, ${row.username}`);
      } else {
        res.send("❌ 로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
      }
    });
})



app.listen(port, () => {
    console.log('서버 레디');
})