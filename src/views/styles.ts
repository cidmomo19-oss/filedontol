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
    --warning-orange: #f59e0b;
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
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

  /* Header & Navigation */
  header {
    background-color: #ffffff;
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    font-weight: 800;
    color: var(--primary-blue);
    text-decoration: none;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-link {
    color: var(--text-main);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    transition: background-color 0.2s ease;
  }

  .nav-link:hover {
    background-color: #f1f5f9;
  }

  .user-badge {
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    background-color: #eff6ff;
    color: var(--primary-blue);
    font-weight: 600;
    border: 1px solid #bfdbfe;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  /* Buttons */
  .btn {
    padding: 0.5rem 1.25rem;
    font-weight: 600;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    line-height: 1.25;
  }

  .btn-sm {
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
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

  .btn-danger {
    background-color: #fef2f2;
    color: var(--danger-red);
    border-color: #fecaca;
  }

  .btn-danger:hover {
    background-color: #fee2e2;
  }

  .btn:focus-visible {
    outline: 2px solid var(--primary-blue);
    outline-offset: 2px;
  }

  /* Main Container & Card */
  main {
    flex: 1;
    max-width: 1000px;
    width: 100%;
    margin: 2rem auto;
    padding: 0 1.25rem;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: clamp(1.25rem, 4vw, 2.5rem);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  }

  /* Badges & Section Grids */
  .badge {
    font-size: 0.825rem;
    font-weight: 600;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .badge-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .badge-green { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .badge-purple { background: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }

  /* Landing Page Sections */
  .section-title {
    font-size: clamp(1.35rem, 3vw, 1.85rem);
    font-weight: 800;
    text-align: center;
    margin-bottom: 0.5rem;
    color: var(--text-main);
  }

  .section-desc {
    text-align: center;
    color: var(--text-muted);
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    margin-bottom: 2rem;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3.5rem;
  }

  .feature-box {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .feature-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    display: inline-block;
  }

  .feature-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .feature-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* FAQ Accordion */
  .faq-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 3rem;
  }

  .faq-item {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: #ffffff;
    overflow: hidden;
  }

  .faq-header {
    padding: 1rem 1.25rem;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    user-select: none;
  }

  .faq-header:hover {
    background: #f1f5f9;
  }

  .faq-body {
    padding: 1rem 1.25rem;
    font-size: 0.925rem;
    color: var(--text-muted);
    line-height: 1.6;
    border-top: 1px solid var(--border-color);
    display: none;
  }

  .faq-item.active .faq-body {
    display: block;
  }

  .faq-item.active .faq-arrow {
    transform: rotate(180deg);
  }

  /* Table Styles for Dashboard */
  .table-responsive {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: #ffffff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9rem;
  }

  th {
    background-color: #f8fafc;
    padding: 0.85rem 1rem;
    font-weight: 700;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Skeleton Loading */
  .skeleton {
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: var(--radius-sm);
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Toast Notifications */
  #toast-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .toast {
    background: #0f172a;
    color: #ffffff;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: toast-in 0.2s ease;
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    padding: 1rem;
  }

  .modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-card {
    background: #ffffff;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 800;
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
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  /* Footer */
  footer {
    border-top: 1px solid var(--border-color);
    background-color: #ffffff;
    padding: 2rem;
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

  /* Mobile & Responsive Breakpoints */
  @media (max-width: 640px) {
    header {
      padding: 0.85rem 1rem;
    }

    .nav-right {
      gap: 0.35rem;
    }

    .btn {
      padding: 0.4rem 0.85rem;
      font-size: 0.85rem;
    }

    .user-badge {
      max-width: 120px;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }

    main {
      padding: 0 0.75rem;
      margin: 1.25rem auto;
    }

    .grid-3 {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  @media (max-width: 1024px) {
    main {
      max-width: 100%;
    }
  }
`;
