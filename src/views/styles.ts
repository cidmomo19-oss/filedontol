export const baseStyles = `
  :root {
    --bg-main: #f8fafc;
    --card-bg: #ffffff;
    --border-color: #e2e8f0;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --primary-blue: #2563eb;
    --primary-hover: #1d4ed8;
    --success-green: #10b981;
    --danger-red: #ef4444;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--bg-main);
    color: var(--text-main);
    line-height: 1.5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    background-color: #ffffff;
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary-blue);
    text-decoration: none;
    letter-spacing: -0.025em;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-badge {
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: #eff6ff;
    color: var(--primary-blue);
    font-weight: 600;
    border: 1px solid #bfdbfe;
  }

  .btn {
    padding: 0.5rem 1.25rem;
    font-weight: 600;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background-color: var(--primary-blue);
    color: #ffffff;
  }

  .btn-primary:hover {
    background-color: var(--primary-hover);
  }

  .btn-outline {
    background-color: #ffffff;
    border-color: var(--border-color);
    color: var(--text-main);
  }

  .btn-outline:hover {
    background-color: #f1f5f9;
  }

  main {
    flex: 1;
    max-width: 900px;
    width: 100%;
    margin: 2.5rem auto;
    padding: 0 1rem;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 2.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  }

  footer {
    border-top: 1px solid var(--border-color);
    background-color: #ffffff;
    padding: 1.5rem 2rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-top: auto;
  }

  footer a {
    color: var(--primary-blue);
    text-decoration: none;
    font-weight: 500;
  }

  footer a:hover {
    text-decoration: underline;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-card {
    background: #ffffff;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.375rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    font-size: 0.95rem;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;
