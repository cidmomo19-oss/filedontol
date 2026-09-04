export const baseStyles = `
  :root {
    --bg-main: #ffffff;
    --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0f2fe 100%);
    --card-bg: #ffffff;
    --border-color: #e2e8f0;
    --border-hover: #cbd5e1;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --primary-indigo: #2563eb;
    --primary-hover: #1d4ed8;
    --accent-pink: #ec4899;
    --sky-blue: #0284c7;
    --emerald-green: #059669;
    --rose-red: #e11d48;
    --amber-gold: #d97706;
    --violet-purple: #7c3aed;
    --radius-sm: 0.5rem;
    --radius-md: 0.75rem;
    --radius-lg: 1.25rem;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 12px rgba(37, 99, 235, 0.08);
    --shadow-lg: 0 12px 28px rgba(15, 23, 42, 0.08);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;
    background: var(--bg-gradient);
    background-attachment: fixed;
    color: var(--text-main);
    line-height: 1.5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header Navigation */
  header {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    padding: 0.85rem 2rem;
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
    color: var(--primary-indigo);
    text-decoration: none;
    letter-spacing: -0.03em;
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
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.5rem 0.85rem;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background-color: #f1f5f9;
    color: var(--primary-indigo);
  }

  .user-badge {
    font-size: 0.85rem;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    background: #e0e7ff;
    color: var(--primary-indigo);
    font-weight: 700;
    border: 1px solid #c7d2fe;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  /* Buttons */
  .btn {
    padding: 0.55rem 1.35rem;
    font-weight: 700;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.925rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
    font-size: 0.825rem;
    border-radius: var(--radius-sm);
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary-indigo) 0%, #3b82f6 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
  }

  .btn-outline {
    background-color: #ffffff;
    border-color: var(--border-color);
    color: var(--text-main);
  }

  .btn-outline:hover {
    background-color: #f8fafc;
    border-color: var(--border-hover);
  }

  .btn-danger {
    background-color: #fff1f2;
    color: var(--rose-red);
    border-color: #fecdd3;
  }

  .btn-danger:hover {
    background-color: #ffe4e6;
  }

  .btn:focus-visible {
    outline: 2px solid var(--primary-indigo);
    outline-offset: 2px;
  }

  /* Main Container & Cards */
  main {
    flex: 1;
    max-width: 1050px;
    width: 100%;
    margin: 2rem auto;
    padding: 0 1.25rem;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: clamp(1.25rem, 4vw, 2.5rem);
    box-shadow: var(--shadow-lg);
  }

  /* Badges */
  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .badge-indigo { background: #e0e7ff; color: #1d4ed8; border: 1px solid #c7d2fe; }
  .badge-emerald { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
  .badge-purple { background: #f3e8ff; color: #581c87; border: 1px solid #e9d5ff; }
  .badge-rose { background: #ffe4e6; color: #9f1239; border: 1px solid #fecdd3; }

  /* Section Styles */
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .feature-box {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .feature-box:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: #cbd5e1;
  }

  .feature-icon {
    font-size: 1.5rem;
    color: var(--primary-indigo);
    margin-bottom: 0.75rem;
    display: inline-block;
  }

  .feature-title {
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: var(--text-main);
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
    font-size: 0.975rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    color: var(--text-main);
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
    color: var(--text-main);
  }

  tr:last-child td {
    border-bottom: none;
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
    font-weight: 600;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: toast-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateY(12px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
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
    max-width: 440px;
    padding: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--text-main);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    color: var(--text-main);
  }

  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-family: inherit;
    background: #ffffff;
    color: var(--text-main);
  }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    outline: none;
    border-color: var(--primary-indigo);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  /* Footer */
  footer {
    border-top: 1px solid var(--border-color);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-top: auto;
  }

  footer a {
    color: var(--primary-indigo);
    text-decoration: none;
    font-weight: 600;
  }

  footer a:hover {
    text-decoration: underline;
  }

  /* Responsive Breakpoints */
  @media (max-width: 640px) {
    header {
      padding: 0.75rem 1rem;
    }

    .nav-right {
      gap: 0.35rem;
    }

    .btn {
      padding: 0.45rem 0.9rem;
      font-size: 0.85rem;
    }

    .user-badge {
      max-width: 110px;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }

    main {
      padding: 0 0.75rem;
      margin: 1rem auto;
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
