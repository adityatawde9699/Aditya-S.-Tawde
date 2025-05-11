// Mobile Navigation
const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

hamburgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true' || false;
    hamburgerMenu.setAttribute('aria-expanded', !expanded);
    mainNav.setAttribute('aria-expanded', !expanded);
});

// Animate skill progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = `${progress}%`;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Animate tech stack items
function animateTechItems() {
    const techItems = document.querySelectorAll('.tech-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations based on their position
                setTimeout(() => {
                    entry.target.classList.add('tech-item-visible');
                    observer.unobserve(entry.target);
                }, 100 * (index % 4)); // Stagger by row
            }
        });
    }, { threshold: 0.1 });
    
    techItems.forEach(item => {
        item.classList.add('tech-item-hidden');
        observer.observe(item);
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonialSection = document.querySelector('.testimonials-section');
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialCards.length === 0 || !testimonialContainer) return;
    
    let activeIndex = 0;
    let startX, moveX;
    let autoplayInterval;
    let isTransitioning = false;
    
    // Convert existing layout to carousel
    function setupCarousel() {
        // Set container style
        testimonialContainer.style.display = 'flex';
        testimonialContainer.style.transition = 'transform 0.5s ease-in-out';
        testimonialContainer.style.width = '100%';
        
        // Set card styles
        testimonialCards.forEach(card => {
            card.style.flex = '0 0 100%';
            card.style.transition = 'opacity 0.3s ease';
        });
        
        // Initial position
        updateCarouselPosition();
        
        // Add navigation controls if not present
        if (!document.querySelector('.testimonial-nav')) {
            const navContainer = document.createElement('div');
            navContainer.className = 'testimonial-nav';
            
            const prevButton = document.createElement('button');
            prevButton.className = 'testimonial-nav-btn prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.setAttribute('aria-label', 'Previous testimonial');
            
            const nextButton = document.createElement('button');
            nextButton.className = 'testimonial-nav-btn next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.setAttribute('aria-label', 'Next testimonial');
            
            navContainer.appendChild(prevButton);
            navContainer.appendChild(nextButton);
            testimonialSection.appendChild(navContainer);
            
            // Add event listeners
            prevButton.addEventListener('click', () => {
                if (isTransitioning) return;
                navigateTestimonial(-1);
            });
            
            nextButton.addEventListener('click', () => {
                if (isTransitioning) return;
                navigateTestimonial(1);
            });
        }
    }
    
    // Update carousel position
    function updateCarouselPosition(animate = true) {
        if (animate) {
            isTransitioning = true;
            testimonialContainer.style.transition = 'transform 0.5s ease-in-out';
            setTimeout(() => { isTransitioning = false; }, 500);
        } else {
            testimonialContainer.style.transition = 'none';
        }
        
        const offset = -activeIndex * 100;
        testimonialContainer.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
        
        // Update ARIA attributes for accessibility
        testimonialCards.forEach((card, index) => {
            card.setAttribute('aria-hidden', index !== activeIndex);
        });
    }
    
    // Navigate to previous/next testimonial
    function navigateTestimonial(direction) {
        resetAutoplay();
        
        activeIndex += direction;
        
        // Loop back if needed
        if (activeIndex < 0) activeIndex = testimonialCards.length - 1;
        if (activeIndex >= testimonialCards.length) activeIndex = 0;
        
        updateCarouselPosition();
    }
    
    // Set up autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            navigateTestimonial(1);
        }, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Set up touch events for mobile swiping
    function setupSwipeEvents() {
        testimonialContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoplay();
            testimonialContainer.style.transition = 'none';
        }, { passive: true });
        
        testimonialContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            
            moveX = e.touches[0].clientX;
            const diff = moveX - startX;
            const currentTranslate = -activeIndex * 100;
            const newTranslate = currentTranslate + (diff / testimonialContainer.offsetWidth * 100);
            
            // Limit the swipe to the next/previous item only
            if (newTranslate <= 0 && newTranslate >= -((testimonialCards.length - 1) * 100)) {
                testimonialContainer.style.transform = `translateX(${newTranslate}%)`;
            }
        }, { passive: true });
        
        testimonialContainer.addEventListener('touchend', (e) => {
            if (!startX || !moveX) {
                startX = null;
                moveX = null;
                resetAutoplay();
                return;
            }
            
            const diff = moveX - startX;
            const threshold = testimonialContainer.offsetWidth * 0.2; // 20% threshold
            
            if (Math.abs(diff) > threshold) {
                // Swipe was significant
                if (diff > 0) {
                    // Swiped right
                    navigateTestimonial(-1);
                } else {
                    // Swiped left
                    navigateTestimonial(1);
                }
            } else {
                // Swipe was not significant, reset position
                updateCarouselPosition();
            }
            
            startX = null;
            moveX = null;
            resetAutoplay();
        }, { passive: true });
        
        // Handle mouse drag for desktop
        testimonialContainer.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            stopAutoplay();
            testimonialContainer.style.transition = 'none';
            e.preventDefault();
        });
        
        testimonialContainer.addEventListener('mousemove', (e) => {
            if (!startX) return;
            
            moveX = e.clientX;
            const diff = moveX - startX;
            const currentTranslate = -activeIndex * 100;
            const newTranslate = currentTranslate + (diff / testimonialContainer.offsetWidth * 100);
            
            if (newTranslate <= 0 && newTranslate >= -((testimonialCards.length - 1) * 100)) {
                testimonialContainer.style.transform = `translateX(${newTranslate}%)`;
            }
        });
        
        window.addEventListener('mouseup', (e) => {
            if (!startX || !moveX) {
                startX = null;
                moveX = null;
                resetAutoplay();
                return;
            }
            
            const diff = moveX - startX;
            const threshold = testimonialContainer.offsetWidth * 0.2;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    navigateTestimonial(-1);
                } else {
                    navigateTestimonial(1);
                }
            } else {
                updateCarouselPosition();
            }
            
            startX = null;
            moveX = null;
            resetAutoplay();
        });
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            activeIndex = index;
            updateCarouselPosition();
            resetAutoplay();
        });
    });
    
    // Handle visibility change to pause autoplay when tab is not active
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
    
    // Initialize the carousel
    setupCarousel();
    setupSwipeEvents();
    startAutoplay();
    
    // Handle responsive behavior
    window.addEventListener('resize', () => {
        updateCarouselPosition(false);
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 300);
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.project-card, .certification-card, .testimonial-card, .blog-card, .education-item');
    
    // Create an IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('animate-in');
                // Stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // relative to viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // trigger a bit earlier
    });
    
    // Add initial classes and start observing each element
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Image optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    // Create an IntersectionObserver to lazy load images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Replace placeholder with actual image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // Add a class for fade-in animation
                img.classList.add('img-loaded');
                
                // Stop observing the image
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // Load images when they're 50px from viewport
        threshold: 0.1 // Trigger when 10% of the image is visible
    });
    
    // Start observing each image
    images.forEach(img => {
        // Add placeholder style
        img.classList.add('img-placeholder');
        
        // Start observing
        imageObserver.observe(img);
    });
}

function initProjectGallery() {
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalClose = document.createElement('button');
    modalClose.className = 'modal-close';
    modalClose.innerHTML = '&times;';
    modalClose.setAttribute('aria-label', 'Close modal');
    
    const modalImage = document.createElement('img');
    modalImage.className = 'modal-image';
    
    const modalDetails = document.createElement('div');
    modalDetails.className = 'modal-details';
    
    const modalNav = document.createElement('div');
    modalNav.className = 'modal-navigation';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'modal-nav-btn prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Previous project');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'modal-nav-btn next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Next project');
    
    // Append elements to DOM
    modalNav.appendChild(prevButton);
    modalNav.appendChild(nextButton);
    modalContent.appendChild(modalClose);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(modalDetails);
    modalContent.appendChild(modalNav);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    let currentIndex = 0;
    
    // Function to open modal with project details
    function openModal(index) {
        const project = projectCards[index];
        const projectImage = project.querySelector('.project-image img').src;
        const projectTitle = project.querySelector('h3').textContent;
        const projectDescription = project.querySelector('.project-description').textContent;
        const projectTech = project.querySelector('.project-tech').innerHTML;
        
        // Get links if available
        let linksHTML = '';
        const projectLinks = project.querySelectorAll('.project-links a');
        if (projectLinks.length > 0) {
            linksHTML = '<div class="modal-links">';
            projectLinks.forEach(link => {
                linksHTML += `<a href="${link.href}" class="modal-link" target="_blank" rel="noopener noreferrer">${link.innerHTML}</a>`;
            });
            linksHTML += '</div>';
        }
        
        // Set modal content
        modalImage.src = projectImage;
        modalImage.alt = projectTitle;
        
        modalDetails.innerHTML = `
            <h3>${projectTitle}</h3>
            <p>${projectDescription}</p>
            <div class="modal-tech-tags">${projectTech}</div>
            ${linksHTML}
        `;
        
        // Show modal with animation
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        currentIndex = index;
        
        // Update navigation button states
        updateNavButtons();
    }
    
    // Function to close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to navigate to previous/next project
    function navigateProject(direction) {
        let newIndex = currentIndex + direction;
        
        // Loop back to end/start if needed
        if (newIndex < 0) newIndex = projectCards.length - 1;
        if (newIndex >= projectCards.length) newIndex = 0;
        
        // Slide animation
        modalContent.style.opacity = '0';
        modalContent.style.transform = `translateX(${direction * 50}px)`;
        
        setTimeout(() => {
            openModal(newIndex);
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateX(0)';
        }, 300);
    }
    
    // Update navigation button states
    function updateNavButtons() {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
    
    // Add click events to project images to open modal
    projectCards.forEach((card, index) => {
        const projectImage = card.querySelector('.project-image');
        
        projectImage.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (!e.target.closest('.project-links')) {
                openModal(index);
            }
        });
    });
    
    // Add event listeners for navigation
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    prevButton.addEventListener('click', () => navigateProject(-1));
    nextButton.addEventListener('click', () => navigateProject(1));
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modalOverlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateProject(-1);
        if (e.key === 'ArrowRight') navigateProject(1);
    });
}

function initPageTransitions() {
    const navLinks = document.querySelectorAll('#main-nav a');
    const sections = document.querySelectorAll('section, header, footer');
    const transitionOverlay = document.createElement('div');
    
    // Create overlay for transitions
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only process internal links
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Get the target section
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (!targetSection) return;
                
                // Close mobile menu if open
                const mainNav = document.getElementById('main-nav');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.getElementById('hamburger-menu').setAttribute('aria-expanded', 'false');
                    mainNav.setAttribute('aria-expanded', 'false');
                }
                
                // Perform the transition
                performPageTransition(targetSection);
            }
        });
    });
    
    function performPageTransition(targetSection) {
        // Start transition - fade in overlay
        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.visibility = 'visible';
        
        // Add active class to target section and remove from others after overlay is visible
        setTimeout(() => {
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Adjusted for header height
                behavior: 'instant' // Use instant during transition
            });
            
            // Prepare sections for transition
            sections.forEach(section => {
                section.classList.add('transition-hidden');
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            });
            
            // Highlight active nav link
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${targetSection.id}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Fade out overlay
            setTimeout(() => {
                transitionOverlay.style.opacity = '0';
                
                // Show target section
                targetSection.classList.remove('transition-hidden');
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                
                // After overlay is gone, show other sections
                setTimeout(() => {
                    transitionOverlay.style.visibility = 'hidden';
                    sections.forEach(section => {
                        if (section !== targetSection) {
                            section.classList.remove('transition-hidden');
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }
                    });
                }, 300);
            }, 400);
        }, 300);
    }
    
    // Initial setup
    sections.forEach(section => {
        section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Generate sitemap XML content for download
function generateSitemap() {
    const domain = 'https://adityatawdeportfolio.com';
    const today = new Date().toISOString().split('T')[0];
    
    const urls = [
        {loc: `${domain}/`, priority: '1.0', changefreq: 'weekly'},
        {loc: `${domain}/#about`, priority: '0.8', changefreq: 'monthly'},
        {loc: `${domain}/#skills`, priority: '0.8', changefreq: 'monthly'},
        {loc: `${domain}/#education`, priority: '0.8', changefreq: 'monthly'},
        {loc: `${domain}/#certifications`, priority: '0.8', changefreq: 'monthly'},
        {loc: `${domain}/#projects`, priority: '0.9', changefreq: 'weekly'},
        {loc: `${domain}/#testimonials`, priority: '0.7', changefreq: 'monthly'},
        {loc: `${domain}/#contact`, priority: '0.8', changefreq: 'monthly'},
        {loc: `${domain}/blog.html`, priority: '0.9', changefreq: 'weekly'}
    ];
    
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    urls.forEach(url => {
        xmlContent += `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    });
    
    xmlContent += `
</urlset>`;
    
    // Create download link
    const blob = new Blob([xmlContent], {type: 'application/xml'});
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'sitemap.xml';
    
    // Add a small button in footer
    const generateSitemapBtn = document.createElement('button');
    generateSitemapBtn.textContent = 'Generate Sitemap';
    generateSitemapBtn.classList.add('sitemap-btn');
    generateSitemapBtn.addEventListener('click', () => {
        downloadLink.click();
    });
    
    const footer = document.querySelector('footer');
    if (footer) {
        footer.appendChild(generateSitemapBtn);
    }
    
    return xmlContent;
}

// Track page performance metrics for SEO
function trackPagePerformance() {
    // Only run if the Performance API is available
    if (performance && 'getEntriesByType' in performance) {
        // Wait for the page to fully load
        window.addEventListener('load', () => {
            setTimeout(() => {
                // Get navigation timing data
                const perfData = performance.getEntriesByType('navigation')[0];
                
                if (perfData) {
                    // Calculate key metrics
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
                    const tcpTime = perfData.connectEnd - perfData.connectStart;
                    const ttfb = perfData.responseStart - perfData.requestStart;
                    const domInteractive = perfData.domInteractive - perfData.navigationStart;
                    const domComplete = perfData.domComplete - perfData.navigationStart;
                    
                    // Log performance data for analysis
                    console.log('🚀 Page Performance Metrics:');
                    console.log(`📊 Total Page Load: ${Math.round(pageLoadTime)}ms`);
                    console.log(`📊 DNS Lookup: ${Math.round(dnsTime)}ms`);
                    console.log(`📊 TCP Connection: ${Math.round(tcpTime)}ms`);
                    console.log(`📊 Time to First Byte: ${Math.round(ttfb)}ms`);
                    console.log(`📊 DOM Interactive: ${Math.round(domInteractive)}ms`);
                    console.log(`📊 DOM Complete: ${Math.round(domComplete)}ms`);
                    
                    // Analyze Largest Contentful Paint
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        console.log(`📊 Largest Contentful Paint: ${Math.round(lastEntry.startTime)}ms`);
                    });
                    
                    // Analyze Cumulative Layout Shift
                    const clsObserver = new PerformanceObserver((list) => {
                        let cumulativeScore = 0;
                        for (const entry of list.getEntries()) {
                            cumulativeScore += entry.value;
                        }
                        console.log(`📊 Cumulative Layout Shift: ${cumulativeScore.toFixed(3)}`);
                    });
                    
                    // Analyze First Input Delay
                    const fidObserver = new PerformanceObserver((list) => {
                        const firstInput = list.getEntries()[0];
                        console.log(`📊 First Input Delay: ${Math.round(firstInput.processingStart - firstInput.startTime)}ms`);
                    });
                    
                    // Register observers if they're supported
                    if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
                        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
                    }
                    
                    if (PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
                        clsObserver.observe({ type: 'layout-shift', buffered: true });
                    }
                    
                    if (PerformanceObserver.supportedEntryTypes.includes('first-input')) {
                        fidObserver.observe({ type: 'first-input', buffered: true });
                    }
                }
            }, 3000); // Wait 3 seconds after load to calculate metrics
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
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
    }
    
    // Update percentage counter
    const percentage = document.querySelector('.percentage');
    if (percentage) {
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
    }
    
    // Animate skill progress bars when the page loads
    animateProgressBars();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Animate tech stack items
    animateTechItems();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Optimize images
    optimizeImages();
    
    initProjectGallery();
    
    initPageTransitions();
    
    // Initialize sitemap generator
    generateSitemap();
    
    // Track page performance for SEO
    trackPagePerformance();
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
    
    