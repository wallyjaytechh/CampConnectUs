<?php
// api/verify-signup.php - Complete signup with email verification
header('Content-Type: application/json');

// Database configuration
$db_host = 'localhost';
$db_name = 'campconnectus';
$db_user = 'campconnectus';
$db_pass = 'StrongPassword123!';

// reCAPTCHA secret
$recaptcha_secret = '6LfLHScsAAAAAMSzBMoEzuy0VgDvxmEN10ldATCB';

// Get form data
$data = [
    'first_name' => trim($_POST['firstName'] ?? ''),
    'last_name' => trim($_POST['lastName'] ?? ''),
    'email' => trim($_POST['email'] ?? ''),
    'phone' => trim($_POST['phone'] ?? ''),
    'user_type' => $_POST['userType'] ?? 'student',
    'student_id' => trim($_POST['studentId'] ?? ''),
    'faculty' => trim($_POST['faculty'] ?? ''),
    'department' => trim($_POST['department'] ?? ''),
    'year' => $_POST['year'] ?? '',
    'date_of_birth' => $_POST['dateOfBirth'] ?? '',
    'campus' => trim($_POST['campus'] ?? ''),
    'password' => $_POST['password'] ?? '',
    'recaptcha_token' => $_POST['g-recaptcha-response'] ?? ''
];

// Validate required fields
$required = ['first_name', 'last_name', 'email', 'password', 'faculty', 'department'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(['success' => false, 'message' => ucfirst(str_replace('_', ' ', $field)) . ' is required']);
        exit;
    }
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Validate password
if (strlen($data['password']) < 8) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters']);
    exit;
}

// Verify reCAPTCHA
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_data = [
    'secret' => $recaptcha_secret,
    'response' => $data['recaptcha_token']
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $recaptcha_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($recaptcha_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$recaptcha_result = curl_exec($ch);
curl_close($ch);

$recaptcha_json = json_decode($recaptcha_result, true);
if (!$recaptcha_json['success'] || $recaptcha_json['score'] < 0.5) {
    echo json_encode(['success' => false, 'message' => 'Security verification failed. Please try again.']);
    exit;
}

// Connect to database
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
    
    // Generate verification token
    $verification_token = bin2hex(random_bytes(32));
    $verification_expires = date('Y-m-d H:i:s', strtotime('+24 hours'));
    $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);
    
    // Insert user
    $sql = "INSERT INTO users (first_name, last_name, email, phone, user_type, student_id, faculty, department, year_of_study, date_of_birth, campus, password_hash, verification_token, verification_expires) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $data['first_name'],
        $data['last_name'],
        $data['email'],
        $data['phone'],
        $data['user_type'],
        $data['student_id'],
        $data['faculty'],
        $data['department'],
        $data['year'],
        $data['date_of_birth'],
        $data['campus'],
        $password_hash,
        $verification_token,
        $verification_expires
    ]);
    
    $user_id = $pdo->lastInsertId();
    
    // Send verification email
    $verification_link = "https://campconnectus.store/verify-email.php?token=$verification_token";
    $subject = "Verify Your CampConnectUs Account";
    $message = "Hello " . $data['first_name'] . ",\n\n";
    $message .= "Thank you for registering with CampConnectUs!\n\n";
    $message .= "Please click the link below to verify your email address:\n";
    $message .= $verification_link . "\n\n";
    $message .= "This link will expire in 24 hours.\n\n";
    $message .= "If you didn't create this account, please ignore this email.\n\n";
    $message .= "Best regards,\n";
    $message .= "CampConnectUs Team";
    
    $headers = "From: no-reply@campconnectus.store\r\n";
    $headers .= "Reply-To: support@campconnectus.store\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($data['email'], $subject, $message, $headers)) {
        echo json_encode([
            'success' => true,
            'message' => 'Account created successfully! Please check your email to verify your account.',
            'redirect' => 'account-created.html'
        ]);
    } else {
        // Email failed but user was created
        error_log("Failed to send verification email to: " . $data['email']);
        echo json_encode([
            'success' => true,
            'message' => 'Account created! Email verification may be delayed.',
            'redirect' => 'account-created.html'
        ]);
    }
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.']);
}
?>
