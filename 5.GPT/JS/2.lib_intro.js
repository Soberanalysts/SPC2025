const {OpenAI} = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAPI_API_KEY
});

async function getGPTResponse(userInput) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'system', content: 'you are a highly skilled pianist.'}, //
            {role: 'user', content: userInput}
        ],
        temperature: 0.7,
    });
    return response.choices[0].message.content;
}

async function chatWithUser() {
    const userInput = '안녕 챗봇';
    const chatGPTResponse = await getGPTResponse(userInput);
    console.log('챗봇 응답: ', chatGPTResponse);
}

chatWithUser();