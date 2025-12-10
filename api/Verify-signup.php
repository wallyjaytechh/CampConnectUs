<?php
// api/verify-signup.php - Backend reCAPTCHA verification
header('Content-Type: application/json');

// Your reCAPTCHA secret key
$secret_key = '6LfLHScsAAAAAMSzBMoEzuy0VgDvxmEN10ldATCB';

// Get form data
$recaptcha_response = $_POST['g-recaptcha-response'] ?? '';
$first_name = $_POST['firstName'] ?? '';
$last_name = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$userType = $_POST['userType'] ?? 'student';

// Verify reCAPTCHA
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_data = [
    'secret' => $secret_key,
    'response' => $recaptcha_response,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

// Make request to Google
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $recaptcha_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($recaptcha_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$recaptcha_result = curl_exec($ch);
curl_close($ch);

$recaptcha_json = json_decode($recaptcha_result, true);

// Check reCAPTCHA score (v3 returns score 0.0-1.0)
if (!$recaptcha_json['success'] || $recaptcha_json['score'] < 0.5) {
    // Score too low - likely a bot
    echo json_encode([
        'success' => false,
        'message' => 'Security verification failed. Please try again.'
    ]);
    exit;
}

// Score is good (≥0.5) - proceed with signup
// TODO: Add database connection here
// TODO: Validate and sanitize all inputs
// TODO: Check if email/phone already exists
// TODO: Save user to database
// TODO: Send welcome email

// For now, simulate success
echo json_encode([
    'success' => true,
    'message' => 'Account created successfully!',
    'recaptcha_score' => $recaptcha_json['score'],
    'user_data' => [
        'name' => $first_name . ' ' . $last_name,
        'email' => $email,
        'type' => $userType
    ]
]);
?>
