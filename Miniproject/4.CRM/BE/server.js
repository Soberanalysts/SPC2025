const express = require("express");
const session = require('express-session');
const cors = require("cors");
const sqlite = require("sqlite3").verbose();;
const morgan = require('morgan');
const path = require("path");

// 변수
const app = express();
const port = 3000;
const db = new sqlite.Database("CRM.db");

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