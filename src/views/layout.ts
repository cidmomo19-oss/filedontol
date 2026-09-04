import { baseStyles } from './styles';

export function getLayoutHtml(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — filedontol</title>

  <!-- Meta Tags -->
  <meta name="description" content="filedontol — Platform Berbagi File Kilat, Safe, Gen Z Approved, Tanpa Iklan hingga 5 GB." />
  <meta property="og:title" content="${title} — filedontol" />
  <meta property="og:description" content="Unggah & bagikan file gratis hingga 5 GB secara instan dan tanpa ribet." />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="filedontol" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">

  <style>
    ${baseStyles}
  </style>
</head>
<body>
  <header>
    <a href="/" class="logo">
      <span class="logo-icon">⚡</span>
      <span>file<span class="gradient-text">dontol</span></span>
    </a>
    <div class="nav-right" id="nav-auth-container">
      <button class="btn btn-outline btn-sm" id="btn-open-login" onclick="openAuthModal('login')">Masuk</button>
      <button class="btn btn-primary btn-sm" id="btn-open-register" onclick="openAuthModal('register')">Daftar</button>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <!-- Auth Modal -->
  <div class="modal-overlay" id="auth-modal" aria-hidden="true">
    <div class="modal-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <h3 class="modal-title" id="modal-title-text">Masuk ke Akun</h3>
        <button onclick="closeAuthModal()" aria-label="Tutup" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted); transition: color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-muted)'">&times;</button>
      </div>
      <div id="auth-error-msg" style="color:var(--danger-red); background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); padding: 0.75rem; border-radius: var(--radius-md); font-size:0.875rem; margin-bottom:1.25rem; display:none;"></div>
      <form id="auth-form" onsubmit="handleAuthSubmit(event)">
        <div class="form-group">
          <label for="auth-email">Email</label>
          <input type="email" id="auth-email" required placeholder="nama@email.com" />
        </div>
        <div class="form-group">
          <label for="auth-password">Kata Sandi</label>
          <input type="password" id="auth-password" required minlength="6" placeholder="••••••••" />
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.75rem;" id="auth-submit-btn">Masuk</button>
      </form>
      <div style="margin-top:1.25rem; text-align:center; font-size:0.875rem; color:var(--text-muted);">
        <span id="auth-toggle-text">Belum punya akun?</span>
        <a href="#" onclick="toggleAuthMode(event)" id="auth-toggle-btn" style="color:#a5b4fc; font-weight:700; text-decoration:none; margin-left:0.25rem;">Daftar sekarang</a>
      </div>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div id="toast-container"></div>

  <footer>
    <div style="max-width: 900px; margin: 0 auto;">
      <p>&copy; ${new Date().getFullYear()} <strong class="gradient-text">filedontol</strong>. Fast, Secure & Next-Gen Cloud Storage.</p>
      <p style="margin-top:0.85rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; font-size: 0.875rem;">
        <a href="/">Beranda</a>
        <a href="/#faq">FAQ</a>
        <a href="/dmca">Kebijakan DMCA</a>
        <a href="mailto:filedontol@gmail.com">Kontak Kami</a>
      </p>
    </div>
  </footer>

  <script>
    let currentAuthMode = 'login';

    function showToast(msg, isError = false) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      if (isError) {
        toast.style.borderColor = 'rgba(244, 63, 94, 0.4)';
        toast.style.background = 'rgba(30, 15, 25, 0.95)';
      }
      toast.innerHTML = (isError ? '⚠️ ' : '✨ ') + msg;
      container.appendChild(toast);
      setTimeout(() => { toast.remove(); }, 3500);
    }

    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        const container = document.getElementById('nav-auth-container');
        if (data.authenticated && data.user) {
          container.innerHTML = \`
            <a href="/dashboard" class="nav-link">Dashboard</a>
            <span class="user-badge" title="\${data.user.email}">\${data.user.email}</span>
            <button class="btn btn-outline btn-sm" onclick="handleLogout()">Keluar</button>
          \`;
          window.currentUser = data.user;
        } else {
          container.innerHTML = \`
            <button class="btn btn-outline btn-sm" id="btn-open-login" onclick="openAuthModal('login')">Masuk</button>
            <button class="btn btn-primary btn-sm" id="btn-open-register" onclick="openAuthModal('register')">Daftar</button>
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
        title.innerText = 'Masuk ke Akun';
        submitBtn.innerText = 'Masuk';
        toggleText.innerText = 'Belum punya akun?';
        toggleBtn.innerText = 'Daftar sekarang';
      } else {
        title.innerText = 'Buat Akun Baru';
        submitBtn.innerText = 'Daftar';
        toggleText.innerText = 'Sudah punya akun?';
        toggleBtn.innerText = 'Masuk di sini';
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
          errorDiv.innerText = data.error || 'Terjadi kesalahan.';
          errorDiv.style.display = 'block';
          return;
        }
        closeAuthModal();
        showToast(currentAuthMode === 'login' ? 'Berhasil masuk!' : 'Akun berhasil dibuat!');
        await checkAuthStatus();
        if (typeof onAuthSuccess === 'function') {
          onAuthSuccess();
        }
      } catch (err) {
        errorDiv.innerText = 'Gagal terhubung ke server.';
        errorDiv.style.display = 'block';
      }
    }

    async function handleLogout() {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast('Berhasil keluar.');
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
