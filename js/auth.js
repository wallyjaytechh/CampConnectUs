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
// Phone Verification System
let verificationTimer;
let timeLeft = 60;

function initializePhoneVerification() {
    const phoneInput = document.getElementById('phone');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const verificationSection = document.getElementById('phoneVerificationSection');
    
    if (!phoneInput || !sendCodeBtn) return;
    
    // Show verification section when phone is entered
    phoneInput.addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            verificationSection.style.display = 'block';
        } else {
            verificationSection.style.display = 'none';
        }
    });
    
    // Send verification code
    sendCodeBtn.addEventListener('click', function() {
        const phone = phoneInput.value.trim();
        
        if (!phone || phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Simulate sending SMS (in real app, connect to SMS API)
        const fakeCode = Math.floor(100000 + Math.random() * 900000);
        console.log(`SMS Code for ${phone}: ${fakeCode}`); // For testing
        
        alert(`📱 Verification code sent to ${phone}\nTest Code: ${fakeCode}\n(In production, this would be sent via SMS)`);
        
        // Disable send button and show timer
        sendCodeBtn.disabled = true;
        sendCodeBtn.innerHTML = '<i class="fas fa-clock"></i> Sent';
        
        // Show verification input and verify button
        document.getElementById('verificationCode').style.display = 'block';
        verifyCodeBtn.style.display = 'inline-block';
        
        // Start countdown timer
        startVerificationTimer();
    });
    
    // Verify code
    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', function() {
            const enteredCode = document.getElementById('verificationCode').value.trim();
            
            if (!enteredCode || enteredCode.length !== 6) {
                document.getElementById('verificationError').textContent = 'Please enter a valid 6-digit code';
                return;
            }
            
            // In real app, verify with backend
            // For demo, accept any 6-digit code
            document.getElementById('verificationError').textContent = '';
            document.getElementById('verificationError').style.color = '#4CAF50';
            document.getElementById('verificationError').innerHTML = '<i class="fas fa-check-circle"></i> Phone number verified!';
            
            // Disable verification inputs
            document.getElementById('verificationCode').disabled = true;
            verifyCodeBtn.disabled = true;
            verifyCodeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
            verifyCodeBtn.style.backgroundColor = '#4CAF50';
            
            // Clear timer
            clearInterval(verificationTimer);
            document.getElementById('verificationTimer').style.display = 'none';
        });
    }
}

function startVerificationTimer() {
    timeLeft = 60;
    const timerElement = document.getElementById('verificationTimer');
    const countdownElement = document.getElementById('countdown');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    
    timerElement.style.display = 'block';
    
    verificationTimer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(verificationTimer);
            sendCodeBtn.disabled = false;
            sendCodeBtn.innerHTML = '<i class="fas fa-sms"></i> Resend Code';
            timerElement.style.display = 'none';
        }
    }, 1000);
}

// CAPTCHA System
function initializeCaptcha() {
    const captchaCheckbox = document.getElementById('captchaCheckbox');
    const captchaBox = document.getElementById('captchaBox');
    
    if (!captchaCheckbox || !captchaBox) return;
    
    captchaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Simulate verification process
            captchaBox.classList.add('verified');
            document.getElementById('robotIcon').className = 'fas fa-user-check';
            document.getElementById('robotIcon').style.color = '#4CAF50';
            
            // Optional: Add a small delay to simulate checking
            setTimeout(() => {
                captchaBox.innerHTML = `
                    <div style="text-align: center; width: 100%;">
                        <i class="fas fa-check-circle" style="font-size: 32px; color: #4CAF50;"></i>
                        <p style="margin-top: 10px; color: #4CAF50; font-weight: 500;">Verification complete!</p>
                    </div>
                `;
            }, 800);
        } else {
            captchaBox.classList.remove('verified');
        }
    });
}

// Update form validation
function validateSignupForm() {
    // ... existing validation code ...
    
    // Add CAPTCHA validation
    const captchaCheckbox = document.getElementById('captchaCheckbox');
    const captchaError = document.getElementById('captchaError');
    
    if (captchaCheckbox && !captchaCheckbox.checked) {
        captchaError.textContent = 'Please confirm you are not a robot';
        isValid = false;
    } else {
        captchaError.textContent = '';
    }
    
    // Add phone verification check
    const verificationCode = document.getElementById('verificationCode');
    if (verificationCode && verificationCode.style.display !== 'none') {
        if (!verificationCode.value.trim() || verificationCode.disabled === false) {
            document.getElementById('verificationError').textContent = 'Please verify your phone number';
            isValid = false;
        }
    }
    
    return isValid;
}

// Initialize new features
document.addEventListener('DOMContentLoaded', function() {
    initializePhoneVerification();
    initializeCaptcha();
    
    // Update user type toggle to handle new fields
    const studentBtn = document.querySelector('.user-type-btn[data-type="student"]');
    const staffBtn = document.querySelector('.user-type-btn[data-type="staff"]');
    
    if (studentBtn && staffBtn) {
        studentBtn.addEventListener('click', function() {
            // Enable student fields, disable staff fields
            const studentInputs = document.querySelectorAll('#studentFields input, #studentFields select');
            const staffInputs = document.querySelectorAll('#staffFields input, #staffFields select');
            
            studentInputs.forEach(input => input.required = true);
            staffInputs.forEach(input => input.required = false);
        });
        
        staffBtn.addEventListener('click', function() {
            // Enable staff fields, disable student fields
            const studentInputs = document.querySelectorAll('#studentFields input, #studentFields select');
            const staffInputs = document.querySelectorAll('#staffFields input, #staffFields select');
            
            studentInputs.forEach(input => input.required = false);
            staffInputs.forEach(input => input.required = true);
        });
    }
});
