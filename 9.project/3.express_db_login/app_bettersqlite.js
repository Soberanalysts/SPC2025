const sqlite = require('better-sqlite3');

const db = sqlite('user.db');

const allusers = db.prepare('SELECT * FROM users');
const allusers_result = allusers.all();
console.log('조회된 사용자: ', allusers_result);


const user = db.prepare('SELECT * FROM users WHERE user = ?');
const auser = user.get(userId);



db.close();

