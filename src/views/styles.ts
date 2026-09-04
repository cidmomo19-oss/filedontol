export const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --bg-main: #0b0f19;
    --bg-card: rgba(17, 24, 39, 0.75);
    --bg-card-hover: rgba(31, 41, 55, 0.85);
    --border-color: rgba(255, 255, 255, 0.08);
    --border-highlight: rgba(99, 102, 241, 0.3);

    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --text-dim: #64748b;

    --accent-primary: #6366f1; /* Indigo */
    --accent-secondary: #a855f7; /* Purple */
    --accent-cyan: #06b6d4; /* Cyan */
    --accent-emerald: #10b981; /* Emerald */
    --accent-pink: #ec4899; /* Pink */

    --danger-red: #f43f5e;
    --warning-amber: #f59e0b;

    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
    --gradient-glow: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%);
    --gradient-card: linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);

    --radius-sm: 0.5rem;
    --radius-md: 0.875rem;
    --radius-lg: 1.25rem;
    --radius-xl: 1.75rem;

    --shadow-glow: 0 0 25px -5px rgba(99, 102, 241, 0.3);
    --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--bg-main);
    background-image:
      radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.12) 0px, transparent 50%),
      radial-gradient(at 50% 100%, rgba(6, 182, 212, 0.08) 0px, transparent 50%);
    background-attachment: fixed;
    color: var(--text-main);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  /* Typography helpers */
  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  /* Header & Navigation */
  header {
    background: rgba(11, 15, 25, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
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
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--text-main);
    text-decoration: none;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .logo-icon {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-sm);
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-link {
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
  }

  .user-badge {
    font-size: 0.85rem;
    padding: 0.4rem 0.85rem;
    border-radius: 9999px;
    background: rgba(99, 102, 241, 0.12);
    color: #a5b4fc;
    font-weight: 600;
    border: 1px solid rgba(99, 102, 241, 0.3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  /* Buttons */
  .btn {
    padding: 0.625rem 1.35rem;
    font-weight: 700;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.925rem;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    line-height: 1.25;
    position: relative;
    overflow: hidden;
  }

  .btn-sm {
    padding: 0.4rem 0.875rem;
    font-size: 0.85rem;
    border-radius: var(--radius-sm);
  }

  .btn-primary {
    background: var(--gradient-primary);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
    filter: brightness(1.1);
  }

  .btn-outline {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--border-color);
    color: var(--text-main);
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .btn-danger {
    background: rgba(244, 63, 94, 0.12);
    color: #fda4af;
    border-color: rgba(244, 63, 94, 0.3);
  }

  .btn-danger:hover {
    background: rgba(244, 63, 94, 0.25);
    color: #ffffff;
  }

  .btn:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  /* Main Container & Glass Cards */
  main {
    flex: 1;
    max-width: 1040px;
    width: 100%;
    margin: 2.5rem auto;
    padding: 0 1.25rem;
  }

  .card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: clamp(1.5rem, 5vw, 3rem);
    box-shadow: var(--shadow-card);
    position: relative;
  }

  .card-glow {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: var(--radius-xl);
    background: var(--gradient-primary);
    z-index: -1;
    opacity: 0.15;
    filter: blur(10px);
  }

  /* Badges & Section Grids */
  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    letter-spacing: 0.01em;
  }

  .badge-indigo {
    background: rgba(99, 102, 241, 0.15);
    color: #a5b4fc;
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .badge-emerald {
    background: rgba(16, 185, 129, 0.15);
    color: #6ee7b7;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .badge-purple {
    background: rgba(168, 85, 247, 0.15);
    color: #d8b4fe;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  /* Drag & Drop Upload Zone */
  .drop-zone {
    border: 2px dashed rgba(99, 102, 241, 0.35);
    border-radius: var(--radius-lg);
    padding: clamp(2.5rem, 6vw, 4rem) 1.5rem;
    background: rgba(15, 23, 42, 0.5);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .drop-zone:hover, .drop-zone.dragover {
    border-color: var(--accent-primary);
    background: rgba(99, 102, 241, 0.08);
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
    transform: scale(1.005);
  }

  .upload-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.12);
    color: #818cf8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem auto;
    transition: transform 0.3s ease;
  }

  .drop-zone:hover .upload-icon-wrapper {
    transform: translateY(-4px) scale(1.1);
    background: rgba(99, 102, 241, 0.25);
    color: #ffffff;
  }

  /* Landing Page Sections */
  .section-title {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 800;
    text-align: center;
    margin-bottom: 0.5rem;
    letter-spacing: -0.025em;
  }

  .section-desc {
    text-align: center;
    color: var(--text-muted);
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    margin-bottom: 2.5rem;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .feature-box {
    background: rgba(17, 24, 39, 0.6);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    transition: all 0.3s ease;
  }

  .feature-box:hover {
    transform: translateY(-4px);
    border-color: var(--border-highlight);
    background: rgba(30, 41, 59, 0.7);
    box-shadow: 0 12px 25px -10px rgba(0, 0, 0, 0.5);
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    background: rgba(99, 102, 241, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-main);
  }

  .feature-desc {
    font-size: 0.925rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* FAQ Accordion */
  .faq-container {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    margin-bottom: 3.5rem;
  }

  .faq-item {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(17, 24, 39, 0.5);
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  .faq-item:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }

  .faq-header {
    padding: 1.15rem 1.5rem;
    font-weight: 700;
    font-size: 1.025rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    color: var(--text-main);
  }

  .faq-arrow {
    transition: transform 0.3s ease;
    color: var(--text-muted);
  }

  .faq-body {
    padding: 1.15rem 1.5rem;
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    border-top: 1px solid var(--border-color);
    display: none;
    background: rgba(11, 15, 25, 0.4);
  }

  .faq-item.active {
    border-color: var(--border-highlight);
  }

  .faq-item.active .faq-body {
    display: block;
  }

  .faq-item.active .faq-arrow {
    transform: rotate(180deg);
    color: #818cf8;
  }

  /* Table Styles for Dashboard */
  .table-responsive {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(15, 23, 42, 0.6);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.925rem;
  }

  th {
    background: rgba(30, 41, 59, 0.6);
    padding: 1rem 1.25rem;
    font-weight: 700;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Toast Notifications */
  #toast-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .toast {
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(10px);
    color: #ffffff;
    padding: 0.875rem 1.35rem;
    border-radius: var(--radius-md);
    font-size: 0.925rem;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 0.625rem;
    animation: toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateY(15px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(11, 15, 25, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    padding: 1.25rem;
  }

  .modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-card {
    background: rgba(17, 24, 39, 0.95);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 420px;
    padding: 2.25rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  }

  .modal-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--text-main);
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-muted);
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    color: var(--text-main);
    transition: all 0.2s ease;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  /* Footer */
  footer {
    border-top: 1px solid var(--border-color);
    background: rgba(11, 15, 25, 0.6);
    padding: 2.5rem 2rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-top: auto;
  }

  footer a {
    color: #a5b4fc;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  footer a:hover {
    color: #ffffff;
  }

  /* Mobile Responsive Breakpoints */
  @media (max-width: 640px) {
    header {
      padding: 0.85rem 1.25rem;
    }

    .logo {
      font-size: 1.15rem;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      font-size: 1rem;
    }

    main {
      padding: 0 1rem;
      margin: 1.5rem auto;
    }

    .grid-3 {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    #toast-container {
      bottom: 1rem;
      right: 1rem;
      left: 1rem;
    }
  }
`;
