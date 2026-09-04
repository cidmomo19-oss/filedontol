import { getLayoutHtml } from './layout';

export function getIndexHtml(): string {
  const content = `
    <!-- Hero Section -->
    <div class="card" style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.025em;">
        Unggah & Bagikan File Anda
      </h1>
      <p style="color: var(--text-muted); font-size: clamp(1rem, 2vw, 1.15rem); margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        Layanan berbagi file kilat, aman, tanpa iklan yang mengganggu, dan mendukung ukuran hingga 5 GB.
      </p>

      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
        <span class="badge badge-indigo">⚡ Ukuran File Hingga 5 GB</span>
        <span class="badge badge-emerald">Guest: Aktif 14 Hari (+14d tiap download)</span>
        <span class="badge badge-purple">Member: Aktif 60 Hari (+60d tiap download)</span>
      </div>

      <!-- Drag & Drop Upload Area -->
      <div id="drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: clamp(2rem, 5vw, 3.5rem) 1.5rem; background: #f8fafc; cursor: pointer; transition: all 0.2s ease; margin-bottom: 1.5rem;" onclick="document.getElementById('file-input').click()">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" style="margin: 0 auto 1rem auto; display: block;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">Tarik & lepas file di sini, atau klik untuk memilih file</p>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.35rem;">Mendukung semua format file hingga 5 GB</p>
        <input type="file" id="file-input" style="display: none;" onchange="handleFileSelect(event)" />
      </div>

      <!-- Progress Section -->
      <div id="upload-progress-container" style="display: none; text-align: left; background: #f1f5f9; padding: 1.25rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">
          <span id="progress-filename" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%;">Nama File</span>
          <span id="progress-percent">0%</span>
        </div>
        <div style="width: 100%; background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div id="progress-bar" style="width: 0%; height: 100%; background: var(--primary-indigo); transition: width 0.1s linear;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;">
          <span id="progress-status">Mengunggah...</span>
          <span id="progress-size">0 / 0 MB</span>
        </div>
      </div>

      <!-- Result Link Section -->
      <div id="upload-result-container" style="display: none; text-align: left; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="color: #166534; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">✅ File Berhasil Diunggah!</h4>
        <p style="font-size: 0.9rem; color: #15803d; margin-bottom: 1rem;">Bagikan tautan di bawah ini untuk mengunduh file:</p>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <input type="text" id="share-link-input" readonly style="flex: 1; min-width: 240px; padding: 0.625rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.375rem; font-size: 0.95rem; background: #ffffff; color: var(--text-main);" />
          <button class="btn btn-primary" onclick="copyShareLink()" id="btn-copy">Salin Tautan</button>
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: #166534;" id="result-expiration-info"></div>
      </div>

      <div id="upload-error-container" style="display: none; text-align: left; background: #fef2f2; border: 1px solid #fecaca; padding: 1rem 1.25rem; border-radius: 0.5rem; color: #991b1b; font-size: 0.9rem; margin-top: 1rem;"></div>
    </div>

    <!-- Section 1: Features & Advantages -->
    <div style="margin-bottom: 3.5rem;">
      <h2 class="section-title">Mengapa Memilih filedontol?</h2>
      <p class="section-desc">Nikmati pengalaman berbagi file tanpa kerumitan dan batas yang tidak perlu.</p>

      <div class="grid-3">
        <div class="feature-box">
          <span class="feature-icon">🚀</span>
          <h3 class="feature-title">Kecepatan CDN Cloudflare</h3>
          <p class="feature-desc">Didukung oleh jaringan global Cloudflare R2 untuk kecepatan upload dan download maksimal dari mana saja.</p>
        </div>
        <div class="feature-box">
          <span class="feature-icon">📦</span>
          <h3 class="feature-title">Ukuran Besar Hingga 5 GB</h3>
          <p class="feature-desc">Unggah file berukuran ekstra besar seperti dokumen, video, atau arsip proyek tanpa dipotong.</p>
        </div>
        <div class="feature-box">
          <span class="feature-icon">🔄</span>
          <h3 class="feature-title">Perpanjangan Masa Aktif Otomatis</h3>
          <p class="feature-desc">Setiap kali ada yang mengunduh file Anda, masa aktif diperpanjang otomatis +14 hari (Guest) atau +60 hari (Member).</p>
        </div>
        <div class="feature-box">
          <span class="feature-icon">🛡️</span>
          <h3 class="feature-title">Perlindungan DMCA & Keamanan</h3>
          <p class="feature-desc">Sistem deteksi hash SHA-256 otomatis menolak upload file yang terbukti melanggar hak cipta atau aturan keamanan.</p>
        </div>
        <div class="feature-box">
          <span class="feature-icon">📊</span>
          <h3 class="feature-title">Dashboard Pengelola File</h3>
          <p class="feature-desc">Daftar sebagai member gratis untuk memantau statistik file, merubah nama file, dan menghapus file kapan saja.</p>
        </div>
        <div class="feature-box">
          <span class="feature-icon">🚫</span>
          <h3 class="feature-title">Bebas Iklan & Pop-up</h3>
          <p class="feature-desc">Tampilan bersih, ringan, tanpa jebakan tombol download palsu atau iklan bertumpuk.</p>
        </div>
      </div>
    </div>

    <!-- Section 2: How It Works -->
    <div style="margin-bottom: 3.5rem; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem 1.5rem;">
      <h2 class="section-title">Cara Kerja filedontol</h2>
      <p class="section-desc">3 langkah sederhana untuk membagikan file Anda ke siapa saja.</p>

      <div class="grid-3" style="margin-bottom: 0;">
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 48px; height: 48px; background: #e0e7ff; color: var(--primary-indigo); font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.25rem;">1</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Unggah File</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Pilih file dari HP atau Komputer Anda hingga 5 GB.</p>
        </div>
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 48px; height: 48px; background: #e0e7ff; color: var(--primary-indigo); font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.25rem;">2</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Dapatkan Tautan</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Sistem menghasilkan tautan unik yang aman untuk dibagikan.</p>
        </div>
        <div style="text-align: center; padding: 1rem;">
          <div style="width: 48px; height: 48px; background: #e0e7ff; color: var(--primary-indigo); font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 1.25rem;">3</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Bagikan & Unduh</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Penerima dapat mengunduh langsung tanpa menunggu atau memasukkan captcha.</p>
        </div>
      </div>
    </div>

    <!-- Section 3: FAQ Accordion -->
    <div id="faq" style="margin-bottom: 3rem;">
      <h2 class="section-title">Pertanyaan Umum (FAQ)</h2>
      <p class="section-desc">Jawaban untuk pertanyaan yang sering diajukan.</p>

      <div class="faq-container">
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Berapa lama file saya akan disimpan?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Upload tanpa akun (Guest) aktif selama 14 hari. Upload dari Member terdaftar aktif selama 60 hari. Uniknya, setiap kali ada orang yang mengunduh file Anda, masa aktif akan diperpanjang secara otomatis (+14d/Guest atau +60d/Member) dari waktu unduhan terakhir!
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Berapa batas maksimal ukuran file yang didukung?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            filedontol mendukung file hingga ukuran 5 GB (5.368.709.120 bytes) per file secara gratis.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Mengapa saya sebaiknya mendaftar akun Member?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Pendaftaran member 100% gratis. Dengan menjadi member, masa aktif awal file Anda lebih lama (60 hari) dan Anda mendapatkan akses ke halaman Dashboard untuk melihat daftar file, memantau jumlah download, merubah nama file, serta menghapus file kapan saja.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Format file apa saja yang diperbolehkan?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Kami mendukung hampir semua format file umum seperti dokumen (PDF, DOCX, XLSX), arsip (ZIP, RAR, 7Z), gambar (PNG, JPG), video (MP4, MKV), audio (MP3), dan lainnya selama tidak melanggar ketentuan hukum atau hak cipta.
          </div>
        </div>

        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-header">
            <span>Bagaimana cara melaporkan file ilegal / pelanggaran (DMCA, CSAM, Kekerasan)?</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-body">
            Kami tidak menoleransi segala bentuk pelanggaran seperti materi pornografi anak (CSAM), ancaman kekerasan, malware, maupun pelanggaran Hak Cipta (DMCA). Kirimkan pengaduan melalui halaman <a href="/report">Laporkan Penyalahgunaan File</a> untuk penanganan cepat dalam 1x24 jam.
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
          errorContainer.innerText = 'Batas maksimal ukuran file adalah 5 GB.';
          errorContainer.style.display = 'block';
          return;
        }

        progressContainer.style.display = 'block';
        document.getElementById('progress-filename').innerText = file.name;
        document.getElementById('progress-bar').style.width = '0%';
        document.getElementById('progress-percent').innerText = '0%';
        document.getElementById('progress-status').innerText = 'Menghitung hash file...';
        document.getElementById('progress-size').innerText = \`0 / \${formatBytes(file.size)}\`;

        try {
          const fileHash = await computeSHA256(file);

          document.getElementById('progress-status').innerText = 'Meminta tiket upload...';

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
            errorContainer.innerText = ticketData.error || 'Gagal membuat tiket upload.';
            errorContainer.style.display = 'block';
            return;
          }

          document.getElementById('progress-status').innerText = 'Mengunggah file ke penyimpanan R2...';

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
                reject(new Error('Gagal mengunggah file ke R2: ' + xhr.statusText));
              }
            };

            xhr.onerror = () => reject(new Error('Kesalahan jaringan saat mengunggah file.'));
            xhr.send(file);
          });

          document.getElementById('progress-status').innerText = 'Menyelesaikan metadata...';

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
          document.getElementById('result-expiration-info').innerText = \`* Masa aktif file ini adalah \${expDays}. Setiap ada yang mengunduh, masa aktif diperpanjang secara otomatis.\`;

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
          <h1 style="font-size: 1.5rem; font-weight: 800;">Dashboard Pengelola File</h1>
          <p style="color: var(--text-muted); font-size: 0.925rem;">Kelola, ubah nama, dan pantau seluruh file Anda.</p>
        </div>
        <a href="/" class="btn btn-primary">+ Unggah File Baru</a>
      </div>

      <!-- Stats Summary Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
          <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">TOTAL FILE</p>
          <p id="stat-total-files" style="font-size: 1.5rem; font-weight: 800; margin-top: 0.25rem;">-</p>
        </div>
        <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
          <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">PENYIMPANAN TERPAKAI</p>
          <p id="stat-total-storage" style="font-size: 1.5rem; font-weight: 800; margin-top: 0.25rem;">-</p>
        </div>
        <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
          <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">TOTAL UNDUHAN</p>
          <p id="stat-total-downloads" style="font-size: 1.5rem; font-weight: 800; color: var(--primary-indigo); margin-top: 0.25rem;">-</p>
        </div>
      </div>

      <!-- Search / Filter Bar -->
      <div style="margin-bottom: 1.5rem;">
        <input type="text" id="search-files-input" placeholder="🔍 Cari file berdasarkan nama..." oninput="filterFiles()" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.95rem;" />
      </div>

      <!-- Loading / Skeleton -->
      <div id="loading-dashboard" style="padding: 2rem; text-align: center; color: var(--text-muted);">
        Sedang memuat daftar file...
      </div>

      <div id="dashboard-empty" style="display: none; text-align: center; padding: 3rem 1rem; border: 2px dashed var(--border-color); border-radius: var(--radius-md);">
        <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">📂</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Belum ada file yang diunggah</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Unggah file pertama Anda dan bagikan tautannya secara instan.</p>
        <a href="/" class="btn btn-primary">Unggah File Sekarang</a>
      </div>

      <div id="dashboard-table-wrapper" style="display: none;" class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Nama File</th>
              <th>Ukuran</th>
              <th>Unduhan</th>
              <th>Sisa Aktif</th>
              <th>Aksi</th>
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
          <h3 class="modal-title">Ubah Nama File</h3>
          <button onclick="closeRenameModal()" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted);">&times;</button>
        </div>
        <form onsubmit="handleRenameSubmit(event)">
          <input type="hidden" id="rename-file-id" />
          <div class="form-group">
            <label for="rename-file-input">Nama File Baru</label>
            <input type="text" id="rename-file-input" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Simpan Perubahan</button>
        </form>
      </div>
    </div>

    <script>
      let allFiles = [];

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

          allFiles = data.files || [];
          renderFilesTable(allFiles);

        } catch (err) {
          document.getElementById('loading-dashboard').style.display = 'none';
          showToast('Gagal terhubung ke server.', true);
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
              <a href="/f/\${file.share_code}" target="_blank" style="color: var(--text-main); text-decoration: none;">
                📄 \${file.file_name}
              </a>
            </td>
            <td style="white-space: nowrap; color: var(--text-muted);">\${formatBytes(file.file_size)}</td>
            <td style="white-space: nowrap; font-weight: 700; color: var(--primary-indigo);">\${file.download_count}</td>
            <td style="white-space: nowrap; font-size: 0.85rem; color: #d97706; font-weight: 600;">\${calculateRemainingTime(file.expires_at)}</td>
            <td style="white-space: nowrap;">
              <div style="display: flex; gap: 0.35rem;">
                <button class="btn btn-outline btn-sm" onclick="copyLink('\${shareUrl}')" title="Salin Tautan">📋 Salin</button>
                <button class="btn btn-outline btn-sm" onclick="openRenameModal('\${file.id}', '\${file.file_name.replace(/'/g, "\\\\'")}')" title="Ubah Nama">✏️ Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFile('\${file.id}')" title="Hapus File">🗑️ Hapus</button>
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
            showToast(data.error || 'Gagal merubah nama file.', true);
            return;
          }
          closeRenameModal();
          showToast('Nama file berhasil diperbarui.');
          loadDashboard();
        } catch (err) {
          showToast('Terjadi kesalahan jaringan.', true);
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

  return getLayoutHtml('Dashboard Pengelola File', content);
}

export function getReportPageHtml(): string {
  const content = `
    <div class="card" style="max-width: 650px; margin: 0 auto;">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--rose-red);">
        🚩 Laporkan Penyalahgunaan / File Ilegal
      </h1>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
        Bantu kami menjaga platform tetap aman. Kami tidak menoleransi segala bentuk pelanggaran hak cipta, materi pornografi anak (CSAM), ancaman kekerasan, maupun malware.
      </p>

      <form onsubmit="handleReportSubmit(event)">
        <div class="form-group">
          <label for="report-sharecode">Kode / Tautan File Yang Dilaporkan *</label>
          <input type="text" id="report-sharecode" required placeholder="Contoh: CJWHb2T4 atau https://filedontol.com/f/CJWHb2T4" />
        </div>

        <div class="form-group">
          <label for="report-reason">Jenis Pelanggaran *</label>
          <select id="report-reason" required>
            <option value="">-- Pilih Jenis Pelanggaran --</option>
            <option value="dmca">Pelanggaran Hak Cipta / DMCA</option>
            <option value="csam_pornografi_anak">Pornografi Anak / Eksploitasi Anak (CSAM)</option>
            <option value="kekerasan_terorisme">Ancaman Kekerasan / Terorisme / Radikalisme</option>
            <option value="malware_phishing">Malware / Virus / Phishing</option>
            <option value="penipuan_spam">Spam / Penipuan / Perjudian Ilegal</option>
          </select>
        </div>

        <div class="form-group">
          <label for="report-email">Email Pelapor Aktif *</label>
          <input type="email" id="report-email" required placeholder="nama@email.com" />
        </div>

        <div class="form-group">
          <label for="report-details">Keterangan / Bukti Tambahan</label>
          <textarea id="report-details" rows="4" placeholder="Jelaskan detail pelanggaran atau lampirkan bukti kepemilikan hak cipta..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; background: var(--rose-red);">Kirimkan Laporan Takedown</button>
      </form>
    </div>

    <script>
      async function handleReportSubmit(e) {
        e.preventDefault();
        let rawCode = document.getElementById('report-sharecode').value.trim();
        const reason = document.getElementById('report-reason').value;
        const reporterEmail = document.getElementById('report-email').value.trim();
        const details = document.getElementById('report-details').value.trim();

        if (rawCode.includes('/f/')) {
          rawCode = rawCode.split('/f/').pop().split('?')[0];
        }

        try {
          const res = await fetch('/api/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              shareCode: rawCode,
              reason: reason,
              reporterEmail: reporterEmail,
              details: details
            })
          });

          const data = await res.json();
          if (!res.ok || data.error) {
            showToast(data.error || 'Gagal mengirimkan laporan.', true);
            return;
          }

          showToast(data.message || 'Laporan berhasil dikirimkan!');
          setTimeout(() => { window.location.href = '/'; }, 2000);
        } catch (err) {
          showToast('Terjadi kesalahan jaringan.', true);
        }
      }
    </script>
  `;

  return getLayoutHtml('Laporkan Penyalahgunaan File', content);
}

export function getDownloadPageHtml(shareCode: string): string {
  const content = `
    <div class="card" style="text-align: center;" id="download-card">
      <div id="loading-spinner" style="padding: 2rem; color: var(--text-muted);">
        Sedang memuat informasi file...
      </div>

      <div id="file-details" style="display: none;">
        <div style="background: #f1f5f9; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem; text-align: left;">
          <div style="background: var(--primary-indigo); color: white; width: 56px; height: 56px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.25rem; flex-shrink: 0;">
            FILE
          </div>
          <div style="flex: 1; overflow: hidden;">
            <h2 id="detail-filename" style="font-size: 1.25rem; font-weight: 700; word-break: break-all; margin-bottom: 0.25rem;">-</h2>
            <p id="detail-filesize" style="font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">-</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; text-align: left;">
          <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 0.5rem; background: #ffffff;">
            <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">TANGGAL UNGGAH</p>
            <p id="detail-createdat" style="font-size: 0.95rem; font-weight: 700; margin-top: 0.25rem;">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 0.5rem; background: #ffffff;">
            <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">TOTAL UNDUHAN</p>
            <p id="detail-downloads" style="font-size: 0.95rem; font-weight: 700; margin-top: 0.25rem;">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 0.5rem; background: #ffffff;">
            <p style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">KADALUARSA DALAM</p>
            <p id="detail-expires" style="font-size: 0.95rem; font-weight: 700; color: #d97706; margin-top: 0.25rem;">-</p>
          </div>
        </div>

        <a id="btn-download-file" href="/api/download/${shareCode}" class="btn btn-primary" style="font-size: 1.1rem; padding: 0.85rem 2.5rem; width: 100%; text-decoration: none;">
          ⬇️ Download File Sekarang
        </a>

        <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            * Mengunduh file ini memperpanjang masa aktifnya secara otomatis.
          </span>
          <a href="/report" style="color: var(--rose-red); font-size: 0.85rem; font-weight: 700; text-decoration: none;">🚩 Laporkan File Ini</a>
        </div>
      </div>

      <div id="error-card" style="display: none; padding: 2rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚠️</div>
        <h3 id="error-title" style="font-size: 1.25rem; font-weight: 700; color: var(--rose-red); margin-bottom: 0.5rem;">Gagal Memuat File</h3>
        <p id="error-desc" style="color: var(--text-muted); font-size: 0.95rem; max-width: 500px; margin: 0 auto 1.5rem auto;">-</p>
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

        document.getElementById('detail-expires').innerText = \`\${days} hari \${hours} jam \${minutes} menit\`;
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
            year: 'numeric', month: 'long', day: 'numeric'
          });
          document.getElementById('detail-downloads').innerText = \`\${file.downloadCount} kali\`;

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
    <div class="card" style="line-height: 1.7;">
      <h1 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem;">
        Kebijakan DMCA & Pelanggaran Hak Cipta
      </h1>

      <p style="margin-bottom: 1.25rem;">
        <strong>filedontol</strong> sangat menghormati hak kekayaan intelektual, hak cipta, dan kepemilikan sah atas seluruh materi atau file digital. Kami berkomitmen untuk mematuhi Digital Millennium Copyright Act (DMCA) dan seluruh peraturan perundang-undangan hak cipta yang berlaku.
      </p>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        1. Prosedur Pelaporan Pelanggaran Hak Cipta
      </h3>
      <p style="margin-bottom: 1rem;">
        Jika Anda adalah pemilik hak cipta sah atau agen/kuasa hukum yang ditunjuk, dan menemukan bahwa file yang diunggah ke platform <strong>filedontol</strong> melanggar hak cipta Anda, silakan kirimkan pemberitahuan resmi takedown melalui email atau form pengaduan kami:
      </p>

      <div style="background: #e0e7ff; border: 1px solid #c7d2fe; border-radius: 0.5rem; padding: 1rem 1.25rem; font-weight: 700; font-size: 1.05rem; color: #3730a3; margin-bottom: 1.5rem; display: inline-block;">
        📧 Email Pengaduan DMCA: filedontol@gmail.com
      </div>

      <div style="margin-bottom: 1.5rem;">
        <a href="/report" class="btn btn-primary">Form Laporan Penyalahgunaan File</a>
      </div>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        2. Persyaratan Wajib Laporan Valid
      </h3>
      <p style="margin-bottom: 0.75rem;">
        Untuk memastikan laporan dapat segera ditindaklanjuti, laporan yang Anda kirimkan <strong>WAJIB</strong> mencakup informasi berikut:
      </p>
      <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
        <li style="margin-bottom: 0.5rem;">Bukti kepemilikan sah/surat kuasa dari pemegang hak cipta.</li>
        <li style="margin-bottom: 0.5rem;">Identifikasi detail karya atau file berhak cipta yang diklaim telah dilanggar.</li>
        <li style="margin-bottom: 0.5rem;">Tautan langsung (URL) file di filedontol yang dilaporkan (contoh: <code>https://filedontol.com/f/xxxxxx</code>).</li>
        <li style="margin-bottom: 0.5rem;">Informasi kontak pelapor (Nama lengkap, organisasi/perusahaan, dan nomor telepon/email aktif).</li>
        <li style="margin-bottom: 0.5rem;">Pernyataan iktikad baik bahwa penggunaan materi tersebut tidak diizinkan oleh pemilik hak cipta, agennya, atau hukum.</li>
      </ul>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        3. Waktu Penanganan Takedown
      </h3>
      <p style="margin-bottom: 1rem;">
        Setiap laporan resmi yang valid dan memenuhi persyaratan di atas akan ditindaklanjuti dan file terkait akan dihapus secara permanen serta dimasukkan ke dalam daftar blokir (blacklist) dalam waktu maksimal <strong>1x24 jam</strong> sejak email diterima.
      </p>

      <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <a href="/" class="btn btn-outline">← Kembali ke Beranda</a>
      </div>
    </div>
  `;

  return getLayoutHtml('Kebijakan DMCA', content);
}

export function getNotFoundPageHtml(): string {
  const content = `
    <div class="card" style="text-align: center; padding: 4rem 1.5rem;">
      <span style="font-size: 4rem; display: block; margin-bottom: 1rem;">🔍</span>
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">Halaman Tidak Ditemukan (404)</h1>
      <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <a href="/" class="btn btn-primary">Kembali ke Beranda</a>
    </div>
  `;

  return getLayoutHtml('Halaman Tidak Ditemukan', content);
}
