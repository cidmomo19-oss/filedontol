export const baseStyles = `
  :root {
    --bg-main: #fafaf9;
    --bg-gradient: radial-gradient(at 10% 10%, rgba(253, 226, 243, 0.8) 0px, transparent 55%),
                  radial-gradient(at 90% 10%, rgba(251, 207, 232, 0.5) 0px, transparent 50%),
                  radial-gradient(at 50% 90%, rgba(244, 114, 182, 0.15) 0px, transparent 60%),
                  #fafaf9;
    --card-bg: #ffffff;
    --card-border: rgba(244, 114, 182, 0.2);
    --border-color: #f3f4f6;
    --border-hover: #f472b6;
    --text-main: #111827;
    --text-muted: #6b7280;

    /* Pink Brand Palette */
    --pink-primary: #ec4899;
    --pink-deep: #db2777;
    --pink-dark: #be185d;
    --pink-soft: #fdf2f8;
    --pink-light: #fce7f3;
    --pink-border: #fbcfe8;
    --pink-glow: rgba(236, 72, 153, 0.25);

    --purple-accent: #8b5cf6;
    --emerald-green: #10b981;
    --rose-red: #f43f5e;

    --radius-sm: 0.75rem;
    --radius-md: 1.25rem;
    --radius-lg: 1.75rem;
    --radius-xl: 2.25rem;

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.03);
    --shadow-md: 0 12px 30px -10px rgba(219, 39, 119, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
    --shadow-lg: 0 25px 50px -12px rgba(219, 39, 119, 0.18), 0 12px 24px -8px rgba(0, 0, 0, 0.04);
    --shadow-glow: 0 0 30px rgba(236, 72, 153, 0.3);
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
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif;
    background: var(--bg-gradient);
    background-attachment: fixed;
    color: var(--text-main);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header Bar */
  header {
    background-color: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(251, 207, 232, 0.6);
    padding: 1rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
  }

  .logo {
    font-size: clamp(1.3rem, 2.5vw, 1.65rem);
    font-weight: 900;
    color: var(--pink-deep);
    text-decoration: none;
    letter-spacing: -0.04em;
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex-shrink: 0;
  }

  .logo-icon {
    width: 2.25rem;
    height: 2.25rem;
    background: linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%);
    color: #ffffff;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(219, 39, 119, 0.3);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .nav-link {
    color: var(--text-main);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background-color: var(--pink-soft);
    color: var(--pink-deep);
  }

  .user-badge {
    font-size: 0.825rem;
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, #fdf2f8, #fce7f3);
    color: var(--pink-dark);
    font-weight: 800;
    border: 1px solid var(--pink-border);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  /* Main Container & Hero Layout */
  main {
    flex: 1;
    max-width: 1150px;
    width: 100%;
    margin: 2.5rem auto;
    padding: 0 1.5rem;
  }

  .hero-wrapper {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 2rem;
    align-items: stretch;
    margin-bottom: 3.5rem;
  }

  .hero-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-xl);
    padding: clamp(1.75rem, 4vw, 3rem);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .hero-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #f472b6, #ec4899, #db2777);
  }

  .hero-side-card {
    background: linear-gradient(160deg, #ffffff 0%, #fdf2f8 100%);
    border: 1px solid var(--pink-border);
    border-radius: var(--radius-xl);
    padding: clamp(1.75rem, 3vw, 2.5rem);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
  }

  /* Buttons */
  .btn {
    padding: 0.75rem 1.6rem;
    font-weight: 800;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    line-height: 1.25;
  }

  .btn-sm {
    padding: 0.4rem 0.85rem;
    font-size: 0.825rem;
    border-radius: var(--radius-sm);
  }

  .btn-pink {
    background: linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%);
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(219, 39, 119, 0.35);
  }

  .btn-pink:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(219, 39, 119, 0.45);
  }

  .btn-outline {
    background-color: #ffffff;
    border: 1.5px solid var(--pink-border);
    color: var(--pink-dark);
  }

  .btn-outline:hover {
    background-color: var(--pink-soft);
    border-color: var(--pink-primary);
    color: var(--pink-deep);
  }

  .btn-danger {
    background-color: #fff1f2;
    color: var(--rose-red);
    border: 1px solid #fecdd3;
  }

  .btn-danger:hover {
    background-color: #ffe4e6;
  }

  /* Badges & Tags */
  .badge {
    font-size: 0.8rem;
    font-weight: 800;
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .badge-pink {
    background: #fdf2f8;
    color: #be185d;
    border: 1px solid #fbcfe8;
  }

  .badge-emerald {
    background: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
  }

  .badge-purple {
    background: #f5f3ff;
    color: #6d28d9;
    border: 1px solid #ddd6fe;
  }

  /* Interactive Dropzone */
  .upload-dropzone {
    border: 2px dashed #f472b6;
    border-radius: var(--radius-lg);
    padding: clamp(2rem, 5vw, 3.5rem) 1.5rem;
    background: linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    margin-top: 1.5rem;
  }

  .upload-dropzone:hover, .upload-dropzone.dragover {
    border-color: var(--pink-deep);
    background: #fce7f3;
    box-shadow: var(--shadow-glow);
    transform: scale(1.01);
  }

  .upload-icon-circle {
    width: 4.5rem;
    height: 4.5rem;
    background: linear-gradient(135deg, #fce7f3, #fdf2f8);
    border: 1px solid var(--pink-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem auto;
    color: var(--pink-deep);
  }

  /* Cards Grid */
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .feature-box {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.25s ease;
  }

  .feature-box:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--pink-primary);
  }

  /* Dashboard Stats */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .stat-label {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 1.85rem;
    font-weight: 900;
    color: var(--pink-dark);
    margin-top: 0.35rem;
  }

  /* Tables */
  .table-responsive {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    background: #ffffff;
    box-shadow: var(--shadow-sm);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9rem;
    min-width: 540px;
  }

  th {
    background-color: var(--pink-soft);
    padding: 1rem 1.25rem;
    font-weight: 800;
    color: var(--pink-dark);
    border-bottom: 1px solid var(--pink-border);
    white-space: nowrap;
  }

  td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
    color: var(--text-main);
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Modals */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(17, 24, 39, 0.6);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    padding: 1rem;
  }

  .modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-card {
    background: #ffffff;
    border-radius: var(--radius-xl);
    border: 1px solid var(--pink-border);
    width: 100%;
    max-width: 440px;
    padding: 2rem;
    box-shadow: var(--shadow-lg);
  }

  /* Toasts */
  #toast-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    left: 1.5rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }

  .toast {
    background: #111827;
    color: #ffffff;
    padding: 0.85rem 1.4rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 700;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    max-width: 420px;
    margin-left: auto;
    pointer-events: auto;
    border-left: 4px solid var(--pink-primary);
  }

  /* FAQ Accordion Styles */
  .faq-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-item {
    background: #ffffff;
    border: 1px solid var(--pink-border);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .faq-item:hover {
    border-color: var(--pink-primary);
    box-shadow: var(--shadow-md);
  }

  .faq-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--text-main);
  }

  .faq-arrow {
    color: var(--pink-deep);
    transition: transform 0.25s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .faq-item.active .faq-arrow {
    transform: rotate(180deg);
  }

  .faq-body {
    display: none;
    margin-top: 0.85rem;
    padding-top: 0.85rem;
    border-top: 1px dashed var(--pink-border);
    color: var(--text-muted);
    font-size: 0.925rem;
    line-height: 1.6;
  }

  .faq-item.active .faq-body {
    display: block;
  }

  /* Footer */
  footer {
    border-top: 1px solid var(--pink-border);
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(16px);
    padding: 2.25rem 1rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-top: auto;
  }

  footer a {
    color: var(--pink-deep);
    text-decoration: none;
    font-weight: 800;
  }

  footer a:hover {
    text-decoration: underline;
  }

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    .hero-wrapper {
      grid-template-columns: 1fr;
    }
    .grid-3, .stat-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    header {
      padding: 0.75rem 1.25rem;
    }

    main {
      padding: 0 1rem;
      margin: 1.5rem auto;
    }

    .hero-card, .hero-side-card {
      padding: 1.5rem;
    }

    .btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 450px) {
    header {
      padding: 0.65rem 0.85rem;
    }

    .logo {
      font-size: 1.25rem;
    }

    main {
      padding: 0 0.75rem;
      margin: 1rem auto;
    }

    .hero-card, .hero-side-card {
      padding: 1.15rem;
      border-radius: var(--radius-lg);
    }

    .upload-dropzone {
      padding: 1.5rem 0.85rem;
    }

    .upload-icon-circle {
      width: 3.75rem;
      height: 3.75rem;
      margin-bottom: 0.85rem;
    }

    .btn {
      width: 100%;
      padding: 0.7rem 1rem;
      font-size: 0.875rem;
    }

    .faq-item {
      padding: 1rem;
    }

    .faq-header {
      font-size: 0.95rem;
    }
  }
`;
