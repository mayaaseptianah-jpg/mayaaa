/**
 * SMART WATER MANAGEMENT KOTA PAGAR ALAM - APPLICATION COORDINATOR (APP.JS)
 * Menghubungkan router, navigasi tab, role switching, notifikasi, dan event bus.
 */

window.App = {
  init() {
    this.bindEvents();
    this.updateUserInterface();
    this.renderCurrentTab();
  },

  bindEvents() {
    // 1. Dengarkan Pergantian Tab Navigasi
    window.store.subscribe("tab:changed", (tabName) => {
      this.updateNavActiveState(tabName);
      this.renderCurrentTab();
      // Scroll to top of module container
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Dengarkan Pergantian Role Pengguna
    window.store.subscribe("role:changed", (role) => {
      this.updateUserInterface();
      this.renderCurrentTab();
      this.showToast(`Mode pengguna berganti ke: ${role.toUpperCase()}`, "info");
    });

    // 3. Dengarkan Update Notifikasi
    window.store.subscribe("notifications:updated", () => {
      this.updateNotificationBadge();
    });

    // Inisialisasi awal badge
    this.updateNotificationBadge();
  },

  updateUserInterface() {
    const user = window.store.state.currentUser;
    const role = window.store.state.currentRole;

    // Update Profile di Header Topbar
    const userNameEl = document.getElementById("header-user-name");
    const userRoleEl = document.getElementById("header-user-role");
    const roleSelectorEl = document.getElementById("header-role-selector");

    if (userNameEl) userNameEl.textContent = user.nama;
    if (userRoleEl) userRoleEl.textContent = user.unit;
    if (roleSelectorEl) roleSelectorEl.value = role;

    // Update Role Banner jika ada
    const roleBanner = document.getElementById("role-indicator-badge");
    if (roleBanner) {
      roleBanner.textContent = role.toUpperCase();
      if (role === 'masyarakat') {
        roleBanner.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300";
      } else if (role === 'petugas') {
        roleBanner.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300";
      } else {
        roleBanner.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300";
      }
    }
  },

  updateNavActiveState(activeTab) {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      const tab = item.getAttribute("data-tab");
      if (tab === activeTab) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Tutup mobile drawer jika terbuka
    this.closeMobileDrawer();
  },

  renderCurrentTab() {
    const container = document.getElementById("main-module-container");
    if (!container) return;

    const tab = window.store.state.currentTab;

    switch (tab) {
      case "overview":
        window.OverviewModule.render(container);
        break;
      case "quality":
        window.QualityModule.render(container);
        break;
      case "complaints":
        window.ComplaintsModule.render(container);
        break;
      case "consumption":
        window.ConsumptionModule.render(container);
        break;
      case "maintenance":
        window.MaintenanceModule.render(container);
        break;
      default:
        window.OverviewModule.render(container);
    }
  },

  // Role Switcher Handler
  handleRoleChange(selectElement) {
    const newRole = selectElement.value;
    window.store.setRole(newRole);
  },

  // Notification Modal / Dropdown Toggle
  toggleNotifications() {
    const dropdown = document.getElementById("notification-dropdown");
    if (!dropdown) return;

    const isHidden = dropdown.classList.contains("hidden");
    if (isHidden) {
      this.renderNotificationDropdownList();
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  },

  renderNotificationDropdownList() {
    const listEl = document.getElementById("notification-list-container");
    if (!listEl) return;

    const notifs = window.store.state.notifications;
    if (notifs.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">Tidak ada notifikasi sistem.</div>`;
      return;
    }

    listEl.innerHTML = notifs.map(n => `
      <div class="p-3 border-b border-slate-100 hover:bg-slate-50 transition text-xs ${n.isRead ? 'opacity-70' : 'bg-blue-50/40'}">
        <div class="flex items-center justify-between font-bold text-slate-900">
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full ${n.isRead ? 'bg-slate-300' : 'bg-blue-600'}"></span>
            ${n.judul}
          </span>
          <span class="text-[10px] text-slate-400 font-normal">${n.waktu}</span>
        </div>
        <p class="text-slate-600 mt-1 text-[11px]">${n.pesan}</p>
      </div>
    `).join('');
  },

  markAllRead() {
    window.store.markAllNotificationsRead();
    this.renderNotificationDropdownList();
    this.updateNotificationBadge();
  },

  updateNotificationBadge() {
    const badge = document.getElementById("notif-badge-count");
    if (!badge) return;

    const unread = window.store.state.notifications.filter(n => !n.isRead).length;
    if (unread > 0) {
      badge.textContent = unread;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  },

  // Global Search Modal
  openGlobalSearch() {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 modal-backdrop">
        <div class="gov-card max-w-xl w-full p-4 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
            <span class="material-symbols-outlined text-slate-400">search</span>
            <input type="text" id="global-search-input" placeholder="Cari kecamatan, nomor tiket aduan, stasiun pompa, atau sensor..." class="w-full text-xs outline-none text-slate-800 placeholder-slate-400" autofocus>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 bg-slate-100 rounded">
              ESC
            </button>
          </div>

          <div id="search-results-box" class="mt-3 max-h-72 overflow-y-auto space-y-2 text-xs">
            <div class="text-slate-400 text-center py-4 text-[11px]">Ketik kata kunci pencarian di atas...</div>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById("global-search-input");
    const resultsBox = document.getElementById("search-results-box");

    input.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsBox.innerHTML = `<div class="text-slate-400 text-center py-4 text-[11px]">Ketik kata kunci pencarian di atas...</div>`;
        return;
      }

      const state = window.store.state;
      let matched = [];

      // Cari di zona
      state.zones.forEach(z => {
        if (z.nama.toLowerCase().includes(q) || z.kode.toLowerCase().includes(q)) {
          matched.push({ type: "Wilayah", title: z.nama, desc: `Kode ${z.kode} — Status: ${z.status} (${z.tekananBar} Bar)`, tab: "overview" });
        }
      });

      // Cari di tiket
      state.complaints.forEach(c => {
        if (c.ticketNumber.toLowerCase().includes(q) || c.pelapor.toLowerCase().includes(q) || c.kategori.toLowerCase().includes(q) || c.alamat.toLowerCase().includes(q)) {
          matched.push({ type: "Tiket Aduan", title: `${c.ticketNumber} (${c.kategori})`, desc: `${c.pelapor} - ${c.alamat} [${c.status}]`, tab: "complaints" });
        }
      });

      // Cari di pompa
      state.pumps.forEach(p => {
        if (p.nama.toLowerCase().includes(q) || p.kode.toLowerCase().includes(q)) {
          matched.push({ type: "Stasiun Pompa", title: p.nama, desc: `${p.kode} - Status: ${p.status} (${p.debitAktualLps} Lps)`, tab: "maintenance" });
        }
      });

      // Cari di sensor
      state.sensors.forEach(s => {
        if (s.nama.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) {
          matched.push({ type: "Sensor Telemetri", title: s.nama, desc: `${s.id} - pH: ${s.ph}, NTU: ${s.kekeruhanNtu}`, tab: "quality" });
        }
      });

      if (matched.length === 0) {
        resultsBox.innerHTML = `<div class="text-slate-400 text-center py-4 text-[11px]">Tidak ada data yang cocok dengan "${q}".</div>`;
      } else {
        resultsBox.innerHTML = matched.map(m => `
          <div onclick="window.App.jumpToSearchResult('${m.tab}')" class="p-2.5 rounded-lg border border-slate-100 hover:bg-blue-50/60 hover:border-blue-200 cursor-pointer transition flex items-center justify-between">
            <div>
              <div class="font-bold text-slate-900">${m.title}</div>
              <div class="text-[11px] text-slate-500">${m.desc}</div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-semibold">${m.type}</span>
          </div>
        `).join('');
      }
    });
  },

  jumpToSearchResult(tabName) {
    document.getElementById("global-modal-container").innerHTML = "";
    window.store.setTab(tabName);
  },

  // Mobile Drawer Sidebar Controls
  toggleMobileDrawer() {
    const drawer = document.getElementById("sidebar-drawer");
    if (drawer) {
      drawer.classList.toggle("-translate-x-full");
    }
  },

  closeMobileDrawer() {
    const drawer = document.getElementById("sidebar-drawer");
    if (drawer && !drawer.classList.contains("-translate-x-full")) {
      drawer.classList.add("-translate-x-full");
    }
  },

  // Modal Profil Pengguna & Simulasi Login (PRD FR-01)
  openProfileModal() {
    const modalContainer = document.getElementById("global-modal-container");
    if (!modalContainer) return;

    const user = window.store.state.currentUser;
    const role = window.store.state.currentRole;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <div class="gov-card max-w-md w-full p-6 bg-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600">account_circle</span>
              Profil Pengguna & Autentikasi (FR-01)
            </h3>
            <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="mt-4 space-y-4 text-xs">
            <!-- Header User Card -->
            <div class="flex items-center gap-3 p-3 bg-blue-50/70 rounded-xl border border-blue-100">
              <div class="w-12 h-12 rounded-full bg-blue-700 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                ${user.nama.charAt(0)}
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">${user.nama}</h4>
                <p class="text-blue-800 font-medium text-[11px]">${user.unit}</p>
                <p class="text-slate-500 font-mono text-[10px]">${user.email}</p>
              </div>
            </div>

            <!-- Detail Akun -->
            <div class="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <div class="flex justify-between">
                <span class="text-slate-500">Peran Aktif:</span>
                <span class="font-bold text-blue-700 uppercase">${role}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Status Keamanan:</span>
                <span class="font-medium text-emerald-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">lock</span> Bcrypt Hashed (JWT Active)
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Sesi Login:</span>
                <span class="font-mono text-slate-600">Aktif — Berakhir dalam 8 Jam</span>
              </div>
            </div>

            <!-- Simulasi Ganti Akun Demo Cepat -->
            <div>
              <span class="font-semibold text-slate-700 block mb-1.5">Ganti Akun Demo Pengujian:</span>
              <div class="grid grid-cols-1 gap-2">
                <button onclick="window.store.setRole('petugas'); document.getElementById('global-modal-container').innerHTML=''" class="p-2 rounded-lg border text-left flex items-center justify-between hover:bg-slate-50 transition ${role === 'petugas' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200'}">
                  <div>
                    <div class="font-bold text-slate-900">Maya Septianah, S.Kom.</div>
                    <div class="text-[10px] text-slate-500">Petugas UPTD Air Bersih (Hak Akses Penuh Form & Uji Lab)</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded font-bold ${role === 'petugas' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}">Petugas</span>
                </button>

                <button onclick="window.store.setRole('admin'); document.getElementById('global-modal-container').innerHTML=''" class="p-2 rounded-lg border text-left flex items-center justify-between hover:bg-slate-50 transition ${role === 'admin' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200'}">
                  <div>
                    <div class="font-bold text-slate-900">Dr. Erliyan Redy Susanto, M.Kom.</div>
                    <div class="text-[10px] text-slate-500">Admin Smart City Command Center (Monitoring Makro & Wilayah)</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded font-bold ${role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}">Admin</span>
                </button>

                <button onclick="window.store.setRole('masyarakat'); document.getElementById('global-modal-container').innerHTML=''" class="p-2 rounded-lg border text-left flex items-center justify-between hover:bg-slate-50 transition ${role === 'masyarakat' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200'}">
                  <div>
                    <div class="font-bold text-slate-900">Ahmad Fauzi</div>
                    <div class="text-[10px] text-slate-500">Masyarakat / Pelanggan (Pengaduan, Cek Kualitas & Meter)</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded font-bold ${role === 'masyarakat' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}">Warga</span>
                </button>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button onclick="document.getElementById('global-modal-container').innerHTML=''" class="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Toast Notification System
  showToast(message, type = "normal") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    let bg = "bg-slate-900 text-white";
    if (type === "info") bg = "bg-blue-700 text-white";
    if (type === "warning") bg = "bg-amber-600 text-white";
    if (type === "success") bg = "bg-emerald-700 text-white";

    toast.className = `${bg} px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-sm">notifications_active</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("translate-y-2", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Auto start when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});

