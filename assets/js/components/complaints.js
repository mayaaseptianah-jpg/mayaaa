/**
 * MODUL 3: MANAJEMEN PENGADUAN & LAPORAN WARGA (PUBLIC COMPLAINTS)
 * Berdasarkan SKILL.md & PRD Smart Water Management Pagar Alam
 */

window.ComplaintsModule = {
  currentFilterCategory: "Semua",
  currentFilterStatus: "Semua",

  render(container) {
    const state = window.store.state;

    // Hitung Metrik Tiket
    const total = state.complaints.length;
    const diterima = state.complaints.filter(c => c.status === "Diterima").length;
    const penanganan = state.complaints.filter(c => c.status === "Diverifikasi" || c.status === "Dalam Penanganan").length;
    const selesai = state.complaints.filter(c => c.status === "Selesai").length;

    // Filter Aduan
    let filtered = state.complaints;
    if (this.currentFilterCategory !== "Semua") {
      filtered = filtered.filter(c => c.kategori === this.currentFilterCategory);
    }
    if (this.currentFilterStatus !== "Semua") {
      filtered = filtered.filter(c => c.status === this.currentFilterStatus);
    }

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Modul -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Pengaduan & Laporan Warga</h1>
              <span class="dummy-badge">Data Contoh / Simulasi</span>
            </div>
            <p class="text-sm text-slate-500 mt-1">
              Penerimaan, verifikasi teknis lapangan, dan pelacakan tindak lanjut gangguan jaringan air Kota Pagar Alam.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.ComplaintsModule.openCreateComplaintModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">add_alert</span>
              Buat Laporan Aduan Baru
            </button>
          </div>
        </div>

        <!-- 4 Kartu Status Tiket Aduan -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>Total Laporan Masuk</span>
              <span class="material-symbols-outlined text-blue-600">receipt_long</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-slate-900">${total}</div>
            <div class="mt-1 text-[11px] text-slate-500">Semua riwayat pengaduan</div>
          </div>

          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-amber-700 text-xs font-semibold uppercase">
              <span>Menunggu Verifikasi</span>
              <span class="material-symbols-outlined text-amber-600">pending_actions</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-amber-600">${diterima}</div>
            <div class="mt-1 text-[11px] text-amber-700 font-medium">Perlu ditugaskan ke teknisi</div>
          </div>

          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-blue-700 text-xs font-semibold uppercase">
              <span>Dalam Penanganan</span>
              <span class="material-symbols-outlined text-blue-600">engineering</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-blue-600">${penanganan}</div>
            <div class="mt-1 text-[11px] text-blue-700 font-medium">Tim UPTD sedang di lokasi</div>
          </div>

          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-emerald-700 text-xs font-semibold uppercase">
              <span>Laporan Selesai</span>
              <span class="material-symbols-outlined text-emerald-600">task_alt</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-emerald-600">${selesai}</div>
            <div class="mt-1 text-[11px] text-emerald-700 font-medium">Perbaikan telah rampung</div>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div class="gov-card p-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-semibold text-slate-700">Filter Kategori:</span>
              ${["Semua", "Pipa Bocor", "Aliran Mati", "Air Keruh / Bau", "Tekanan Rendah"].map(cat => `
                <button onclick="window.ComplaintsModule.setCategoryFilter('${cat}')" class="px-2.5 py-1 rounded-full text-xs transition ${this.currentFilterCategory === cat ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                  ${cat}
                </button>
              `).join('')}
            </div>

            <div class="flex items-center gap-2">
              <span class="font-semibold text-slate-700">Status:</span>
              <select onchange="window.ComplaintsModule.setStatusFilter(this.value)" class="px-2.5 py-1 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500">
                <option value="Semua" ${this.currentFilterStatus === 'Semua' ? 'selected' : ''}>Semua Status</option>
                <option value="Diterima" ${this.currentFilterStatus === 'Diterima' ? 'selected' : ''}>Diterima</option>
                <option value="Diverifikasi" ${this.currentFilterStatus === 'Diverifikasi' ? 'selected' : ''}>Diverifikasi</option>
                <option value="Dalam Penanganan" ${this.currentFilterStatus === 'Dalam Penanganan' ? 'selected' : ''}>Dalam Penanganan</option>
                <option value="Selesai" ${this.currentFilterStatus === 'Selesai' ? 'selected' : ''}>Selesai</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tabel Daftar Pengaduan -->
        <div class="gov-card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-slate-900">Daftar Tiket Pengaduan Masyarakat</h2>
            <span class="text-xs text-slate-500 font-medium">Menampilkan ${filtered.length} dari ${total} tiket</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3">No. Tiket</th>
                  <th class="py-3 px-3">Waktu Masuk</th>
                  <th class="py-3 px-3">Pelapor & Kontak</th>
                  <th class="py-3 px-3">Wilayah & Patokan Lokasi</th>
                  <th class="py-3 px-3">Kategori Gangguan</th>
                  <th class="py-3 px-3">Deskripsi</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3 text-center">Aksi Tindak Lanjut</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="8" class="text-center py-8 text-slate-400">Tidak ada pengaduan dengan filter yang dipilih.</td>
                  </tr>
                ` : filtered.map(c => {
                  let badge = "badge-info";
                  if (c.status === "Diterima") badge = "badge-danger";
                  if (c.status === "Diverifikasi") badge = "badge-warning";
                  if (c.status === "Dalam Penanganan") badge = "badge-info";
                  if (c.status === "Selesai") badge = "badge-normal";

                  return `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="py-3 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">${c.ticketNumber}</td>
                      <td class="py-3 px-3 text-slate-500 whitespace-nowrap">${c.createdAt}</td>
                      <td class="py-3 px-3">
                        <div class="font-semibold text-slate-900">${c.pelapor}</div>
                        <div class="text-[11px] text-slate-400 font-mono">${c.telepon}</div>
                      </td>
                      <td class="py-3 px-3">
                        <div class="font-semibold text-slate-800">${c.wilayahNama}</div>
                        <div class="text-[11px] text-slate-500 truncate max-w-xs" title="${c.alamat}">${c.alamat}</div>
                      </td>
                      <td class="py-3 px-3">
                        <span class="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          ${c.kategori}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-slate-600 max-w-xs truncate" title="${c.deskripsi}">${c.deskripsi}</td>
                      <td class="py-3 px-3 text-center whitespace-nowrap">
                        <span class="px-2 py-0.5 rounded text-[11px] font-semibold inline-flex items-center gap-1 ${badge}">
                          ${c.status}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-center whitespace-nowrap">
                        <button onclick="window.ComplaintsModule.openDetailModal(${c.id})" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-blue-600 font-semibold border border-slate-200 text-xs">
                          Tindak Lanjut
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  setCategoryFilter(cat) {
    this.currentFilterCategory = cat;
    this.render(document.getElementById("main-module-container"));
  },

  setStatusFilter(status) {
    this.currentFilterStatus = status;
    this.render(document.getElementById("main-module-container"));
  },

  openCreateComplaintModal() {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    const zones = window.store.state.zones;
    const currentUser = window.store.state.currentUser;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="gov-card max-w-lg w-full p-6 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600">add_alert</span>
              Formulir Laporan Pengaduan Gangguan Air
            </h3>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="form-buat-aduan" class="mt-4 space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Nama Pelapor</label>
                <input type="text" id="aduan-nama" value="${currentUser.nama}" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">No. Kontak / WhatsApp</label>
                <input type="text" id="aduan-kontak" value="0852-XXXX-XXXX" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Wilayah / Kecamatan</label>
                <select id="aduan-wilayah-id" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  ${zones.map(z => `<option value="${z.id}">${z.nama}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Kategori Gangguan</label>
                <select id="aduan-kategori" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Pipa Bocor">Pipa Bocor / Pecah</option>
                  <option value="Aliran Mati">Aliran Air Mati Total</option>
                  <option value="Air Keruh / Bau">Kualitas Air Keruh / Berbau</option>
                  <option value="Tekanan Rendah">Tekanan Air Rendah / Menetes</option>
                  <option value="Meteran Rusak">Meteran Air Rusak / Anomali</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Alamat Patokan Lokasi</label>
              <input type="text" id="aduan-alamat" placeholder="Contoh: Jl. Lematang No. 12 (Sebelah Toko Berkah)" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Deskripsi Lengkap Masalah</label>
              <textarea id="aduan-deskripsi" rows="3" placeholder="Jelaskan kondisi pipa, sejak kapan terjadi, dan dampaknya..." class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Lampirkan Foto Bukti (Simulasi)</label>
              <div class="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                <span class="material-symbols-outlined text-slate-400 text-2xl">add_photo_alternate</span>
                <p class="text-[11px] text-slate-500 mt-1">Klik untuk melampirkan foto pipa bocor / meteran air</p>
                <span class="text-[10px] text-slate-400 font-mono">(Format JPG, PNG maks 5MB)</span>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button type="button" onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                Batal
              </button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Kirim Laporan Pengaduan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById("form-buat-aduan").addEventListener("submit", (e) => {
      e.preventDefault();
      const wId = parseInt(document.getElementById("aduan-wilayah-id").value);
      const zone = window.store.state.zones.find(z => z.id === wId);

      window.store.addComplaint({
        pelapor: document.getElementById("aduan-nama").value,
        telepon: document.getElementById("aduan-kontak").value,
        wilayahId: wId,
        wilayahNama: zone ? zone.nama : "Pagar Alam",
        kategori: document.getElementById("aduan-kategori").value,
        alamat: document.getElementById("aduan-alamat").value,
        deskripsi: document.getElementById("aduan-deskripsi").value
      });

      modalContainer.innerHTML = "";
      window.ComplaintsModule.render(document.getElementById("main-module-container"));
    });
  },

  openDetailModal(id) {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    const complaint = window.store.state.complaints.find(c => c.id === id);
    if (!complaint) return;

    const state = window.store.state;
    const isOfficer = state.currentRole !== "masyarakat";

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="gov-card max-w-lg w-full p-6 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span class="text-[11px] font-mono font-bold text-blue-600">${complaint.ticketNumber}</span>
              <h3 class="text-base font-bold text-slate-900">Detail & Tindak Lanjut Pengaduan</h3>
            </div>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="mt-4 space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg">
              <div>
                <span class="text-slate-500">Pelapor:</span>
                <div class="font-bold text-slate-900">${complaint.pelapor}</div>
                <div class="text-[11px] text-slate-400 font-mono">${complaint.telepon}</div>
              </div>
              <div>
                <span class="text-slate-500">Waktu Lapor:</span>
                <div class="font-bold text-slate-900">${complaint.createdAt}</div>
                <div class="text-[11px] text-slate-600 font-semibold">${complaint.wilayahNama}</div>
              </div>
            </div>

            <div>
              <span class="font-semibold text-slate-700">Kategori & Masalah:</span>
              <div class="mt-1 font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded border border-blue-200">
                ${complaint.kategori}
              </div>
            </div>

            <div>
              <span class="font-semibold text-slate-700">Lokasi / Patokan Alamat:</span>
              <p class="mt-0.5 text-slate-800">${complaint.alamat}</p>
            </div>

            <div>
              <span class="font-semibold text-slate-700">Deskripsi Gangguan:</span>
              <p class="mt-0.5 text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">${complaint.deskripsi}</p>
            </div>

            <!-- Form Tindak Lanjut Khusus Petugas UPTD / Admin -->
            <div class="pt-3 border-t border-slate-200">
              <h4 class="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-blue-600 text-sm">engineering</span>
                Tindak Lanjut Operasional UPTD
              </h4>

              ${isOfficer ? `
                <form id="form-tindak-lanjut" class="space-y-3">
                  <div>
                    <label class="block font-semibold text-slate-700 mb-1">Perbarui Status Tiket</label>
                    <select id="update-status" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                      <option value="Diterima" ${complaint.status === 'Diterima' ? 'selected' : ''}>Diterima (Menunggu Tim)</option>
                      <option value="Diverifikasi" ${complaint.status === 'Diverifikasi' ? 'selected' : ''}>Diverifikasi (Inspeksi Lapangan)</option>
                      <option value="Dalam Penanganan" ${complaint.status === 'Dalam Penanganan' ? 'selected' : ''}>Dalam Penanganan (Perbaikan Berjalan)</option>
                      <option value="Selesai" ${complaint.status === 'Selesai' ? 'selected' : ''}>Selesai (Perbaikan Tuntas)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-semibold text-slate-700 mb-1">Catatan Penanganan Lapangan / Petugas</label>
                    <textarea id="update-catatan" rows="3" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tuliskan tindakan teknis, penggantian suku cadang, atau hasil uji...">${complaint.catatanPetugas || ''}</textarea>
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-2">
                    <button type="button" onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600">
                      Tutup
                    </button>
                    <button type="submit" class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                      Perbarui Status Laporan
                    </button>
                  </div>
                </form>
              ` : `
                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500">Status Terkini:</span>
                    <span class="font-bold text-blue-700">${complaint.status}</span>
                  </div>
                  <div class="mt-2 text-slate-700"><b>Catatan Tim UPTD:</b> ${complaint.catatanPetugas || 'Belum ada catatan.'}</div>
                  <div class="mt-1 text-[11px] text-slate-400">Petugas Penangan: ${complaint.petugas}</div>
                </div>
                <div class="flex justify-end pt-3">
                  <button type="button" onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-600">
                    Tutup
                  </button>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    if (isOfficer) {
      document.getElementById("form-tindak-lanjut").addEventListener("submit", (e) => {
        e.preventDefault();
        const newStatus = document.getElementById("update-status").value;
        const catatan = document.getElementById("update-catatan").value;

        window.store.updateComplaintStatus(complaint.id, newStatus, catatan);
        modalContainer.innerHTML = "";
        window.ComplaintsModule.render(document.getElementById("main-module-container"));
      });
    }
  }
};

