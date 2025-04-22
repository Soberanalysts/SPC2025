const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('users.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT
    password TEXT
)`,(err) => {
    console.log('테이블 생성에 성공한 시점.')
    db.run('INSERT INTO messages (text) VALUES (?)',['user, password'],(err) => {
        console.log('여기는 삽입에 성공한 시점.');
    
        db.each('SELECT * FROM messages', (err,row)=> {
            console.log(row.text);
        });
        db.close((err) => {
            console.log('성공적으로 연결에 종료한 시점.')
        });
    });
});



