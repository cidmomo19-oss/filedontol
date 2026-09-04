import { getLayoutHtml } from './layout';

export function getIndexHtml(): string {
  const content = `
    <!-- Hero Section -->
    <div class="card" style="text-align: center; margin-bottom: 3.5rem;">
      <div class="card-glow"></div>

      <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 1rem; border-radius: 9999px; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); font-size: 0.85rem; font-weight: 700; color: #a5b4fc; margin-bottom: 1.5rem;">
        <span>🚀 Cloudflare R2 Powered</span>
        <span style="opacity: 0.4;">•</span>
        <span>Maksimal 5 GB</span>
      </div>

      <h1 style="font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.03em; line-height: 1.15;">
        Bagikan File Apapun <br />
        <span class="gradient-text">Kilat, Safe & Tanpa Ribet</span>
      </h1>

      <p style="color: var(--text-muted); font-size: clamp(1rem, 2.2vw, 1.2rem); margin-bottom: 2rem; max-width: 640px; margin-left: auto; margin-right: auto; line-height: 1.6;">
        Upload file super cepat tanpa iklan mengganggu, tanpa captcha, dan otomatis aktif lebih lama setiap kali diunduh.
      </p>

      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.625rem; margin-bottom: 2.5rem;">
        <span class="badge badge-indigo">⚡ S3 Speed CDN</span>
        <span class="badge badge-emerald">Guest: Active 14 Days (+14d/download)</span>
        <span class="badge badge-purple">Member: Active 60 Days (+60d/download)</span>
      </div>

      <!-- Drag & Drop Upload Area -->
      <div id="drop-zone" class="drop-zone" onclick="document.getElementById('file-input').click()">
        <div class="upload-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <p style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
          Tarik & Lepas File di Sini
        </p>
        <p style="font-size: 0.9rem; color: var(--text-muted);">
          atau <span style="color: #818cf8; font-weight: 700; text-decoration: underline; text-underline-offset: 4px;">klik untuk pilih file</span> (Hingga 5 GB)
        </p>
        <input type="file" id="file-input" style="display: none;" onchange="handleFileSelect(event)" />
      </div>

      <!-- Progress Section -->
      <div id="upload-progress-container" style="display: none; text-align: left; background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-lg); margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.925rem; font-weight: 700; margin-bottom: 0.75rem;">
          <span id="progress-filename" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%; color: var(--text-main);">Nama File</span>
          <span id="progress-percent" style="color: #a5b4fc;" class="font-mono">0%</span>
        </div>
        <div style="width: 100%; background: rgba(255, 255, 255, 0.08); height: 10px; border-radius: 5px; overflow: hidden; margin-bottom: 0.75rem;">
          <div id="progress-bar" style="width: 0%; height: 100%; background: var(--gradient-primary); transition: width 0.15s linear;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted);">
          <span id="progress-status">Mengunggah...</span>
          <span id="progress-size" class="font-mono">0 / 0 MB</span>
        </div>
      </div>

      <!-- Result Link Section -->
      <div id="upload-result-container" style="display: none; text-align: left; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); padding: 1.75rem; border-radius: var(--radius-lg); margin-top: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); color: #34d399; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;">✓</div>
          <div>
            <h4 style="color: #34d399; font-size: 1.15rem; font-weight: 800;">File Berhasil Diunggah!</h4>
            <p style="font-size: 0.875rem; color: var(--text-muted);">Tautan siap dibagikan ke siapa saja.</p>
          </div>
        </div>

        <div style="display: flex; gap: 0.625rem; flex-wrap: wrap; margin-top: 1.25rem;">
          <input type="text" id="share-link-input" readonly class="font-mono" style="flex: 1; min-width: 240px; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.925rem; background: rgba(11, 15, 25, 0.8); color: var(--text-main);" />
          <button class="btn btn-primary" onclick="copyShareLink()" id="btn-copy">Salin Tautan</button>
        </div>
        <p style="margin-top: 1rem; font-size: 0.85rem; color: #6ee7b7;" id="result-expiration-info"></p>
      </div>

      <div id="upload-error-container" style="display: none; text-align: left; background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); padding: 1.25rem; border-radius: var(--radius-lg); color: #fda4af; font-size: 0.925rem; margin-top: 1.5rem;"></div>
    </div>

    <!-- Section 1: Features -->
    <div style="margin-bottom: 4rem;">
      <h2 class="section-title">Kenapa Gen Z Suka <span class="gradient-text">filedontol</span>?</h2>
      <p class="section-desc">Fitur modern yang bikin urusan kirim file tanpa hambatan.</p>

      <div class="grid-3">
        <div class="feature-box">
          <div class="feature-icon">🚀</div>
          <h3 class="feature-title">Performa R2 CDN Global</h3>
          <p class="feature-desc">Storage direct upload & download memanfaatkan jaringan tepi Cloudflare untuk latensi terendah.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">📦</div>
          <h3 class="feature-title">Jumbo Files Up To 5 GB</h3>
          <p class="feature-desc">Kirim video high-res, dataset, game mod, atau arsip zip berukuran raksasa tanpa potongan.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">🔄</div>
          <h3 class="feature-title">Masa Aktif Auto Extended</h3>
          <p class="feature-desc">Tiap ada yang download, timer masa simpan bertambah +14 hari (Guest) atau +60 hari (Member) secara otomatis!</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">🛡️</span></div>
          <h3 class="feature-title">Perlindungan DMCA & Hash</h3>
          <p class="feature-desc">Sistem deteksi SHA-256 instan memblokir konten terlarang dan menjaga keamanan jaringan.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">📊</div>
          <h3 class="feature-title">Dashboard Analitik Rapi</h3>
          <p class="feature-desc">Daftar member gratis untuk memantau total download, tanggal kadaluarsa, dan kontrol hapus file.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">✨</div>
          <h3 class="feature-title">Zero Ads & Pop-ups</h3>
          <p class="feature-desc">Tanpa iklan jebakan, tanpa countdown buatan, dan tanpa spam redirect yang mengganggu.</p>
        </div>
      </div>
    </div>

    <!-- Section 2: How It Works -->
    <div style="margin-bottom: 4rem; background: rgba(17, 24, 39, 0.5); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 3rem 2rem;">
      <h2 class="section-title">Cara Kerja 3 Langkah</h2>
      <p class="section-desc">Gak pakai ribet, langsung sat-set.</p>

      <div class="grid-3" style="margin-bottom: 0;">
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 52px; height: 52px; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; font-weight: 800; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; font-size: 1.35rem; border: 1px solid rgba(99, 102, 241, 0.3);">1</div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Pilih File</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Drop file dari laptop atau HP kamu hingga kapasitas 5 GB.</p>
        </div>
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 52px; height: 52px; background: rgba(168, 85, 247, 0.15); color: #d8b4fe; font-weight: 800; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; font-size: 1.35rem; border: 1px solid rgba(168, 85, 247, 0.3);">2</div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Dapat Tautan</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Sistem membuat short-link unik yang cepat dan aman.</p>
        </div>
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 52px; height: 52px; background: rgba(6, 182, 212, 0.15); color: #67e8f9; font-weight: 800; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; font-size: 1.35rem; border: 1px solid rgba(6, 182, 212, 0.3);">3</div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Share & Unduh</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Teman kamu tinggal klik & download tanpa iklan bertumpuk.</p>
        </div>
      </div>
    </div>

    <!-- Section 3: FAQ -->
    <div id="faq" style="margin-bottom: 3.5rem;">
      <h2 class="section-title">Pertanyaan Umum (FAQ)</h2>
      <p class="section-desc">Segala informasi penting yang ingin kamu ketahui.</p>

      <div class="faq-container">
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Berapa lama file saya akan bertahan di server?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Guest upload (tanpa akun) aktif selama 14 hari. Upload dari Member terdaftar aktif selama 60 hari. Setiap ada orang yang mengunduh file kamu, timer akan di-reset dan diperpanjang otomatis +14 hari (Guest) atau +60 hari (Member)!
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Berapa batas ukuran file terbesar yang bisa diunggah?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            filedontol mendukung ukuran file hingga 5 GB (5.368.709.120 bytes) per file secara 100% gratis.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Apa keuntungan mendaftar sebagai Member?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Pendaftaran member gratis dan hanya butuh email. Kamu mendapatkan masa simpan awal lebih panjang (60 hari) dan akses ke Dashboard pribadi untuk memantau jumlah unduhan serta menghapus file kapan pun dibutuhkan.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Format file apa saja yang bisa diunggah?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Seluruh tipe file seperti dokumen (PDF, DOCX), arsip (ZIP, RAR, 7Z), media (MP4, MKV, MP3, PNG, JPG), hingga file installer software didukung selama tidak melanggar ketentuan DMCA atau hukum yang berlaku.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Bagaimana prosedur takedown pelanggaran DMCA?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Pemilik hak cipta sah dapat mengirimkan surel ke <code>filedontol@gmail.com</code> dengan melampirkan URL file dan bukti kepemilikan. Laporan valid diproses dan ditindaklanjuti dalam kurun waktu 1x24 jam.
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
          errorContainer.innerText = 'Batas maksimal ukuran file adalah 5 GB.';
          errorContainer.style.display = 'block';
          return;
        }

        progressContainer.style.display = 'block';
        document.getElementById('progress-filename').innerText = file.name;
        document.getElementById('progress-bar').style.width = '0%';
        document.getElementById('progress-percent').innerText = '0%';
        document.getElementById('progress-status').innerText = 'Menghitung hash SHA-256...';
        document.getElementById('progress-size').innerText = \`0 / \${formatBytes(file.size)}\`;

        try {
          const fileHash = await computeSHA256(file);

          document.getElementById('progress-status').innerText = 'Menyiapkan presigned upload...';

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
            errorContainer.innerText = ticketData.error || 'Gagal memproses tiket upload.';
            errorContainer.style.display = 'block';
            return;
          }

          document.getElementById('progress-status').innerText = 'Mengunggah file ke R2...';

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
                reject(new Error('Gagal mengunggah file ke penyimpanan: ' + xhr.statusText));
              }
            };

            xhr.onerror = () => reject(new Error('Koneksi terputus saat mengunggah file.'));
            xhr.send(file);
          });

          document.getElementById('progress-status').innerText = 'Menyimpan metadata...';

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
            errorContainer.innerText = completeData.error || 'Gagal menyimpan metadata file.';
            errorContainer.style.display = 'block';
            return;
          }

          progressContainer.style.display = 'none';

          const shareUrl = \`\${window.location.origin}/f/\${completeData.shareCode}\`;
          document.getElementById('share-link-input').value = shareUrl;

          const expDays = completeData.file.isMember ? '60 hari' : '14 hari';
          document.getElementById('result-expiration-info').innerText = \`* Masa aktif awal file ini adalah \${expDays}. Setiap ada yang mengunduh, timer akan diperpanjang otomatis.\`;

          resultContainer.style.display = 'block';
          showToast('File berhasil diunggah!');

        } catch (err) {
          progressContainer.style.display = 'none';
          errorContainer.innerText = err.message || 'Terjadi kesalahan saat upload.';
          errorContainer.style.display = 'block';
        }
      }

      function copyShareLink() {
        const input = document.getElementById('share-link-input');
        input.select();
        navigator.clipboard.writeText(input.value);
        showToast('Tautan tersalin ke clipboard!');
        const btn = document.getElementById('btn-copy');
        btn.innerText = 'Tersalin!';
        setTimeout(() => { btn.innerText = 'Salin Tautan'; }, 2000);
      }
    </script>
  `;

  return getLayoutHtml('Unggah File Gratis hingga 5 GB', content);
}

export function getDashboardPageHtml(): string {
  const content = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 1.65rem; font-weight: 800; margin-bottom: 0.25rem;">Dashboard Manager File</h1>
          <p style="color: var(--text-muted); font-size: 0.925rem;">Kelola seluruh file dan pantaulah statistik unduhan Anda.</p>
        </div>
        <a href="/" class="btn btn-primary">+ Unggah File Baru</a>
      </div>

      <!-- Stats Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
        <div style="border: 1px solid var(--border-color); padding: 1.35rem; border-radius: var(--radius-lg); background: rgba(15, 23, 42, 0.6);">
          <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">TOTAL FILE</p>
          <p id="stat-total-files" style="font-size: 1.75rem; font-weight: 800; margin-top: 0.35rem; color: var(--text-main);" class="font-mono">-</p>
        </div>
        <div style="border: 1px solid var(--border-color); padding: 1.35rem; border-radius: var(--radius-lg); background: rgba(15, 23, 42, 0.6);">
          <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">PENYIMPANAN TERPAKAI</p>
          <p id="stat-total-storage" style="font-size: 1.75rem; font-weight: 800; margin-top: 0.35rem; color: #a5b4fc;" class="font-mono">-</p>
        </div>
        <div style="border: 1px solid var(--border-color); padding: 1.35rem; border-radius: var(--radius-lg); background: rgba(15, 23, 42, 0.6);">
          <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">TOTAL UNDUHAN</p>
          <p id="stat-total-downloads" style="font-size: 1.75rem; font-weight: 800; margin-top: 0.35rem; color: #34d399;" class="font-mono">-</p>
        </div>
      </div>

      <!-- Table View -->
      <div id="loading-dashboard" style="padding: 2rem; text-align: center;">
        <div class="skeleton" style="height: 48px; margin-bottom: 0.75rem;"></div>
        <div class="skeleton" style="height: 48px; margin-bottom: 0.75rem;"></div>
        <div class="skeleton" style="height: 48px;"></div>
      </div>

      <div id="dashboard-empty" style="display: none; text-align: center; padding: 3.5rem 1.5rem; border: 2px dashed var(--border-color); border-radius: var(--radius-lg); background: rgba(15, 23, 42, 0.3);">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 0.75rem;">📂</span>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">Belum ada file diunggah</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.75rem;">Unggah file pertama kamu dan bagikan kodenya secara instan.</p>
        <a href="/" class="btn btn-primary">Unggah File Sekarang</a>
      </div>

      <div id="dashboard-table-wrapper" style="display: none;" class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Nama File</th>
              <th>Ukuran</th>
              <th>Unduhan</th>
              <th>Sisa Waktu</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="files-table-body">
          </tbody>
        </table>
      </div>
    </div>

    <script>
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
        if (diffMs <= 0) return 'Kadaluarsa';
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
            showToast(data.error || 'Gagal memuat dashboard.', true);
            return;
          }

          document.getElementById('stat-total-files').innerText = data.stats.totalFiles;
          document.getElementById('stat-total-storage').innerText = formatBytes(data.stats.totalStorage);
          document.getElementById('stat-total-downloads').innerText = data.stats.totalDownloads;

          if (data.files.length === 0) {
            document.getElementById('dashboard-empty').style.display = 'block';
            return;
          }

          const tbody = document.getElementById('files-table-body');
          tbody.innerHTML = '';

          data.files.forEach(file => {
            const tr = document.createElement('tr');
            const shareUrl = \`\${window.location.origin}/f/\${file.share_code}\`;

            tr.innerHTML = \`
              <td style="font-weight: 700; word-break: break-all;">
                <a href="/f/\${file.share_code}" target="_blank" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
                  <span>📄</span>
                  <span>\${file.file_name}</span>
                </a>
              </td>
              <td style="white-space: nowrap; color: var(--text-muted);" class="font-mono">\${formatBytes(file.file_size)}</td>
              <td style="white-space: nowrap; font-weight: 700; color: #34d399;" class="font-mono">\${file.download_count}</td>
              <td style="white-space: nowrap; font-size: 0.85rem; color: #f59e0b; font-weight: 700;" class="font-mono">\${calculateRemainingTime(file.expires_at)}</td>
              <td style="white-space: nowrap;">
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn btn-outline btn-sm" onclick="copyLink('\${shareUrl}')">📋 Salin</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteFile('\${file.id}')">🗑️ Hapus</button>
                </div>
              </td>
            \`;
            tbody.appendChild(tr);
          });

          document.getElementById('dashboard-table-wrapper').style.display = 'block';

        } catch (err) {
          document.getElementById('loading-dashboard').style.display = 'none';
          showToast('Gagal terhubung ke server.', true);
        }
      }

      function copyLink(url) {
        navigator.clipboard.writeText(url);
        showToast('Tautan file tersalin ke clipboard!');
      }

      async function deleteFile(fileId) {
        if (!confirm('Apakah Anda yakin ingin menghapus file ini? File tidak dapat dipulihkan.')) {
          return;
        }

        try {
          const res = await fetch(\`/api/auth/files/\${fileId}\`, { method: 'DELETE' });
          const data = await res.json();
          if (!res.ok || data.error) {
            showToast(data.error || 'Gagal menghapus file.', true);
            return;
          }
          showToast('File berhasil dihapus.');
          loadDashboard();
        } catch (err) {
          showToast('Terjadi kesalahan sistem.', true);
        }
      }

      document.addEventListener('DOMContentLoaded', loadDashboard);
    </script>
  `;

  return getLayoutHtml('Dashboard Manager File', content);
}

export function getDownloadPageHtml(shareCode: string): string {
  const content = `
    <div class="card" style="text-align: center; max-width: 680px; margin: 0 auto;" id="download-card">
      <div class="card-glow"></div>

      <div id="loading-spinner" style="padding: 3rem 1rem;">
        <div class="skeleton" style="height: 70px; margin-bottom: 1.25rem;"></div>
        <div class="skeleton" style="height: 120px;"></div>
      </div>

      <div id="file-details" style="display: none;">
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem; text-align: left;">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.35rem; flex-shrink: 0; box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);">
            FILE
          </div>
          <div style="flex: 1; overflow: hidden;">
            <h2 id="detail-filename" style="font-size: 1.35rem; font-weight: 800; word-break: break-all; margin-bottom: 0.35rem; color: var(--text-main);">-</h2>
            <p id="detail-filesize" style="font-size: 0.95rem; color: #a5b4fc; font-weight: 600;" class="font-mono">-</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 1rem; margin-bottom: 2.25rem; text-align: left;">
          <div style="border: 1px solid var(--border-color); padding: 1.15rem; border-radius: var(--radius-md); background: rgba(15, 23, 42, 0.5);">
            <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">TANGGAL UNGGAH</p>
            <p id="detail-createdat" style="font-size: 0.95rem; font-weight: 700; margin-top: 0.35rem; color: var(--text-main);">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1.15rem; border-radius: var(--radius-md); background: rgba(15, 23, 42, 0.5);">
            <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">TOTAL UNDUHAN</p>
            <p id="detail-downloads" style="font-size: 0.95rem; font-weight: 700; margin-top: 0.35rem; color: #34d399;" class="font-mono">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1.15rem; border-radius: var(--radius-md); background: rgba(15, 23, 42, 0.5);">
            <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">KADALUARSA DALAM</p>
            <p id="detail-expires" style="font-size: 0.95rem; font-weight: 700; color: #f59e0b; margin-top: 0.35rem;" class="font-mono">-</p>
          </div>
        </div>

        <a id="btn-download-file" href="/api/download/${shareCode}" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2.5rem; width: 100%; text-decoration: none;">
          ⚡ Download File Sekarang
        </a>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1.25rem;">
          ✨ Mengunduh file ini akan memperpanjang masa simpan secara otomatis.
        </p>
      </div>

      <div id="error-card" style="display: none; padding: 2.5rem 1rem;">
        <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">⚠️</div>
        <h3 id="error-title" style="font-size: 1.35rem; font-weight: 800; color: var(--danger-red); margin-bottom: 0.5rem;">Gagal Memuat File</h3>
        <p id="error-desc" style="color: var(--text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 1.75rem auto;">-</p>
        <a href="/" class="btn btn-outline">Kembali ke Beranda</a>
      </div>
    </div>

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
          document.getElementById('detail-expires').innerText = 'Kadaluarsa';
          return;
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('detail-expires').innerText = \`\${days}d \${hours}h \${minutes}m\`;
      }

      async function loadFileInfo() {
        try {
          const res = await fetch('/api/file/${shareCode}');
          const data = await res.json();

          document.getElementById('loading-spinner').style.display = 'none';

          if (!res.ok || data.error) {
            document.getElementById('error-title').innerText = 'File Tidak Tersedia';
            document.getElementById('error-desc').innerText = data.error || 'File tidak ditemukan atau telah dihapus.';
            document.getElementById('error-card').style.display = 'block';
            return;
          }

          const file = data.file;
          document.getElementById('detail-filename').innerText = file.fileName;
          document.getElementById('detail-filesize').innerText = formatBytes(file.fileSize);
          document.getElementById('detail-createdat').innerText = new Date(file.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric'
          });
          document.getElementById('detail-downloads').innerText = \`\${file.downloadCount}x\`;

          updateCountdown(file.expiresAt);
          setInterval(() => updateCountdown(file.expiresAt), 60000);

          document.getElementById('file-details').style.display = 'block';

        } catch (err) {
          document.getElementById('loading-spinner').style.display = 'none';
          document.getElementById('error-title').innerText = 'Kesalahan Jaringan';
          document.getElementById('error-desc').innerText = 'Gagal terhubung ke server filedontol.';
          document.getElementById('error-card').style.display = 'block';
        }
      }

      document.addEventListener('DOMContentLoaded', loadFileInfo);
    </script>
  `;

  return getLayoutHtml('Unduh File', content);
}

export function getDmcaPageHtml(): string {
  const content = `
    <div class="card" style="line-height: 1.75; max-width: 820px; margin: 0 auto;">
      <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        Kebijakan DMCA & Hak Cipta
      </h1>

      <p style="margin-bottom: 1.25rem; color: var(--text-muted);">
        <strong style="color: var(--text-main);">filedontol</strong> menghormati Hak Kekayaan Intelektual dan berkomitmen penuh untuk mematuhi Digital Millennium Copyright Act (DMCA) serta regulasi perlindungan hak cipta internasional.
      </p>

      <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 1.75rem; margin-bottom: 0.5rem; color: #a5b4fc;">
        1. Prosedur Laporan Takedown
      </h3>
      <p style="margin-bottom: 1rem; color: var(--text-muted);">
        Apabila Anda adalah pemilik sah atas suatu karya atau perwakilan yang memiliki kuasa hukum, dan menemukan materi file di platform <strong>filedontol</strong> yang melanggar hak cipta Anda, silakan kirimkan surel pemberitahuan ke:
      </p>

      <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-md); padding: 1rem 1.25rem; font-weight: 700; font-size: 1.05rem; color: #a5b4fc; margin-bottom: 1.75rem; display: inline-block;">
        📧 Email Pengaduan: filedontol@gmail.com
      </div>

      <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 1rem; margin-bottom: 0.5rem; color: #a5b4fc;">
        2. Syarat Wajib Laporan Valid
      </h3>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.75rem; color: var(--text-muted);">
        <li style="margin-bottom: 0.5rem;">Bukti fisik/elektronik kepemilikan sah atas hak cipta.</li>
        <li style="margin-bottom: 0.5rem;">Tautan langsung (URL) file spesifik di filedontol yang diklaim melanggar.</li>
        <li style="margin-bottom: 0.5rem;">Informasi kontak aktif pelapor (Nama lengkap, alamat, surel, & nomor telepon).</li>
        <li style="margin-bottom: 0.5rem;">Pernyataan resmi bahwa penggunaan materi tersebut tidak mendapatkan izin dari pemilik hak cipta.</li>
      </ul>

      <h3 style="font-size: 1.2rem; font-weight: 800; margin-top: 1rem; margin-bottom: 0.5rem; color: #a5b4fc;">
        3. Waktu Penanganan
      </h3>
      <p style="margin-bottom: 1.5rem; color: var(--text-muted);">
        Setiap laporan valid akan diproses dan file terkait akan dihapus permanen serta diblokir dari sistem dalam kurun waktu maksimal <strong>1x24 jam</strong>.
      </p>

      <div style="margin-top: 2.5rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
        <a href="/" class="btn btn-outline">← Kembali ke Beranda</a>
      </div>
    </div>
  `;

  return getLayoutHtml('Kebijakan DMCA', content);
}

export function getNotFoundPageHtml(): string {
  const content = `
    <div class="card" style="text-align: center; padding: 4.5rem 1.5rem; max-width: 580px; margin: 0 auto;">
      <div class="card-glow"></div>
      <span style="font-size: 4.5rem; display: block; margin-bottom: 1rem;">🔍</span>
      <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.03em;">Halaman Tidak Ditemukan</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 2.25rem;">Halaman atau file yang kamu cari mungkin telah dihapus, kadaluarsa, atau kodenya salah.</p>
      <a href="/" class="btn btn-primary">Kembali ke Beranda</a>
    </div>
  `;

  return getLayoutHtml('404 Not Found', content);
}
