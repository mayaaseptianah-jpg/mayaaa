/**
 * MODUL 2: MONITORING KUALITAS AIR & TELEMETRI SENSOR (WATER QUALITY)
 * Berdasarkan SKILL.md & PRD Smart Water Management Pagar Alam
 * Standar Acuan: Permenkes No. 2 Tahun 2023 (Baku Mutu Air Minum)
 */

window.QualityModule = {
  chartInstance: null,

  render(container) {
    const state = window.store.state;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Modul -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Monitoring Kualitas Air & Telemetri Sensor</h1>
              <span class="dummy-badge">Data Contoh / Simulasi</span>
            </div>
            <p class="text-sm text-slate-500 mt-1">
              Pemantauan parameter fisik-kimia air minum real-time berdasarkan standar baku mutu Permenkes No. 2 Tahun 2023.
            </p>
          </div>
          <div class="flex items-center gap-2">
            ${state.currentRole !== 'masyarakat' ? `
              <button onclick="window.QualityModule.openInputLabModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-sm">add_circle</span>
                Input Hasil Uji Laboratorium
              </button>
            ` : `
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <span class="material-symbols-outlined text-sm">verified_user</span>
                Standar Air Bersih Terverifikasi
              </span>
            `}
          </div>
        </div>

        <!-- Kartu Parameter Baku Mutu Permenkes Standar Acuan -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Parameter 1: Derajat Keasaman (pH) -->
          <div class="gov-card p-5 border-l-4 border-l-blue-600">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Derajat Keasaman (pH)</span>
              <span class="material-symbols-outlined text-blue-600">science</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-slate-900">7.20</span>
              <span class="text-xs text-slate-500">Rerata Kota</span>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span class="text-slate-500">Standar Baku Mutu:</span>
              <span class="font-bold text-slate-700 font-mono">6.50 – 8.50</span>
            </div>
            <div class="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">check_circle</span>
              <span>100% Titik Sampling Netral/Aman</span>
            </div>
          </div>

          <!-- Parameter 2: Kekeruhan (Turbidity) -->
          <div class="gov-card p-5 border-l-4 border-l-cyan-600">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Kekeruhan (Turbidity)</span>
              <span class="material-symbols-outlined text-cyan-600">opacity</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-slate-900">1.95</span>
              <span class="text-xs text-slate-500">NTU</span>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span class="text-slate-500">Maksimal Baku Mutu:</span>
              <span class="font-bold text-slate-700 font-mono">&lt; 5.00 NTU</span>
            </div>
            <div class="mt-1 text-[11px] text-amber-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">warning</span>
              <span>Bumi Agung (4.20 NTU mendekati batas)</span>
            </div>
          </div>

          <!-- Parameter 3: Suhu Air -->
          <div class="gov-card p-5 border-l-4 border-l-teal-600">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Suhu Lingkungan Air</span>
              <span class="material-symbols-outlined text-teal-600">thermostat</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-slate-900">23.2</span>
              <span class="text-xs text-slate-500">°C</span>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span class="text-slate-500">Standar Normal:</span>
              <span class="font-bold text-slate-700 font-mono">Suhu Udara ± 3°C</span>
            </div>
            <div class="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">check_circle</span>
              <span>Suhu alami mata air Gunung Dempo</span>
            </div>
          </div>

          <!-- Parameter 4: Padatan Terlarut (TDS) -->
          <div class="gov-card p-5 border-l-4 border-l-indigo-600">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Padatan (TDS)</span>
              <span class="material-symbols-outlined text-indigo-600">filter_alt</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-slate-900">114</span>
              <span class="text-xs text-slate-500">ppm / mg/L</span>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span class="text-slate-500">Maksimal Baku Mutu:</span>
              <span class="font-bold text-slate-700 font-mono">&lt; 300 ppm</span>
            </div>
            <div class="mt-1 text-[11px] text-emerald-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">check_circle</span>
              <span>Sangat Baik (Air Pegunungan Segar)</span>
            </div>
          </div>
        </div>

        <!-- Baris Kedua: Grafik Tren Historis Sensor & Kartu Titik Telemetri -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Grafik Tren Kualitas Air 7 Hari Terakhir (2 Kolom) -->
          <div class="gov-card p-5 lg:col-span-2">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600">show_chart</span>
                  Tren Parameter Kualitas Air (7 Hari Terakhir)
                </h2>
                <p class="text-xs text-slate-500">Fluktuasi nilai pH dan kekeruhan (NTU) di Intake Sungai Lematang dan Reservoir Utama.</p>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <span class="inline-flex items-center gap-1 font-medium text-slate-600">
                  <span class="w-3 h-3 rounded bg-blue-600 inline-block"></span> pH
                </span>
                <span class="inline-flex items-center gap-1 font-medium text-slate-600 ml-2">
                  <span class="w-3 h-3 rounded bg-amber-500 inline-block"></span> Kekeruhan (NTU)
                </span>
              </div>
            </div>
            <div class="h-64 relative">
              <canvas id="qualityTrendChart"></canvas>
            </div>
          </div>

          <!-- Ringkasan Titik Sensor Aktif (1 Kolom) -->
          <div class="gov-card p-5 flex flex-col justify-between">
            <div>
              <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Stasiun Telemetri Sensor</span>
                <span class="text-xs font-normal text-slate-500">5 Titik Online</span>
              </h3>
              <div class="space-y-3">
                ${state.sensors.map(s => {
                  const isNormal = s.statusKualitas === "Memenuhi Baku Mutu";
                  return `
                    <div class="p-3 rounded-lg border ${isNormal ? 'border-slate-200 bg-white' : 'border-amber-200 bg-amber-50/50'} text-xs">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-900">${s.nama}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${isNormal ? 'badge-normal' : 'badge-warning'}">
                          ${s.statusKualitas}
                        </span>
                      </div>
                      <div class="text-[11px] text-slate-500 font-mono mt-0.5">${s.id} — ${s.wilayahNama}</div>
                      <div class="mt-2 grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-slate-700">
                        <div>pH: <b class="text-slate-900">${s.ph}</b></div>
                        <div>NTU: <b class="${s.kekeruhanNtu > 4 ? 'text-amber-600' : 'text-slate-900'}">${s.kekeruhanNtu}</b></div>
                        <div>Suhu: <b class="text-slate-900">${s.suhuC}°C</b></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              Sensor dikalibrasi berkala setiap 30 hari kerja oleh UPTD.
            </div>
          </div>
        </div>

        <!-- Tabel Riwayat Pemeriksaan Laboratorium & Uji Fisik-Kimia -->
        <div class="gov-card p-5">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-900">Riwayat Pengujian Laboratorium & Sampel Air</h2>
              <p class="text-xs text-slate-500">Catatan resmi pengujian berkala sampel air bersih Dinas PUPR UPTD Pagar Alam.</p>
            </div>
            <div class="text-xs text-slate-500 font-medium">
              Total Uji: <b class="text-slate-900 font-bold">${state.labTests.length} Catatan</b>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3">No. Uji</th>
                  <th class="py-3 px-3">Waktu Sampling</th>
                  <th class="py-3 px-3">Titik / Lokasi Sampel</th>
                  <th class="py-3 px-3 text-center">pH</th>
                  <th class="py-3 px-3 text-center">Kekeruhan (NTU)</th>
                  <th class="py-3 px-3 text-center">Suhu (°C)</th>
                  <th class="py-3 px-3 text-center">TDS (ppm)</th>
                  <th class="py-3 px-3 text-center">Status Mutu</th>
                  <th class="py-3 px-3">Petugas Penguji</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${state.labTests.map(t => {
                  let badge = "badge-normal";
                  if (t.status === "Perlu Pemeriksaan") badge = "badge-warning";
                  if (t.status === "Tidak Memenuhi") badge = "badge-danger";
                  return `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="py-3 px-3 font-mono font-medium text-slate-600">${t.id}</td>
                      <td class="py-3 px-3 text-slate-700">${t.tanggal}</td>
                      <td class="py-3 px-3 font-semibold text-slate-900">${t.titikUji}</td>
                      <td class="py-3 px-3 text-center font-mono font-bold text-blue-700">${t.ph.toFixed(2)}</td>
                      <td class="py-3 px-3 text-center font-mono font-bold ${t.kekeruhan > 4.0 ? 'text-amber-600' : 'text-slate-800'}">${t.kekeruhan.toFixed(2)}</td>
                      <td class="py-3 px-3 text-center font-mono text-slate-700">${t.suhu.toFixed(1)}</td>
                      <td class="py-3 px-3 text-center font-mono text-slate-700">${t.tds}</td>
                      <td class="py-3 px-3 text-center">
                        <span class="px-2 py-0.5 rounded text-[11px] font-semibold inline-flex items-center gap-1 ${badge}">
                          ${t.status}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-slate-600">${t.petugas}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initChart();
    }, 100);
  },

  initChart() {
    const canvas = document.getElementById("qualityTrendChart");
    if (!canvas) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const ctx = canvas.getContext("2d");
    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["4 Nov", "5 Nov", "6 Nov", "7 Nov", "8 Nov", "9 Nov", "10 Nov (Hari Ini)"],
        datasets: [
          {
            label: "Derajat Keasaman (pH)",
            data: [7.10, 7.15, 7.30, 7.20, 7.18, 7.22, 7.25],
            borderColor: "#2563EB",
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            yAxisID: "y"
          },
          {
            label: "Kekeruhan (NTU)",
            data: [1.80, 1.90, 2.40, 2.10, 1.60, 2.05, 1.45],
            borderColor: "#F59E0B",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [4, 4],
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            padding: 10,
            cornerRadius: 8,
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 6.0,
            max: 8.5,
            title: { display: true, text: 'Nilai pH', font: { size: 11 } }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            min: 0,
            max: 6.0,
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'Kekeruhan (NTU)', font: { size: 11 } }
          }
        }
      }
    });
  },

  openInputLabModal() {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    const zones = window.store.state.zones;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="gov-card max-w-lg w-full p-6 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600">biotech</span>
              Input Hasil Pengujian Laboratorium Air
            </h3>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="form-input-lab" class="mt-4 space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Wilayah / Titik Sampling</label>
              <select id="lab-wilayah-id" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                ${zones.map(z => `<option value="${z.id}">${z.nama} — Titik Distribusi Utama</option>`).join('')}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Nilai pH (Baku: 6.5 - 8.5)</label>
                <input type="number" step="0.01" min="0" max="14" id="lab-ph" value="7.20" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Kekeruhan (Baku: &lt; 5.0 NTU)</label>
                <input type="number" step="0.05" min="0" id="lab-ntu" value="1.80" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Suhu (°C)</label>
                <input type="number" step="0.1" id="lab-suhu" value="23.5" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">TDS (ppm)</label>
                <input type="number" id="lab-tds" value="115" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Klorin Bebas (mg/L)</label>
                <input type="number" step="0.05" id="lab-klorin" value="0.30" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Metode Pengujian / Peralatan</label>
              <input type="text" id="lab-metode" value="Multiparameter Water Quality Meter & Uji Kimiawi" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>

            <div class="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px]">
              <span class="font-bold">Info Validasi:</span> Sistem akan secara otomatis menganalisis kesesuaian nilai terhadap regulasi baku mutu air minum Permenkes No. 2 Tahun 2023.
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button type="button" onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                Batal
              </button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Simpan & Publikasikan Hasil Uji
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById("form-input-lab").addEventListener("submit", (e) => {
      e.preventDefault();
      const wId = parseInt(document.getElementById("lab-wilayah-id").value);
      const zone = window.store.state.zones.find(z => z.id === wId);

      window.store.addLabTest({
        wilayahId: wId,
        titikUji: `Pipa Distribusi ${zone ? zone.nama : 'Pagar Alam'}`,
        ph: document.getElementById("lab-ph").value,
        kekeruhan: document.getElementById("lab-ntu").value,
        suhu: document.getElementById("lab-suhu").value,
        tds: document.getElementById("lab-tds").value,
        klorin: document.getElementById("lab-klorin").value,
        metode: document.getElementById("lab-metode").value
      });

      modalContainer.innerHTML = "";
      window.QualityModule.render(document.getElementById("main-module-container"));
    });
  }
};

