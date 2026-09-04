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
        <span class="badge badge-indigo">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Ukuran File Hingga 5 GB
        </span>
        <span class="badge badge-emerald">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Guest: Aktif 14 Hari (+14d tiap download)
        </span>
        <span class="badge badge-purple">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          Member: Aktif 60 Hari (+60d tiap download)
        </span>
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
        <h4 style="color: #166534; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          File Berhasil Diunggah!
        </h4>
        <p style="font-size: 0.9rem; color: #15803d; margin-bottom: 1rem;">Bagikan tautan di bawah ini untuk mengunduh file:</p>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <input type="text" id="share-link-input" readonly style="flex: 1; min-width: 240px; padding: 0.625rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.375rem; font-size: 0.95rem; background: #ffffff; color: var(--text-main);" />
          <button class="btn btn-primary" onclick="copyShareLink()" id="btn-copy">Salin Tautan</button>
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: #166534;" id="result-expiration-info"></div>
      </div>

      <div id="upload-error-container" style="display: none; text-align: left; background: #fef2f2; border: 1px solid #fecaca; padding: 1rem 1.25rem; border-radius: 0.5rem; color: #991b1b; font-size: 0.9rem; margin-top: 1rem;"></div>
    </div>

    <!-- Features & Advantages -->
    <div style="margin-bottom: 3.5rem;">
      <h2 class="section-title">Mengapa Memilih filedontol?</h2>
      <p class="section-desc">Nikmati pengalaman berbagi file tanpa kerumitan dan batas yang tidak perlu.</p>

      <div class="grid-3">
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 class="feature-title">Kecepatan CDN Cloudflare</h3>
          <p class="feature-desc">Didukung oleh jaringan global Cloudflare R2 untuk kecepatan upload dan download maksimal dari mana saja.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h3 class="feature-title">Ukuran Besar Hingga 5 GB</h3>
          <p class="feature-desc">Unggah file berukuran ekstra besar seperti dokumen, video, atau arsip proyek tanpa dipotong.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </div>
          <h3 class="feature-title">Perpanjangan Masa Aktif Otomatis</h3>
          <p class="feature-desc">Setiap kali ada yang mengunduh file Anda, masa aktif diperpanjang otomatis +14 hari (Guest) atau +60 hari (Member).</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="feature-title">Perlindungan DMCA & Keamanan</h3>
          <p class="feature-desc">Sistem deteksi hash SHA-256 otomatis menolak upload file yang terbukti melanggar hak cipta atau aturan keamanan.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>
          </div>
          <h3 class="feature-title">Dashboard Pengelola File</h3>
          <p class="feature-desc">Daftar sebagai member gratis untuk memantau statistik file, merubah nama file, dan menghapus file kapan saja.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
          <h3 class="feature-title">Bebas Iklan & Pop-up</h3>
          <p class="feature-desc">Tampilan bersih, ringan, tanpa jebakan tombol download palsu atau iklan bertumpuk.</p>
        </div>
      </div>
    </div>

    <!-- How It Works -->
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

    <!-- FAQ Accordion -->
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
          <h1 style="font-size: 1.5rem; font-weight: 800;">Dashboard Awan Member</h1>
          <p style="color: var(--text-muted); font-size: 0.925rem;">Kelola, ubah nama, bagikan, dan pantau seluruh file Anda.</p>
        </div>
        <button class="btn btn-primary" onclick="toggleDashboardUploadSection()" id="btn-toggle-dash-upload">
          ⚡ Unggah File Baru Ke Dashboard
        </button>
      </div>

      <!-- Integrated Dashboard Drag & Drop Upload Zone -->
      <div id="dashboard-upload-box" style="display: block; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: var(--radius-md); padding: 2rem 1.5rem; text-align: center; margin-bottom: 2rem;">
        <div onclick="document.getElementById('dash-file-input').click()" style="cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" fill="none" viewBox="0 0 24 24" stroke="var(--primary-indigo)" style="margin: 0 auto 0.75rem auto; display: block;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <p style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">Tarik & lepas file di sini atau klik untuk mengunggah ke akun Anda</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Batas hingga 5 GB • Masa aktif otomatis 60 hari</p>
          <input type="file" id="dash-file-input" style="display: none;" onchange="handleDashFileSelect(event)" />
        </div>

        <!-- Upload Progress Section -->
        <div id="dash-progress-container" style="display: none; text-align: left; background: #ffffff; border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm); margin-top: 1rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.35rem;">
            <span id="dash-progress-filename">Nama File</span>
            <span id="dash-progress-percent">0%</span>
          </div>
          <div style="width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="dash-progress-bar" style="width: 0%; height: 100%; background: var(--primary-indigo); transition: width 0.1s linear;"></div>
          </div>
          <p id="dash-progress-status" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;">Mengunggah...</p>
        </div>
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
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Gunakan kotak upload di atas untuk mengunggah file pertama Anda.</p>
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
          showToast('Batas maksimal ukuran file adalah 5 GB.', true);
          return;
        }

        const progressContainer = document.getElementById('dash-progress-container');
        progressContainer.style.display = 'block';
        document.getElementById('dash-progress-filename').innerText = file.name;
        document.getElementById('dash-progress-bar').style.width = '0%';
        document.getElementById('dash-progress-percent').innerText = '0%';
        document.getElementById('dash-progress-status').innerText = 'Menghitung hash file...';

        try {
          const fileHash = await computeSHA256(file);
          document.getElementById('dash-progress-status').innerText = 'Meminta tiket upload...';

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
            showToast(ticketData.error || 'Gagal membuat tiket upload.', true);
            return;
          }

          document.getElementById('dash-progress-status').innerText = 'Mengunggah file...';

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
              else reject(new Error('Gagal mengunggah file.'));
            };

            xhr.onerror = () => reject(new Error('Kesalahan jaringan.'));
            xhr.send(file);
          });

          document.getElementById('dash-progress-status').innerText = 'Menyelesaikan metadata...';

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
            showToast(completeData.error || 'Gagal menyimpan metadata.', true);
            return;
          }

          progressContainer.style.display = 'none';
          showToast('File berhasil diunggah!');
          loadDashboard();

        } catch (err) {
          progressContainer.style.display = 'none';
          showToast(err.message || 'Gagal mengunggah file.', true);
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
                <button class="btn btn-outline btn-sm" onclick="copyLink('\${shareUrl}')" title="Salin Tautan">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                  Salin
                </button>
                <button class="btn btn-outline btn-sm" onclick="openRenameModal('\${file.id}', '\${file.file_name.replace(/'/g, "\\\\'")}')" title="Ubah Nama">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteFile('\${file.id}')" title="Hapus File">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Hapus
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
    <div class="card" style="max-width: 780px; margin: 0 auto; border-radius: var(--radius-lg); padding: clamp(1.5rem, 5vw, 3rem);">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="width: 64px; height: 64px; background: rgba(225, 29, 72, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: var(--rose-red);">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 style="font-size: clamp(1.5rem, 3.5vw, 2.25rem); font-weight: 800; color: var(--text-main); letter-spacing: -0.025em;">
          Laporkan Penyalahgunaan & DMCA
        </h1>
        <p style="color: var(--text-muted); font-size: 1rem; margin-top: 0.5rem; max-width: 580px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          Kami tidak menyediakan form input di platform ini. Seluruh pengaduan pelanggaran Hak Cipta (DMCA), CSAM, kekerasan, malware, dan penyalahgunaan dikirimkan <strong>LANGSUNG VIA EMAIL</strong> ke pengelola.
        </p>
      </div>

      <!-- Main Direct Email Box -->
      <div style="background: linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(225, 29, 72, 0.06)); border: 2px solid rgba(37, 99, 235, 0.2); border-radius: var(--radius-md); padding: 2rem; text-align: center; margin-bottom: 2.5rem;">
        <p style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-indigo); margin-bottom: 0.5rem;">EMAIL KONTAK RESMI TAKEDOWN & ABUSIVE CONTENT</p>
        <div style="font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 900; color: var(--text-main); margin-bottom: 1.25rem; font-family: monospace; letter-spacing: -0.02em;">
          filedontol@gmail.com
        </div>
        <a href="mailto:filedontol@gmail.com?subject=Laporan%20Takedown%20%2F%20Penyalahgunaan%20File%20-%20filedontol&body=Halo%20Tim%20filedontol%2C%0A%0ASaya%20ingin%20melaporkan%20pelanggaran%20file%20dengan%20rincian%3A%0A%E2%80%A2%20Tautan%20%2F%20Kode%20File%3A%20%0A%E2%80%A2%20Jenis%20Pelanggaran%3A%20(DMCA%20%2F%20CSAM%20%2F%20Kekerasan%20%2F%20Malware)%0A%E2%80%A2%20Bukti%20Kepemilikan%20%2F%20Keterangan%3A%20%0A%0AMohon%20diproses.%20Terima%20kasih." class="btn btn-primary" style="padding: 0.85rem 2rem; font-size: 1rem; border-radius: var(--radius-md); gap: 0.75rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Kirim Email Pengaduan Langsung
        </a>
      </div>

      <!-- Information & Guidelines -->
      <div style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem;">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--primary-indigo)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Format Informasi Wajib Dalam Email Laporan:
        </h3>
        <p style="margin-bottom: 1rem; color: var(--text-muted);">
          Agar laporan Anda dapat langsung diproses tanpa penundaan, pastikan email pengaduan mencakup poin-poin berikut:
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 2rem; color: var(--text-muted);">
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Tautan / URL File:</strong> Cantumkan URL spesifik (contoh: <code>https://filedontol.com/f/xxxxxx</code>) atau kode file yang dilaporkan.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Jenis Violasi:</strong> Sebutkan apakah laporan berupa Hak Cipta / DMCA, Pornografi Anak / CSAM, Ancaman Kekerasan, Malware / Phishing, atau Penipuan.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Bukti Kepemilikan (Khusus DMCA):</strong> Lampirkan surat kuasa sah, sertifikat hak cipta, atau dokumen verifikasi kepemilikan.</li>
          <li style="margin-bottom: 0.5rem;"><strong style="color: var(--text-main);">Identitas Pelapor:</strong> Nama lengkap dan organisasi/badan hukum pemegang hak cipta.</li>
        </ul>

        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--rose-red)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Komitmen & Waktu Respon Takedown:
        </h3>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">
          Platform <strong>filedontol</strong> memiliki toleransi nol (Zero Tolerance) terhadap materi terlarang (CSAM, malware, terorisme). Laporan pelanggaran kritis akan segera diblokir permanen dan SHA-256 hash file dimasukkan ke blacklist dalam kurun waktu <strong>maksimal 1x24 jam</strong> sejak email diterima.
        </p>

        <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; text-align: center;">
          <a href="/" class="btn btn-outline">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  `;

  return getLayoutHtml('Laporkan Penyalahgunaan File', content);
}

export function getDownloadPageHtml(shareCode: string): string {
  const content = `
    <div class="card" style="max-width: 780px; margin: 0 auto; border-radius: var(--radius-lg); padding: clamp(1.5rem, 5vw, 3rem);" id="download-card">
      <div id="loading-spinner" style="padding: 3rem; text-align: center; color: var(--text-muted);">
        <div style="width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: var(--primary-indigo); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem auto;"></div>
        Sedang memuat informasi file...
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
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.04em;">TANGGAL UNGGAH</p>
            <p id="detail-createdat" style="font-size: 1rem; font-weight: 800; margin-top: 0.35rem; color: var(--text-main);">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.04em;">TOTAL UNDUHAN</p>
            <p id="detail-downloads" style="font-size: 1rem; font-weight: 800; margin-top: 0.35rem; color: var(--primary-indigo);">-</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); background: #ffffff;">
            <p style="font-size: 0.775rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.04em;">KADALUARSA DALAM</p>
            <p id="detail-expires" style="font-size: 1rem; font-weight: 800; color: #d97706; margin-top: 0.35rem;">-</p>
          </div>
        </div>

        <!-- Download Action CTA -->
        <a id="btn-download-file" href="#" class="btn btn-primary" style="font-size: 1.15rem; padding: 1rem 2.5rem; width: 100%; text-decoration: none; border-radius: var(--radius-md); gap: 0.75rem;">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Unduh File Sekarang
        </a>

        <!-- Footer Notice -->
        <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--emerald-green)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Mengunduh file ini memperpanjang masa aktifnya secara otomatis (+14d / +60d).
          </span>
          <a href="/report" style="color: var(--rose-red); font-size: 0.85rem; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 0.35rem;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Laporkan Penyalahgunaan
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
        <h3 id="error-title" style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Gagal Memuat File</h3>
        <p id="error-desc" style="color: var(--text-muted); font-size: 0.95rem; max-width: 500px; margin: 0 auto 2rem auto; line-height: 1.6;">-</p>
        <a href="/" class="btn btn-outline">Kembali ke Beranda</a>
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
          document.getElementById('detail-mimetype').innerText = file.mimeType || 'application/octet-stream';
          document.getElementById('detail-createdat').innerText = new Date(file.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          document.getElementById('detail-downloads').innerText = \`\${file.downloadCount} kali\`;

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
    <div class="card" style="line-height: 1.7; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem;">
        Kebijakan DMCA & Pelanggaran Hak Cipta
      </h1>

      <p style="margin-bottom: 1.25rem;">
        <strong>filedontol</strong> sangat menghormati hak kekayaan intelektual, hak cipta, dan kepemilikan sah atas seluruh materi atau file digital. Kami berkomitmen untuk mematuhi Digital Millennium Copyright Act (DMCA) dan seluruh peraturan perundang-undangan hak cipta yang berlaku.
      </p>

      <!-- Direct Email Box -->
      <div style="background: linear-gradient(135deg, #e0e7ff, #ede9fe); border: 1px solid #c7d2fe; border-radius: var(--radius-md); padding: 1.5rem; margin: 1.5rem 0; text-align: center;">
        <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">📧</span>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #3730a3; margin-bottom: 0.25rem;">Email Kontak Resmi DMCA & Takedown</h3>
        <p style="font-size: 0.95rem; color: #4338ca; margin-bottom: 1rem;">Seluruh surat pemberitahuan takedown resmi dikirimkan langsung ke:</p>
        <a href="mailto:filedontol@gmail.com?subject=Laporan%20Takedown%20DMCA%20-%20filedontol" class="btn btn-primary" style="font-size: 1.05rem; padding: 0.75rem 2rem;">
          📩 Kirim Email ke filedontol@gmail.com
        </a>
      </div>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-indigo);">
        1. Prosedur Pelaporan Pelanggaran Hak Cipta
      </h3>
      <p style="margin-bottom: 1rem;">
        Jika Anda adalah pemilik hak cipta sah atau agen/kuasa hukum yang ditunjuk, dan menemukan bahwa file yang diunggah ke platform <strong>filedontol</strong> melanggar hak cipta Anda, silakan kirimkan pemberitahuan resmi takedown melalui email di atas atau menggunakan formulir laporan cepat kami:
      </p>

      <div style="margin-bottom: 1.5rem;">
        <a href="/report" class="btn btn-outline" style="font-weight: 700; color: var(--rose-red); border-color: var(--rose-red);">
          🚩 Buka Form Laporan Penyalahgunaan File
        </a>
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
