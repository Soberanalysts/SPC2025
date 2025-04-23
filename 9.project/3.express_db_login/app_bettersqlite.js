const sqlite = require('better-sqlite3');
const express = require('express');
const path = require("path");

const db = sqlite('login.db');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("폼에서 받은 데이터:", username, password);

    
    const allusers = db.prepare('SELECT * FROM users');
    const allusers_result = allusers.all();
    console.log('조회된 사용자: ', allusers_result);
    res.send("로그인 완료!");


  });


const allusers = db.prepare('SELECT * FROM users');
const allusers_result = allusers.all();
console.log('조회된 사용자: ', allusers_result);


// const user = db.prepare('SELECT * FROM users WHERE user = ?');
// const auser = user.get(userId);

db.close();

app.listen(port, () => {
    console.log(`서버가 준비됨. ${port} 포트에서...`);
});
