import { getLayoutHtml } from './layout';

export function getIndexHtml(): string {
  const content = `
    <!-- Hero Section -->
    <div class="hero-wrapper">
      <!-- Main Upload Box -->
      <div class="hero-card">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <span class="badge badge-pink">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              High-Speed Edge Storage
            </span>
            <span class="badge badge-emerald">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              5 GB Max Limit
            </span>
          </div>

          <h1 style="font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 900; letter-spacing: -0.04em; color: var(--text-main); margin-bottom: 0.6rem; line-height: 1.2;">
            Effortless & Secure <br/><span style="color: var(--pink-deep);">File Sharing</span>
          </h1>
          <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">
            Upload files up to 5 GB with zero bandwidth speed caps. Unlimited downloads and instant sharing links.
          </p>
        </div>

        <!-- Interactive Drag & Drop Area -->
        <div id="drop-zone" class="upload-dropzone" onclick="document.getElementById('file-input').click()">
          <div class="upload-icon-circle">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <p style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">Drop your file here, or click to browse</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">Supports all file formats up to 5 GB capacity</p>
          <input type="file" id="file-input" style="display: none;" onchange="handleFileSelect(event)" />
        </div>

        <!-- Upload Progress -->
        <div id="upload-progress-container" style="display: none; background: #fafaf9; border: 1px solid var(--pink-border); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 800; margin-bottom: 0.5rem;">
            <span id="progress-filename" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%;">File Name</span>
            <span id="progress-percent" style="color: var(--pink-deep);">0%</span>
          </div>
          <div style="height: 10px; background: #fce7f3; border-radius: 5px; overflow: hidden; margin-bottom: 0.5rem;">
            <div id="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #f472b6, #db2777); transition: width 0.1s linear;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
            <span id="progress-status">Uploading...</span>
            <span id="progress-size">0 / 0 MB</span>
          </div>
        </div>

        <!-- Upload Result Container -->
        <div id="upload-result-container" style="display: none; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 1.5rem; border-radius: var(--radius-md); margin-top: 1.25rem;">
          <h4 style="color: #047857; font-size: 1.1rem; font-weight: 900; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            File Upload Complete!
          </h4>
          <p style="font-size: 0.875rem; color: #065f46; margin-bottom: 1rem;">Share this unique link to let anyone download your file:</p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <input type="text" id="share-link-input" readonly style="flex: 1; min-width: 200px; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: var(--radius-sm); font-size: 0.9rem; background: #ffffff; color: var(--text-main); font-weight: 700;" />
            <button class="btn btn-pink" onclick="copyShareLink()" id="btn-copy">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              Copy Link
            </button>
          </div>
          <div style="margin-top: 0.85rem; font-size: 0.825rem; color: #047857; font-weight: 700;" id="result-expiration-info"></div>
        </div>

        <div id="upload-error-container" style="display: none; background: #fff1f2; border: 1px solid #fecdd3; padding: 1rem; border-radius: var(--radius-md); color: #be185d; font-size: 0.875rem; margin-top: 1rem;"></div>
      </div>

      <!-- Retention Rules Box -->
      <div class="hero-side-card">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem;">
            <div style="width: 40px; height: 40px; background: #fce7f3; color: var(--pink-dark); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--text-main);">Expiration & Reset Rules</h3>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">
            100% anonymous file sharing with smart 30-day retention and automated download extension!
          </p>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: #ffffff; border: 1px solid var(--pink-border); padding: 1.15rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
              <div style="font-weight: 900; font-size: 0.9rem; color: #047857; margin-bottom: 0.25rem;">30 Days Active Duration</div>
              <div style="font-size: 0.825rem; color: var(--text-muted);">Files remain downloadable for 30 days from the latest upload or reset date.</div>
            </div>
            <div style="background: #ffffff; border: 1px solid var(--pink-border); padding: 1.15rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
              <div style="font-weight: 900; font-size: 0.9rem; color: var(--pink-dark); margin-bottom: 0.25rem;">15 Downloads Auto-Reset</div>
              <div style="font-size: 0.825rem; color: var(--text-muted);">Reaching 15 downloads automatically resets and extends the file expiration date for another +30 days.</div>
            </div>
          </div>
        </div>

        <a href="/#faq" class="btn btn-outline" style="width: 100%; text-decoration: none;">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Read Detailed FAQ
        </a>
      </div>
    </div>

    <!-- Brand Title Badge & Feature Highlights -->
    <div style="text-align: center; margin-bottom: 2.5rem;">
      <a href="/" style="display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; background: #ffffff; padding: 0.6rem 1.4rem; border-radius: 9999px; border: 1px solid var(--pink-border); box-shadow: var(--shadow-sm);">
        <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brandLogoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ec4899" />
              <stop offset="100%" stop-color="#be185d" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="26" fill="url(#brandLogoGrad)" />
          <path d="M22 34C22 29.5817 25.5817 26 30 26H42.5C45.2 26 47.7 27.2 49.3 29.3L52.7 33.7C53.5 34.8 54.8 35.5 56.2 35.5H70C74.4183 35.5 78 39.0817 78 43.5V66C78 70.4183 74.4183 74 70 74H30C25.5817 74 22 70.4183 22 66V34Z" fill="#ffffff" fill-opacity="0.92" />
          <path d="M53 43L39 57H49L45 69L59 53H49L53 43Z" fill="#db2777" />
        </svg>
        <span style="font-size: 1.35rem; font-weight: 900; background: linear-gradient(135deg, #111827, #db2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.035em;">filedontol</span>
      </a>
    </div>


    <!-- Additional Point / Highlights Grid -->
    <div style="margin-bottom: 3.5rem;">
      <h2 style="font-size: 1.65rem; font-weight: 900; text-align: center; margin-bottom: 0.5rem; color: var(--text-main);">Why Choose filedontol?</h2>
      <p style="text-align: center; color: var(--text-muted); font-size: 1rem; margin-bottom: 2.25rem;">Fast, secure, and clean experience without popups or captchas.</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
        <div class="feature-box">
          <div style="width: 44px; height: 44px; background: var(--pink-soft); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--pink-deep); margin-bottom: 1rem;">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">100% Anonymous</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted);">No registration, no personal data, no login required. Upload and share instantly.</p>
        </div>

        <div class="feature-box">
          <div style="width: 44px; height: 44px; background: var(--pink-soft); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--pink-deep); margin-bottom: 1rem;">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">Large 5 GB Capacity</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted);">Host large media archives, installer builds, ISO images, and heavy documents.</p>
        </div>

        <div class="feature-box">
          <div style="width: 44px; height: 44px; background: var(--pink-soft); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--pink-deep); margin-bottom: 1rem;">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">30-Day Retention</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted);">Files stay active for 30 days and automatically reset to 30 days after 15 downloads.</p>
        </div>

        <div class="feature-box">
          <div style="width: 44px; height: 44px; background: var(--pink-soft); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--pink-deep); margin-bottom: 1rem;">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">High-Speed Transfer</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted);">Global edge network architecture ensures zero bandwidth caps and fast downloads.</p>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div id="faq" style="margin-bottom: 3.5rem;">
      <h2 style="font-size: 1.65rem; font-weight: 900; text-align: center; margin-bottom: 0.5rem;">Frequently Asked Questions</h2>
      <p style="text-align: center; color: var(--text-muted); font-size: 1rem; margin-bottom: 2.25rem;">Everything you need to know about filedontol.</p>

      <div class="faq-container">
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How long are files kept active?</span>
            <span class="faq-arrow">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
          <div class="faq-body">
            Each file is automatically active for <strong>30 days</strong> from the date of upload.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How does the file expiration reset work?</span>
            <span class="faq-arrow">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
          <div class="faq-body">
            If a file reaches <strong>15 or more downloads</strong>, its active duration is automatically reset to <strong>30 days</strong> from the latest download date.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Do I need to create an account?</span>
            <span class="faq-arrow">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
          <div class="faq-body">
            No account is required. You can upload files freely and anonymously without registering or logging in.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>What is the maximum file size limit?</span>
            <span class="faq-arrow">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
          <div class="faq-body">
            The maximum limit is <strong>5 GB</strong> per upload for all file formats.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How do I report illegal content or DMCA violations?</span>
            <span class="faq-arrow">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
          <div class="faq-body">
            Send the file link and proof of ownership directly to email: <code>filedontol@gmail.com</code>. Valid reports are handled within 24 hours.
          </div>
        </div>
      </div>
    </div>

    <script>
      function toggleFaq(el) {
        el.classList.toggle('active');
      }

      const dropZone = document.getElementById('drop-zone');

      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.classList.add('dragover');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.classList.remove('dragover');
        }, false);
      });

      dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
          uploadFile(files[0]);
        }
      });

      function handleFileSelect(e) {
        if (e.target.files.length > 0) {
          uploadFile(e.target.files[0]);
        }
      }

      function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }

      async function computeSHA256(file) {
        const chunkSize = 10 * 1024 * 1024;
        const slice = file.size > chunkSize ? file.slice(0, chunkSize) : file;
        const arrayBuffer = await slice.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }

      async function uploadFile(file) {
        const MAX_SIZE = 5 * 1024 * 1024 * 1024;
        const errorContainer = document.getElementById('upload-error-container');
        const progressContainer = document.getElementById('upload-progress-container');
        const resultContainer = document.getElementById('upload-result-container');

        errorContainer.style.display = 'none';
        resultContainer.style.display = 'none';

        if (file.size > MAX_SIZE) {
          errorContainer.innerText = 'Maximum file upload limit is 5 GB.';
          errorContainer.style.display = 'block';
          return;
        }

        progressContainer.style.display = 'block';
        document.getElementById('progress-filename').innerText = file.name;
        document.getElementById('progress-bar').style.width = '0%';
        document.getElementById('progress-percent').innerText = '0%';
        document.getElementById('progress-status').innerText = 'Calculating SHA-256 hash...';
        document.getElementById('progress-size').innerText = \`0 / \${formatBytes(file.size)}\`;

        try {
          const fileHash = await computeSHA256(file);

          document.getElementById('progress-status').innerText = 'Requesting upload ticket...';

          const ticketRes = await fetch('/api/upload/presigned', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type || 'application/octet-stream',
              fileHash: fileHash
            })
          });

          const ticketData = await ticketRes.json();
          if (!ticketRes.ok || ticketData.error) {
            progressContainer.style.display = 'none';
            errorContainer.innerText = ticketData.error || 'Failed to create upload ticket.';
            errorContainer.style.display = 'block';
            return;
          }

          document.getElementById('progress-status').innerText = 'Transferring file to cloud storage...';

          await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', ticketData.presignedUrl, true);
            if (file.type) {
              xhr.setRequestHeader('Content-Type', file.type);
            }

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                document.getElementById('progress-bar').style.width = percent + '%';
                document.getElementById('progress-percent').innerText = percent + '%';
                document.getElementById('progress-size').innerText = \`\${formatBytes(e.loaded)} / \${formatBytes(e.total)}\`;
              }
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) resolve();
              else reject(new Error('Failed to transfer file to storage.'));
            };

            xhr.onerror = () => reject(new Error('Network connection error during transfer.'));
            xhr.send(file);
          });

          document.getElementById('progress-status').innerText = 'Saving metadata...';

          const completeRes = await fetch('/api/upload/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              r2Key: ticketData.r2Key,
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type || 'application/octet-stream',
              fileHash: fileHash
            })
          });

          const completeData = await completeRes.json();
          if (!completeRes.ok || completeData.error) {
            progressContainer.style.display = 'none';
            errorContainer.innerText = completeData.error || 'Failed to save metadata.';
            errorContainer.style.display = 'block';
            return;
          }

          progressContainer.style.display = 'none';
          showToast('File uploaded successfully! Redirecting...');

          // Automatically redirect directly to the file link upon successful upload
          window.location.href = \`/f/\${completeData.shareCode}\`;

        } catch (err) {
          progressContainer.style.display = 'none';
          errorContainer.innerText = err.message || 'An error occurred during upload.';
          errorContainer.style.display = 'block';
        }
      }

      function copyShareLink() {
        const input = document.getElementById('share-link-input');
        input.select();
        navigator.clipboard.writeText(input.value);
        showToast('Share link copied to clipboard!');
        const btn = document.getElementById('btn-copy');
        btn.innerText = 'Copied!';
        setTimeout(() => { btn.innerText = 'Copy Link'; }, 2000);
      }
    </script>
  `;

  return getLayoutHtml('Free File Upload Up To 5 GB', content);
}

export function getDashboardPageHtml(): string {
  const content = `
    <!-- Member Dashboard -->
    <div style="background: #ffffff; border: 1px solid var(--pink-border); border-radius: var(--radius-xl); padding: clamp(1.5rem, 4vw, 2.5rem); box-shadow: var(--shadow-md); margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.65rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.25rem;">Member Dashboard</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Manage, rename, share, and track all your active file uploads.</p>
        </div>
        <button class="btn btn-pink" onclick="toggleDashboardUploadSection()" id="btn-toggle-dash-upload">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Upload New File
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="stat-grid" style="margin-top: 1.75rem;">
        <div class="stat-card">
          <span class="stat-label">Total Files</span>
          <span id="stat-total-files" class="stat-value">-</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Storage Used</span>
          <span id="stat-total-storage" class="stat-value">-</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Downloads</span>
          <span id="stat-total-downloads" class="stat-value">-</span>
        </div>
      </div>

      <!-- Integrated Dashboard Upload Area -->
      <div id="dashboard-upload-box" style="display: block; background: var(--pink-soft); border: 2px dashed var(--pink-primary); border-radius: var(--radius-lg); padding: 1.75rem; text-align: center; margin-top: 1.5rem;">
        <div onclick="document.getElementById('dash-file-input').click()" style="cursor: pointer;">
          <div style="width: 48px; height: 48px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; color: var(--pink-deep); box-shadow: var(--shadow-sm);">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <p style="font-size: 1rem; font-weight: 800; color: var(--text-main);">Click or drag files here to upload to your account</p>
          <p style="font-size: 0.825rem; color: var(--text-muted);">Max 5 GB • 60-Day Default Retention</p>
          <input type="file" id="dash-file-input" style="display: none;" onchange="handleDashFileSelect(event)" />
        </div>

        <div id="dash-progress-container" style="display: none; text-align: left; background: #ffffff; border: 1px solid var(--pink-border); padding: 1rem; border-radius: var(--radius-md); margin-top: 1rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 800; margin-bottom: 0.35rem;">
            <span id="dash-progress-filename">File Name</span>
            <span id="dash-progress-percent" style="color: var(--pink-deep);">0%</span>
          </div>
          <div style="height: 8px; background: var(--pink-light); border-radius: 4px; overflow: hidden; margin-bottom: 0.35rem;">
            <div id="dash-progress-bar" style="width: 0%; height: 100%; background: var(--pink-deep); transition: width 0.1s linear;"></div>
          </div>
          <p id="dash-progress-status" style="font-size: 0.8rem; color: var(--text-muted);">Uploading...</p>
        </div>
      </div>
    </div>

    <!-- File List Table -->
    <div style="background: #ffffff; border: 1px solid var(--card-border); border-radius: var(--radius-xl); padding: clamp(1.25rem, 3vw, 2rem); box-shadow: var(--shadow-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <h2 style="font-size: 1.25rem; font-weight: 900; color: var(--text-main);">My Uploaded Files</h2>
        <input type="text" id="search-files-input" placeholder="Search file name..." oninput="filterFiles()" style="width: 100%; max-width: 280px; padding: 0.6rem 0.85rem; border: 1px solid var(--pink-border); border-radius: var(--radius-sm); font-size: 0.875rem; background: #ffffff;" />
      </div>

      <div id="loading-dashboard" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
        Loading file list...
      </div>

      <div id="dashboard-empty" style="display: none; text-align: center; padding: 3.5rem 1rem; border: 2px dashed var(--pink-border); border-radius: var(--radius-lg);">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main);">No files uploaded yet</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Upload your first file using the box above.</p>
      </div>

      <div id="dashboard-table-wrapper" style="display: none;" class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>Downloads</th>
              <th>Time Left</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="files-table-body">
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rename File Modal -->
    <div class="modal-overlay" id="rename-modal">
      <div class="modal-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--text-main);">Rename File</h3>
          <button onclick="closeRenameModal()" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted);">&times;</button>
        </div>
        <form onsubmit="handleRenameSubmit(event)">
          <input type="hidden" id="rename-file-id" />
          <div style="margin-bottom: 1.25rem;">
            <label for="rename-file-input" style="display:block; font-size:0.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.4rem;">New File Name</label>
            <input type="text" id="rename-file-input" required style="width:100%; padding:0.65rem 0.85rem; border:1px solid var(--pink-border); border-radius:var(--radius-sm); font-size:0.9rem;" />
          </div>
          <button type="submit" class="btn btn-pink" style="width: 100%;">Save Changes</button>
        </form>
      </div>
    </div>

    <script>
      let allFiles = [];

      function toggleDashboardUploadSection() {
        const box = document.getElementById('dashboard-upload-box');
        if (box.style.display === 'none') {
          box.style.display = 'block';
          box.scrollIntoView({ behavior: 'smooth' });
        } else {
          box.style.display = 'none';
        }
      }

      function handleDashFileSelect(e) {
        if (e.target.files.length > 0) {
          uploadDashboardFile(e.target.files[0]);
        }
      }

      async function computeSHA256(file) {
        const chunkSize = 10 * 1024 * 1024;
        const slice = file.size > chunkSize ? file.slice(0, chunkSize) : file;
        const arrayBuffer = await slice.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }

      async function uploadDashboardFile(file) {
        const MAX_SIZE = 5 * 1024 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          showToast('Maximum file upload limit is 5 GB.', true);
          return;
        }

        const progressContainer = document.getElementById('dash-progress-container');
        progressContainer.style.display = 'block';
        document.getElementById('dash-progress-filename').innerText = file.name;
        document.getElementById('dash-progress-bar').style.width = '0%';
        document.getElementById('dash-progress-percent').innerText = '0%';
        document.getElementById('dash-progress-status').innerText = 'Calculating hash...';

        try {
          const fileHash = await computeSHA256(file);
          document.getElementById('dash-progress-status').innerText = 'Requesting ticket...';

          const ticketRes = await fetch('/api/upload/presigned', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type || 'application/octet-stream',
              fileHash: fileHash
            })
          });

          const ticketData = await ticketRes.json();
          if (!ticketRes.ok || ticketData.error) {
            progressContainer.style.display = 'none';
            showToast(ticketData.error || 'Failed to create upload ticket.', true);
            return;
          }

          document.getElementById('dash-progress-status').innerText = 'Transferring file...';

          await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', ticketData.presignedUrl, true);
            if (file.type) {
              xhr.setRequestHeader('Content-Type', file.type);
            }

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                document.getElementById('dash-progress-bar').style.width = percent + '%';
                document.getElementById('dash-progress-percent').innerText = percent + '%';
              }
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) resolve();
              else reject(new Error('Failed to upload file.'));
            };

            xhr.onerror = () => reject(new Error('Network error.'));
            xhr.send(file);
          });

          document.getElementById('dash-progress-status').innerText = 'Finalizing...';

          const completeRes = await fetch('/api/upload/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              r2Key: ticketData.r2Key,
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type || 'application/octet-stream',
              fileHash: fileHash
            })
          });

          const completeData = await completeRes.json();
          if (!completeRes.ok || completeData.error) {
            progressContainer.style.display = 'none';
            showToast(completeData.error || 'Failed to save metadata.', true);
            return;
          }

          progressContainer.style.display = 'none';
          showToast('File uploaded successfully!');
          loadDashboard();

        } catch (err) {
          progressContainer.style.display = 'none';
          showToast(err.message || 'Failed to upload file.', true);
        }
      }

      function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }

      function calculateRemainingTime(expiresAtIso) {
        const expiresDate = new Date(expiresAtIso.endsWith('Z') ? expiresAtIso : expiresAtIso + 'Z');
        const diffMs = expiresDate.getTime() - Date.now();
        if (diffMs <= 0) return 'Expired';
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return \`\${days}d \${hours}h\`;
      }

      async function loadDashboard() {
        try {
          const res = await fetch('/api/auth/files');
          const data = await res.json();

          document.getElementById('loading-dashboard').style.display = 'none';

          if (!res.ok || !data.success) {
            if (res.status === 401) {
              window.location.href = '/';
              return;
            }
            showToast(data.error || 'Failed to load dashboard.', true);
            return;
          }

          document.getElementById('stat-total-files').innerText = data.stats.totalFiles;
          document.getElementById('stat-total-storage').innerText = formatBytes(data.stats.totalStorage);
          document.getElementById('stat-total-downloads').innerText = data.stats.totalDownloads;

          allFiles = data.files || [];
          renderFilesTable(allFiles);

        } catch (err) {
          document.getElementById('loading-dashboard').style.display = 'none';
          showToast('Failed to connect to server.', true);
        }
      }

      function renderFilesTable(files) {
        const tbody = document.getElementById('files-table-body');
        const emptyDiv = document.getElementById('dashboard-empty');
        const wrapper = document.getElementById('dashboard-table-wrapper');

        if (files.length === 0) {
          wrapper.style.display = 'none';
          emptyDiv.style.display = 'block';
          return;
        }

        emptyDiv.style.display = 'none';
        tbody.innerHTML = '';

        files.forEach(file => {
          const tr = document.createElement('tr');
          const shareUrl = \`\${window.location.origin}/f/\${file.share_code}\`;

          tr.innerHTML = \`
            <td style="font-weight: 700; word-break: break-all;">
              <a href="/f/\${file.share_code}" target="_blank" style="color: var(--text-main); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--pink-deep)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                \${file.file_name}
              </a>
            </td>
            <td style="white-space: nowrap; color: var(--text-muted); font-weight: 600;">\${formatBytes(file.file_size)}</td>
            <td style="white-space: nowrap; font-weight: 800; color: var(--pink-dark);">\${file.download_count}</td>
            <td style="white-space: nowrap; font-size: 0.85rem; color: #d97706; font-weight: 700;">\${calculateRemainingTime(file.expires_at)}</td>
            <td style="white-space: nowrap;">
              <div style="display: flex; gap: 0.35rem;">
                <button class="btn btn-outline btn-sm" onclick="copyLink('\${shareUrl}')" title="Copy Link">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                  Copy
                </button>
                <button class="btn btn-outline btn-sm" onclick="openRenameModal('\${file.id}', '\${file.file_name.replace(/'/g, "\\\\'")}')" title="Rename File">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteFile('\${file.id}')" title="Delete File">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Delete
                </button>
              </div>
            </td>
          \`;
          tbody.appendChild(tr);
        });

        wrapper.style.display = 'block';
      }

      function filterFiles() {
        const query = document.getElementById('search-files-input').value.toLowerCase();
        const filtered = allFiles.filter(f => f.file_name.toLowerCase().includes(query));
        renderFilesTable(filtered);
      }

      function openRenameModal(fileId, currentName) {
        document.getElementById('rename-file-id').value = fileId;
        document.getElementById('rename-file-input').value = currentName;
        document.getElementById('rename-modal').classList.add('active');
      }

      function closeRenameModal() {
        document.getElementById('rename-modal').classList.remove('active');
      }

      async function handleRenameSubmit(e) {
        e.preventDefault();
        const fileId = document.getElementById('rename-file-id').value;
        const newName = document.getElementById('rename-file-input').value;

        try {
          const res = await fetch(\`/api/auth/files/\${fileId}\`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: newName })
          });
          const data = await res.json();
          if (!res.ok || data.error) {
            showToast(data.error || 'Failed to rename file.', true);
            return;
          }
          closeRenameModal();
          showToast('File name updated successfully.');
          loadDashboard();
        } catch (err) {
          showToast('Network error occurred.', true);
        }
      }

      function copyLink(url) {
        navigator.clipboard.writeText(url);
        showToast('Share link copied to clipboard!');
      }

      async function deleteFile(fileId) {
        if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
          return;
        }

        try {
          const res = await fetch(\`/api/auth/files/\${fileId}\`, { method: 'DELETE' });
          const data = await res.json();
          if (!res.ok || data.error) {
            showToast(data.error || 'Failed to delete file.', true);
            return;
          }
          showToast('File deleted successfully.');
          loadDashboard();
        } catch (err) {
          showToast('System error occurred.', true);
        }
      }

      document.addEventListener('DOMContentLoaded', loadDashboard);
    </script>
  `;

  return getLayoutHtml('Member Dashboard', content);
}

export function getReportPageHtml(): string {
  const content = `
    <div style="max-width: 800px; margin: 0 auto; background: #ffffff; border: 1px solid var(--pink-border); border-radius: var(--radius-xl); padding: clamp(1.75rem, 5vw, 3rem); box-shadow: var(--shadow-lg);">
      <div style="text-align: center; margin-bottom: 2.25rem;">
        <div style="width: 68px; height: 68px; background: #fff1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: var(--rose-red);">
          <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 style="font-size: clamp(1.6rem, 3.5vw, 2.25rem); font-weight: 900; color: var(--text-main); letter-spacing: -0.03em;">
          Report Abuse & DMCA Violations
        </h1>
        <p style="color: var(--text-muted); font-size: 1rem; margin-top: 0.5rem; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          We do not host input forms on this page. All complaints regarding Copyright / DMCA violations, CSAM, malware, and illegal content are handled <strong>DIRECTLY VIA EMAIL</strong> to administrators.
        </p>
      </div>

      <!-- Main Direct Email Box -->
      <div style="background: linear-gradient(135deg, var(--pink-soft), #ffffff); border: 2px solid var(--pink-border); border-radius: var(--radius-lg); padding: 2.25rem; text-align: center; margin-bottom: 2.5rem;">
        <p style="font-size: 0.85rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; color: var(--pink-dark); margin-bottom: 0.5rem;">OFFICIAL TAKEDOWN CONTACT EMAIL</p>
        <div style="font-size: clamp(1.35rem, 3vw, 1.85rem); font-weight: 900; color: var(--text-main); margin-bottom: 1.5rem; font-family: monospace; letter-spacing: -0.02em;">
          filedontol@gmail.com
        </div>
        <a href="mailto:filedontol@gmail.com?subject=Abuse%20%2F%20DMCA%20Takedown%20Report%20-%20filedontol&body=Hello%20filedontol%20Team%2C%0A%0AI%20would%20like%20to%20report%20a%20file%20violation%20with%20the%20following%20details%3A%0A%E2%80%A2%20File%20Link%20%2F%20Share%20Code%3A%20%0A%E2%80%A2%20Violation%20Type%3A%20(DMCA%20%2F%20CSAM%20%2F%20Violence%20%2F%20Malware)%0A%E2%80%A2%20Proof%20of%20Ownership%20%2F%20Details%3A%20%0A%0APlease%20process%20this%20takedown.%20Thank%20you." class="btn btn-pink" style="padding: 0.9rem 2.25rem; font-size: 1.05rem; border-radius: var(--radius-md); gap: 0.75rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Email Complaint
        </a>
      </div>

      <!-- Instructions -->
      <div style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem;">
        <h3 style="font-size: 1.2rem; font-weight: 900; margin-bottom: 0.75rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--pink-deep)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Required Email Information:
        </h3>
        <p style="margin-bottom: 1rem; color: var(--text-muted);">
          To ensure immediate processing, please include the following in your email:
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 2.25rem; color: var(--text-muted);">
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">File Link / URL:</strong> Exact file share link (e.g. <code>https://filedontol.com/f/xxxxxx</code>) or code.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Violation Type:</strong> Copyright/DMCA, CSAM, Violent Extremism, Malware, or Scam.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Proof of Rights (DMCA):</strong> Copyright registration certificate or power of attorney.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Reporter Details:</strong> Full legal name, organization, and official contact email.</li>
        </ul>

        <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; text-align: center;">
          <a href="/" class="btn btn-outline">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  `;

  return getLayoutHtml('Report Abuse', content);
}

export function getDownloadPageHtml(shareCode: string): string {
  const content = `
    <div style="max-width: 800px; margin: 0 auto; background: #ffffff; border: 1px solid var(--pink-border); border-radius: var(--radius-xl); padding: clamp(1.75rem, 5vw, 3rem); box-shadow: var(--shadow-lg);" id="download-card">
      <div id="loading-spinner" style="padding: 3.5rem; text-align: center; color: var(--text-muted);">
        <div style="width: 52px; height: 52px; border: 4px solid var(--pink-light); border-top-color: var(--pink-deep); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.25rem auto;"></div>
        Retrieving file details...
      </div>

      <div id="file-details" style="display: none;">
        <!-- Media Preview Container (Images & Videos) -->
        <div id="media-preview-container" style="display: none; background: #fafaf9; border: 1px solid var(--pink-border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.75rem; text-align: center; overflow: hidden; box-shadow: var(--shadow-sm);">
          <div id="media-preview-content" style="max-width: 100%; display: flex; justify-content: center; align-items: center;"></div>
        </div>

        <!-- Header Card -->
        <div style="background: var(--pink-soft); border: 1px solid var(--pink-border); border-radius: var(--radius-lg); padding: 1.85rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.35rem; text-align: left;">
          <div style="background: linear-gradient(135deg, #ec4899, #db2777); color: white; width: 68px; height: 68px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 18px rgba(219, 39, 119, 0.3);">
            <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div style="flex: 1; overflow: hidden;">
            <h2 id="detail-filename" style="font-size: clamp(1.2rem, 2.5vw, 1.5rem); font-weight: 900; word-break: break-all; margin-bottom: 0.35rem; color: var(--text-main); letter-spacing: -0.02em;">-</h2>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <span id="detail-filesize" style="font-size: 0.925rem; color: var(--pink-dark); font-weight: 800; background: #ffffff; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--pink-border);">-</span>
              <span id="detail-mimetype" style="font-size: 0.825rem; color: var(--text-muted); font-weight: 600;">-</span>
            </div>
          </div>
        </div>

        <!-- Metadata Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.15rem; margin-bottom: 2.25rem; text-align: left;">
          <div style="border: 1px solid var(--pink-border); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.05em;">UPLOAD DATE</p>
            <p id="detail-createdat" style="font-size: 1.05rem; font-weight: 900; margin-top: 0.35rem; color: var(--text-main);">-</p>
          </div>
          <div style="border: 1px solid var(--pink-border); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.05em;">TOTAL DOWNLOADS</p>
            <p id="detail-downloads" style="font-size: 1.05rem; font-weight: 900; margin-top: 0.35rem; color: var(--pink-dark);">-</p>
          </div>
          <div style="border: 1px solid var(--pink-border); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.05em;">TIME REMAINING</p>
            <p id="detail-expires" style="font-size: 1.05rem; font-weight: 900; color: #d97706; margin-top: 0.35rem;">-</p>
          </div>
        </div>

        <!-- Download, Copy & Native Share Actions Stacked -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem; width: 100%; margin-bottom: 2rem;">
          <a id="btn-download-file" href="#" class="btn btn-pink" style="font-size: 1.15rem; padding: 1.1rem 2rem; width: 100%; text-decoration: none; border-radius: var(--radius-md); gap: 0.75rem; justify-content: center;">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download File Now
          </a>
          <button id="btn-copy-download-link" onclick="copyPageLink()" class="btn btn-outline" style="font-size: 1rem; padding: 0.85rem 1.5rem; width: 100%; border-radius: var(--radius-md); gap: 0.55rem; justify-content: center;">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </button>
          <button id="btn-native-share" onclick="handleNativeShare()" class="btn btn-outline" style="font-size: 1rem; padding: 0.85rem 1.5rem; width: 100%; border-radius: var(--radius-md); gap: 0.55rem; justify-content: center;">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share via Device
          </button>
        </div>

        <!-- Live QR Code Scan Card -->
        <div style="background: var(--pink-soft); border: 1px solid var(--pink-border); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center; margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
          <h4 style="font-size: 1.05rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--pink-deep)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
            Scan QR Code to Open on Phone
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Point your phone camera to instantly download or share this link.</p>
          <div id="qr-code-wrapper" style="display: flex; justify-content: center; align-items: center;">
            <img id="qr-code-img" src="" alt="Scan QR Code" style="width: 160px; height: 160px; border-radius: var(--radius-md); border: 2px solid #ffffff; box-shadow: var(--shadow-md); background: #ffffff; padding: 0.5rem;" />
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top: 2.25rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--emerald-green)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Files reaching 15+ downloads auto-reset expiration to 30 days.
          </span>
          <a href="/report" style="color: var(--rose-red); font-size: 0.85rem; font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Report Violation
          </a>
        </div>
      </div>

      <!-- Error State -->
      <div id="error-card" style="display: none; padding: 3.5rem 1rem; text-align: center;">
        <div style="width: 68px; height: 68px; background: #fff1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: var(--rose-red);">
          <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 id="error-title" style="font-size: 1.4rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.5rem;">File Unavailable</h3>
        <p id="error-desc" style="color: var(--text-muted); font-size: 0.95rem; max-width: 500px; margin: 0 auto 2rem auto; line-height: 1.6;">-</p>
        <a href="/" class="btn btn-outline">Back to Home</a>
      </div>
    </div>

    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>

    <script>
      function copyPageLink() {
        navigator.clipboard.writeText(window.location.href);
        showToast('Download link copied to clipboard!');
        const btn = document.getElementById('btn-copy-download-link');
        const origText = btn.innerHTML;
        btn.innerText = 'Copied!';
        setTimeout(() => { btn.innerHTML = origText; }, 2000);
      }

      function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }

      function updateCountdown(expiresAtIso) {
        const expiresDate = new Date(expiresAtIso.endsWith('Z') ? expiresAtIso : expiresAtIso + 'Z');
        const now = new Date();
        const diffMs = expiresDate.getTime() - now.getTime();

        if (diffMs <= 0) {
          document.getElementById('detail-expires').innerText = 'Expired';
          return;
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('detail-expires').innerText = \`\${days} days \${hours} hours \${minutes} mins\`;
      }

      async function loadFileInfo() {
        try {
          const res = await fetch('/api/file/${shareCode}');
          const data = await res.json();

          document.getElementById('loading-spinner').style.display = 'none';

          if (!res.ok || data.error) {
            document.getElementById('error-title').innerText = 'File Unavailable';
            document.getElementById('error-desc').innerText = data.error || 'File not found or has been removed.';
            document.getElementById('error-card').style.display = 'block';
            return;
          }

          const file = data.file;
          document.getElementById('detail-filename').innerText = file.fileName;
          document.getElementById('detail-filesize').innerText = formatBytes(file.fileSize);
          document.getElementById('detail-mimetype').innerText = file.mimeType || 'application/octet-stream';
          document.getElementById('detail-createdat').innerText = new Date(file.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          document.getElementById('detail-downloads').innerText = \`\${file.downloadCount} times\`;

          const downloadUrl = data.presignedDownloadUrl || '/api/download/${shareCode}';
          const downloadBtn = document.getElementById('btn-download-file');
          downloadBtn.href = downloadUrl;

          // Render Instant Media Preview (Images & Videos)
          const mime = (file.mimeType || '').toLowerCase();
          const ext = (file.fileName || '').split('.').pop().toLowerCase();
          const mediaContainer = document.getElementById('media-preview-container');
          const mediaContent = document.getElementById('media-preview-content');

          if (mime.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) {
            mediaContent.innerHTML = '<img src="' + downloadUrl + '" alt="' + file.fileName + '" style="max-width: 100%; max-height: 420px; border-radius: var(--radius-md); object-fit: contain; box-shadow: var(--shadow-sm);" />';
            mediaContainer.style.display = 'block';
          } else if (mime.startsWith('video/') || ['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
            mediaContent.innerHTML = '<video controls src="' + downloadUrl + '" style="width: 100%; max-height: 420px; border-radius: var(--radius-md); background: #000; box-shadow: var(--shadow-sm);"></video>';
            mediaContainer.style.display = 'block';
          }

          updateCountdown(file.expiresAt);
          setInterval(() => updateCountdown(file.expiresAt), 60000);

          // Store window.currentFileName for native share
          window.currentFileName = file.fileName;

          // Render Live QR Code
          const encUrl = encodeURIComponent(window.location.href);
          const qrImg = document.getElementById('qr-code-img');
          qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encUrl + '&color=be185d&bgcolor=ffffff';

          document.getElementById('file-details').style.display = 'block';

        } catch (err) {
          document.getElementById('loading-spinner').style.display = 'none';
          document.getElementById('error-title').innerText = 'Network Error';
          document.getElementById('error-desc').innerText = 'Failed to connect to filedontol server.';
          document.getElementById('error-card').style.display = 'block';
        }
      }

      document.addEventListener('DOMContentLoaded', loadFileInfo);
    </script>
  `;

  return getLayoutHtml('Download File', content);
}

export function getDmcaPageHtml(): string {
  const content = `
    <div style="max-width: 820px; margin: 0 auto; background: #ffffff; border: 1px solid var(--pink-border); border-radius: var(--radius-xl); padding: clamp(1.75rem, 5vw, 3rem); box-shadow: var(--shadow-lg); line-height: 1.75;">
      <h1 style="font-size: 1.85rem; font-weight: 900; margin-bottom: 1rem; color: var(--text-main); border-bottom: 2px solid var(--pink-border); padding-bottom: 0.75rem;">
        DMCA & Copyright Policy
      </h1>

      <p style="margin-bottom: 1.25rem;">
        <strong>filedontol</strong> respects intellectual property and copyright laws. We respond promptly to valid Digital Millennium Copyright Act (DMCA) notices.
      </p>

      <!-- Direct Email Box -->
      <div style="background: var(--pink-soft); border: 1px solid var(--pink-border); border-radius: var(--radius-lg); padding: 1.75rem; margin: 1.75rem 0; text-align: center;">
        <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--pink-dark); margin-bottom: 0.25rem;">Official DMCA Takedown Contact</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1rem;">Send formal copyright infringement notices directly to:</p>
        <a href="mailto:filedontol@gmail.com?subject=DMCA%20Takedown%20Notice%20-%20filedontol" class="btn btn-pink" style="font-size: 1.05rem; padding: 0.8rem 2.25rem;">
          Email filedontol@gmail.com
        </a>
      </div>

      <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 1.75rem; margin-bottom: 0.5rem; color: var(--text-main);">
        1. Copyright Infringement Reporting
      </h3>
      <p style="margin-bottom: 1rem;">
        If you are a copyright holder or representative and believe content on <strong>filedontol</strong> infringes your rights, email us directly or check our report guidelines:
      </p>

      <div style="margin-bottom: 1.75rem;">
        <a href="/report" class="btn btn-outline" style="font-weight: 800; color: var(--rose-red); border-color: #fecdd3;">
          View Report Guidelines
        </a>
      </div>

      <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--text-main);">
        2. Takedown Notice Requirements
      </h3>
      <p style="margin-bottom: 0.75rem;">
        Your notice must include:
      </p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.75rem; color: var(--text-muted);">
        <li style="margin-bottom: 0.5rem;">Proof of legal ownership or authorization.</li>
        <li style="margin-bottom: 0.5rem;">Identification of copyrighted work.</li>
        <li style="margin-bottom: 0.5rem;">Direct URL(s) to the file on filedontol (e.g. <code>https://filedontol.com/f/xxxxxx</code>).</li>
        <li style="margin-bottom: 0.5rem;">Reporter contact details (Full name, organization, email).</li>
      </ul>

      <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--text-main);">
        3. Action Timeline
      </h3>
      <p style="margin-bottom: 1rem;">
        Valid notices are processed and infringing files permanently removed within <strong>24 hours maximum</strong>.
      </p>

      <div style="margin-top: 2.25rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
        <a href="/" class="btn btn-outline">← Back to Home</a>
      </div>
    </div>
  `;

  return getLayoutHtml('DMCA Policy', content);
}


export function getNotFoundPageHtml(): string {
  const content = `
    <div style="text-align: center; padding: 4rem 1.5rem; background: #ffffff; border: 1px solid var(--pink-border); border-radius: var(--radius-xl); max-width: 600px; margin: 2rem auto; box-shadow: var(--shadow-md);">
      <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--text-main);">404 - Page Not Found</h1>
      <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">The page you requested does not exist or has been moved.</p>
      <a href="/" class="btn btn-pink">Return to Home Page</a>
    </div>
  `;

  return getLayoutHtml('Page Not Found', content);
}
