# Holiday Chaska — BigRock upload package

**Direct download:** https://github.com/aviral9621/holidaychaska-landingpage/raw/bigrock-download/holidaychaska-bigrock.zip

Extract the zip's contents straight into `public_html/` on your BigRock cPanel.

## What's inside

- Static HTML pages: `index.html`, `privacy-policy/`, `refund-policy/`,
  `terms-conditions/`, **`thank-you/`** (form success destination), `404.html`
- Hashed CSS + JS bundles in `_next/static/...`
- All images, manifest, sitemap, robots.txt, favicon
- `submit.php` — the inquiry-form mailer (PHP `mail()`)
- `.htaccess` — caching, gzip, security headers, friendly 404

## How the inquiry flow works

1. Visitor fills the form anywhere on the site.
2. The form `POST`s the JSON payload to `/submit.php`.
3. `submit.php` validates and emails `enquiry@holidaychaska.com` via PHP `mail()`.
4. On `200 OK`, the visitor is redirected to
   `/thank-you/?name=<First Last>&phone=<10 digits>`.
5. The thank-you page shows the success UI and **auto-redirects to home in 15 seconds**
   (with a "Go now" link and a "Stay on this page" cancel).

The `/thank-you/` URL is the page you give to **Google Ads as the conversion
destination URL** — every successful submission lands there, so it counts as
exactly one lead.

## Email setup (one-time)

Inside `submit.php`, two values you may change:

```php
$TO   = 'enquiry@holidaychaska.com';   // where inquiries arrive (ALREADY SET)
$FROM = 'noreply@gujarattours.online'; // a real mailbox you create in cPanel
```

Create `noreply@gujarattours.online` as an email account in BigRock cPanel
before going live, otherwise SPF will reject outbound mail and the
mailer returns `Mail send failed`.

## Upload steps

1. Click the download link above.
2. Extract the zip locally.
3. In BigRock cPanel → **File Manager**, open `public_html/`.
4. Upload **everything inside** the extracted folder (not the folder itself).
   `.htaccess` and `submit.php` must end up at the root of `public_html/`.
5. Open the site, submit the form, confirm an email arrives at
   `enquiry@holidaychaska.com`.
