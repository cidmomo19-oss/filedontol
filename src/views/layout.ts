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
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='f' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%233b82f6'/><stop offset='100%' stop-color='%236366f1'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='url(%23f)'/><path d='M22 34C22 29.5817 25.5817 26 30 26H42.5C45.2 26 47.7 27.2 49.3 29.3L52.7 33.7C53.5 34.8 54.8 35.5 56.2 35.5H70C74.4183 35.5 78 39.0817 78 43.5V66C78 70.4183 74.4183 74 70 74H30C25.5817 74 22 70.4183 22 66V34Z' fill='%23ffffff' opacity='0.9'/><path d='M52 42L38 56H48L44 70L60 52H50L52 42Z' fill='%233b82f6'/></svg>">

  <style>
    ${baseStyles}
  </style>
</head>
<body>
  <header>
    <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.65rem; text-decoration: none;">
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.25));">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="26" fill="url(#logoGrad)" />
        <path d="M22 34C22 29.5817 25.5817 26 30 26H42.5C45.2 26 47.7 27.2 49.3 29.3L52.7 33.7C53.5 34.8 54.8 35.5 56.2 35.5H70C74.4183 35.5 78 39.0817 78 43.5V66C78 70.4183 74.4183 74 70 74H30C25.5817 74 22 70.4183 22 66V34Z" fill="#ffffff" fill-opacity="0.92" />
        <path d="M53 43L39 57H49L45 69L59 53H49L53 43Z" fill="#2563eb" />
      </svg>
      <span style="font-size: 1.35rem; font-weight: 800; background: linear-gradient(135deg, #1e293b, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.03em;">filedontol</span>
    </a>
    <div class="nav-right" id="nav-auth-container">
      <button class="btn btn-outline btn-sm" id="btn-open-login" onclick="openAuthModal('login')">Sign In</button>
      <button class="btn btn-primary btn-sm" id="btn-open-register" onclick="openAuthModal('register')">Sign Up</button>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <!-- Auth Modal -->
  <div class="modal-overlay" id="auth-modal" aria-hidden="true">
    <div class="modal-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3 class="modal-title" id="modal-title-text">Sign In</h3>
        <button onclick="closeAuthModal()" aria-label="Close" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted);">&times;</button>
      </div>
      <div id="auth-error-msg" style="color:var(--rose-red); font-size:0.875rem; margin-bottom:1rem; display:none;"></div>
      <form id="auth-form" onsubmit="handleAuthSubmit(event)">
        <div class="form-group">
          <label for="auth-email">Email Address</label>
          <input type="email" id="auth-email" required placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label for="auth-password">Password</label>
          <input type="password" id="auth-password" required minlength="6" placeholder="••••••••" />
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.5rem;" id="auth-submit-btn">Sign In</button>
      </form>
      <div style="margin-top:1rem; text-align:center; font-size:0.875rem; color:var(--text-muted);">
        <span id="auth-toggle-text">Don't have an account?</span>
        <a href="#" onclick="toggleAuthMode(event)" id="auth-toggle-btn" style="color:var(--primary-indigo); font-weight:600; text-decoration:none;">Sign up now</a>
      </div>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div id="toast-container"></div>

  <footer>
    <div style="max-width: 900px; margin: 0 auto;">
      <p>&copy; ${new Date().getFullYear()} <strong>filedontol</strong>. Fast, Secure & Limitless File Sharing.</p>
      <p style="margin-top:0.5rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; font-size: 0.85rem;">
        <a href="/">Home</a>
        <a href="/#faq">FAQ</a>
        <a href="/dmca">DMCA Policy</a>
        <a href="/report">Report Abuse</a>
        <a href="mailto:filedontol@gmail.com">Contact Us</a>
      </p>
    </div>
  </footer>

  <script>
    let currentAuthMode = 'login';

    function showToast(msg, isError = false) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      if (isError) toast.style.background = 'var(--rose-red)';
      toast.innerHTML = msg;
      container.appendChild(toast);
      setTimeout(() => { toast.remove(); }, 3000);
    }

    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        const container = document.getElementById('nav-auth-container');
        if (data.authenticated && data.user) {
          container.innerHTML = \`
            <a href="/" class="nav-link">Home</a>
            <a href="/dashboard" class="nav-link">Dashboard</a>
            <span class="user-badge" title="\${data.user.email}">\${data.user.email}</span>
            <button class="btn btn-outline btn-sm" onclick="handleLogout()">Logout</button>
          \`;
          window.currentUser = data.user;
        } else {
          container.innerHTML = \`
            <button class="btn btn-outline btn-sm" id="btn-open-login" onclick="openAuthModal('login')">Sign In</button>
            <button class="btn btn-primary btn-sm" id="btn-open-register" onclick="openAuthModal('register')">Sign Up</button>
          \`;
          window.currentUser = null;
        }
      } catch (err) {
        console.error('Check auth error:', err);
      }
    }

    function openAuthModal(mode) {
      currentAuthMode = mode;
      const modal = document.getElementById('auth-modal');
      const title = document.getElementById('modal-title-text');
      const submitBtn = document.getElementById('auth-submit-btn');
      const toggleText = document.getElementById('auth-toggle-text');
      const toggleBtn = document.getElementById('auth-toggle-btn');
      document.getElementById('auth-error-msg').style.display = 'none';

      if (mode === 'login') {
        title.innerText = 'Sign In to Account';
        submitBtn.innerText = 'Sign In';
        toggleText.innerText = "Don't have an account? ";
        toggleBtn.innerText = 'Sign up now';
      } else {
        title.innerText = 'Create New Account';
        submitBtn.innerText = 'Sign Up';
        toggleText.innerText = 'Already have an account? ';
        toggleBtn.innerText = 'Sign in here';
      }
      modal.classList.add('active');
    }

    function closeAuthModal() {
      document.getElementById('auth-modal').classList.remove('active');
    }

    function toggleAuthMode(e) {
      e.preventDefault();
      openAuthModal(currentAuthMode === 'login' ? 'register' : 'login');
    }

    async function handleAuthSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('auth-email').value;
      const password = document.getElementById('auth-password').value;
      const errorDiv = document.getElementById('auth-error-msg');
      errorDiv.style.display = 'none';

      const endpoint = currentAuthMode === 'login' ? '/api/auth/login' : '/api/auth/register';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          errorDiv.innerText = data.error || 'An error occurred.';
          errorDiv.style.display = 'block';
          return;
        }
        closeAuthModal();
        showToast(currentAuthMode === 'login' ? 'Successfully signed in!' : 'Account created successfully!');
        await checkAuthStatus();
        if (typeof onAuthSuccess === 'function') {
          onAuthSuccess();
        }
      } catch (err) {
        errorDiv.innerText = 'Failed to connect to server.';
        errorDiv.style.display = 'block';
      }
    }

    async function handleLogout() {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast('Successfully logged out.');
      await checkAuthStatus();
      if (window.location.pathname === '/dashboard') {
        window.location.href = '/';
      }
    }

    document.addEventListener('DOMContentLoaded', checkAuthStatus);
  </script>
</body>
</html>`;
}
