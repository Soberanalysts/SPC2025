const axios = require('axios');
require('dotenv').config();

const openaiApiKey = process.env.OPENAPI_API_KEY;

// console.log("API KEY:", openaiApiKey);

// // const url = 'https://api.openai.com/v1/response'
const url = 'https://api.openai.com/v1/chat/completions'

async function getGPTResponse() {
    const response = await axios.post(url, {
        model: "gpt-3.5-turbo",
        messages: [
            {'role': 'system', 'content': 'you are a helpful assistant.'}, //
            // {'role': 'system', 'content': 'you are a cook'},
            // {'role': 'system', 'content': 'you are a cook'},
            // {'role': 'system', 'content': 'you are a cook'},
            {role: 'user', content:'나 배고파'}
        ],
        temperature: 1.0,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.6,
        max_tokens:1000
        // "Write a one-sentence bedtime story about a unicorn."
    },{
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`
        }
    })
    return response.data.choices[0].message;
}

(async () => {
    const ai_response = await getGPTResponse();
    console.log(ai_response);
})();


// myfunction();