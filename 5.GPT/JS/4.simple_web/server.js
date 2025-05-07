const express = require('express');
const { OpenAI } = require('openai');
const morgan = require('morgan');
const axios = require('axios');

require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAPI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 3000;

const Conversationhistory = [];


app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// system : 시스템 프롬푸트
// user : 유저 프롬프트
// assistant : 챗봇 프롬프트
app.post('/input', (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {
        const { userInput } = JSON.parse(body);
        const chatGPTResponse = await getGPTResponse(userInput);
        res.json({ response: chatGPTResponse });
    });
    console.log('body: ', body);
});

async function getGPTResponse(userInput) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'you are a highly skilled pianist.'}, //
                {role: 'user', content: userInput}
            ],
            temperature: 0.7,
        });
        return response.choices[0].message.content;
    } catch (error) {
        if (error.status) {
            const status = error.status;
            if (status ===429) {
                console.error('Error: 요청 한도 (크레딧 부족)');
            } else if (status === 401) {
                console.error('Error: 해당 키에 권한이 없습니다.');
            } else if (status === 403) {
                console.error('Error: 해당 모델을 이용할 권한이 없습니다.');
            } else {
                console.error(`Error: 알 수 없는 오류입니다. ${status} - ${error.body}`)
            }
        }
    }

}

// async function chatWithUser() {
//     const userInput = '안녕 챗봇';
//     const chatGPTResponse = await getGPTResponse(userInput);
//     console.log('챗봇 응답: ', chatGPTResponse);
// }

// chatWithUser();

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});