/**
 * MODUL 5: JADWAL PEMELIHARAAN & STATUS POMPA (MAINTENANCE & PUMPS)
 * Berdasarkan SKILL.md & PRD Smart Water Management Pagar Alam
 */

window.MaintenanceModule = {
  render(container) {
    const state = window.store.state;
    const pumps = state.pumps;
    const schedules = state.maintenanceSchedules;

    const totalPumps = pumps.length;
    const activePumps = pumps.filter(p => p.status === "Aktif").length;
    const maintenancePumps = pumps.filter(p => p.status === "Maintenance").length;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Modul -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Jadwal Pemeliharaan & Status Pompa</h1>
              <span class="dummy-badge">Data Contoh / Simulasi</span>
            </div>
            <p class="text-sm text-slate-500 mt-1">
              Monitoring kondisi elektromekanik stasiun pompa SCADA, jam operasi, dan manajemen perawatan berkala.
            </p>
          </div>
          <div class="flex items-center gap-2">
            ${state.currentRole !== 'masyarakat' ? `
              <button onclick="window.MaintenanceModule.openAddScheduleModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-sm">more_time</span>
                Tambah Jadwal Pemeliharaan
              </button>
            ` : ''}
          </div>
        </div>

        <!-- 4 Kartu KPI Kondisi Aset SCADA -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>Total Unit Pompa SCADA</span>
              <span class="material-symbols-outlined text-blue-600">water_pump</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-slate-900">${totalPumps} Stasiun</div>
            <div class="mt-1 text-[11px] text-slate-500">Intake & booster distribusi</div>
          </div>

          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-emerald-700 text-xs font-semibold uppercase">
              <span>Pompa Beroperasi Aktif</span>
              <span class="material-symbols-outlined text-emerald-600">check_circle</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-emerald-600">${activePumps} Unit</div>
            <div class="mt-1 text-[11px] text-emerald-700 font-medium">Kondisi normal siap pasok</div>
          </div>

          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-amber-700 text-xs font-semibold uppercase">
              <span>Dalam Pemeliharaan</span>
              <span class="material-symbols-outlined text-amber-600">build</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-amber-600">${maintenancePumps} Unit</div>
            <div class="mt-1 text-[11px] text-amber-700 font-medium">Bumi Agung (Overhaul seal)</div>
          </div>

          <div class="gov-card p-4">
            <div class="flex items-center justify-between text-indigo-700 text-xs font-semibold uppercase">
              <span>Agenda Servis Terjadwal</span>
              <span class="material-symbols-outlined text-indigo-600">event_note</span>
            </div>
            <div class="mt-2 text-2xl font-extrabold text-indigo-600">${schedules.length} Pekerjaan</div>
            <div class="mt-1 text-[11px] text-indigo-700 font-medium">Preventive & corrective rutin</div>
          </div>
        </div>

        <!-- Matriks Status Stasiun Pompa UPTD (Grid Kartu Detail) -->
        <div class="space-y-3">
          <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600">developer_board</span>
            Matriks Operasional Stasiun Pompa & Reservoir
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${pumps.map(p => {
              const isAktif = p.status === "Aktif";
              return `
                <div class="gov-card p-5 border ${isAktif ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20'}">
                  <div class="flex items-start justify-between">
                    <div>
                      <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">${p.kode}</span>
                      <h3 class="text-sm font-bold text-slate-900 mt-1">${p.nama}</h3>
                      <p class="text-[11px] text-slate-500">${p.tipe} — Wilayah ${p.wilayahNama}</p>
                    </div>
                    <span class="px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 ${isAktif ? 'badge-normal' : 'badge-warning'}">
                      <span class="w-2 h-2 rounded-full ${isAktif ? 'bg-emerald-600' : 'bg-amber-600'}"></span>
                      ${p.status}
                    </span>
                  </div>

                  <!-- Telemetri Grid 4 Kolom -->
                  <div class="mt-4 grid grid-cols-4 gap-2 p-3 bg-slate-50 rounded-lg text-center text-xs">
                    <div>
                      <span class="text-[10px] text-slate-400 uppercase">Debit Alir</span>
                      <div class="font-bold text-slate-900 font-mono mt-0.5">${p.debitAktualLps} Lps</div>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 uppercase">Tekanan</span>
                      <div class="font-bold text-slate-900 font-mono mt-0.5">${p.tekananBar} Bar</div>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 uppercase">Arus Motor</span>
                      <div class="font-bold text-slate-900 font-mono mt-0.5">${p.arusListrikAmp} A</div>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 uppercase">Suhu</span>
                      <div class="font-bold text-slate-900 font-mono mt-0.5">${p.suhuMotorC} °C</div>
                    </div>
                  </div>

                  <div class="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Jam Operasi: <b class="text-slate-800 font-mono">${p.runningHours.toLocaleString()} Jam</b></span>
                    <span>Efisiensi: <b class="text-emerald-700 font-mono">${p.efisiensiPersen}%</b></span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tabel Jadwal & Agenda Pemeliharaan -->
        <div class="gov-card p-5">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-900">Agenda & Log Pekerjaan Pemeliharaan</h2>
              <p class="text-xs text-slate-500">Jadwal perawatan berkala (Preventive) dan perbaikan darurat (Corrective) jaringan air.</p>
            </div>
            <div class="text-xs text-slate-500">
              Total Agenda: <b class="text-slate-800">${schedules.length} Kegiatan</b>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
                  <th class="py-3 px-3">Tanggal</th>
                  <th class="py-3 px-3">Stasiun / Aset</th>
                  <th class="py-3 px-3">Wilayah</th>
                  <th class="py-3 px-3">Jenis Pekerjaan</th>
                  <th class="py-3 px-3 text-center">Tipe</th>
                  <th class="py-3 px-3 text-center">Status</th>
                  <th class="py-3 px-3">Penanggung Jawab</th>
                  <th class="py-3 px-3">Catatan Teknisi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${schedules.map(s => {
                  let badge = "badge-info";
                  if (s.status === "Sedang Dikerjakan") badge = "badge-warning";
                  if (s.status === "Selesai") badge = "badge-normal";

                  return `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="py-3 px-3 font-mono font-medium text-slate-700 whitespace-nowrap">${s.tanggal}</td>
                      <td class="py-3 px-3 font-bold text-slate-900">${s.asetNama}</td>
                      <td class="py-3 px-3 text-slate-600">${s.wilayahNama}</td>
                      <td class="py-3 px-3 font-medium text-slate-800">${s.kegiatan}</td>
                      <td class="py-3 px-3 text-center">
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${s.tipe === 'Corrective' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
                          ${s.tipe}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-center">
                        <span class="px-2 py-0.5 rounded text-[11px] font-semibold inline-flex items-center gap-1 ${badge}">
                          ${s.status}
                        </span>
                      </td>
                      <td class="py-3 px-3 text-slate-600">${s.penanggungJawab}</td>
                      <td class="py-3 px-3 text-slate-500 max-w-xs truncate" title="${s.catatan}">${s.catatan}</td>
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

  openAddScheduleModal() {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    const pumps = window.store.state.pumps;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="gov-card max-w-lg w-full p-6 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600">more_time</span>
              Tambah Jadwal Pemeliharaan Pompa
            </h3>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="form-tambah-jadwal" class="mt-4 space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Pilih Stasiun Pompa / Aset</label>
              <select id="sch-pompa" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                ${pumps.map(p => `<option value="${p.kode}|${p.nama}|${p.wilayahNama}">${p.nama} (${p.kode}) - ${p.wilayahNama}</option>`).join('')}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Tipe Pemeliharaan</label>
                <select id="sch-tipe" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Preventive">Preventive (Pencegahan Rutin)</option>
                  <option value="Corrective">Corrective (Perbaikan Gangguan)</option>
                  <option value="Inspeksi">Inspeksi / Uji Kalibrasi</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Rencana Tanggal Pengerjaan</label>
                <input type="date" id="sch-tanggal" value="2026-11-15" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Uraian Kegiatan Perawatan</label>
              <input type="text" id="sch-kegiatan" placeholder="Contoh: Kalibrasi pressure transmitter dan ganti oli bearing" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Penanggung Jawab / Mandor</label>
              <input type="text" id="sch-pic" value="${window.store.state.currentUser.nama}" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Catatan Tambahan</label>
              <textarea id="sch-catatan" rows="2" placeholder="Catatan ketersediaan suku cadang atau pengalihan aliran pipa..." class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button type="button" onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                Batal
              </button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Jadwalkan Pemeliharaan
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById("form-tambah-jadwal").addEventListener("submit", (e) => {
      e.preventDefault();
      const [kode, nama, wilayah] = document.getElementById("sch-pompa").value.split("|");

      window.store.addMaintenanceSchedule({
        pompaKode: kode,
        asetNama: nama,
        wilayahNama: wilayah,
        tipe: document.getElementById("sch-tipe").value,
        tanggal: document.getElementById("sch-tanggal").value,
        kegiatan: document.getElementById("sch-kegiatan").value,
        penanggungJawab: document.getElementById("sch-pic").value,
        catatan: document.getElementById("sch-catatan").value
      });

      modalContainer.innerHTML = "";
      window.MaintenanceModule.render(document.getElementById("main-module-container"));
    });
  }
};

