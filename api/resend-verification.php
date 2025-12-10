<?php
// api/resend-verification.php - Resend verification email
header('Content-Type: application/json');

$db_host = 'localhost';
$db_name = 'campconnectus';
$db_user = 'campconnectus';
$db_pass = 'StrongPassword123!';

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');

if (empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    
    // Check if user exists and is not verified
    $stmt = $pdo->prepare("SELECT id, first_name, verification_token, verification_expires FROM users WHERE email = ? AND email_verified = 0");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'No pending verification found for this email']);
        exit;
    }
    
    // Generate new token if expired
    $token = $user['verification_token'];
    $expires = $user['verification_expires'];
    
    if (strtotime($expires) < time()) {
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        $stmt = $pdo->prepare("UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?");
        $stmt->execute([$token, $expires, $user['id']]);
    }
    
    // Send email
    $verification_link = "https://campconnectus.store/verify-email.php?token=$token";
    $subject = "Verify Your CampConnectUs Account";
    $message = "Hello,\n\n";
    $message .= "Click the link below to verify your email:\n";
    $message .= $verification_link . "\n\n";
    $message .= "This link expires in 24 hours.\n";
    
    $headers = "From: no-reply@campconnectus.store\r\n";
    
    if (mail($email, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Verification email sent! Check your inbox.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
