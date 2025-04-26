class Chatbot {
    constructor() {
        try {
            this.initializeElements();
            this.welcomeMessage = "👋 Hi! How can I help you today?";
            this.isOpen = false;
            this.initializeEventListeners();
            this.appendMessage(this.welcomeMessage, true);
        } catch (error) {
            console.error('Chatbot initialization error:', error);
        }
    }

    initializeElements() {
        this.chatWindow = document.getElementById('chatWindow');
        this.chatIcon = document.getElementById('chatbotIcon');
        this.closeButton = document.getElementById('closeChat');
        this.chatBody = document.querySelector('.chat-body');
        
        if (!this.chatWindow || !this.chatIcon || !this.closeButton || !this.chatBody) {
            throw new Error('Required chat elements not found!');
        }
    }

    initializeEventListeners() {
        try {
            // Chat toggle functionality with improved event handling
            this.chatIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChat(true);
            });

            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChat(false);
            });

            // Message options handling with delegation
            document.querySelector('.chat-options').addEventListener('click', (e) => {
                if (e.target.classList.contains('message-option')) {
                    e.preventDefault();
                    this.handleUserSelection(e.target.textContent);
                }
            });

            // Close chat when clicking outside with improved check
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.chatWindow.contains(e.target) && e.target !== this.chatIcon) {
                    this.toggleChat(false);
                }
            });
        } catch (error) {
            console.error('Event listener error:', error);
        }
    }

    toggleChat(show) {
        try {
            this.isOpen = show;
            if (show) {
                this.chatWindow.style.display = 'flex';
                // Use requestAnimationFrame for smooth animation
                requestAnimationFrame(() => {
                    this.chatWindow.classList.add('show');
                });
            } else {
                this.chatWindow.classList.remove('show');
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    if (!this.isOpen) {
                        this.chatWindow.style.display = 'none';
                    }
                }, 300);
            }
        } catch (error) {
            console.error('Toggle chat error:', error);
        }
    }

    appendMessage(message, isBot = true) {
        try {
            const messageElement = document.createElement('div');
            messageElement.className = isBot ? 'bot-message' : 'user-message';
            
            // Enhanced message formatting
            const formattedMessage = message.split('\n').map(line => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('•')) {
                    return `<li>${trimmedLine.substring(1).trim()}</li>`;
                } else if (trimmedLine) {
                    return `<p>${trimmedLine}</p>`;
                }
                return '';
            }).join('');
            
            messageElement.innerHTML = formattedMessage;
            
            // Animate message appearance
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(10px)';
            
            this.chatBody.appendChild(messageElement);
            
            // Force reflow for animation
            messageElement.offsetHeight;
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
            
            this.chatBody.scrollTop = this.chatBody.scrollHeight;
        } catch (error) {
            console.error('Message append error:', error);
        }
    }

    handleUserSelection(selection) {
        try {
            this.appendMessage(selection, false);

            let response = '';
            switch(selection.trim()) {
                case 'Track Loan Status':
                    response = 'Your loan application is currently under review. The estimated processing time is 2-3 business days.\n\nWould you like to:\n• Check detailed status\n• Get email updates\n• Speak with a loan officer';
                    break;
                case 'Payment Details':
                    response = 'Your next payment of ₹250 is due on May 1, 2025.\n\nWould you like to:\n• Make a payment now\n• Set up auto-pay\n• View payment history';
                    break;
                case 'Loan Application Help':
                    response = 'To apply for a loan, you'll need:\n• Valid ID proof\n• Income statements\n• Bank statements\n• Employment details\n\nWould you like to start an application?';
                    break;
                default:
                    response = "I'm sorry, I didn't understand that. Please select one of the available options.";
            }

            // Add typing indicator before response
            setTimeout(() => {
                this.appendMessage(response);
            }, 800);
        } catch (error) {
            console.error('Selection handling error:', error);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
//code by Kolla Harsha