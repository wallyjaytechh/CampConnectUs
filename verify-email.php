<?php
// verify-email.php - Handle email verification
$db_host = 'localhost';
$db_name = 'campconnectus';
$db_user = 'campconnectus';
$db_pass = 'StrongPassword123!';

$token = $_GET['token'] ?? '';

if (empty($token)) {
    die('Invalid verification link');
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check token
    $stmt = $pdo->prepare("SELECT id, email, verification_expires FROM users WHERE verification_token = ? AND email_verified = 0");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <title>Verification Failed - CampConnectUs</title>
            <style>body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }</style>
        </head>
        <body>
            <h2>❌ Verification Failed</h2>
            <p>Invalid or expired verification link.</p>
            <p><a href="login.html">Go to Login</a></p>
        </body>
        </html>';
        die($html);
    }
    
    // Check expiration
    if (strtotime($user['verification_expires']) < time()) {
        // Generate new token
        $new_token = bin2hex(random_bytes(32));
        $new_expires = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        $stmt = $pdo->prepare("UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?");
        $stmt->execute([$new_token, $new_expires, $user['id']]);
        
        // Resend email
        $verification_link = "https://campconnectus.store/verify-email.php?token=$new_token";
        $subject = "New Verification Link - CampConnectUs";
        $message = "Your previous verification link has expired.\n\n";
        $message .= "New verification link: $verification_link\n";
        $message .= "This link will expire in 24 hours.";
        
        mail($user['email'], $subject, $message, "From: no-reply@campconnectus.store");
        
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <title>Link Expired - CampConnectUs</title>
            <style>body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }</style>
        </head>
        <body>
            <h2>⚠️ Verification Link Expired</h2>
            <p>We\'ve sent a new verification link to your email.</p>
            <p>Please check your email and click the new link.</p>
        </body>
        </html>';
        die($html);
    }
    
    // Mark as verified
    $stmt = $pdo->prepare("UPDATE users SET email_verified = 1, verification_token = NULL WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    // Success page
    $html = '
    <!DOCTYPE html>
    <html>
    <head>
        <title>Email Verified - CampConnectUs</title>
        <link rel="stylesheet" href="css/style.css">
        <style>
            .verification-success { text-align: center; padding: 100px 20px; }
            .success-icon { font-size: 80px; color: #4CAF50; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <nav class="navbar">
            <div class="container">
                <a href="index.html" class="logo">
                    <i class="fas fa-graduation-cap"></i>
                    <span>CampConnectUs</span>
                </a>
            </div>
        </nav>
        
        <section class="verification-success">
            <div class="container">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h1>✅ Email Verified Successfully!</h1>
                <p>Your email address has been verified. You can now login to your account.</p>
                <a href="login.html" class="btn-primary" style="margin-top: 30px;">
                    <i class="fas fa-sign-in-alt"></i> Login to Your Account
                </a>
            </div>
        </section>
    </body>
    </html>';
    echo $html;
    
} catch (PDOException $e) {
    die('Server error. Please try again later.');
}
?>
