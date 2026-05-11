# Holiday Chaska — BigRock upload packages

Two static site zips — one per brand. Extract contents directly into `public_html/` on BigRock cPanel.

---

## Gujarat Tour Packages

**Download:** `holidaychaska-gujarat-bigrock.zip`

Domain: your Gujarat hosting domain (e.g. `gujarattours.online`)

---

## Uttarakhand Tour Packages

**Download:** `holidaychaska-uttarakhand-bigrock.zip`

Domain: `uttarakhandtrippackages.in`

---

## What's inside each zip

- Static HTML pages: `index.html`, `privacy-policy/`, `refund-policy/`,
  `terms-conditions/`, **`thank-you/`** (form success destination), `404.html`
- Hashed CSS + JS bundles in `_next/static/...`
- All images, manifest, sitemap, robots.txt, favicon
- `submit.php` — the inquiry-form mailer (PHP `mail()`)
- `.htaccess` — explicit MIME types, caching, gzip, security headers, friendly 404

## How the inquiry flow works

1. Visitor fills the form anywhere on the site.
2. The form `POST`s the JSON payload to `/submit.php`.
3. `submit.php` validates and emails `enquiry@holidaychaska.com` via PHP `mail()`.
4. On `200 OK`, the visitor is redirected to `/thank-you/`.
5. The thank-you page shows the success UI and auto-redirects to home in 15 seconds.

The `/thank-you/` URL is the page you give to **Google Ads as the conversion
destination URL** — every successful submission lands there.

## Email setup (one-time per domain)

Inside each `submit.php`, update `$FROM` to a real mailbox you create in cPanel:

**Gujarat:**
```php
$TO   = 'enquiry@holidaychaska.com';
$FROM = 'noreply@gujarattours.online';   // create this mailbox in cPanel
```

**Uttarakhand:**
```php
$TO   = 'enquiry@holidaychaska.com';
$FROM = 'noreply@uttarakhandtrippackages.in';   // create this mailbox in cPanel
```

## Upload steps

1. Download the correct zip for your domain.
2. Extract the zip locally.
3. In BigRock cPanel → **File Manager**, open `public_html/`.
4. Upload **everything inside** the extracted folder (not the folder itself).
   `.htaccess` and `submit.php` must end up at the root of `public_html/`.
5. Open the site, submit the form, confirm an email arrives at `enquiry@holidaychaska.com`.
