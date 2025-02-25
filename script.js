// Mobile Navigation
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNav = document.getElementById('mobile-nav');

hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true' || false;
    hamburgerMenu.setAttribute('aria-expanded', !expanded);
    mobileNav.setAttribute('aria-expanded', !expanded);
});

document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size and delay
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Update percentage counter
    const percentage = document.querySelector('.percentage');
    let count = 0;
    const interval = setInterval(() => {
        count += 1;
        percentage.textContent = `${count}%`;
        
        if (count >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                const loader = document.querySelector('.loader-container');
                loader.style.animation = 'loaderOut 0.8s forwards';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
    }, 30); // 30ms * 100 = ~3 seconds total
});

 // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Basic validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // This would be replaced with actual form submission logic
            setTimeout(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 1500);
        });
    }


    document.addEventListener("DOMContentLoaded", () => {
        fetch("/get_posts")
            .then(response => response.json())
            .then(posts => {
                const container = document.getElementById("blog-preview-container");
                container.innerHTML = ""; // Clear existing content
    
                if (posts.length === 0) {
                    container.innerHTML = "<p>No blog posts available yet.</p>";
                    return;
                }
    
                posts.slice(0, 3).forEach(post => { // Show only the latest 3 posts
                    const postElement = document.createElement("article");
                    postElement.classList.add("blog-preview");
    
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.content.substring(0, 100)}...</p>
                        <p class="meta"><strong>By:</strong> ${post.author} | <strong>Date:</strong> ${post.created_at}</p>
                        <a href="blog.html?id=${post.id}" class="read-more-btn">Read More</a>
                    `;
    
                    container.appendChild(postElement);
                });
            })
            .catch(error => console.error("Error loading blog previews:", error));
    });
    
