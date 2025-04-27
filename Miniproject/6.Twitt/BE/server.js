const express = require("express");
const session = require('express-session');
const cors = require("cors");
const sqlite = require("sqlite3").verbose();;
const morgan = require('morgan');
const path = require("path");

// 변수
const app = express();
const port = 3000;
const db = new sqlite.Database("tweet.db");

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


// app.get('/', (req, res) => res.redirect('/home'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE/index.html'));
  })

app.get('/board', (req, res) => {
  db.all("SELECT * FROM board", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: true, message: "DB 오류", detail: err.message });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: true, message: "게시글이 없습니다." });
    }


    res.json(rows); // 게시글 리스트 반환
  });    
})

app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // URL 파라미터로부터 id 가져옴

  db.get("SELECT * FROM users where id = ?", [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: true, message: "DB 오류", detail: err.message });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: true, message: "작성자를 찾을 수 없습니다." });
    }

    res.json(rows); // username 반환
  });    
})


app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Login.html')); 
  })
app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Register.html')); 
  })
app.get('/Profile', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Profile.html')); 
  })
app.get('/Profile/profile', (req, res) => {
  if (req.session.user) {
    res.json({
      username: req.session.user.username,
      email: req.session.user.email
    });
  } else {
    res.status(401).json({ error: true, message: "로그인 필요" });
  }
})

app.get('/Tweet', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Tweet.html')); 
  })

  //로그인 세션 확인
app.get('/check-login', (req, res) => {
  // console.log(req.session);
  if (req.session.user) {
    res.json({ loggedIn: true, user_id: req.session.user.user_id, username: req.session.user.username, email: req.session.user.email });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
});
app.get('/like', (req,res) => {
  const {user_id, board_id} = req.body;
  let likes = 0;
  db.all("SELECT * FROM like", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: true, message: "DB 오류", detail: err.message });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: true, message: "like가 없습니다." });
    }
    // likes=

    res.json(rows); //좋아요 수
  });    
})

app.post("/Login/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username=? AND password=?",[username, password], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: true, message: "DB 오류", detail: err.message });
    }
    if (rows) {
      req.session.user = { user_id: rows.id,email: rows.email, username: rows.username };
      res.json({ message: '로그인 성공', success: true });
    } else {
      return res.status(404).json({ error: true, message: "로그인 실패." });
    }
  });    
});

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
  
    // console.log(username, email, password);
    db.run(
    `
        INSERT INTO users(username, email, password, created_at) 
        values(?,?,?,date('now'));
    `,[username, email, password],
        function (err) {
        if (err) {
            console.error("DB 오류:", err.message);
            return res.status(500).json({ message: "DB 삽입 실패" });
        }
        console.log("사용자 등록됨, ID:", this.lastID);
        res.status(201).json({ message: "등록 성공", userId: this.lastID });
        }
    );
});

app.post("/post", (req, res) => {
  const { content, userId } = req.body;
  const id = req.params.id;

  // console.log(`content${content}, userId${userId} ID:${id}`);
  db.run(
  `
      INSERT INTO board (content, user_id, likes_count) 
      values(?,?,?);
  `,[content, 1, 0],
      function (err) {
      if (err) {
          console.error("DB 오류:", err.message);
          return res.status(500).json({ message: "DB 삽입 실패" });
      }
      console.log("사용자 등록됨, ID:", this.lastID);
      res.status(201).json({ message: "등록 성공", userId: this.lastID });
      }
  );
});

app.post("/like", (req, res) => {
  const { user_id, board_id } = req.body;
  const id = req.params.id;
  // console.log('id', id);
  // console.log(`userid: ${user_id}, board_id: ${board_id}`);
  db.run(
  `
      INSERT INTO like (user_id, board_id) 
      values(?,?);
  `,[user_id, board_id],
      function (err) {
      if (err) {
          console.error("DB 오류:", err.message);
          return res.status(500).json({ message: "DB 삽입 실패" });
      }
      console.log("좋아요 등록됨");
      res.status(201).json({ message: "등록 성공"});
      }
  );
});
app.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `
        delete from post where id = ?;
    `
  ).run(id);

  res.json({ success: true });
});

app.delete("/like/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `
        delete from like where id = ?;
    `
  ).run(id);

  res.json({ success: true });
});

app.listen(port, (req, res) => {
  console.log("서버 레디 on port : ", port);
});
