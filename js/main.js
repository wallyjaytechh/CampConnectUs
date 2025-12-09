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
// Terms Agreement Modal - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const termsModal = document.getElementById('termsModal');
    const acceptBtn = document.getElementById('acceptTermsModal');
    const declineBtn = document.getElementById('declineTermsModal');
    
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem('campconnectus_terms_agreed');
    const hasDeclined = localStorage.getItem('campconnectus_terms_declined');
    
    // Show modal only if user hasn't made a choice
    if (!hasAgreed && !hasDeclined) {
        // Small delay to let page load
        setTimeout(() => {
            if (termsModal) {
                termsModal.classList.add('active');
                // Prevent scrolling when modal is open
                document.body.style.overflow = 'hidden';
                console.log('Terms modal shown');
            }
        }, 1000); // 1 second delay
    }
    
    // Accept terms
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            localStorage.setItem('campconnectus_terms_agreed', 'true');
            localStorage.setItem('campconnectus_terms_date', new Date().toISOString());
            
            if (termsModal) {
                termsModal.classList.remove('active');
                // Restore scrolling
                document.body.style.overflow = 'auto';
            }
            
            console.log('Terms accepted');
            // Optional: Show welcome message
            // alert('Welcome to CampConnectUs! 🎉');
        });
    }
    
    // Decline terms
    if (declineBtn) {
        declineBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            localStorage.setItem('campconnectus_terms_declined', 'true');
            
            if (termsModal) {
                termsModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // More prominent decline message
            const declineConfirmed = confirm('⚠️ IMPORTANT: You must accept our Terms of Service and Privacy Policy to use CampConnectUs.\n\nClick "OK" to review our terms, or "Cancel" to leave the site.');
            
            if (declineConfirmed) {
                // Redirect to terms page
                window.location.href = 'terms-of-service.html';
            } else {
                // Optional: Redirect to home or external page
                // window.location.href = 'https://google.com';
            }
        });
    }
    
    // Close modal if clicked outside content
    if (termsModal) {
        termsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                // Optional: Prevent closing by clicking outside
                // Uncomment to allow closing by clicking outside
                // this.classList.remove('active');
                // document.body.style.overflow = 'auto';
            }
        });
    }
    
    // For testing: Clear storage (remove in production)
    // localStorage.removeItem('campconnectus_terms_agreed');
    // localStorage.removeItem('campconnectus_terms_declined');
});
