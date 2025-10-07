<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

file_put_contents(__DIR__ . '/mail_debug.log', "Script started at " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require __DIR__ . '/config.php';
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data["name"] ?? "");
    $email = trim($data["email"] ?? "");
    $message = trim($data["message"] ?? "");

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        // SMTP setup
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = GMAIL_USER;
        $mail->Password = GMAIL_PASS;   // replace with your Gmail app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->SMTPDebug = 2; // 0 = off, 1 = client, 2 = client+server
        $mail->Debugoutput = function($str, $level) {
        file_put_contents(__DIR__ . '/mail_debug.log', "[" . date('Y-m-d H:i:s') . "] Level $level: $str\n", FILE_APPEND);
    };

        // From / To
        $mail->setFrom(GMAIL_USER, SENDER_NAME);
        $mail->addAddress(GMAIL_USER);// where to receive messages
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Portfolio Message from $name";
        $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message";

        $mail->SMTPDebug = 2;
        $mail->Debugoutput = 'error_log';

        file_put_contents(__DIR__ . '/mail_debug.log', "Attempting to send email...\n", FILE_APPEND);


        $mail->send();
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
        exit;

    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
        exit;

    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

file_put_contents(__DIR__ . '/mail_debug.log', "Email sent successfully!\n", FILE_APPEND);

?>
