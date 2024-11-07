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
    const userInput = document.getElementById('userInput').val;
    if(userInput) { // if user input isn't empty, add it to the chat box
        addMessage('user', userInput);
        const elizaResponse = elizaResponse(userInput);
        
    }
});