// GameSiteOnline - Contact Form JavaScript
// Developed by Fahad Mohamed

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const newsletter = document.getElementById('newsletter').checked;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showResponse('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showResponse('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (in a real app, this would send to a backend)
            simulateFormSubmission({ name, email, subject, message, newsletter });
        });
    }

    function simulateFormSubmission(formData) {
        // Show loading state
        showResponse('Sending your message...', 'info');

        // Simulate network delay
        setTimeout(() => {
            // In a real implementation, we would send this data to a server
            // For now, we'll just show a success message
            showResponse('Thank you for your message! We\'ll get back to you soon.', 'success');

            // Reset the form
            contactForm.reset();
        }, 1500);
    }

    function showResponse(message, type) {
        // Remove any existing response classes
        formResponse.className = 'form-response';

        // Add the appropriate class based on type
        formResponse.classList.add(type);

        // Set the message
        formResponse.textContent = message;

        // Make it visible
        formResponse.style.display = 'block';

        // Hide after 5 seconds for success/error messages
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 5000);
        }
    }

    // Add CSS for form response messages
    const style = document.createElement('style');
    style.textContent = `
        .form-response {
            padding: 1rem;
            margin-top: 1.5rem;
            border-radius: var(--border-radius);
            display: none;
            font-weight: 500;
            text-align: center;
            animation: fadeIn 0.3s ease;
        }

        .form-response.info {
            background-color: #E3F2FD;
            color: #1565C0;
            border: 1px solid #90CAF9;
        }

        .form-response.success {
            background-color: #E8F5E9;
            color: #2E7D32;
            border: 1px solid #A5D6A7;
        }

        .form-response.error {
            background-color: #FFEBEE;
            color: #C62828;
            border: 1px solid #EF9A9A;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});