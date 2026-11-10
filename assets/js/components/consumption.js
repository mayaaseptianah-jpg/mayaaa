/**
 * MODUL 4: ANALISIS KONSUMSI & ZONA WILAYAH (CONSUMPTION ANALYTICS)
 * Berdasarkan SKILL.md & PRD Smart Water Management Pagar Alam
 */

window.ConsumptionModule = {
  barChartInstance: null,
  peakChartInstance: null,

  render(container) {
    const state = window.store.state;
    const zones = state.zones;

    // Hitung Total Konsumsi Bulan Terakhir (Oktober/November)
    const totalKonsumsiBulanIni = zones.reduce((acc, z) => {
      const last = z.riwayatKonsumsiM3[z.riwayatKonsumsiM3.length - 1];
      return acc + last;
    }, 0);

    const totalSambunganRumah = zones.reduce((acc, z) => acc + z.sambunganRumah, 0);
    const rerataPerSR = (totalKonsumsiBulanIni / totalSambunganRumah).toFixed(1);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Modul -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Analisis Konsumsi & Zona Wilayah</h1>
              <span class="dummy-badge">Data Contoh / Simulasi</span>
            </div>
            <p class="text-sm text-slate-500 mt-1">
              Rekapitulasi volume pemakaian air minum per kecamatan, efisiensi distribusi, dan jam beban puncak.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm no-print">
              <span class="material-symbols-outlined text-sm">print</span>
              Cetak Rekapitulasi
            </button>
          </div>
        </div>

        <!-- 4 Kartu KPI Konsumsi Air -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="gov-card p-5">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>Total Konsumsi Bulanan</span>
              <span class="material-symbols-outlined text-blue-600">water_full</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">${totalKonsumsiBulanIni.toLocaleString()}</span>
              <span class="text-xs text-slate-500 font-medium">m³ / Bulan</span>
            </div>
            <div class="mt-2 text-xs text-emerald-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">trending_up</span>
              <span>Kenaikan 2.1% dari bulan lalu</span>
            </div>
          </div>

          <div class="gov-card p-5">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>Total Sambungan Rumah (SR)</span>
              <span class="material-symbols-outlined text-cyan-600">home</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">${totalSambunganRumah.toLocaleString()}</span>
              <span class="text-xs text-slate-500 font-medium">Pelanggan Aktif</span>
            </div>
            <div class="mt-2 text-xs text-slate-500">Cakupan 5 Kecamatan Pagar Alam</div>
          </div>

          <div class="gov-card p-5">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>Rerata Konsumsi per SR</span>
              <span class="material-symbols-outlined text-teal-600">speed</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">${rerataPerSR}</span>
              <span class="text-xs text-slate-500 font-medium">m³ / Kepala Keluarga</span>
            </div>
            <div class="mt-2 text-xs text-emerald-600">Sesuai pola pemakaian wajar</div>
          </div>

          <div class="gov-card p-5">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>Efisiensi Jaringan (NRW)</span>
              <span class="material-symbols-outlined text-indigo-600">pie_chart</span>
            </div>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-slate-900">83.4%</span>
              <span class="text-xs text-slate-500 font-medium">Air Teragihkan</span>
            </div>
            <div class="mt-2 text-xs text-amber-600">Kehilangan teknis (NRW): 16.6%</div>
          </div>
        </div>

        <!-- Bagian Grafik: Perbandingan Zona & Jam Beban Puncak -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Grafik 1: Perbandingan Konsumsi per Zona -->
          <div class="gov-card p-5">
            <div class="mb-3">
              <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">bar_chart</span>
                Komparasi Konsumsi Air per Wilayah (m³)
              </h2>
              <p class="text-xs text-slate-500">Perbandingan volume distribusi air yang dikonsumsi per kecamatan.</p>
            </div>
            <div class="h-64 relative">
              <canvas id="zoneComparisonChart"></canvas>
            </div>
          </div>

          <!-- Grafik 2: Pola Jam Puncak Pemakaian Harian -->
          <div class="gov-card p-5">
            <div class="mb-3">
              <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">schedule</span>
                Fluktuasi Jam Puncak Pemakaian Air (24 Jam)
              </h2>
              <p class="text-xs text-slate-500">Pola beban konsumsi air warga Pagar Alam (Puncak: Pagi & Sore hari).</p>
            </div>
            <div class="h-64 relative">
              <canvas id="peakHourChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Tabel Rincian Data Penggunaan Air per Zona -->
        <div class="gov-card p-5">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-900">Rekapitulasi Konsumsi Air per Wilayah Layanan</h2>
              <p class="text-xs text-slate-500">Rincian sambungan rumah tangga, volume penggunaan, dan efisiensi zona.</p>
            </div>
            <div class="text-xs text-slate-500">Periode: <b class="text-slate-800">Oktober – November 2026</b></div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3">Kode</th>
                  <th class="py-3 px-3">Kecamatan / Wilayah</th>
                  <th class="py-3 px-3 text-right">Sambungan (SR)</th>
                  <th class="py-3 px-3 text-right">Konsumsi Bulan Ini (m³)</th>
                  <th class="py-3 px-3 text-right">Rerata per SR (m³)</th>
                  <th class="py-3 px-3 text-right">Estimasi Tagihan (Rp)</th>
                  <th class="py-3 px-3 text-center">Status Pemakaian</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${zones.map(z => {
                  const currentM3 = z.riwayatKonsumsiM3[z.riwayatKonsumsiM3.length - 1];
                  const avgSR = (currentM3 / z.sambunganRumah).toFixed(1);
                  const estimasiRp = (currentM3 * 2600).toLocaleString('id-ID');

                  return `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="py-3 px-3 font-mono font-medium text-slate-600">${z.kode}</td>
                      <td class="py-3 px-3 font-semibold text-slate-900">${z.nama}</td>
                      <td class="py-3 px-3 text-right font-mono text-slate-700">${z.sambunganRumah.toLocaleString()}</td>
                      <td class="py-3 px-3 text-right font-mono font-bold text-blue-700">${currentM3.toLocaleString()} m³</td>
                      <td class="py-3 px-3 text-right font-mono text-slate-800">${avgSR} m³</td>
                      <td class="py-3 px-3 text-right font-mono text-emerald-700">Rp ${estimasiRp}</td>
                      <td class="py-3 px-3 text-center">
                        <span class="px-2 py-0.5 rounded text-[11px] font-semibold badge-normal">
                          Normal Stabil
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Fitur Khusus: Cek Riwayat & Tagihan Pemakaian Air Pelanggan (Mandiri) -->
        <div class="gov-card p-5 bg-gradient-to-br from-blue-50/50 to-white">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-blue-100">
            <div>
              <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">manage_search</span>
                Simulasi Pengecekan Riwayat Pemakaian Air Mandiri
              </h3>
              <p class="text-xs text-slate-500">Masyarakat dapat memeriksa riwayat angka meter dan estimasi biaya pemakaian air.</p>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" id="cust-meter-search" placeholder="Masukkan No. Meter (e.g. MTR-PAU-0421)" value="MTR-PAU-0421" class="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 font-mono">
              <button onclick="window.ConsumptionModule.searchCustomerMeter()" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm">
                <span class="material-symbols-outlined text-sm">search</span>
                Cek Meter
              </button>
            </div>
          </div>

          <!-- Wadah Hasil Cek Meter -->
          <div id="customer-meter-result" class="mt-4"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initCharts();
      this.searchCustomerMeter();
    }, 100);
  },

  initCharts() {
    const zones = window.store.state.zones;

    // 1. Bar Chart Komparasi Zona
    const barCanvas = document.getElementById("zoneComparisonChart");
    if (barCanvas) {
      if (this.barChartInstance) this.barChartInstance.destroy();
      const ctx = barCanvas.getContext("2d");

      this.barChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: zones.map(z => z.nama),
          datasets: [{
            label: "Volume Konsumsi (m³)",
            data: zones.map(z => z.riwayatKonsumsiM3[z.riwayatKonsumsiM3.length - 1]),
            backgroundColor: [
              "#2563EB", "#3B82F6", "#06B6D4", "#10B981", "#6366F1"
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { ticks: { font: { size: 10 } }, title: { display: true, text: 'm³', font: { size: 10 } } }
          }
        }
      });
    }

    // 2. Line Chart Jam Puncak
    const peakCanvas = document.getElementById("peakHourChart");
    if (peakCanvas) {
      if (this.peakChartInstance) this.peakChartInstance.destroy();
      const ctx2 = peakCanvas.getContext("2d");

      this.peakChartInstance = new Chart(ctx2, {
        type: "line",
        data: {
          labels: ["00:00", "03:00", "06:00 (Puncak Pagi)", "09:00", "12:00", "15:00", "18:00 (Puncak Sore)", "21:00"],
          datasets: [{
            label: "Laju Aliran (Lps)",
            data: [45, 38, 195, 120, 110, 135, 185, 95],
            borderColor: "#0284C7",
            backgroundColor: "rgba(2, 132, 199, 0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 2.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { ticks: { font: { size: 10 } }, title: { display: true, text: 'Liter / Detik', font: { size: 10 } } }
          }
        }
      });
    }
  },

  searchCustomerMeter() {
    const input = document.getElementById("cust-meter-search");
    const container = document.getElementById("customer-meter-result");
    if (!input || !container) return;

    const query = input.value.trim().toUpperCase();
    const customers = window.SMART_WATER_DATA.sampleCustomers;
    const cust = customers.find(c => c.nomorMeter.toUpperCase() === query) || customers[0];

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <!-- Info Pelanggan -->
        <div class="p-4 rounded-lg bg-white border border-slate-200">
          <div class="text-[11px] text-slate-500 font-mono">No. Meter: <b>${cust.nomorMeter}</b></div>
          <div class="mt-1 font-bold text-slate-900 text-sm">${cust.nama}</div>
          <div class="text-slate-600 mt-1">${cust.alamat}</div>
          <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-slate-500">Golongan Tarif:</span>
            <span class="font-semibold text-blue-700">${cust.golongan}</span>
          </div>
        </div>

        <!-- Tagihan Terkini -->
        <div class="p-4 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
          <div>
            <div class="text-slate-500 font-semibold">Pemakaian Bulan Ini (Okt 2026):</div>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-2xl font-extrabold text-blue-700">${cust.pemakaianBulanIniM3}</span>
              <span class="text-slate-500">m³</span>
            </div>
            <div class="text-slate-600 mt-1">Estimasi Tagihan: <b class="text-slate-900">Rp ${cust.tagihanBulanIniRp.toLocaleString('id-ID')}</b></div>
          </div>
          <div class="mt-2">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${cust.statusBayar === 'Lunas' ? 'badge-normal' : 'badge-warning'}">
              Status: ${cust.statusBayar}
            </span>
          </div>
        </div>

        <!-- Riwayat 6 Bulan -->
        <div class="p-4 rounded-lg bg-white border border-slate-200">
          <div class="text-slate-700 font-semibold mb-2">Riwayat 6 Bulan Terakhir:</div>
          <div class="space-y-1.5 max-h-28 overflow-y-auto pr-1">
            ${cust.histori.map(h => `
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-slate-500">${h.bulan}</span>
                <span class="font-mono font-medium text-slate-700">${h.pemakaian} m³</span>
                <span class="font-mono text-slate-900 font-semibold">Rp ${h.biaya.toLocaleString('id-ID')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

