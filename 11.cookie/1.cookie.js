const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.headers);
    console.log(req.url, req.headers.cookie);
    // res.writeHead(200, {'set-cookie': 'mycookie=test'});
    res.writeHead(200, {'set-cookie': 'your_number=test'});
    res.end('쿠키 받아가시오');
});

server.listen(3000, () => {
    console.log('서버레디');
});
