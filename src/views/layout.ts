import { baseStyles } from './styles';

export function getLayoutHtml(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - filedontol</title>

  <!-- Open Graph & Meta Tags -->
  <meta name="description" content="filedontol - High-speed, secure, ad-free file sharing platform supporting large file uploads up to 5 GB." />
  <meta property="og:title" content="${title} - filedontol" />
  <meta property="og:description" content="Upload & share files up to 5 GB fast, safely, and for free." />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="filedontol" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='f' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23ec4899'/><stop offset='100%' stop-color='%23be185d'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='url(%23f)'/><path d='M22 34C22 29.5817 25.5817 26 30 26H42.5C45.2 26 47.7 27.2 49.3 29.3L52.7 33.7C53.5 34.8 54.8 35.5 56.2 35.5H70C74.4183 35.5 78 39.0817 78 43.5V66C78 70.4183 74.4183 74 70 74H30C25.5817 74 22 70.4183 22 66V34Z' fill='%23ffffff' opacity='0.92'/><path d='M52 42L38 56H48L44 70L60 52H50L52 42Z' fill='%23db2777'/></svg>">

  <style>
    ${baseStyles}
  </style>
</head>
<body>
  <header>
    <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.65rem; text-decoration: none;">
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 6px rgba(219, 39, 119, 0.25));">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ec4899" />
            <stop offset="100%" stop-color="#be185d" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="26" fill="url(#logoGrad)" />
        <path d="M22 34C22 29.5817 25.5817 26 30 26H42.5C45.2 26 47.7 27.2 49.3 29.3L52.7 33.7C53.5 34.8 54.8 35.5 56.2 35.5H70C74.4183 35.5 78 39.0817 78 43.5V66C78 70.4183 74.4183 74 70 74H30C25.5817 74 22 70.4183 22 66V34Z" fill="#ffffff" fill-opacity="0.92" />
        <path d="M53 43L39 57H49L45 69L59 53H49L53 43Z" fill="#db2777" />
      </svg>
      <span style="font-size: 1.4rem; font-weight: 900; background: linear-gradient(135deg, #111827, #db2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.035em;">filedontol</span>
    </a>
    <div class="nav-right">
      <a href="/report" class="nav-link" style="font-size: 0.85rem; font-weight: 700;">Report Abuse</a>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <!-- Toast Notification Container -->
  <div id="toast-container"></div>

  <footer>
    <div style="max-width: 900px; margin: 0 auto;">
      <p>&copy; ${new Date().getFullYear()} <strong>filedontol</strong>. Fast, Secure & Limitless File Sharing.</p>
      <p style="margin-top:0.65rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; font-size: 0.875rem;">
        <a href="/">Home</a>
        <a href="/#faq">FAQ</a>
        <a href="/dmca">DMCA Policy</a>
        <a href="/report">Report Abuse</a>
        <a href="mailto:filedontol@gmail.com">Contact Us</a>
      </p>
    </div>
  </footer>

  <script>
    function showToast(msg, isError = false) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      if (isError) toast.style.borderLeftColor = 'var(--rose-red)';
      toast.innerHTML = msg;
      container.appendChild(toast);
      setTimeout(() => { toast.remove(); }, 3000);
    }
  </script>
</body>
</html>`;
}
