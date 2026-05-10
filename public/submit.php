<?php
declare(strict_types=1);

/* =====================================================================
 *  Gujarat Tour Packages — Inquiry form mailer
 * =====================================================================
 *  This file receives the form submission from the website and emails
 *  it to your inbox.
 *
 *  >>> EDIT THESE TWO LINES BEFORE GOING LIVE <<<
 *
 *    $TO   = email address where inquiries should arrive
 *    $FROM = a mailbox you create in BigRock cPanel for this domain.
 *            (e.g. noreply@gujarattours.online)
 *            DO NOT use the visitor's email here — SPF will reject it.
 *
 *  Once edited, just upload this file together with the rest of the
 *  site files to public_html. No further setup needed; PHP mail() is
 *  enabled on BigRock by default.
 * ===================================================================== */

$TO   = 'enquiry@holidaychaska.com';
$FROM = 'noreply@gujarattours.online';
$SITE = 'Gujarat Tour Packages';

/* ---- nothing below should need editing -------------------------------- */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Accept either JSON body (the website sends JSON) or classic form-encoded
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: silently accept if a hidden "website" field was filled (bot)
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean($v): string {
    return trim(strip_tags((string)$v));
}

$fullName      = clean($data['fullName']      ?? '');
$phone         = clean($data['phone']         ?? '');
$email         = clean($data['email']         ?? '');
$travelDate    = clean($data['travelDate']    ?? '');
$packageName   = clean($data['packageName']   ?? '');
$travelers     = clean($data['travelers']     ?? '');
$departureCity = clean($data['departureCity'] ?? '');
$notes         = clean($data['notes']         ?? '');

$errors = [];
if (mb_strlen($fullName) < 2)                              $errors[] = 'Name';
if (!preg_match('/^\d{10}$/', $phone))                     $errors[] = 'Mobile';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))            $errors[] = 'Email';
if ($travelDate === '')                                     $errors[] = 'Travel Date';
if ($packageName === '')                                    $errors[] = 'Package';
if (!ctype_digit($travelers) || (int)$travelers < 1
                              || (int)$travelers > 50)      $errors[] = 'Travelers';
if ($departureCity === '')                                  $errors[] = 'Departure City';

if ($errors) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid: ' . implode(', ', $errors)]);
    exit;
}

$lines = [
    "New inquiry from $SITE website",
    str_repeat('=', 56),
    '',
    'Name           : ' . $fullName,
    'Mobile         : +91-' . $phone,
    'Email          : ' . $email,
    'Travel Date    : ' . $travelDate,
    'Package        : ' . $packageName,
    'No. Travelers  : ' . $travelers,
    'Departure City : ' . $departureCity,
];
if ($notes !== '') {
    $lines[] = '';
    $lines[] = 'Special Requirements:';
    $lines[] = $notes;
}
$lines[] = '';
$lines[] = str_repeat('-', 56);
$lines[] = 'Submitted: ' . date('d M Y, H:i') . ' IST';
$lines[] = 'IP       : ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$lines[] = 'UA       : ' . substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 200);

$body    = implode("\r\n", $lines);
$subject = "[$SITE] Inquiry from $fullName — $packageName";

$headers   = [];
$headers[] = "From: $SITE <$FROM>";
$headers[] = "Reply-To: $fullName <$email>";
$headers[] = "X-Mailer: PHP/" . PHP_VERSION;
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$ok = @mail($TO, $subject, $body, implode("\r\n", $headers), '-f' . $FROM);

if (!$ok) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail send failed — please WhatsApp us']);
    exit;
}

echo json_encode(['ok' => true]);
