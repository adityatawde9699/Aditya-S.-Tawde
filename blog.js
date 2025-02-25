document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling with improved timing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 60; // Adjust based on your header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Advanced search with debouncing and highlighting
    const searchBar = document.querySelector('.search-bar');
    const postCards = document.querySelectorAll('.post-card');
    const topicTags = document.querySelectorAll('.topic-tag');

    let searchTimeout;
    searchBar.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            
            // Search with multiple criteria and scoring
            postCards.forEach(card => {
                const title = card.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.post-category').textContent.toLowerCase();
                
                let score = 0;
                if (title.includes(searchTerm)) score += 3;
                if (category.includes(searchTerm)) score += 2;
                if (excerpt.includes(searchTerm)) score += 1;

                card.style.opacity = score > 0 ? '1' : '0';
                card.style.visibility = score > 0 ? 'visible' : 'hidden';
                card.style.order = -score; // Higher score appears first
            });

            // Animated filtering for topic tags
            topicTags.forEach(tag => {
                const tagText = tag.textContent.toLowerCase();
                if (tagText.includes(searchTerm)) {
                    tag.style.display = 'inline-block';
                    tag.style.transform = 'scale(1.1)';
                } else {
                    tag.style.display = 'none';
                    tag.style.transform = 'scale(1)';
                }
            });
        }, 300); // Debounce delay
    });

    // Enhanced image loading with lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Load the actual image
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.post-image').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';
        img.dataset.src = img.src; // Store the original src
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Placeholder
        imageObserver.observe(img);
    });

    // Improved newsletter subscription with validation
    const emailInput = document.querySelector('.footer-section input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const email = this.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailRegex.test(email)) {
                    // Simulated API call
                    this.disabled = true;
                    this.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        alert('Successfully subscribed!');
                        this.value = '';
                        this.disabled = false;
                        this.style.opacity = '1';
                    }, 1000);
                } else {
                    alert('Please enter a valid email address');
                }
            }
        });
    }

    // Add dark mode toggle
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    };

    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});