import requests

url = 'https://jsonplaceholder.typeicode.com/users'

new_post = {
    "userId" : 1,
    "title": "hello",
    "body": "world"
}

response = requests.post(url, json=new_post)
print(response.json())

updated_post = {
    "userId":1,
    
}