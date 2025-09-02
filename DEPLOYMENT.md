# Deployment Guide for ofemo.uk

## Overview
This guide will help you deploy your portfolio website to your ofemo.uk domain.

## Prerequisites
- Node.js (v18 or higher)
- Access to your hosting server (cPanel, FTP, or SSH)
- Domain ofemo.uk pointing to your hosting server

## Build Process

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Build for Production
```bash
npm run build
```

This will create a `dist/` folder with all the optimized files.

## Deployment Options

### Option 1: cPanel File Manager
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to `public_html/` (or your domain's document root)
4. Upload all contents from the `dist/` folder
5. Extract if uploaded as zip

### Option 2: FTP Upload
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your hosting server
3. Navigate to `public_html/` or your domain's root directory
4. Upload all files from the `dist/` folder

### Option 3: SSH/Command Line
```bash
# Build the project
npm run build

# Upload using rsync (replace with your server details)
rsync -avz --delete dist/ user@your-server.com:/path/to/public_html/

# Or using SCP
scp -r dist/* user@your-server.com:/path/to/public_html/
```

## Server Configuration

### Apache (.htaccess)
Create a `.htaccess` file in your root directory:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle client-side routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx Configuration
If using Nginx, add this to your server block:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name ofemo.uk www.ofemo.uk;
    
    root /path/to/your/dist/folder;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Backend API Setup (Optional)

If you want to handle contact forms and lead capture:

### 1. Create API endpoints on your server
- `/api/contact` - Handle contact form submissions
- `/api/lead-capture` - Handle newsletter signups
- `/api/visitor-tracking` - Handle visitor analytics
- `/api/newsletter` - Handle newsletter subscriptions

### 2. Example PHP backend (contact.php)
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://ofemo.uk');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $to = 'hello@ofemo.uk';
    $subject = 'New Contact Form Submission - ' . $input['subject'];
    $message = "Name: " . $input['name'] . "\n";
    $message .= "Email: " . $input['email'] . "\n";
    $message .= "Subject: " . $input['subject'] . "\n";
    $message .= "Message: " . $input['message'];
    
    $headers = "From: " . $input['email'] . "\r\n";
    $headers .= "Reply-To: " . $input['email'] . "\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
```

## SSL Certificate
Ensure your domain has an SSL certificate installed. Most hosting providers offer free Let's Encrypt certificates.

## DNS Configuration
Make sure your domain DNS is pointing to your hosting server:
- A record: ofemo.uk → Your server IP
- CNAME record: www.ofemo.uk → ofemo.uk

## Testing
After deployment:
1. Visit https://ofemo.uk
2. Test all functionality (contact form, WhatsApp links, etc.)
3. Check mobile responsiveness
4. Verify all links work correctly
5. Test page load speed

## Maintenance
- Regularly update dependencies
- Monitor website performance
- Backup your files regularly
- Keep SSL certificate updated

## Troubleshooting
- If images don't load, check file paths and permissions
- If contact form doesn't work, verify API endpoints
- If site doesn't load, check .htaccess syntax
- For 404 errors, ensure proper routing configuration

## Performance Optimization
- Enable Gzip compression
- Use CDN for static assets
- Optimize images
- Minify CSS/JS (already done in build process)
- Enable browser caching

Your portfolio is now ready for deployment to ofemo.uk!
