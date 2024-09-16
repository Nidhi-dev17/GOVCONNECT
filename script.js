//Navbar
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');  // Toggles the "open" class for nav ul
    burger.classList.toggle('toggle');  // Toggles the "toggle" class for burger animation
});

//Slider
    let currentSlide = 1; // Start at the first actual slide
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Show the slide at the current index
    function showSlide(index) {
        // Calculate the correct position for each slide
        document.querySelector('.slides').style.transform = `translateX(-${index * 100}%)`;
    }

    // Move between slides
    function moveSlide(n) {
        currentSlide = (currentSlide + n + totalSlides) % totalSlides;
        
        // Check if we need to jump to the first slide
        if (currentSlide === 0) {
            setTimeout(() => {
                document.querySelector('.slides').style.transition = 'none'; // Disable transition
                currentSlide = totalSlides - 2; // Jump to second last slide
                showSlide(currentSlide);
            }, 500); // Match with transition time
        }
        
        // Check if we need to jump to the last slide
        if (currentSlide === totalSlides - 1) {
            setTimeout(() => {
                document.querySelector('.slides').style.transition = 'none'; // Disable transition
                currentSlide = 1; // Jump to the second slide
                showSlide(currentSlide);
            }, 500); // Match with transition time
        }
        
        document.querySelector('.slides').style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
        showSlide(currentSlide);
    }

    // Initialize the slider by showing the first slide
    showSlide(currentSlide);

    // Automatically move to the next slide every 5 seconds
    setInterval(() => {
        moveSlide(1);
    }, 5000); // Slide changes every 5 seconds

// Chatbot logic
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');

// Open chatbot
chatbotIcon.addEventListener('click', () => {
    chatbot.style.display = 'block';
    chatbotIcon.style.display = 'none';
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
    chatbot.style.display = 'none';
    chatbotIcon.style.display = 'block';
});



const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        appendMessage('You', message);
        messageInput.value = '';
        
        try {
            // Update this URL to match your Flask server's address and port
            const response = await fetch('http://localhost:5001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Oops, we haven't got JSON!");
            }
            
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            appendMessage('AI', data.response);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('System', `An error occurred: ${error.message}. Please try again.`);
        }
    }
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
