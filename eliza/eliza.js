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

// Function for getting Eliza's response
function getElizaResponse(userMsg) {
    /* Old implementation
    // Check if the user input matches any of the predefined responses
    userMsg = userMsg.toLowerCase();
    if(responses[userMsg]) {
        addMessage('eliza', responses[userMsg]);
    } else {
        addMessage('eliza', 'I\'m sorry, I didn\'t understand that. Can you please rephrase or ask another question?');
    }

    */

    // Iterate over each response in the responses object
    for (const response in responses) {
        // Create regex for use on the current response, case insensitive
        const regex = new RegExp(response, 'i');
        // Check if the user input matches the current response
        const match = userMsg.match(regex);
        if (match) {
            // Get a random response from the current response's array
            const responseArray = responses[response];
            const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
            // Replace $1, $2, etc. with the captured groups from the match
            const formattedResponse = randomResponse.replace(/\$(\d+)/g, function(match, group) {
                return match.replace('$' + group, match[group]);
            });
            // Reflect the user's words in the response
            const reflectedResponse = reflect(formattedResponse);
            // Add the response to the chat box
            addMessage('eliza', reflectedResponse);
            return;
        }
    }

    // If no response was found, add a default response
    addMessage('eliza', 'I\'m sorry, I didn\'t understand that. Can you please rephrase or ask another question?');
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

// Function for handling key press events
document.getElementById('userMsg').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        document.getElementById('sendMessage').click();
    }
});

// function for reflecting user words for eliza response
function reflect(text) {
    const words = text.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
        if (reflections[words[i]]) {
            words[i] = reflections[words[i]];
        }
    }
    return words.join(' ');
}


// Eliiza's responses - GPT generated for convenience
// Define responses based on various patterns
const responses = {
    'hello|hi|hey': [
        "Hello! How are you feeling today?",
        "Hi there! What’s on your mind?",
        "Hey! How can I help you?"
    ],
    'you remind me of (.*)': [
        "Why do you think I remind you of $1?",
        "What makes you think of $1 when talking to me?",
        "Is it a good feeling to be reminded of $1?"
    ],
    '(.*) mother|father|family|parent(.*)': [
        "Tell me more about your family.",
        "How does that make you feel about your family?",
        "What role does your family play in your thoughts?"
    ],
    '(.*) I need (.*)': [
        "Why do you need $2?",
        "Would getting $2 really help you?",
        "What if you didn’t need $2?"
    ],
    '(.*) I am (.*)': [
        "Why do you think you are $2?",
        "How long have you felt that way?",
        "What made you feel like $2?"
    ],
    '(.*) I feel (.*)': [
        "Why do you feel $2?",
        "Does feeling $2 happen often?",
        "How does that feeling affect you?"
    ],
    '(.*) (sorry|apologize)(.*)': [
        "No need to apologize.",
        "Apologies aren't necessary. Why do you feel that way?",
        "It’s okay to feel that way."
    ],
    'bye|goodbye|exit': [
        "Goodbye! Take care.",
        "Thank you for sharing. Goodbye!",
        "Bye! I’m here if you need to talk again."
    ],
    '(.*)': [
        "Can you tell me more?",
        "Why do you say that?",
        "How does that make you feel?",
        "What do you mean by that?",
        "Interesting... go on."
    ],
};

// Reflections of user pronouns, verbs for use in eliza's response
const reflections = {
    "I": "you",
    "me": "you",
    "my": "your",
    "am": "are",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "are": "am",
};