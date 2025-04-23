from flask import Flask, request
import sqlite3

conn = sqlite3.connect('users.db', check_same_thread=False)
cur = conn.cursor()


app = Flask(__name__)

@app.route('/')
def home():
    return '''<form action="/login" method="post">
        <input name="username" type="text" placeholder="username" /><br>
        <input name="password" type="password" placeholder="password" /><br>
        <button type="submit">Login</button>
    </form>'''
# @app.route('/login')
# def login():
#     cur.execute('SELECT COUNT(*) FROM users')
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    cur.execute('SELECT * FROM users WHERE username=? AND password=?', (username, password))
    user = cur.fetchone()

    if user:
        return f"<h1>환영합니다, {username}님!</h1>"
    else:
        return "<h1>로그인 실패: 사용자 정보가 없습니다.</h1>"
    

if __name__ == '__main__':
    app.run()
    
   