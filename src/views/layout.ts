import { baseStyles } from './styles';

export function getLayoutHtml(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - filedontol</title>
  <style>
    ${baseStyles}
  </style>
</head>
<body>
  <header>
    <a href="/" class="logo">filedontol</a>
    <div class="nav-right" id="nav-auth-container">
      <button class="btn btn-outline" id="btn-open-login" onclick="openAuthModal('login')">Masuk</button>
      <button class="btn btn-primary" id="btn-open-register" onclick="openAuthModal('register')">Daftar</button>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <div class="modal-overlay" id="auth-modal">
    <div class="modal-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3 class="modal-title" id="modal-title-text">Masuk ke Akun</h3>
        <button onclick="closeAuthModal()" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted);">&times;</button>
      </div>
      <div id="auth-error-msg" style="color:var(--danger-red); font-size:0.875rem; margin-bottom:1rem; display:none;"></div>
      <form id="auth-form" onsubmit="handleAuthSubmit(event)">
        <div class="form-group">
          <label for="auth-email">Email</label>
          <input type="email" id="auth-email" required placeholder="nama@email.com" />
        </div>
        <div class="form-group">
          <label for="auth-password">Kata Sandi</label>
          <input type="password" id="auth-password" required minlength="6" placeholder="••••••••" />
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.5rem;" id="auth-submit-btn">Masuk</button>
      </form>
      <div style="margin-top:1rem; text-align:center; font-size:0.875rem; color:var(--text-muted);">
        <span id="auth-toggle-text">Belum punya akun?</span>
        <a href="#" onclick="toggleAuthMode(event)" id="auth-toggle-btn" style="color:var(--primary-blue); font-weight:600; text-decoration:none;">Daftar sekarang</a>
      </div>
    </div>
  </div>

  <footer>
    <p>&copy; ${new Date().getFullYear()} <strong>filedontol</strong>. Tempat Berbagi File Cepat & Tanpa Batas.</p>
    <p style="margin-top:0.5rem;">
      <a href="/dmca">DMCA & Kebijakan Hak Cipta</a> | Email: <a href="mailto:filedontol@gmail.com">filedontol@gmail.com</a>
    </p>
  </footer>

  <script>
    let currentAuthMode = 'login';

    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        const container = document.getElementById('nav-auth-container');
        if (data.authenticated && data.user) {
          container.innerHTML = \`
            <span class="user-badge">Member: \${data.user.email}</span>
            <button class="btn btn-outline" onclick="handleLogout()">Keluar</button>
          \`;
          window.currentUser = data.user;
        } else {
          container.innerHTML = \`
            <button class="btn btn-outline" id="btn-open-login" onclick="openAuthModal('login')">Masuk</button>
            <button class="btn btn-primary" id="btn-open-register" onclick="openAuthModal('register')">Daftar</button>
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
        toggleText.innerText = 'Belum punya akun? ';
        toggleBtn.innerText = 'Daftar sekarang';
      } else {
        title.innerText = 'Buat Akun Baru';
        submitBtn.innerText = 'Daftar';
        toggleText.innerText = 'Sudah punya akun? ';
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
      await checkAuthStatus();
      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess();
      }
    }

    document.addEventListener('DOMContentLoaded', checkAuthStatus);
  </script>
</body>
</html>`;
}
