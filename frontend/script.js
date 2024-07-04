document.addEventListener('DOMContentLoaded', async () => {
  const userInput = document.getElementById('userInput');
  const chatMessages = document.getElementById('chatMessages');
  const historyMessages = document.getElementById('historyMessages');
  const summaryButton = document.getElementById('summaryButton');
  const sentimentButton = document.getElementById('sentimentButton');
  const replyButton = document.getElementById('replyButton');

  const apiEndpoint = async (endpoint, data) => {
    try {
      const result = await axios.post(`http://localhost:5000${endpoint}`, data);
      return result.data;
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Failed to fetch data from server.' };
    }
  };

  const appendMessage = (message, type) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${type}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  

  const handleResponse = (result) => {
    if (result.error) {
      appendMessage(`Error: ${result.error}`, 'bot');
    } else {
      appendMessage(result.result, 'bot');
    }
  };



  summaryButton.addEventListener('click', async () => {
    const data = { userInput: userInput.value };
    appendMessage(userInput.value, 'user');
    const result = await apiEndpoint('/api/summary', data);
    handleResponse(result);
  });

  sentimentButton.addEventListener('click', async () => {
    const data = { userInput: userInput.value };
    appendMessage(userInput.value, 'user');
    const result = await apiEndpoint('/api/sentiment', data);
    handleResponse(result);
  });

  replyButton.addEventListener('click', async () => {
    const data = { userInput: userInput.value };
    appendMessage(userInput.value, 'user');
    const result = await apiEndpoint('/api/reply', data);
    handleResponse(result);
  });

  await fetchChatHistory();
});
