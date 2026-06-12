/* ============================================
   Main JavaScript - Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initDropdowns();
    initFormHandling();
});

/* ============================================
   Hamburger Menu Toggle
   ============================================ */

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickInsideHamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

/* ============================================
   Dropdown Menu Toggle (Mobile)
   ============================================ */

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (window.innerWidth <= 768) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');

                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Reset dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

/* ============================================
   Contact Form Handling
   ============================================ */

function initFormHandling() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Prepare form data for submission (you would replace this with actual backend)
        console.log('Form submitted:', {
            name: name,
            email: email,
            message: message
        });

        // Show success message
        showFormSuccessMessage(contactForm);

        // Reset form
        contactForm.reset();
    });
}

/* ============================================
   Helper Functions
   ============================================ */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccessMessage(form) {
    // Create and show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    successMessage.style.cssText = `
        background-color: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        text-align: center;
        animation: slideDown 0.3s ease-out;
    `;

    // Insert before form
    form.parentNode.insertBefore(successMessage, form);

    // Remove message after 5 seconds
    setTimeout(function() {
        successMessage.remove();
    }, 5000);
}

/* ============================================
   Smooth Scroll Enhancement
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Account for sticky header height
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ============================================
   Add Animation on Scroll
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.project-card, .tour-card, .sankofa-grid').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

/* ============================================
   Inject Animation Keyframes
   ============================================ */

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   Mobile Navigation Enhancement
   ============================================ */

window.addEventListener('resize', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (window.innerWidth > 768) {
        if (hamburger && nav) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    }
});
