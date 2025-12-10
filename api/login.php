<?php
// api/login.php - Handle login with email verification check
session_start();
header('Content-Type: application/json');

$db_host = 'localhost';
$db_name = 'campconnectus';
$db_user = 'campconnectus';
$db_pass = 'StrongPassword123!';

// Get login data
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Find user by email
    $stmt = $pdo->prepare("SELECT id, first_name, last_name, email, password_hash, email_verified, user_type FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    
    // Check password
    if (!password_verify($password, $user['password_hash'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    
    // ✅ CRITICAL: Check if email is verified
    if (!$user['email_verified']) {
        echo json_encode([
            'success' => false, 
            'message' => 'Please verify your email before logging in. Check your inbox for the verification link.'
        ]);
        exit;
    }
    
    // Login successful - create session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
    $_SESSION['user_type'] = $user['user_type'];
    $_SESSION['logged_in'] = true;
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful!',
        'redirect' => 'dashboard.html', // You'll create this later
        'user' => [
            'name' => $user['first_name'] . ' ' . $user['last_name'],
            'email' => $user['email'],
            'type' => $user['user_type']
        ]
    ]);
    
} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again.']);
}
?>
