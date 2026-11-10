/**
 * MODUL 1: RINGKASAN EKSEKUTIF & PETA DISTRIBUSI (OVERVIEW & GIS)
 * Berdasarkan SKILL.md & PRD Smart Water Management Pagar Alam
 */

window.OverviewModule = {
  mapInstance: null,

  render(container) {
    const state = window.store.state;
    
    // Hitung KPI Dinamis
    const totalDistribusi = state.zones.reduce((acc, z) => acc + z.debitLps, 0).toFixed(1);
    const rerataTekanan = (state.zones.reduce((acc, z) => acc + z.tekananBar, 0) / state.zones.length).toFixed(2);
    const sensorNormalCount = state.sensors.filter(s => s.statusKualitas === "Memenuhi Baku Mutu").length;
    const persentaseKualitas = Math.round((sensorNormalCount / state.sensors.length) * 100);
    const tiketAktifCount = state.complaints.filter(c => c.status !== "Selesai").length;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Halaman & Keterangan Operasional -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Ringkasan Eksekutif & Peta Distribusi</h1>
              <span class="dummy-badge">Data Contoh / Simulasi</span>
            </div>
            <p class="text-sm text-slate-500 mt-1">
              Pemantauan real-time transmisi pipa, telemetri sensor SCADA, dan status layanan air minum se-Kota Pagar Alam.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              SCADA UPTD Sinkron (Live)
            </span>
            <button onclick="window.OverviewModule.refreshMap()" class="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">refresh</span>
              Segarkan
            </button>
          </div>
        </div>

        <!-- 4 Kartu KPI Operasional Utama Sesuai SKILL.md -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- KPI 1: Debit Distribusi -->
          <div class="gov-card p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Debit Pasokan</span>
              <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined">water_drop</span>
              </div>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">${totalDistribusi}</span>
              <span class="text-sm font-medium text-slate-500">Liter / Detik (Lps)</span>
            </div>
            <div class="mt-2 text-xs text-emerald-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">trending_up</span>
              <span>Kapasitas intake 210 Lps (Stabil)</span>
            </div>
          </div>

          <!-- KPI 2: Rerata Tekanan -->
          <div class="gov-card p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Rerata Tekanan Jaringan</span>
              <div class="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <span class="material-symbols-outlined">speed</span>
              </div>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">${rerataTekanan}</span>
              <span class="text-sm font-medium text-slate-500">Bar</span>
            </div>
            <div class="mt-2 text-xs text-amber-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">info</span>
              <span>Standar $\\ge$ 2.50 Bar (PA Selatan fluktuatif)</span>
            </div>
          </div>

          <!-- KPI 3: Baku Mutu Air -->
          <div class="gov-card p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Kepatuhan Baku Mutu</span>
              <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span class="material-symbols-outlined">verified</span>
              </div>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">${persentaseKualitas}%</span>
              <span class="text-sm font-medium text-slate-500">Lolos Permenkes</span>
            </div>
            <div class="mt-2 text-xs text-slate-500 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">biotech</span>
              <span>4 dari 5 titik uji sampling aman</span>
            </div>
          </div>

          <!-- KPI 4: Gangguan & Tiket Aktif -->
          <div class="gov-card p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Laporan Gangguan Aktif</span>
              <div class="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <span class="material-symbols-outlined">report_problem</span>
              </div>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold ${tiketAktifCount > 0 ? 'text-amber-600' : 'text-slate-900'}">${tiketAktifCount}</span>
              <span class="text-sm font-medium text-slate-500">Tiket Terbuka</span>
            </div>
            <div class="mt-2 text-xs text-blue-600 flex items-center gap-1 cursor-pointer hover:underline" onclick="window.store.setTab('complaints')">
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
              <span>Buka modul penanganan aduan</span>
            </div>
          </div>
        </div>

        <!-- Bagian Tengah: Peta Distribusi GIS & Legenda Status SKILL.md -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Peta Interaktif (2 Kolom) -->
          <div class="gov-card p-5 lg:col-span-2 flex flex-col">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600">map</span>
                  Peta GIS Jaringan Air Bersih Kota Pagar Alam
                </h2>
                <p class="text-xs text-slate-500">Menampilkan pipa transmisi, pipa distribusi, titik sensor telemetri, dan zona pemeliharaan.</p>
              </div>
              <div class="text-xs text-slate-400 font-mono">Pusat: -4.0250, 103.2650</div>
            </div>

            <!-- Kontainer Peta Leaflet -->
            <div id="overview-map" class="w-full h-[400px] rounded-lg border border-slate-200 bg-slate-100 z-0"></div>

            <!-- Legenda Standar SKILL.md Bab 6.5 -->
            <div class="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span class="font-semibold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">palette</span> Legenda Jaringan:
              </span>
              <div class="flex items-center gap-1.5">
                <span class="w-3.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>Pipa Transmisi Utama</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Tekanan Normal ($\\ge$ 2.5 Bar)</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Tekanan Rendah (&lt; 2.0 Bar)</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3.5 h-1.5 rounded-full bg-red-500"></span>
                <span>Pipa Pemeliharaan / Perbaikan</span>
              </div>
            </div>
          </div>

          <!-- Panel Gangguan Kritis & Informasi Zona (1 Kolom) -->
          <div class="space-y-4">
            <!-- Alert & Gangguan Terkini -->
            <div class="gov-card p-5">
              <h3 class="text-sm font-bold text-slate-900 flex items-center justify-between mb-3">
                <span class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-amber-500 text-lg">crisis_alert</span>
                  Alert Operasional Terkini
                </span>
                <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">2 Peringatan</span>
              </h3>
              <div class="space-y-3">
                <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                  <div class="flex items-center justify-between font-semibold text-amber-900">
                    <span>Tekanan Rendah - Nendagung</span>
                    <span>17:20 WIB</span>
                  </div>
                  <p class="text-amber-800 mt-1">Sensor SNS-PAS-02 membaca 1.85 Bar. Katup booster disesuaikan bertahap.</p>
                </div>
                <div class="p-3 rounded-lg bg-red-50 border border-red-200 text-xs">
                  <div class="flex items-center justify-between font-semibold text-red-900">
                    <span>Overhaul Pompa Bumi Agung</span>
                    <span>Aktif</span>
                  </div>
                  <p class="text-red-800 mt-1">Pipa transmisi lereng Dempo segmen PA-04 dialihkan via gravitasi.</p>
                </div>
              </div>
            </div>

            <!-- Rekap Status per Zona Wilayah -->
            <div class="gov-card p-5">
              <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Status Zona Wilayah</span>
                <span class="text-xs font-normal text-slate-500">5 Kecamatan</span>
              </h3>
              <div class="space-y-2.5">
                ${state.zones.map(z => {
                  let badgeClass = "badge-normal";
                  let icon = "check_circle";
                  if (z.status === "Tekanan Rendah") {
                    badgeClass = "badge-warning";
                    icon = "warning";
                  } else if (z.status === "Pemeliharaan") {
                    badgeClass = "badge-danger";
                    icon = "build";
                  }
                  return `
                    <div class="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition text-xs border border-transparent hover:border-slate-100">
                      <div>
                        <div class="font-semibold text-slate-800">${z.nama}</div>
                        <div class="text-[11px] text-slate-500">${z.sambunganRumah.toLocaleString()} SR | ${z.tekananBar} Bar</div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${badgeClass}">
                        <span class="material-symbols-outlined text-[14px]">${icon}</span>
                        ${z.status}
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Tabel Ringkasan Operasional Distribusi -->
        <div class="gov-card p-5">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-900">Kondisi Aliran & Jadwal Distribusi Wilayah</h2>
              <p class="text-xs text-slate-500">Data operasional UPTD Air Bersih Pagar Alam yang diperbarui secara berkala.</p>
            </div>
            ${state.currentRole !== 'masyarakat' ? `
              <button onclick="window.OverviewModule.openUpdateDistribusiModal()" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-sm">edit</span>
                Pembaruan Status Distribusi
              </button>
            ` : ''}
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3">Kode</th>
                  <th class="py-3 px-3">Wilayah / Kecamatan</th>
                  <th class="py-3 px-3">Status Distribusi</th>
                  <th class="py-3 px-3">Jadwal Aliran</th>
                  <th class="py-3 px-3 text-right">Debit (Lps)</th>
                  <th class="py-3 px-3 text-right">Tekanan (Bar)</th>
                  <th class="py-3 px-3">Keterangan Teknis</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${state.zones.map(z => {
                  let badge = "badge-normal";
                  if (z.status === "Tekanan Rendah") badge = "badge-warning";
                  if (z.status === "Pemeliharaan") badge = "badge-danger";
                  return `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="py-3 px-3 font-mono font-medium text-slate-600">${z.kode}</td>
                      <td class="py-3 px-3 font-semibold text-slate-900">${z.nama}</td>
                      <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded text-[11px] font-semibold inline-flex items-center gap-1 ${badge}">
                          ${z.status}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-slate-600">${z.jadwal}</td>
                      <td class="py-3 px-3 text-right font-mono font-medium text-slate-900">${z.debitLps.toFixed(1)}</td>
                      <td class="py-3 px-3 text-right font-mono font-semibold ${z.tekananBar < 2.0 ? 'text-amber-600' : 'text-emerald-700'}">${z.tekananBar.toFixed(2)}</td>
                      <td class="py-3 px-3 text-slate-500 max-w-xs truncate" title="${z.keterangan}">${z.keterangan}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Inisialisasi Peta GIS Leaflet setelah DOM terpasang
    setTimeout(() => {
      this.initMap();
    }, 100);
  },

  initMap() {
    const mapElement = document.getElementById("overview-map");
    if (!mapElement) return;

    if (this.mapInstance) {
      try {
        this.mapInstance.remove();
      } catch (e) {
        console.warn("Leaflet cleanup:", e);
      }
      this.mapInstance = null;
    }

    if (mapElement._leaflet_id) {
      mapElement._leaflet_id = null;
    }

    // Koordinat pusat Kota Pagar Alam
    const map = L.map("overview-map").setView([-4.0250, 103.2650], 12);
    this.mapInstance = map;

    // Basemap OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | UPTD Air Bersih Pagar Alam',
      maxZoom: 18
    }).addTo(map);

    const data = window.SMART_WATER_DATA;

    // 1. Gambar Jaringan Pipa Distribusi (Polylines)
    data.pipelineNetworks.forEach(pipe => {
      const line = L.polyline(pipe.coordinates, {
        color: pipe.color,
        weight: pipe.weight,
        opacity: 0.85,
        smoothFactor: 1
      }).addTo(map);

      line.bindPopup(`
        <div class="p-3">
          <div class="text-xs font-bold text-slate-900">${pipe.name}</div>
          <div class="text-[11px] text-slate-600 mt-1">Status: <span class="font-semibold" style="color:${pipe.color}">${pipe.status}</span></div>
          <div class="text-[10px] text-slate-400 mt-1 font-mono">ID: ${pipe.id}</div>
        </div>
      `);
    });

    // 2. Tandai Stasiun Pompa & Reservoir
    data.pumps.forEach(pump => {
      const pumpIcon = L.divIcon({
        className: 'custom-pump-icon',
        html: `
          <div style="background-color: #1E40AF; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            <span class="material-symbols-outlined" style="font-size: 16px;">water_pump</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      // Ambil coords acuan dari zona terdekat
      let coords = [-4.0125, 103.2510];
      if (pump.id === 2) coords = [-4.0310, 103.2720];
      if (pump.id === 3) coords = [-3.9810, 103.2280];
      if (pump.id === 4) coords = [-3.9920, 103.2410];

      const marker = L.marker(coords, { icon: pumpIcon }).addTo(map);
      marker.bindPopup(`
        <div class="p-3">
          <div class="flex items-center gap-1.5 text-xs font-bold text-blue-900">
            <span class="material-symbols-outlined text-sm">water_pump</span>
            ${pump.nama}
          </div>
          <div class="text-xs text-slate-600 mt-1.5">Kapasitas: <b>${pump.kapasitasLps} Lps</b></div>
          <div class="text-xs text-slate-600">Tekanan Output: <b>${pump.tekananBar} Bar</b></div>
          <div class="text-xs text-slate-600">Status Operasi: 
            <span class="font-bold ${pump.status === 'Aktif' ? 'text-emerald-600' : 'text-amber-600'}">${pump.status}</span>
          </div>
        </div>
      `);
    });

    // 3. Tandai Titik Sensor Telemetri
    window.store.state.sensors.forEach(sensor => {
      let pinColor = "#10B981"; // Hijau (Normal)
      if (sensor.tekananBar < 2.0) pinColor = "#F59E0B"; // Amber (Tekanan rendah)

      const sensorIcon = L.divIcon({
        className: 'custom-sensor-icon',
        html: `
          <div style="background-color: ${pinColor}; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.25);">
            <span class="material-symbols-outlined" style="font-size: 13px;">sensors</span>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const sensorMarker = L.marker(sensor.coords, { icon: sensorIcon }).addTo(map);
      sensorMarker.bindPopup(`
        <div class="p-3">
          <div class="font-bold text-slate-900 text-xs">${sensor.nama}</div>
          <div class="text-[11px] text-slate-500 font-mono">${sensor.id} (${sensor.wilayahNama})</div>
          <div class="mt-2 space-y-1 text-xs">
            <div class="flex justify-between gap-4"><span>Tekanan:</span><b class="${sensor.tekananBar < 2.0 ? 'text-amber-600' : 'text-slate-900'}">${sensor.tekananBar} Bar</b></div>
            <div class="flex justify-between gap-4"><span>pH:</span><b>${sensor.ph}</b></div>
            <div class="flex justify-between gap-4"><span>Kekeruhan:</span><b>${sensor.kekeruhanNtu} NTU</b></div>
            <div class="flex justify-between gap-4"><span>Suhu:</span><b>${sensor.suhuC} °C</b></div>
          </div>
          <div class="mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">Update: ${sensor.lastUpdate}</div>
        </div>
      `);
    });
  },

  refreshMap() {
    if (this.mapInstance) {
      this.mapInstance.invalidateSize();
    }
  },

  openUpdateDistribusiModal() {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    const zones = window.store.state.zones;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="gov-card max-w-md w-full p-6 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600">tune</span>
              Pembaruan Distribusi Air UPTD
            </h3>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="form-update-distribusi" class="mt-4 space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Pilih Wilayah / Kecamatan</label>
              <select id="dist-wilayah-id" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                ${zones.map(z => `<option value="${z.id}">${z.nama} (${z.kode})</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Status Aliran Distribusi</label>
              <select id="dist-status" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Normal">Normal (Aliran Stabil)</option>
                <option value="Tekanan Rendah">Tekanan Rendah</option>
                <option value="Pemeliharaan">Pemeliharaan / Perbaikan</option>
                <option value="Gangguan Aliran">Gangguan Aliran / Terhenti</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Debit Terukur (Lps)</label>
                <input type="number" step="0.1" id="dist-debit" value="50.0" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Tekanan (Bar)</label>
                <input type="number" step="0.05" id="dist-tekanan" value="2.5" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Jadwal Aliran</label>
              <input type="text" id="dist-jadwal" value="24 Jam Nonstop" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Keterangan Teknis Petugas</label>
              <textarea id="dist-keterangan" rows="2" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Keterangan pasokan atau instruksi operasional..."></textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button type="button" onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                Batal
              </button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById("form-update-distribusi").addEventListener("submit", (e) => {
      e.preventDefault();
      const zId = parseInt(document.getElementById("dist-wilayah-id").value);
      const zone = window.store.state.zones.find(z => z.id === zId);
      if (zone) {
        zone.status = document.getElementById("dist-status").value;
        zone.debitLps = parseFloat(document.getElementById("dist-debit").value);
        zone.tekananBar = parseFloat(document.getElementById("dist-tekanan").value);
        zone.jadwal = document.getElementById("dist-jadwal").value;
        zone.keterangan = document.getElementById("dist-keterangan").value || zone.keterangan;

        window.store.emit("zones:updated", window.store.state.zones);
        window.store.addNotification({
          judul: `Update Distribusi: ${zone.nama}`,
          pesan: `Status distribusi ${zone.nama} diubah menjadi "${zone.status}" (${zone.tekananBar} Bar).`,
          kategori: "Sistem"
        });
      }
      modalContainer.innerHTML = "";
      window.OverviewModule.render(document.getElementById("main-module-container"));
    });
  }
};

