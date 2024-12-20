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
    // Iterate over each response in the responses object
    for (const pattern in responses) {
        const regex = new RegExp(pattern, 'i');
        const match = userMsg.match(regex);
        
        if (match) {
            // Get random response from matched pattern
            const selectedResponse = responses[pattern][Math.floor(Math.random() * responses[pattern].length)];
            
            // Handle the reflection of captured groups
            const reflectedGroups = match.slice(1).map(reflect);
            
            // Replace $1, $2, etc with reflected groups and return the response
            return selectedResponse.replace(/\$(\d+)/g, (_, i) => reflectedGroups[i-1] || '');
        }
    }
    // If no response was found, add a default response
    return 'I\'m sorry, I didn\'t understand that. Can you please rephrase or ask another question?';
}

// send button event listener
document.getElementById('sendMessage').addEventListener('click', function() {
    // Get the user input and add it to the chat box
    const userMsg = document.getElementById('userMsg').value.trim();
    if(userMsg) { // if user input isn't empty, add it to the chat box
        addMessage('user', userMsg);
        // Get Eliza's response through its method
        const response = getElizaResponse(userMsg);
        addMessage('eliza', response); // Add Eliza's response to the chat box
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
    if (!text) return '';
    // Split the text into words and convert to lowercase
    const words = text.toLowerCase().split(' ');
    // Iterate over each word and return the reflection if it exists
    return words.map(word => reflections[word] || word).join(' ');
}

// Reflections of user pronouns, verbs for use in eliza's response
const reflections = {
    "i": "you",
    "me": "you",
    "my": "your",
    "am": "are",
    "i'm": "you are",
    "i'd": "you would",
    "i've": "you have",
    "i'll": "you will",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "are": "am"
};

// Eliiza's responses - GPT generated for convenience, though getting the pattern responses right took some more effort on my part
// Define responses based on various patterns, with more specific patterns first
const responses = {
    // ^ and $ anchors ensure they match specific phrases, \\s handles whitespace
    '^(hello|hi|hey)\\s*$': [
        "Hello! How are you feeling today?",
        "Hi there! What's on your mind?",
        "Hey! How can I help you?"
    ],
    // (.+) and (.*) for ensuring there's content to capture
    'you remind me of (.+)': [
        "Why do you think I remind you of $1?",
        "What makes you think of $1 when talking to me?",
        "Is it a good feeling to be reminded of $1?"
    ],
    // .* for natural beginnings and ends of sentences
    '.*i remember (.+)': [
        "What else do you remember about $2?",
        "How do you feel when you remember $2?",
        "What made you remember $2?"
    ],
    // ? for optional words
    '.*i (?:am|feel) (.+)': [
        "Why do you feel $1?",
        "How long have you felt $1?",
        "Does being $1 bother you?"
    ],
    '.*i need (.+)': [
        "Why do you need $1?",
        "What would it mean to you if you got $1?",
        "What if you never got $1?"
    ],
    '.*i want (.+)': [
        "Why do you want $2?",
        "What would you do if you got $2?",
        "What would getting $2 mean to you?"
    ],
    '(.*) I dreamt (.*)': [
        "What does that dream suggest to you?",
        "How do you feel about that dream?",
        "What do you think that dream means?"
    ],
    '(.*) I believe (.*)': [
        "Why do you think $2?",
        "Do you really believe $2?",
        "What would it mean if $2 was true?"
    ],
    '(.*) I think (.*)': [
        "Why do you think $2?",
        "How do you feel about $2?",
        "What would it mean if $2 was true?"
    ],
    '(.*) mother|father|family|parent(.*)': [
        "Tell me more about your family.",
        "How does that make you feel about your family?",
        "What role does your family play in your thoughts?"
    ],
    '.*(sorry|apologize).*': [
        "No need to apologize.",
        "Apologies aren't necessary. Why do you feel that way?",
        "It’s okay to feel that way."
    ],
    '^(goodbye|bye|exit)\\s*$': [
        "Goodbye. Thank you for talking with me.",
        "It was nice talking to you. Goodbye!",
        "I hope we can talk again soon. Bye!"
    ],
    '.*': [
        "Can you tell me more?",
        "Why do you say that?",
        "How does that make you feel?",
        "What do you mean by that?",
        "Interesting... go on."
    ],
};
