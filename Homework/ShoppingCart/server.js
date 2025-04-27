const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require("path");
const sqlite3 = require("sqlite3").verbose();


const app = express();
const port = 3000;
const db = new sqlite3.Database("users.db");


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //index.html로 부터 데이터를 가져오기 위해
app.use(express.static(path.join(__dirname, 'public')));

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
    res.sendFile(path.join(__dirname, 'public','index.html')); // path필요
})
app.post('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/Product', (req,res) => {
    res.sendFile(path.join(__dirname, 'public','Products.html')); // path필요
});

app.get('/Cart', (req,res) => {
    res.sendFile(path.join(__dirname, 'public','Cart.html')); // path필요
});

app.post('/login', (req,res) => {
    const { username, password } = req.body;
    console.log(req.body);

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(sql, [username, password], (err, row) => {
      if (err) {
        console.error("DB 에러:", err);
        return res.status(500).send("서버 오류");
      }
      if (row) {
        req.session.username = row.username;
        console.log('세션데이터',req.session);
        res.redirect('/');
      } else {
        res.send("❌ 로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
      }
    });
})
app.get('/api/user', (req, res) => {
    if (req.session.username) {
      res.json({ username: req.session.username });
    } else {
      res.json({ username: null });
    }
  });
  app.post('/api/user/cart', (req, res) => {
    const { id, name, price } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({ id, name, price });
    res.json({ success: true, cart: req.session.cart });
    console.log('세션데이터',req.session);

  });
  app.get('/api/user/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.json(cart); // 배열 반환
  });

app.listen(port, () => {
    console.log('서버 레디');
})