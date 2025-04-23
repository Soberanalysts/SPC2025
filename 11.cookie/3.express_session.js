const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(session({
    secret: 'abcd1234',
    resave: false,
    saveUninitialized: true,
}));

function visitCounter(req, res, next) {
    req.session.visitCount = req.session.visitCount || 0;
    req.session.visitCount++;
    next();
}

app.use(visitCounter);

app.get('/', (req, res) => {
    req.session.username='user1';
    req.session.ticket = 'spc2025';
    req.session.cart = ['python', 'javascript', 'golang'];
    res.send(`찾았다. 당신의 방문횟수는 : ${req.session.visitCount}`);
})

app.get('/user', (req,res) => {
    const yoursession = req.session;
    console.log(yoursession);

    const {username, ticket, cart} = req.session;

    if(username) {
        res.send(`당신의 이름은 ${username}`);
    } else {
        res.send(`사용자 정보가 없습니다. 로그인 하세요`);
    }

})

app.get('/cart', (req,res) => {
    const yoursession = req.session;
    console.log(yoursession);
});

app.get('/logout', (req,res) => {
    req.session.destroy();
    res.send('안녕히가세요.....');
});

app.get('/readsession', (req, res) => {
    const yoursession = req.session;
    console.log(yoursession);

    const ticket = req.session.ticket;
    const cart = req.session.cart;

    res.send(`너의 이전 정보는: ${ticket}, ${cart}`);
})

app.listen(port, () => {
    console.log('서버 레디');
})