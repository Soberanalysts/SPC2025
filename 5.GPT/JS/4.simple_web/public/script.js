const input = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');
const chatContainer = document.getElementById('chatContainer');
const responseText = document.getElementById('responseText');

sendButton.addEventListener('click', async () => {
    const userInput = input.value;
    if (!userInput) return;
    // appendMessage('User', userInput);
    input.value = '';
    console.log(userInput);

    const chatGPTResponse = await getGPTResponse(userInput);
    console.log('chatGPTResponse: ', chatGPTResponse);
    responseText.innerHTML += `<div class="message"><strong>User:</strong> ${userInput}</div>`;
    responseText.innerHTML += `<div class="message"><strong>ChatGPT:</strong> ${chatGPTResponse}</div>`;
});

getGPTResponse = async (userInput) => {
    const response = await fetch('/input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });
    const data = await response.json();
    console.log('data: ', data);
    if (data.error) {
        console.error('Error: ', data.error);
        return 'Error: ' + data.error;
    }
    return data.response;
}

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    const inputField = document.getElementById('questionInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', async () => {
        const userInput = inputField.value;
        if (!userInput) return;
        displayMessage('user', userInput);
        inputField.value = '';

        showLoadingIndicator();
        const response = await getGPTResponse(userInput);
        displayMessage('chatbot', response);
    });
});

function displayMessage(role, message) {
    const messageElement = document.createElement('p');
    messageElement.className = `chat-message ${sender}`;
    messageElement.textContent = `${message}`;
    chatContainer.appendChild(messageElement);
}

function showLoadingIndicator() {
    const loadingMessageDiv = document.createElement('div');
    loadingMessageDiv.className = 'chat-message chatbot';
    loadingMessageDiv.innerHTML = `
        <div class="message-content">
            <span class="loading-dots">생각중...</span>
        </div>
    `;
    chatContainer.appendChild(loadingMessageDiv);
}

function hideLoadingIndicator() {
    const loadingMessageDiv = document.querySelector('.loading-dots');
    if (loadingMessageDiv) {
        loadingMessageDiv.remove();
    }
}