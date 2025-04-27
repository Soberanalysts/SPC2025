const express = require("express");
const session = require('express-session');
const cors = require("cors");
const sqlite = require("sqlite3").verbose();;
const morgan = require('morgan');
const path = require("path");

// 변수
const app = express();
const port = 3000;
const db = new sqlite.Database("user-sample.db");

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../FE')));

// 세션 설정
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000,         // 쿠키 만료시간 (10분)
        httpOnly: true,         // 클라이언트 JS에서 접근 불가 → XSS 보호
        secure: false,          // HTTPS에서만 전달되도록 (운영환경에선 true)
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE/index.html'));
})
app.get('/user', (req,res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: true, message: "DB 오류", detail: err.message });
        }
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: true, message: "게시글이 없습니다." });
        }
        res.json(rows); // 게시글 리스트 반환
        });    
})
app.get('/search', (req,res) => {
    const {name, gender} = req.query;
    console.log(name);
    console.log(gender);
    db.all("SELECT * FROM users WHERE field2 = ? AND field3 = ?",[name, gender], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: true, message: "DB 오류", detail: err.message });
            }
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: true, message: "게시글이 없습니다." });
        }
            res.json(rows); // 게시글 리스트 반환
        });
})


app.listen(port, () => {
    console.log("서버 레디");
    });
