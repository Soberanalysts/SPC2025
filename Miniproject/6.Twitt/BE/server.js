const express = require("express");
const cors = require("cors");
const sqlite = require("sqlite3").verbose();;
const morgan = require('morgan');
const path = require("path");

// 변수
const app = express();
const port = 3000;
const db = new sqlite.Database("board.db");

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../FE')));

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

app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Login.html')); 
  })
app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Register.html')); 
  })
app.get('/Profile', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Profile.html')); 
  })
app.get('/Tweet', (req, res) => {
    res.sendFile(path.join(__dirname,'../FE/Tweet.html')); 
  })

  

// 라우트
// app.get("/api/posts", (req, res) => {
//   const posts = db
//     .run(
//       `
//         SELECT *
//         FROM post
//         `
//     );
//   if (!posts) {
//     res
//       .status(404)
//       .json({ error: true, message: "게시글 목록을 찾을 수 없음" });
//   } else {
//     res.json(posts);
//   }
// });

app.get("/login", (req, res) => {
  

  if (!posts) {
    res.status(404).json({ error: true, message: "게시글 목록을 찾을 수 없음" });
  } else {
    res.json(posts);
  }
});
// app.get("/login", (req, res) => {
//   const posts = db
//     .prepare(
//       `
//         SELECT *
//         FROM post
//         `
//     )
//     .all();
//   if (!posts) {
//     res
//       .status(404)
//       .json({ error: true, message: "게시글 목록을 찾을 수 없음" });
//   } else {
//     res.json(posts);
//   }
// });




// app.post("/post", upload.single("image"), (req, res) => {
//   const { title, content } = req.body;
//   const image = req.file ? req.file.filename : null;

//   console.log(title, content, image);
//   db.prepare(
//     `
//         INSERT INTO post(title, content, image,postedAt) 
//         values(?,?,?,date('now'));
//     `
//   ).run(title, content, image);
// });

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
  
    console.log(username, email, password);
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

  console.log(`content${content}, userId${userId} ID:${id}`);
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

// app.delete("/post/:id", (req, res) => {
//   const id = req.params.id;
//   db.prepare(
//     `
//         delete from post where id = ?;
//     `
//   ).run(id);

//   res.json({ success: true });
// });


app.listen(port, (req, res) => {
  console.log("서버 레디 on port : ", port);
});
