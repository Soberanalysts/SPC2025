from flask import Flask, request, jsonify

app = Flask(__name__)

users = [
    {"id": 1, 'name': 'Alice', 'age': 25, 'phone': '123-456-7890'},
    
]

@app.route('/')
def main():
    return "메인"

@app.route('/users')
def get_users():
    return jsonify(users)

@app.route('/users/user_id')
def get_user_by_id(user_id):
    user = None
    for u in users:
        if u['id'] == user_id:
            user = u
            break # 찾았으면 중단하는게, 효율적인 검색
        
        if user is not None:
            return jsonify(user)
        else:
            return jsonify({'error': 'User not found'}), 404
            

if __name__ == "__main__":
    app.run()
    
    