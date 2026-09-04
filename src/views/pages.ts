import { getLayoutHtml } from './layout';

export function getIndexHtml(): string {
  const content = `
    <!-- Bento Hero Grid -->
    <div class="bento-grid">
      <!-- Main Upload Bento Box (Span 8) -->
      <div class="bento-card bento-col-8">
        <div style="text-align: left; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="badge badge-blue">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Cloudflare R2 Edge Storage
            </span>
            <span class="badge badge-emerald">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              5 GB Max Limit
            </span>
          </div>
          <h1 style="font-size: clamp(1.6rem, 3.5vw, 2.25rem); font-weight: 800; letter-spacing: -0.03em; color: var(--text-main); margin-bottom: 0.5rem;">
            Instant File Upload & Sharing
          </h1>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
            Fast, secure, and ad-free cloud file host. Upload files up to 5 GB with zero bandwidth throttle.
          </p>
        </div>

        <!-- Interactive Drag & Drop Area -->
        <div id="drop-zone" class="dropzone-bento" onclick="document.getElementById('file-input').click()">
          <div style="width: 56px; height: 56px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem auto; color: var(--primary-blue);">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <p style="font-size: 1.05rem; font-weight: 800; color: var(--text-main);">Drop your files here, or browse</p>
          <p style="font-size: 0.825rem; color: var(--text-muted); margin-top: 0.35rem;">Supports all file formats (Documents, Media, Archives, Code) up to 5 GB</p>
          <input type="file" id="file-input" style="display: none;" onchange="handleFileSelect(event)" />
        </div>

        <!-- Progress Indicator -->
        <div id="upload-progress-container" style="display: none; text-align: left; background: #f8fafc; border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem;">
            <span id="progress-filename" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%;">File Name</span>
            <span id="progress-percent" style="color: var(--primary-blue);">0%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
            <div id="progress-bar" style="width: 0%; height: 100%; background: var(--primary-blue); transition: width 0.1s linear;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
            <span id="progress-status">Uploading...</span>
            <span id="progress-size">0 / 0 MB</span>
          </div>
        </div>

        <!-- Result Link Container -->
        <div id="upload-result-container" style="display: none; text-align: left; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.25rem;">
          <h4 style="color: #047857; font-size: 1.05rem; font-weight: 800; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            File Uploaded Successfully!
          </h4>
          <p style="font-size: 0.875rem; color: #065f46; margin-bottom: 1rem;">Share the link below to let anyone download your file:</p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <input type="text" id="share-link-input" readonly style="flex: 1; min-width: 220px; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: var(--radius-sm); font-size: 0.9rem; background: #ffffff; color: var(--text-main); font-weight: 600;" />
            <button class="btn btn-primary" onclick="copyShareLink()" id="btn-copy">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              Copy Link
            </button>
          </div>
          <div style="margin-top: 0.85rem; font-size: 0.8rem; color: #047857; font-weight: 600;" id="result-expiration-info"></div>
        </div>

        <div id="upload-error-container" style="display: none; text-align: left; background: #fef2f2; border: 1px solid #fecaca; padding: 0.85rem; border-radius: var(--radius-md); color: #991b1b; font-size: 0.85rem; margin-top: 1rem;"></div>
      </div>

      <!-- Retention Rules Bento Box (Span 4) -->
      <div class="bento-card bento-col-4" style="background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <div style="width: 36px; height: 36px; background: #e0e7ff; color: var(--primary-indigo); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">Smart Retention</h3>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.5;">
            Files extend their active lifespan automatically every time they are downloaded!
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;">
            <div style="background: #ffffff; border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md);">
              <div style="font-weight: 800; font-size: 0.85rem; color: #047857; margin-bottom: 0.2rem;">Guest Uploads</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Active for 14 days • Extended +14 days per download</div>
            </div>
            <div style="background: #ffffff; border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md);">
              <div style="font-weight: 800; font-size: 0.85rem; color: #6b21a8; margin-bottom: 0.2rem;">Member Account</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Active for 60 days • Extended +60 days per download</div>
            </div>
          </div>
        </div>

        <button class="btn btn-outline" onclick="openAuthModal('register')" style="width: 100%;">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          Create Free Member Account
        </button>
      </div>
    </div>

    <!-- Features Bento Grid -->
    <div style="margin-bottom: 3rem;">
      <h2 style="font-size: 1.5rem; font-weight: 800; text-align: center; margin-bottom: 0.5rem;">Built For High-Performance Sharing</h2>
      <p style="text-align: center; color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem;">Everything you need to share files securely without intrusive ads or captchas.</p>

      <div class="bento-grid" style="margin-bottom: 0;">
        <div class="bento-card bento-col-4">
          <div class="feature-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 class="feature-title">Cloudflare R2 Edge</h3>
          <p class="feature-desc">Global S3-compatible object storage with high-speed CDN delivery worldwide.</p>
        </div>

        <div class="bento-card bento-col-4">
          <div class="feature-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h3 class="feature-title">5 GB File Capacity</h3>
          <p class="feature-desc">Upload large datasets, media archives, and installer builds effortlessly.</p>
        </div>

        <div class="bento-card bento-col-4">
          <div class="feature-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="feature-title">Anti-Hotlink Downloads</h3>
          <p class="feature-desc">Short-lived presigned GET URLs and HMAC tickets prevent unauthorized direct hotlinking.</p>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div id="faq" style="margin-bottom: 3rem;">
      <h2 style="font-size: 1.5rem; font-weight: 800; text-align: center; margin-bottom: 0.5rem;">Frequently Asked Questions</h2>
      <p style="text-align: center; color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem;">Answers to common questions about filedontol.</p>

      <div class="faq-container">
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How long do uploaded files stay active?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Guest uploads stay active for 14 days. Registered Member uploads stay active for 60 days. Uniquely, every time a file is downloaded, its expiration automatically resets (+14 days for Guest / +60 days for Member) from that download date!
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Is registration required to upload files?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            No! You can drag and drop files immediately as a Guest. Creating a free account gives you a 60-day default retention period and access to your personal file management dashboard.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How do I report illegal or copyrighted content?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Visit our <a href="/report" style="color: var(--primary-blue); font-weight: 700;">Report Abuse Page</a> to email us directly at <code>filedontol@gmail.com</code>. DMCA notices are processed within 24 hours.
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
          dropZone.style.background = '#eff6ff';
          dropZone.style.borderColor = 'var(--primary-blue)';
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.style.background = 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)';
          dropZone.style.borderColor = '#cbd5e1';
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
        document.getElementById('progress-status').innerText = 'Computing SHA-256 hash...';
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

          document.getElementById('progress-status').innerText = 'Uploading directly to R2 edge storage...';

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
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
              } else {
                reject(new Error('Failed to upload file to storage.'));
              }
            };

            xhr.onerror = () => reject(new Error('Network error during file upload.'));
            xhr.send(file);
          });

          document.getElementById('progress-status').innerText = 'Finalizing file record...';

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

          const shareUrl = \`\${window.location.origin}/f/\${completeData.shareCode}\`;
          document.getElementById('share-link-input').value = shareUrl;

          const expDays = completeData.file.isMember ? '60 days' : '14 days';
          document.getElementById('result-expiration-info').innerText = \`* File is active for \${expDays}. Downloads automatically extend retention.\`;

          resultContainer.style.display = 'block';
          showToast('File uploaded successfully!');

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
    <!-- Bento Dashboard Grid -->
    <div class="bento-grid">
      <!-- Welcome Header Card (Span 8) -->
      <div class="bento-card bento-col-8">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem;">Member Cloud Dashboard</h1>
            <p style="color: var(--text-muted); font-size: 0.875rem;">Manage, share, rename, and track all your uploaded files.</p>
          </div>
          <button class="btn btn-primary" onclick="toggleDashboardUploadSection()" id="btn-toggle-dash-upload">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Upload File
          </button>
        </div>

        <!-- Integrated Upload Box -->
        <div id="dashboard-upload-box" style="display: block; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: var(--radius-md); padding: 1.5rem; text-align: center; margin-top: 1.5rem;">
          <div onclick="document.getElementById('dash-file-input').click()" style="cursor: pointer;">
            <div style="width: 44px; height: 48px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem auto; color: var(--primary-blue);">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <p style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">Click or drop files to upload to your account</p>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Max 5 GB per file • Auto-retention 60 days</p>
            <input type="file" id="dash-file-input" style="display: none;" onchange="handleDashFileSelect(event)" />
          </div>

          <div id="dash-progress-container" style="display: none; text-align: left; background: #ffffff; border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-sm); margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">
              <span id="dash-progress-filename">File Name</span>
              <span id="dash-progress-percent" style="color: var(--primary-blue);">0%</span>
            </div>
            <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; margin-bottom: 0.35rem;">
              <div id="dash-progress-bar" style="width: 0%; height: 100%; background: var(--primary-blue); transition: width 0.1s linear;"></div>
            </div>
            <p id="dash-progress-status" style="font-size: 0.775rem; color: var(--text-muted);">Uploading...</p>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Bento Box (Span 4) -->
      <div class="bento-card bento-col-4" style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
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
          <span id="stat-total-downloads" class="stat-value" style="color: var(--primary-blue);">-</span>
        </div>
      </div>
    </div>

    <!-- Main File Management Table Bento Card -->
    <div class="bento-card bento-col-12" style="margin-bottom: 2.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">My Uploaded Files</h2>
        <input type="text" id="search-files-input" placeholder="Filter files by name..." oninput="filterFiles()" style="width: 100%; max-width: 280px; padding: 0.55rem 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.875rem; background: #ffffff;" />
      </div>

      <div id="loading-dashboard" style="padding: 2rem; text-align: center; color: var(--text-muted);">
        Loading file list...
      </div>

      <div id="dashboard-empty" style="display: none; text-align: center; padding: 3rem 1rem; border: 2px dashed var(--border-color); border-radius: var(--radius-md);">
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">No files uploaded yet</h3>
        <p style="color: var(--text-muted); font-size: 0.875rem;">Use the upload box above to add your first file.</p>
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h3 class="modal-title">Rename File</h3>
          <button onclick="closeRenameModal()" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted);">&times;</button>
        </div>
        <form onsubmit="handleRenameSubmit(event)">
          <input type="hidden" id="rename-file-id" />
          <div class="form-group">
            <label for="rename-file-input">New File Name</label>
            <input type="text" id="rename-file-input" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Save Changes</button>
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
        document.getElementById('dash-progress-status').innerText = 'Computing file hash...';

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

          document.getElementById('dash-progress-status').innerText = 'Uploading file...';

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

          document.getElementById('dash-progress-status').innerText = 'Finalizing metadata...';

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
            <td style="font-weight: 600; word-break: break-all;">
              <a href="/f/\${file.share_code}" target="_blank" style="color: var(--text-main); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--primary-blue)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                \${file.file_name}
              </a>
            </td>
            <td style="white-space: nowrap; color: var(--text-muted);">\${formatBytes(file.file_size)}</td>
            <td style="white-space: nowrap; font-weight: 700; color: var(--primary-blue);">\${file.download_count}</td>
            <td style="white-space: nowrap; font-size: 0.85rem; color: #d97706; font-weight: 600;">\${calculateRemainingTime(file.expires_at)}</td>
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

  return getLayoutHtml('File Management Dashboard', content);
}

export function getReportPageHtml(): string {
  const content = `
    <div class="card" style="max-width: 780px; margin: 0 auto; border-radius: var(--radius-lg); padding: clamp(1.5rem, 5vw, 3rem);">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="width: 64px; height: 64px; background: rgba(225, 29, 72, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: var(--rose-red);">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 style="font-size: clamp(1.5rem, 3.5vw, 2.25rem); font-weight: 800; color: var(--text-main); letter-spacing: -0.025em;">
          Report Abuse & DMCA Violations
        </h1>
        <p style="color: var(--text-muted); font-size: 1rem; margin-top: 0.5rem; max-width: 580px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          We do not host input forms on this page. All complaints regarding Copyright / DMCA violations, CSAM, violence, malware, and abuse are sent <strong>DIRECTLY VIA EMAIL</strong> to administrators.
        </p>
      </div>

      <!-- Main Direct Email Box -->
      <div style="background: linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(225, 29, 72, 0.06)); border: 2px solid rgba(37, 99, 235, 0.2); border-radius: var(--radius-md); padding: 2rem; text-align: center; margin-bottom: 2.5rem;">
        <p style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-blue); margin-bottom: 0.5rem;">OFFICIAL TAKEDOWN CONTACT EMAIL</p>
        <div style="font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 900; color: var(--text-main); margin-bottom: 1.25rem; font-family: monospace; letter-spacing: -0.02em;">
          filedontol@gmail.com
        </div>
        <a href="mailto:filedontol@gmail.com?subject=Abuse%20%2F%20DMCA%20Takedown%20Report%20-%20filedontol&body=Hello%20filedontol%20Team%2C%0A%0AI%20would%20like%20to%20report%20a%20file%20violation%20with%20the%20following%20details%3A%0A%E2%80%A2%20File%20Link%20%2F%20Share%20Code%3A%20%0A%E2%80%A2%20Violation%20Type%3A%20(DMCA%20%2F%20CSAM%20%2F%20Violence%20%2F%20Malware)%0A%E2%80%A2%20Proof%20of%20Ownership%20%2F%20Details%3A%20%0A%0APlease%20process%20this%20takedown.%20Thank%20you." class="btn btn-primary" style="padding: 0.85rem 2rem; font-size: 1rem; border-radius: var(--radius-md); gap: 0.75rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Email Complaint
        </a>
      </div>

      <!-- Guidelines -->
      <div style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem;">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--primary-blue)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Required Email Format Information:
        </h3>
        <p style="margin-bottom: 1rem; color: var(--text-muted);">
          To ensure your report is handled immediately, please include the following details in your email:
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 2rem; color: var(--text-muted);">
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">File Link / URL:</strong> Specify the exact URL (e.g. <code>https://filedontol.com/f/xxxxxx</code>) or share code.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Violation Type:</strong> State whether the report concerns Copyright/DMCA, CSAM, Violent Extremism, Malware, or Scam.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Proof of Rights (DMCA):</strong> Attach copyright registration, power of attorney, or ownership certificate.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Reporter Identity:</strong> Full name, organization, and contact details.</li>
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
    <div class="card" style="max-width: 780px; margin: 0 auto; border-radius: var(--radius-lg); padding: clamp(1.5rem, 5vw, 3rem);" id="download-card">
      <div id="loading-spinner" style="padding: 3rem; text-align: center; color: var(--text-muted);">
        <div style="width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: var(--primary-blue); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem auto;"></div>
        Loading file information...
      </div>

      <div id="file-details" style="display: none;">
        <!-- Header File Card -->
        <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem; text-align: left;">
          <div style="background: linear-gradient(135deg, var(--primary-blue), #3b82f6); color: white; width: 64px; height: 64px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div style="flex: 1; overflow: hidden;">
            <h2 id="detail-filename" style="font-size: clamp(1.15rem, 2.5vw, 1.4rem); font-weight: 800; word-break: break-all; margin-bottom: 0.35rem; color: var(--text-main); letter-spacing: -0.02em;">-</h2>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <span id="detail-filesize" style="font-size: 0.925rem; color: var(--primary-blue); font-weight: 800; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); border: 1px solid #bfdbfe;">-</span>
              <span id="detail-mimetype" style="font-size: 0.825rem; color: var(--text-muted); font-weight: 600;">-</span>
            </div>
          </div>
        </div>

        <!-- Metadata Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; text-align: left;">
          <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.04em;">UPLOAD DATE</p>
            <p id="detail-createdat" style="font-size: 1rem; font-weight: 800; margin-top: 0.35rem; color: var(--text-main);">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.04em;">TOTAL DOWNLOADS</p>
            <p id="detail-downloads" style="font-size: 1rem; font-weight: 800; margin-top: 0.35rem; color: var(--primary-blue);">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.04em;">TIME REMAINING</p>
            <p id="detail-expires" style="font-size: 1rem; font-weight: 800; color: #d97706; margin-top: 0.35rem;">-</p>
          </div>
        </div>

        <!-- Download Action CTA -->
        <a id="btn-download-file" href="#" class="btn btn-primary" style="font-size: 1.15rem; padding: 1rem 2.5rem; width: 100%; text-decoration: none; border-radius: var(--radius-md); gap: 0.75rem;">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download File Now
        </a>

        <!-- Footer Notice -->
        <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--emerald-green)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Downloading extends file retention automatically (+14d / +60d).
          </span>
          <a href="/report" style="color: var(--rose-red); font-size: 0.85rem; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Report Violation
          </a>
        </div>
      </div>

      <!-- Error State -->
      <div id="error-card" style="display: none; padding: 3rem 1rem; text-align: center;">
        <div style="width: 64px; height: 64px; background: #fef2f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: var(--rose-red);">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 id="error-title" style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">File Unavailable</h3>
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

          const downloadBtn = document.getElementById('btn-download-file');
          if (data.presignedDownloadUrl) {
            downloadBtn.href = data.presignedDownloadUrl;
          } else {
            downloadBtn.href = '/api/download/${shareCode}';
          }

          updateCountdown(file.expiresAt);
          setInterval(() => updateCountdown(file.expiresAt), 60000);

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
    <div class="card" style="line-height: 1.7; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem;">
        DMCA & Copyright Policy
      </h1>

      <p style="margin-bottom: 1.25rem;">
        <strong>filedontol</strong> respects the intellectual property rights and copyrights of all digital content owners. We comply strictly with the Digital Millennium Copyright Act (DMCA) and applicable copyright laws.
      </p>

      <!-- Direct Email Box -->
      <div style="background: linear-gradient(135deg, #e0e7ff, #ede9fe); border: 1px solid #c7d2fe; border-radius: var(--radius-md); padding: 1.5rem; margin: 1.5rem 0; text-align: center;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #3730a3; margin-bottom: 0.25rem;">Official DMCA & Takedown Email Contact</h3>
        <p style="font-size: 0.95rem; color: #4338ca; margin-bottom: 1rem;">Send formal copyright infringement notices directly to:</p>
        <a href="mailto:filedontol@gmail.com?subject=DMCA%20Takedown%20Notice%20-%20filedontol" class="btn btn-primary" style="font-size: 1.05rem; padding: 0.75rem 2rem;">
          Send Email to filedontol@gmail.com
        </a>
      </div>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        1. Copyright Infringement Reporting Procedure
      </h3>
      <p style="margin-bottom: 1rem;">
        If you are a copyright owner or authorized agent and believe that content hosted on <strong>filedontol</strong> infringes upon your copyright, please send a formal email notification to the contact email above or visit our report page:
      </p>

      <div style="margin-bottom: 1.5rem;">
        <a href="/report" class="btn btn-outline" style="font-weight: 700; color: var(--rose-red); border-color: var(--rose-red);">
          Open Abuse Report Guidelines
        </a>
      </div>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        2. Required Information for Valid Takedown Notices
      </h3>
      <p style="margin-bottom: 0.75rem;">
        To ensure prompt action, your notice <strong>MUST</strong> include the following information:
      </p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li style="margin-bottom: 0.5rem;">Proof of ownership or legal authorization from the copyright holder.</li>
        <li style="margin-bottom: 0.5rem;">Identification of the copyrighted work claimed to have been infringed.</li>
        <li style="margin-bottom: 0.5rem;">Direct URL(s) to the specific file on filedontol (e.g., <code>https://filedontol.com/f/xxxxxx</code>).</li>
        <li style="margin-bottom: 0.5rem;">Contact information of the reporter (Full name, organization, phone number, and email).</li>
        <li style="margin-bottom: 0.5rem;">A good-faith statement that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
      </ul>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        3. Takedown Response Timeline
      </h3>
      <p style="margin-bottom: 1rem;">
        All valid formal notices fulfilling the requirements above will be acted upon, and offending files will be permanently removed and blacklisted within <strong>24 hours maximum</strong> upon email receipt.
      </p>

      <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <a href="/" class="btn btn-outline">← Back to Home</a>
      </div>
    </div>
  `;

  return getLayoutHtml('DMCA Policy', content);
}

export function getNotFoundPageHtml(): string {
  const content = `
    <div class="card" style="text-align: center; padding: 4rem 1.5rem;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">Page Not Found (404)</h1>
      <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a href="/" class="btn btn-primary">Back to Home</a>
    </div>
  `;

  return getLayoutHtml('Page Not Found', content);
}
