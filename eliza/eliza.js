// Fuction for sending messages to Eliza 
function addMessage(sender, message) {
    // Create a new message container and add it to the chat box
    const chatBox = document.getElementById('chat-box');
    const messageContainer = document.createElement('p'); // Create a new paragraph element
    
    // Add the sender and message to the message container
    messageContainer.classList.add(sender);
    messageContainer.textContent = message;

    // Append the message container to the chat box
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// send button event listener
document.getElementById('sendMessage').addEventListener('click', function() {
    // Get the user input and add it to the chat box
    const userMsg = document.getElementById('userMsg').value;
    if(userMsg) { // if user input isn't empty, add it to the chat box
        addMessage('user', userMsg);
        // Get Eliza's response through its method
        getElizaResponse(userMsg);
        document.getElementById('userMsg').value = ''; // Clear the input field
        
    }
});

// Function for getting Eliza's response
function getElizaResponse(userMsg) {
    // Check if the user input matches any of the predefined responses
    userMsg = userMsg.toLowerCase();
    if(responses[userMsg]) {
        addMessage('eliza', responses[userMsg]);
    } else {
        addMessage('eliza', 'I\'m sorry, I didn\'t understand that. Can you please rephrase or ask another question?');
    }
}

// Function for handling key press events
document.getElementById('userMsg').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        document.getElementById('sendMessage').click();
    }
});






// Eliiza's responses - GPT generated for convenience
const responses = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! What would you like to talk about?",
    "how are you": "I'm just a computer program, but I'm here to help!",
    "what is your name": "I am ELIZA, your friendly chatbot. What can I do for you?",
    "help": "I can assist you with your questions. What do you need help with?",
    "bye": "Goodbye! Take care!",
    "thank you": "You're welcome! If you have any more questions, feel free to ask.",
    "i am sad": "I'm sorry to hear that you're feeling sad. Want to talk about it?",
    "why do you care": "I may be just a program, but I want to help you.",
    "i feel alone": "It's tough to feel alone. I'm here to chat if you need someone to talk to.",
    "what do you think of humans": "Humans are fascinating creatures! You have so many emotions and experiences.",
    "tell me a joke": "Why don’t scientists trust atoms? Because they make up everything!",
    "what is your purpose": "My purpose is to help you by providing information and having conversations.",
    "i'm bored": "I can help with that! What interests you? We can chat about a variety of topics.",
    "can you think": "I can process information and provide responses, but I don't think like a human.",
    "what is love": "Love is a complex emotion that many people experience. It's often described as a deep affection for someone.",
    "i want to quit my job": "It sounds like you're feeling uncertain. What makes you want to quit?",
    "my friend is mad at me": "I'm sorry to hear that. What happened between you two?",
    "i am afraid": "It's normal to feel afraid sometimes. What are you afraid of?",
    "tell me more": "I can share a lot! What topic are you interested in discussing further?",
    "i miss someone": "Missing someone can be hard. Would you like to share more about that person?",
    "what should i do": "It depends on the situation. Can you tell me more about what's going on?",
    "do you have feelings": "I don't have feelings, but I can understand and respond to yours.",
    "i need advice": "I'm here to help! What kind of advice are you looking for?",
    "that's interesting": "I'm glad you find it interesting! What else would you like to know?",
    "why do you exist": "I exist to assist and converse with you. It's my main function!",
    "what makes you happy": "I don’t have feelings, but I'm 'happy' when I can help you.",
    "i feel stressed": "Stress can be overwhelming. What is causing you to feel this way?",
    "what is your favorite thing": "I don't have favorites, but I enjoy helping you find answers!",
    "i don't know": "That's okay! We can explore together. What are you curious about?",
    "can we talk about something else": "Of course! What topic would you like to switch to?",
    "you are not helpful": "I'm sorry to hear that! How can I improve my responses for you?",
    "i need someone to talk to": "I'm here for you. What would you like to talk about?",
    "is this real": "This is a simulated conversation, but I'm here to provide information and support."
};