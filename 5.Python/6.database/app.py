import sqlite3


conn = sqlite3.connect('users.db')
cur = conn.cursor()

cur.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
    )            
''')
cur.execute('SELECT COUNT(*) FROM users')
count = cur.fetchone()[0] # 전달받은 튜플에서의 첫번째 값을 달라..
print(count)

if count == 0:
    cur.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('Alice', 30)) 
    cur.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('Bob', 25)) 
else:
    print(f'이미 데이터가 {count}개 존재함')
    
cur.execute('SELECT * FROM users')
data = cur.fetchall()
print(data)

for row in data:
    print(f'이름: {row[1]}, 나이: {row[2]}')
    
conn.commit()

conn.close()