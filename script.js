// Mobile Navigation
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNav = document.getElementById('mobile-nav');

hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true' || false;
    hamburgerMenu.setAttribute('aria-expanded', !expanded);
    mobileNav.setAttribute('aria-expanded', !expanded);
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    const formData = new FormData(contactForm);
    // Example: Send to backend
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the message.');
        }
    });
