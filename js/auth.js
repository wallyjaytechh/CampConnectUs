// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize forms
    initializeLoginForm();
    initializeSignupForm();
    initializeUserTypeSelection();
});

// Login Form Handler
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm()) {
            // Simulate login process
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Login successful! Redirecting to dashboard...');
                // In real app: window.location.href = 'dashboard.html';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Connecting with ${platform}...`);
            // Add social login integration here
        });
    });
}

// Validate Login Form
function validateLoginForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    let isValid = true;
    
    // Clear previous errors
    emailError.textContent = '';
    passwordError.textContent = '';
    email.style.borderColor = '#ddd';
    password.style.borderColor = '#ddd';
    
    // Validate email/phone
    if (!email.value.trim()) {
        emailError.textContent = 'Email or phone number is required';
        email.style.borderColor = '#ff3860';
        isValid = false;
    } else if (!validateEmailOrPhone(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email or phone number';
        email.style.borderColor = '#ff3860';
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        passwordError.textContent = 'Password is required';
        password.style.borderColor = '#ff3860';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        password.style.borderColor = '#ff3860';
        isValid = false;
    }
    
    return isValid;
}

// Validate email or phone
function validateEmailOrPhone(value) {
    // Email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone pattern (basic - adapt for your country)
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    
    return emailPattern.test(value) || phonePattern.test(value.replace(/[\s\-\(\)]/g, ''));
}

// Signup Form Handler
function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;
    
    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateSignupForm()) {
            // Simulate signup process
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Account created successfully! Please check your email for verification.');
                // In real app: window.location.href = 'verify-email.html';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Validate Signup Form
function validateSignupForm() {
    const requiredFields = document.querySelectorAll('#signupForm input[required], #signupForm select[required]');
    const termsCheckbox = document.getElementById('terms');
    let isValid = true;
    
    // Validate all required fields
    requiredFields.forEach(field => {
        const errorElement = document.getElementById(field.id + 'Error');
        field.style.borderColor = '#ddd';
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (!field.value.trim()) {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
            }
            field.style.borderColor = '#ff3860';
            isValid = false;
        }
        
        // Specific validations
        if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                }
                field.style.borderColor = '#ff3860';
                isValid = false;
            }
        }
        
        if (field.id === 'phone' && field.value.trim()) {
            const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phonePattern.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid phone number';
                }
                field.style.borderColor = '#ff3860';
                isValid = false;
            }
        }
        
        if (field.type === 'password' && field.value.trim()) {
            if (field.value.length < 8) {
                if (errorElement) {
                    errorElement.textContent = 'Password must be at least 8 characters';
                }
                field.style.borderColor = '#ff3860';
                isValid = false;
            }
        }
        
        if (field.id === 'confirmPassword' && field.value.trim()) {
            const password = document.getElementById('password').value;
            if (field.value !== password) {
                if (errorElement) {
                    errorElement.textContent = 'Passwords do not match';
                }
                field.style.borderColor = '#ff3860';
                isValid = false;
            }
        }
    });
    
    // Validate terms agreement
    if (termsCheckbox && !termsCheckbox.checked) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

// User Type Selection
function initializeUserTypeSelection() {
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const userTypeInput = document.getElementById('userType');
    
    if (!userTypeBtns.length || !userTypeInput) return;
    
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            userTypeBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the hidden input value
            const type = this.getAttribute('data-type');
            userTypeInput.value = type;
        });
    });
    
    // Set default selection
    if (userTypeBtns[0]) {
        userTypeBtns[0].click();
    }
}

// Image Upload with Preview
function initializeImageUpload() {
    const uploadBtn = document.querySelector('.upload-btn');
    const fileInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    
    if (!uploadBtn || !fileInput) return;
    
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            if (imagePreview) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                if (uploadPlaceholder) {
                    uploadPlaceholder.style.display = 'none';
                }
            }
        };
        reader.readAsDataURL(file);
    });
}

// Call this function when the signup page loads
if (document.getElementById('signupForm')) {
    initializeImageUpload();
}

// Forgot Password
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = prompt('Please enter your email address:');
        if (email && validateEmailOrPhone(email)) {
            alert(`Password reset link sent to ${email}`);
            // In real app: send reset email
        } else if (email) {
            alert('Please enter a valid email address');
        }
    });
}
