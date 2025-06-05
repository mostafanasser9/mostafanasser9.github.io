document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.project-card, .tech-category, .form-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.querySelector('.form-container form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Optional: Add custom validation if needed
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            
            let isValid = true;
            
            if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            }
            
            if (message && message.value.trim().length < 10) {
                isValid = false;
                showError(message, 'Message must be at least 10 characters');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            input.classList.add('is-invalid');
        }
        
        // Clear error messages when inputs are focused
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('is-invalid');
                const errorElement = this.closest('.form-group').querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            });
        });
    }
});