const sqlite = require('better-sqlite3');

const db = sqlite('test.db');

db.exec(`CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
    email TEXT
)`);

// 2. 사용자 조회회
const allusers = db.prepare('SELECT * FROM greetings');
const allusers_result = allusers.all();
console.log('조회된 사용자: ', allusers_result);

const newuser = {
    username: 'user1',
    email: 'user1@example.com'
}

const insert = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
insert.run(newuser,username, newuser.email);

const userId = 1;
const user = db.prepare('SELECT * FROM users WHERE id = ?');
const auser = user.get(userId);

const updateUser = {
    id: 1,
    username: 'user001', 
    email: 'user001@example.com'
}

const update = db.prepare('UPDATE users SET username=?, email=? WHERE id=?');
update.run(updateUser.username, updateUser.email, updateUser.id);
console.log('사용자 정보 갱신 완료.');

const deleteQ = db.prepare('DELETE FROM users WHERE id=?')
deleteQ.run(deleteUser.id);
console.log('삭제 완료');

db.close();

greetings.forEach((row) => {
    console.log(`인사${row.id} : ${row.message}`, );
});
