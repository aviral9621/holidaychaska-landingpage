# Holiday Chaska — BigRock upload package

Download `holidaychaska-bigrock.zip` from this branch and extract its contents
straight into `public_html/` on your BigRock cPanel. Inside the zip:

- All static HTML pages (`index.html`, `privacy-policy/`, `refund-policy/`,
  `terms-conditions/`, `404.html`)
- Hashed CSS + JS bundles in `_next/static/...`
- All images, manifest, sitemap, robots.txt
- `submit.php` — the inquiry form mailer
- `.htaccess` — caching, compression, security headers, friendly 404

## Inquiry email setup (PHP `mail()`)

`submit.php` uses BigRock's built-in PHP `mail()` function — no SDK or
external service required. Two values inside `submit.php` you can change:

```php
$TO   = 'enquiry@holidaychaska.com';   // where inquiries arrive (ALREADY SET)
$FROM = 'noreply@gujarattours.online'; // a real mailbox you create in cPanel
```

Make sure `noreply@gujarattours.online` exists as an email account in your
BigRock cPanel before going live, otherwise SPF will reject outbound mail.

## How to download (one-click)

Click here from a browser:

https://github.com/aviral9621/holidaychaska-landingpage/raw/bigrock-download/holidaychaska-bigrock.zip

Or use the GitHub UI: open the file, click **Raw** / **Download**.
