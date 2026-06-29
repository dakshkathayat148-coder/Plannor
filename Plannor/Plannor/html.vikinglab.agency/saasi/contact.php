<?php

$first_name = trim(htmlspecialchars($_POST['first_name'] ?? ''));
$last_name   = trim(htmlspecialchars($_POST['last_name']  ?? ''));
$email       = trim(filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
$phone       = trim(htmlspecialchars($_POST['phone']   ?? ''));
$subject     = trim(htmlspecialchars($_POST['subject']  ?? ''));
$message     = trim(htmlspecialchars($_POST['message']  ?? ''));

if (!$first_name || !$last_name || !$email || !$phone || !$subject || !$message) {
    header('Location: contact.html?status=error');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: contact.html?status=error');
    exit;
}

$file = __DIR__ . '/contact_submissions.csv';
$new  = !file_exists($file);

$fp = fopen($file, 'a');
if (!$fp) {
    header('Location: contact.html?status=error');
    exit;
}

if ($new) {
    fputcsv($fp, ['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Subject', 'Message']);
}

fputcsv($fp, [
    date('Y-m-d H:i:s'),
    $first_name,
    $last_name,
    $email,
    $phone,
    $subject,
    $message,
]);

fclose($fp);

header('Location: contact.html?status=success');
exit;
