import { getLayoutHtml } from './layout';

export function getIndexHtml(): string {
  const content = `
    <!-- Hero Section -->
    <div class="card" style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.025em;">
        Upload & Share Your Files
      </h1>
      <p style="color: var(--text-muted); font-size: clamp(1rem, 2vw, 1.15rem); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        Fast, secure, ad-free file sharing service supporting large uploads up to 5 GB.
      </p>

      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
        <span class="badge badge-indigo">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          File Size Up To 5 GB
        </span>
        <span class="badge badge-emerald">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Guest: Active 14 Days (+14d per download)
        </span>
        <span class="badge badge-purple">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          Member: Active 60 Days (+60d per download)
        </span>
      </div>

      <!-- Drag & Drop Upload Area -->
      <div id="drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: clamp(2rem, 5vw, 3.5rem) 1.5rem; background: #f8fafc; cursor: pointer; transition: all 0.2s ease; margin-bottom: 1.5rem;" onclick="document.getElementById('file-input').click()">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" style="margin: 0 auto 1rem auto; display: block;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">Drag & drop your file here, or click to browse</p>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.35rem;">Supports all file formats up to 5 GB</p>
        <input type="file" id="file-input" style="display: none;" onchange="handleFileSelect(event)" />
      </div>

      <!-- Progress Section -->
      <div id="upload-progress-container" style="display: none; text-align: left; background: #f1f5f9; padding: 1.25rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">
          <span id="progress-filename" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%;">File Name</span>
          <span id="progress-percent">0%</span>
        </div>
        <div style="width: 100%; background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div id="progress-bar" style="width: 0%; height: 100%; background: var(--primary-indigo); transition: width 0.1s linear;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;">
          <span id="progress-status">Uploading...</span>
          <span id="progress-size">0 / 0 MB</span>
        </div>
      </div>

      <!-- Result Link Section -->
      <div id="upload-result-container" style="display: none; text-align: left; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="color: #166534; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          File Uploaded Successfully!
        </h4>
        <p style="font-size: 0.9rem; color: #15803d; margin-bottom: 1rem;">Share the link below to let anyone download your file:</p>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <input type="text" id="share-link-input" readonly style="flex: 1; min-width: 240px; padding: 0.625rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.375rem; font-size: 0.95rem; background: #ffffff; color: var(--text-main);" />
          <button class="btn btn-primary" onclick="copyShareLink()" id="btn-copy">Copy Link</button>
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: #166534;" id="result-expiration-info"></div>
      </div>

      <div id="upload-error-container" style="display: none; text-align: left; background: #fef2f2; border: 1px solid #fecaca; padding: 1rem 1.25rem; border-radius: 0.5rem; color: #991b1b; font-size: 0.9rem; margin-top: 1rem;"></div>
    </div>

    <!-- Features Section -->
    <div style="margin-bottom: 3.5rem;">
      <h2 class="section-title">Why Choose filedontol?</h2>
      <p class="section-desc">Enjoy hassle-free, fast, and secure file sharing without limits.</p>

      <div class="grid-3">
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 class="feature-title">Cloudflare Network Speed</h3>
          <p class="feature-desc">Powered by Cloudflare R2 edge network for ultra-fast download and upload speeds anywhere worldwide.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h3 class="feature-title">Large Files Up To 5 GB</h3>
          <p class="feature-desc">Upload extra large documents, videos, ISOs, or project archives up to 5 GB completely free.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </div>
          <h3 class="feature-title">Auto Expiration Extension</h3>
          <p class="feature-desc">Every time someone downloads your file, its expiration is automatically extended (+14d Guest or +60d Member).</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="feature-title">DMCA & Abuse Protection</h3>
          <p class="feature-desc">Automated SHA-256 hash deduplication and instant blacklisting to safeguard copyright and platform security.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>
          </div>
          <h3 class="feature-title">Member File Dashboard</h3>
          <p class="feature-desc">Sign up for a free member account to manage files, rename uploads, track download statistics, and delete files anytime.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
          <h3 class="feature-title">Ad-Free Experience</h3>
          <p class="feature-desc">Clean, lightweight interface with no intrusive ads, pop-ups, captchas, or deceptive download triggers.</p>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div style="margin-bottom: 3.5rem; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem 1.5rem;">
      <h2 class="section-title">How It Works</h2>
      <p class="section-desc">3 simple steps to share files with anyone.</p>

      <div class="grid-3" style="margin-bottom: 0;">
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 48px; height: 48px; background: #e0e7ff; color: var(--primary-indigo); font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.25rem;">1</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Upload File</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Select any file up to 5 GB from your phone or computer.</p>
        </div>
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 48px; height: 48px; background: #e0e7ff; color: var(--primary-indigo); font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.25rem;">2</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Get Share Link</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Our platform generates a unique, secure shareable URL instantly.</p>
        </div>
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 48px; height: 48px; background: #e0e7ff; color: var(--primary-indigo); font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.25rem;">3</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Share & Download</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Recipients can download immediately with high speed and zero waiting time.</p>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div id="faq" style="margin-bottom: 3rem;">
      <h2 class="section-title">Frequently Asked Questions (FAQ)</h2>
      <p class="section-desc">Answers to common questions about filedontol.</p>

      <div class="faq-container">
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How long will my files be stored?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Guest uploads stay active for 14 days. Uploads by registered Members remain active for 60 days. Uniquely, every time someone downloads your file, its expiration date extends automatically (+14d for Guest or +60d for Member) from the last download date!
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>What is the maximum supported file size?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            filedontol supports files up to 5 GB (5,368,709,120 bytes) per upload completely for free.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Why should I register a Member account?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Member registration is 100% free. Members enjoy a longer default file retention period (60 days) and access to the Dashboard to track file downloads, rename files, and delete files anytime.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>What file formats are supported?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            We support virtually all common file formats, including documents (PDF, DOCX, XLSX), archives (ZIP, RAR, 7Z), media (PNG, JPG, MP4, MKV, MP3), and more, provided they comply with copyright and safety policies.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>How do I report copyright violations or illegal content?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            We maintain zero tolerance for illegal content (CSAM, malware, violence, copyright infringement). Visit our <a href="/report">Report Abuse Page</a> to contact us directly via email. Valid takedown notices are processed within 24 hours.
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
          dropZone.style.background = '#e0e7ff';
          dropZone.style.borderColor = 'var(--primary-indigo)';
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.style.background = '#f8fafc';
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
        document.getElementById('progress-status').innerText = 'Computing file hash...';
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

          document.getElementById('progress-status').innerText = 'Uploading file to R2 storage...';

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
                reject(new Error('Failed to upload file to storage: ' + xhr.statusText));
              }
            };

            xhr.onerror = () => reject(new Error('Network error during upload.'));
            xhr.send(file);
          });

          document.getElementById('progress-status').innerText = 'Finalizing metadata...';

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
            errorContainer.innerText = completeData.error || 'Failed to save file metadata.';
            errorContainer.style.display = 'block';
            return;
          }

          progressContainer.style.display = 'none';

          const shareUrl = \`\${window.location.origin}/f/\${completeData.shareCode}\`;
          document.getElementById('share-link-input').value = shareUrl;

          const expDays = completeData.file.isMember ? '60 days' : '14 days';
          document.getElementById('result-expiration-info').innerText = \`* File is active for \${expDays}. Each download extends expiration automatically.\`;

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
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800;">Member Cloud Dashboard</h1>
          <p style="color: var(--text-muted); font-size: 0.925rem;">Manage, rename, share, and track all your uploaded files.</p>
        </div>
        <button class="btn btn-primary" onclick="toggleDashboardUploadSection()" id="btn-toggle-dash-upload">
          Upload New File To Dashboard
        </button>
      </div>

      <!-- Integrated Dashboard Drag & Drop Upload Zone -->
      <div id="dashboard-upload-box" style="display: block; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: var(--radius-md); padding: 2rem 1.5rem; text-align: center; margin-bottom: 2rem;">
        <div onclick="document.getElementById('dash-file-input').click()" style="cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" fill="none" viewBox="0 0 24 24" stroke="var(--primary-indigo)" style="margin: 0 auto 0.75rem auto; display: block;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <p style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">Drag & drop file here or click to upload to your account</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Limit up to 5 GB • Auto-active for 60 days</p>
          <input type="file" id="dash-file-input" style="display: none;" onchange="handleDashFileSelect(event)" />
        </div>

        <!-- Upload Progress Section -->
        <div id="dash-progress-container" style="display: none; text-align: left; background: #ffffff; border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm); margin-top: 1rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.35rem;">
            <span id="dash-progress-filename">File Name</span>
            <span id="dash-progress-percent">0%</span>
          </div>
          <div style="width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="dash-progress-bar" style="width: 0%; height: 100%; background: var(--primary-indigo); transition: width 0.1s linear;"></div>
          </div>
          <p id="dash-progress-status" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;">Uploading...</p>
        </div>
      </div>

      <!-- Stats Summary Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
          <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">TOTAL FILES</p>
          <p id="stat-total-files" style="font-size: 1.5rem; font-weight: 800; margin-top: 0.25rem;">-</p>
        </div>
        <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
          <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">STORAGE USED</p>
          <p id="stat-total-storage" style="font-size: 1.5rem; font-weight: 800; margin-top: 0.25rem;">-</p>
        </div>
        <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
          <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">TOTAL DOWNLOADS</p>
          <p id="stat-total-downloads" style="font-size: 1.5rem; font-weight: 800; color: var(--primary-indigo); margin-top: 0.25rem;">-</p>
        </div>
      </div>

      <!-- Search / Filter Bar -->
      <div style="margin-bottom: 1.5rem;">
        <input type="text" id="search-files-input" placeholder="Filter files by name..." oninput="filterFiles()" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.95rem;" />
      </div>

      <!-- Loading State -->
      <div id="loading-dashboard" style="padding: 2rem; text-align: center; color: var(--text-muted);">
        Loading file list...
      </div>

      <div id="dashboard-empty" style="display: none; text-align: center; padding: 3rem 1rem; border: 2px dashed var(--border-color); border-radius: var(--radius-md);">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">No files uploaded yet</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Use the upload box above to add your first file.</p>
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
          document.getElementById('dash-progress-status').innerText = 'Requesting upload ticket...';

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
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--primary-indigo)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                \${file.file_name}
              </a>
            </td>
            <td style="white-space: nowrap; color: var(--text-muted);">\${formatBytes(file.file_size)}</td>
            <td style="white-space: nowrap; font-weight: 700; color: var(--primary-indigo);">\${file.download_count}</td>
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
        <p style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-indigo); margin-bottom: 0.5rem;">OFFICIAL TAKEDOWN & ABUSE CONTACT EMAIL</p>
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
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--primary-indigo)">
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

        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--rose-red)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Commitment & Takedown Response Time:
        </h3>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">
          Platform <strong>filedontol</strong> maintains Zero Tolerance against illegal materials (CSAM, malware, terrorism). Valid reports will result in permanent removal and SHA-256 blacklisting within <strong>24 hours maximum</strong>.
        </p>

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
        <div style="width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: var(--primary-indigo); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem auto;"></div>
        Loading file information...
      </div>

      <div id="file-details" style="display: none;">
        <!-- Header File Card -->
        <div style="background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(99, 102, 241, 0.05)); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem; text-align: left;">
          <div style="background: linear-gradient(135deg, var(--primary-indigo), #6366f1); color: white; width: 64px; height: 64px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div style="flex: 1; overflow: hidden;">
            <h2 id="detail-filename" style="font-size: clamp(1.15rem, 2.5vw, 1.4rem); font-weight: 800; word-break: break-all; margin-bottom: 0.35rem; color: var(--text-main); letter-spacing: -0.02em;">-</h2>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <span id="detail-filesize" style="font-size: 0.925rem; color: var(--primary-indigo); font-weight: 800; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); border: 1px solid #bfdbfe;">-</span>
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
            <p id="detail-downloads" style="font-size: 1rem; font-weight: 800; margin-top: 0.35rem; color: var(--primary-indigo);">-</p>
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
