export const baseStyles = `
  :root {
    --bg-main: #f8fafc;
    --bg-gradient: radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.7) 0px, transparent 50%),
                  radial-gradient(at 100% 0%, rgba(238, 242, 255, 0.7) 0px, transparent 50%),
                  radial-gradient(at 50% 100%, rgba(240, 253, 244, 0.5) 0px, transparent 50%),
                  #f8fafc;
    --card-bg: #ffffff;
    --border-color: #e2e8f0;
    --border-hover: #93c5fd;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --primary-blue: #2563eb;
    --primary-indigo: #4f46e5;
    --primary-hover: #1d4ed8;
    --accent-sky: #0284c7;
    --emerald-green: #059669;
    --rose-red: #e11d48;
    --amber-gold: #d97706;
    --violet-purple: #7c3aed;
    --radius-sm: 0.6rem;
    --radius-md: 1rem;
    --radius-lg: 1.5rem;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 10px 25px -5px rgba(37, 99, 235, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
    --shadow-lg: 0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 10px 20px -8px rgba(37, 99, 235, 0.04);
    --shadow-glow: 0 0 25px rgba(37, 99, 235, 0.15);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", "SF Pro Display", sans-serif;
    background: var(--bg-gradient);
    background-attachment: fixed;
    color: var(--text-main);
    line-height: 1.5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Glassmorphic Header Navigation */
  header {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    padding: 0.85rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
  }

  .logo {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    font-weight: 800;
    color: var(--primary-blue);
    text-decoration: none;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .nav-link {
    color: var(--text-main);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 0.45rem 0.85rem;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background-color: #f1f5f9;
    color: var(--primary-blue);
  }

  .user-badge {
    font-size: 0.8rem;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, #eff6ff, #e0e7ff);
    color: var(--primary-blue);
    font-weight: 800;
    border: 1px solid #bfdbfe;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
  }

  /* Modern Bento Grid Cards */
  main {
    flex: 1;
    max-width: 1100px;
    width: 100%;
    margin: 2rem auto;
    padding: 0 1.25rem;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }

  .bento-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    box-shadow: var(--shadow-md);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .bento-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border-hover);
  }

  .bento-col-12 { grid-column: span 12; }
  .bento-col-8 { grid-column: span 8; }
  .bento-col-6 { grid-column: span 6; }
  .bento-col-4 { grid-column: span 4; }

  /* Card Component */
  .card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: clamp(1.25rem, 4vw, 2.5rem);
    box-shadow: var(--shadow-md);
    width: 100%;
  }

  /* Distinct Accent Buttons */
  .btn {
    padding: 0.65rem 1.4rem;
    font-weight: 700;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
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
    font-size: 0.8rem;
    border-radius: var(--radius-sm);
  }

  .btn-primary {
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #4f46e5 100%);
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.28);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.38);
  }

  .btn-outline {
    background-color: #ffffff;
    border: 1px solid var(--border-color);
    color: var(--text-main);
  }

  .btn-outline:hover {
    background-color: #f8fafc;
    border-color: var(--border-hover);
    color: var(--primary-blue);
  }

  .btn-danger {
    background-color: #fff1f2;
    color: var(--rose-red);
    border: 1px solid #fecdd3;
  }

  .btn-danger:hover {
    background-color: #ffe4e6;
  }

  /* Pill Badges */
  .badge {
    font-size: 0.775rem;
    font-weight: 700;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .badge-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .badge-emerald { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
  .badge-purple { background: #faf5ff; color: #6b21a8; border: 1px solid #e9d5ff; }
  .badge-amber { background: #fffbe3; color: #b45309; border: 1px solid #fde68a; }

  /* Interactive Dropzone */
  .dropzone-bento {
    border: 2px dashed #cbd5e1;
    border-radius: var(--radius-md);
    padding: clamp(2rem, 5vw, 3.5rem) 1.5rem;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
  }

  .dropzone-bento:hover {
    border-color: var(--primary-blue);
    background: #f0f7ff;
    box-shadow: var(--shadow-glow);
  }

  /* Stat Metric Box */
  .stat-card {
    background: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .stat-label {
    font-size: 0.775rem;
    font-weight: 800;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 1.65rem;
    font-weight: 800;
    color: var(--text-main);
    margin-top: 0.25rem;
  }

  /* Table Styles */
  .table-responsive {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: #ffffff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
    min-width: 520px;
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

  /* Modal Overlay & Card */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(8px);
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
    padding: 1.75rem;
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
  }

  /* Toast Container */
  #toast-container {
    position: fixed;
    bottom: 1.25rem;
    right: 1.25rem;
    left: 1.25rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }

  .toast {
    background: #0f172a;
    color: #ffffff;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 400px;
    margin-left: auto;
    pointer-events: auto;
  }

  /* Footer */
  footer {
    border-top: 1px solid var(--border-color);
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    padding: 2rem 1rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
    margin-top: auto;
  }

  footer a {
    color: var(--primary-blue);
    text-decoration: none;
    font-weight: 700;
  }

  footer a:hover {
    text-decoration: underline;
  }

  /* Responsive Media Breakpoints */
  @media (max-width: 900px) {
    .bento-col-8, .bento-col-6, .bento-col-4 {
      grid-column: span 12;
    }
  }

  @media (max-width: 640px) {
    header {
      padding: 0.65rem 1rem;
    }

    main {
      padding: 0 0.75rem;
      margin: 1rem auto;
    }

    .bento-card {
      padding: 1.25rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }
  }
`;
