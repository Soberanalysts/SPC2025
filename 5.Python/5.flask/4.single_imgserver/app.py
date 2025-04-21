import random
from flask import Flask, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

img = [
    'img1.png',
    'img2.png',
    'img3.png'
]

@app.route('/random-img')
def random_img():
    random_image = random.choic(img)
    image_url = url_for('static', filename=f'images/{random_image}',_external=True)
    print(image_url)
    
    return jsonify(("url": image_url))

if __name__ == "__main__":
    app.run(debug=True)
    