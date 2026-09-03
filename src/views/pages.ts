import { getLayoutHtml } from './layout';

export function getIndexHtml(): string {
  const content = `
    <div class="card" style="text-align: center;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">Unggah & Bagikan File Anda</h1>
      <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.5rem;">
        Cepat, aman, dan tanpa iklan yang mengganggu.
      </p>

      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-bottom: 2rem;">
        <span style="font-size: 0.85rem; font-weight: 600; padding: 0.35rem 0.85rem; background: #eff6ff; color: #1d4ed8; border-radius: 9999px; border: 1px solid #bfdbfe;">
          ⚡ Maksimal ukuran file hingga 5 GB
        </span>
        <span style="font-size: 0.85rem; font-weight: 600; padding: 0.35rem 0.85rem; background: #f0fdf4; color: #15803d; border-radius: 9999px; border: 1px solid #bbf7d0;">
          Guest Upload: Aktif 14 hari (diperpanjang otomatis setiap ada yang download)
        </span>
        <span style="font-size: 0.85rem; font-weight: 600; padding: 0.35rem 0.85rem; background: #faf5ff; color: #7e22ce; border-radius: 9999px; border: 1px solid #e9d5ff;">
          Member Upload: Aktif 60 hari (diperpanjang otomatis setiap ada yang download)
        </span>
      </div>

      <div id="drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 3.5rem 1.5rem; background: #f8fafc; cursor: pointer; transition: all 0.2s ease; margin-bottom: 1.5rem;" onclick="document.getElementById('file-input').click()">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" style="margin: 0 auto 1rem auto; display: block;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-main);">Tarik & lepas file di sini, atau klik untuk memilih file</p>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.35rem;">Mendukung semua format file hingga 5 GB</p>
        <input type="file" id="file-input" style="display: none;" onchange="handleFileSelect(event)" />
      </div>

      <div id="upload-progress-container" style="display: none; text-align: left; background: #f1f5f9; padding: 1.25rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">
          <span id="progress-filename" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%;">Nama File</span>
          <span id="progress-percent">0%</span>
        </div>
        <div style="width: 100%; background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden;">
          <div id="progress-bar" style="width: 0%; height: 100%; background: var(--primary-blue); transition: width 0.1s linear;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.35rem;">
          <span id="progress-status">Mengunggah...</span>
          <span id="progress-size">0 / 0 MB</span>
        </div>
      </div>

      <div id="upload-result-container" style="display: none; text-align: left; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="color: #166534; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">✅ File Berhasil Diunggah!</h4>
        <p style="font-size: 0.9rem; color: #15803d; margin-bottom: 1rem;">Bagikan tautan di bawah ini untuk mengunduh file:</p>

        <div style="display: flex; gap: 0.5rem;">
          <input type="text" id="share-link-input" readonly style="flex: 1; padding: 0.625rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.375rem; font-size: 0.95rem; background: #ffffff; color: var(--text-main);" />
          <button class="btn btn-primary" onclick="copyShareLink()" id="btn-copy">Salin Tautan</button>
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: #166534;" id="result-expiration-info"></div>
      </div>

      <div id="upload-error-container" style="display: none; text-align: left; background: #fef2f2; border: 1px solid #fecaca; padding: 1rem 1.25rem; border-radius: 0.5rem; color: #991b1b; font-size: 0.9rem; margin-top: 1rem;"></div>
    </div>

    <script>
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
        const btn = document.getElementById('btn-copy');
        btn.innerText = 'Tersalin!';
        setTimeout(() => { btn.innerText = 'Salin Tautan'; }, 2000);
      }
    </script>
  `;

  return getLayoutHtml('Unggah File', content);
}

export function getDownloadPageHtml(shareCode: string): string {
  const content = `
    <div class="card" style="text-align: center;" id="download-card">
      <div id="loading-spinner" style="padding: 2rem; color: var(--text-muted);">
        Sedang memuat informasi file...
      </div>

      <div id="file-details" style="display: none;">
        <div style="background: #f1f5f9; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem; text-align: left;">
          <div style="background: var(--primary-blue); color: white; width: 56px; height: 56px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.25rem; flex-shrink: 0;">
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
          ⬇️ Download File
        </a>

        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem;">
          * Mengunduh file ini akan memperpanjang masa aktifnya secara otomatis.
        </p>
      </div>

      <div id="error-card" style="display: none; padding: 2rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚠️</div>
        <h3 id="error-title" style="font-size: 1.25rem; font-weight: 700; color: var(--danger-red); margin-bottom: 0.5rem;">Gagal Memuat File</h3>
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

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-blue);">
        1. Prosedur Pelaporan Pelanggaran Hak Cipta
      </h3>
      <p style="margin-bottom: 1rem;">
        Jika Anda adalah pemilik hak cipta sah atau agen/kuasa hukum yang ditunjuk, dan menemukan bahwa file yang diunggah ke platform <strong>filedontol</strong> melanggar hak cipta Anda, silakan kirimkan pemberitahuan resmi takedown melalui email ke:
      </p>

      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; padding: 1rem 1.25rem; font-weight: 700; font-size: 1.05rem; color: #1d4ed8; margin-bottom: 1.5rem; display: inline-block;">
        📧 Email Pengaduan DMCA: filedontol@gmail.com
      </div>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-blue);">
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

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: var(--primary-blue);">
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
