// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change menu icon
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation for Login and Signup
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
        
        // Email validation
        if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.style.borderColor = 'red';
            }
        }
        
        // Password validation
        if (input.type === 'password' && input.value.length < 6) {
            isValid = false;
            input.style.borderColor = 'red';
        }
    });
    
    return isValid;
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .step');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('load', () => {
    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Image upload preview (for profile pictures)
function setupImageUpload() {
    const imageUpload = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    
    if (imageUpload && imagePreview) {
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupImageUpload();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === '/')) {
            link.classList.add('active');
        }
    });
});
// Terms Agreement Banner
document.addEventListener('DOMContentLoaded', function() {
    const termsBanner = document.getElementById('termsBanner');
    const acceptBtn = document.getElementById('acceptTerms');
    const declineBtn = document.getElementById('declineTerms');
    
    // Check if user has already agreed to terms
    const hasAgreed = localStorage.getItem('campconnectus_terms_agreed');
    
    if (!hasAgreed) {
        // Show banner after 1 second delay
        setTimeout(() => {
            termsBanner.classList.add('active');
        }, 1000);
    }
    
    // Accept terms
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('campconnectus_terms_agreed', 'true');
            localStorage.setItem('campconnectus_terms_date', new Date().toISOString());
            termsBanner.classList.remove('active');
            
            // Optional: Send analytics or confirmation
            console.log('User accepted terms');
        });
    }
    
    // Decline terms
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            // Store that user declined
            localStorage.setItem('campconnectus_terms_declined', 'true');
            termsBanner.classList.remove('active');
            
            // Show message or redirect
            alert('To use CampConnectUs, you must accept our Terms of Service and Privacy Policy.');
            
            // Optional: Redirect to terms page
            // window.location.href = 'terms-of-service.html';
        });
    }
    
    // Clear agreement (for testing purposes - remove in production)
    // localStorage.removeItem('campconnectus_terms_agreed');
    // localStorage.removeItem('campconnectus_terms_declined');
});
