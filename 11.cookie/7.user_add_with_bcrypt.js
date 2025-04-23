const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('users.db');

const users = [
    {id: 1, username:'user1', password:'password1'},
    {id: 2, username:'user2', password:'password2'},
    {id: 3, username:'user3', password:'password3'}
]

async function insertUsers() {
    for (const user of users) {
        const hash = await bcrypt.bash(user.password, 10);
        db.run('INSERT INTO users (username, password) VALUES (?, ?)',
            [user.username, hash],
            (err) => {
                console.log(`$(user.username):${hash} 등록 성공`)
            }
        );
    }
}

insertUsers();