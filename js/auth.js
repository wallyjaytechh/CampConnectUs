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

// Updated form validation for reCAPTCHA v3
function validateFormBeforeSubmit() {
    const requiredFields = document.querySelectorAll('#signupForm input[required], #signupForm select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) errorElement.textContent = '';
        field.style.borderColor = '#ddd';
        
        if (!field.value.trim()) {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
            }
            field.style.borderColor = '#ff3860';
            isValid = false;
        }
    });
    
    // Phone validation (if keeping phone field)
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.trim()) {
        const phone = phoneField.value.replace(/\s/g, '');
        if (phone.length !== 11 || !phone.startsWith('0')) {
            document.getElementById('phoneError').textContent = 'Enter valid 11-digit Nigerian number';
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



// Basic phone validation for Nigerian numbers
function validatePhoneNumber() {
    const phone = document.getElementById('phone').value.replace(/\s/g, '');
    const errorElement = document.getElementById('phoneError');
    
    if (!phone) {
        errorElement.textContent = 'Phone number is required';
        return false;
    }
    
    if (phone.length !== 11) {
        errorElement.textContent = 'Phone number must be 11 digits';
        return false;
    }
    
    if (!phone.startsWith('0')) {
        errorElement.textContent = 'Nigerian number must start with 0';
        return false;
    }
    
    const validPrefixes = ['080', '081', '090', '070', '091'];
    const prefix = phone.substring(0, 3);
    
    if (!validPrefixes.includes(prefix)) {
        errorElement.textContent = 'Invalid Nigerian number prefix';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// Update form validation
const originalValidateSignupForm = window.validateSignupForm || function() { return true; };

window.validateSignupForm = function() {
    let isValid = originalValidateSignupForm();
    
    // Add phone validation
    if (!validatePhoneNumber()) {
        isValid = false;
    }
    
    // Keep CAPTCHA validation if you have it
    const captchaCheckbox = document.getElementById('captchaCheckbox');
    if (captchaCheckbox && !captchaCheckbox.checked) {
        document.getElementById('captchaError').textContent = 'Please complete the security verification';
        isValid = false;
    }
    
    return isValid;
};

// Update form validation to include CAPTCHA and phone verification
const originalValidateSignupForm = window.validateSignupForm || function() { return true; };

window.validateSignupForm = function() {
    let isValid = originalValidateSignupForm();
    
    // Check CAPTCHA
    const captchaError = document.getElementById('captchaError');
    const captchaCheckbox = document.getElementById('captchaCheckbox');
    
    if (captchaCheckbox && !captchaCheckbox.classList.contains('checked')) {
        captchaError.textContent = 'Please complete the security verification';
        isValid = false;
    } else {
        captchaError.textContent = '';
    }
    
    // Check phone verification
    const verificationSection = document.getElementById('phoneVerificationSection');
    const verificationError = document.getElementById('verificationError');
    
    if (verificationSection && verificationSection.style.display !== 'none') {
        const verificationCode = document.getElementById('verificationCode');
        const verifyBtn = document.getElementById('verifyCodeBtn');
        
        if (!verificationCode.disabled || verifyBtn.disabled) {
            verificationError.textContent = 'Please verify your phone number first';
            verificationError.style.color = '#ff3860';
            isValid = false;
        }
    }
    
    return isValid;
};

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCaptcha();
    initializePhoneVerification();
    
    // Clear localStorage for testing (remove in production)
    // localStorage.removeItem('campconnectus_terms_agreed');
});

// Department-Faculty linking
function initializeDepartmentFacultyLink() {
    const facultySelect = document.getElementById('faculty');
    const departmentSelect = document.getElementById('department');
    
    if (!facultySelect || !departmentSelect) return;
    
    // When faculty changes, suggest relevant departments
    facultySelect.addEventListener('change', function() {
        const faculty = this.value;
        
        // Reset all options to visible
        Array.from(departmentSelect.options).forEach(option => {
            option.style.display = 'block';
            option.disabled = false;
        });
        
        // If a specific faculty is selected, show only relevant departments
        if (faculty && faculty !== 'other_faculty') {
            Array.from(departmentSelect.options).forEach(option => {
                if (option.value && option.parentElement.label) {
                    const optgroup = option.parentElement;
                    const shouldShow = checkFacultyDepartmentMatch(faculty, optgroup.label);
                    
                    if (!shouldShow && option.value !== '' && option.value !== 'other') {
                        option.style.display = 'none';
                        option.disabled = true;
                    }
                }
            });
            
            // Reset selection if current selection is hidden
            if (departmentSelect.options[departmentSelect.selectedIndex]?.disabled) {
                departmentSelect.value = '';
            }
        }
    });
    
    function checkFacultyDepartmentMatch(faculty, departmentGroup) {
        const mapping = {
            'arts_humanities': ['📚 Arts & Humanities'],
            'social_sciences': ['🧠 Social Sciences'],
            'sciences': ['🔬 Sciences'],
            'engineering': ['⚙️ Engineering'],
            'medicine': ['🏥 Medicine & Health'],
            'law': ['⚖️ Law'],
            'education': ['👨‍🏫 Education'],
            'business': ['💼 Business & Management'],
            'agriculture': ['🌱 Agriculture'],
            'environmental': ['🏙️ Environmental Studies'],
            'pharmacy': ['🏥 Medicine & Health'],
            'dentistry': ['🏥 Medicine & Health'],
            'veterinary': ['🏥 Medicine & Health'],
            'basic_medical': ['🏥 Medicine & Health'],
            'clinical_sciences': ['🏥 Medicine & Health'],
            'pharmaceutical_sciences': ['🏥 Medicine & Health'],
            'ict': ['💻 ICT & Computing']
        };
        
        return mapping[faculty]?.some(group => departmentGroup.includes(group.replace(/[📚🧠🔬⚙️🏥⚖️👨‍🏫💼🌱🏙️💻]/g, '').trim())) || false;
    }
}

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDepartmentFacultyLink();
});
// Campus Selection with Custom Input
function initializeCampusSelection() {
    const campusSelect = document.getElementById('campus');
    const customCampusContainer = document.getElementById('customCampusContainer');
    const customCampusInput = document.getElementById('customCampus');
    const campusError = document.getElementById('campusError');
    const customCampusError = document.getElementById('customCampusError');
    
    if (!campusSelect) return;
    
    // Handle campus selection change
    campusSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        // Reset errors
        campusError.textContent = '';
        customCampusError.textContent = '';
        
        // Show/hide custom campus input
        if (selectedValue === 'custom') {
            customCampusContainer.style.display = 'block';
            customCampusInput.required = true;
            customCampusInput.focus();
        } else {
            customCampusContainer.style.display = 'none';
            customCampusInput.required = false;
            customCampusInput.value = '';
        }
    });
    
    // Validate campus selection
    function validateCampus() {
        const selectedValue = campusSelect.value;
        
        if (!selectedValue) {
            campusError.textContent = 'Please select your institution';
            return false;
        }
        
        if (selectedValue === 'custom') {
            const customName = customCampusInput.value.trim();
            if (!customName) {
                customCampusError.textContent = 'Please enter your institution name';
                return false;
            }
            
            if (customName.length < 3) {
                customCampusError.textContent = 'Institution name is too short';
                return false;
            }
            
            // Update the campus select value to custom input
            campusSelect.value = 'custom:' + customName;
        }
        
        return true;
    }
    
    // Auto-fill abbreviation if user types common university names
    customCampusInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        // Common Nigerian university patterns
        const patterns = [
            { pattern: /university of lagos/i, suggestion: 'UNILAG' },
            { pattern: /university of ibadan/i, suggestion: 'UI' },
            { pattern: /university of benin/i, suggestion: 'UNIBEN' },
            { pattern: /university of ilorin/i, suggestion: 'UNILORIN' },
            { pattern: /university of nigeria/i, suggestion: 'UNN' },
            { pattern: /ahmadu bello university/i, suggestion: 'ABU' },
            { pattern: /obafemi awolowo university/i, suggestion: 'OAU' },
            { pattern: /covenant university/i, suggestion: 'CU' },
            { pattern: /babcock university/i, suggestion: 'BU' },
            { pattern: /yaba college/i, suggestion: 'YABATECH' },
            { pattern: /federal polytechnic/i, suggestion: 'FEDPOLY' },
            { pattern: /state polytechnic/i, suggestion: 'STATEPOLY' },
            { pattern: /college of education/i, suggestion: 'COE' },
        ];
        
        for (const pattern of patterns) {
            if (pattern.pattern.test(value)) {
                // Could add a suggestion popup here if needed
                console.log(`Suggested abbreviation: ${pattern.suggestion}`);
                break;
            }
        }
    });
    
    // Add search functionality to campus dropdown
    campusSelect.addEventListener('focus', function() {
        this.size = 8; // Show more options when focused
    });
    
    campusSelect.addEventListener('blur', function() {
        this.size = 1; // Reset to single line
    });
    
    // Add keyboard navigation
    campusSelect.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value === 'custom') {
            customCampusInput.focus();
            e.preventDefault();
        }
    });
    
    // Expose validation function
    return {
        validate: validateCampus,
        getSelectedCampus: function() {
            if (campusSelect.value === 'custom') {
                return customCampusInput.value.trim() || 'Custom Institution';
            }
            return campusSelect.options[campusSelect.selectedIndex].text;
        }
    };
}

// Update form validation to include campus validation
function updateFormValidation() {
    const campusValidation = initializeCampusSelection();
    
    // Extend the existing validateSignupForm function
    const originalValidate = window.validateSignupForm || function() { return true; };
    
    window.validateSignupForm = function() {
        let isValid = originalValidate();
        
        // Validate campus
        if (!campusValidation.validate()) {
            isValid = false;
        }
        
        return isValid;
    };
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('campus')) {
        initializeCampusSelection();
        updateFormValidation();
    }
});

// Function to toggle custom campus input (for inline HTML call)
function toggleCustomCampus(selectElement) {
    const customContainer = document.getElementById('customCampusContainer');
    const customInput = document.getElementById('customCampus');
    
    if (selectElement.value === 'custom') {
        customContainer.style.display = 'block';
        customInput.required = true;
        customInput.focus();
    } else {
        customContainer.style.display = 'none';
        customInput.required = false;
        customInput.value = '';
    }
}

