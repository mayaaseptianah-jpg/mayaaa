/**
 * SMART WATER MANAGEMENT KOTA PAGAR ALAM - STATE & STORE ENGINE
 * Mengelola state aplikasi, penyimpanan lokal (LocalStorage), dan event bus.
 */

class SmartWaterStore {
  constructor() {
    this.storageKey = "smart_water_pagaralam_state_v1";
    this.listeners = {};
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Gagal memuat state dari LocalStorage, menggunakan data default.", e);
    }

    // Default State dari window.SMART_WATER_DATA
    return {
      currentRole: "petugas", // 'masyarakat' | 'petugas' | 'admin'
      currentTab: "overview", // 'overview' | 'quality' | 'complaints' | 'consumption' | 'maintenance'
      currentUser: {
        nama: "Maya Septianah, S.Kom.",
        role: "petugas",
        unit: "UPTD Air Bersih Dinas PUPR",
        email: "petugas.maya@pagaralam.go.id"
      },
      zones: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.zones)),
      sensors: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.sensors)),
      complaints: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.complaints)),
      labTests: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.labTests)),
      pumps: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.pumps)),
      maintenanceSchedules: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.maintenanceSchedules)),
      notifications: JSON.parse(JSON.stringify(window.SMART_WATER_DATA.notifications))
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error("Gagal menyimpan state ke LocalStorage", e);
    }
  }

  // Event Subscription
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
    // Simpan otomatis setiap ada perubahan
    this.saveState();
  }

  // --- Role Management ---
  setRole(newRole) {
    this.state.currentRole = newRole;
    if (newRole === "masyarakat") {
      this.state.currentUser = {
        nama: "Ahmad Fauzi (Warga Pelanggan)",
        role: "masyarakat",
        unit: "Masyarakat / Pelanggan Pagar Alam",
        email: "fauzi.pga@gmail.com"
      };
    } else if (newRole === "petugas") {
      this.state.currentUser = {
        nama: "Maya Septianah, S.Kom.",
        role: "petugas",
        unit: "UPTD Air Bersih Dinas PUPR",
        email: "petugas.maya@pagaralam.go.id"
      };
    } else if (newRole === "admin") {
      this.state.currentUser = {
        nama: "Dr. Erliyan Redy Susanto, M.Kom.",
        role: "admin",
        unit: "Smart City Command Center Pagar Alam",
        email: "admin.command@pagaralam.go.id"
      };
    }
    this.emit("role:changed", this.state.currentRole);
  }

  setTab(tabName) {
    this.state.currentTab = tabName;
    this.emit("tab:changed", tabName);
  }

  // --- Complaint Management ---
  addComplaint(complaintData) {
    const nextId = this.state.complaints.length + 1;
    const ticketNumber = `TKT-2026-PA-${String(nextId).padStart(3, '0')}`;
    
    const newComplaint = {
      id: nextId,
      ticketNumber: ticketNumber,
      pelapor: complaintData.pelapor || this.state.currentUser.nama,
      telepon: complaintData.telepon || "0812-XXXX-XXXX",
      wilayahId: parseInt(complaintData.wilayahId),
      wilayahNama: complaintData.wilayahNama || "Pagar Alam",
      kategori: complaintData.kategori,
      deskripsi: complaintData.deskripsi,
      alamat: complaintData.alamat,
      coords: complaintData.coords || [-4.0250, 103.2650],
      foto: complaintData.foto || null,
      status: "Diterima",
      createdAt: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) + " WIB",
      catatanPetugas: "Laporan baru diterima. Menunggu verifikasi tim UPTD.",
      petugas: "-"
    };

    this.state.complaints.unshift(newComplaint);
    
    // Kirim notifikasi sistem
    this.addNotification({
      judul: `Pengaduan Baru: ${newComplaint.ticketNumber}`,
      pesan: `Laporan baru (${newComplaint.kategori}) di wilayah ${newComplaint.wilayahNama}.`,
      kategori: "Aduan"
    });

    this.emit("complaint:added", newComplaint);
    return newComplaint;
  }

  updateComplaintStatus(id, newStatus, catatan, namaPetugas) {
    const complaint = this.state.complaints.find(c => c.id === parseInt(id));
    if (complaint) {
      complaint.status = newStatus;
      if (catatan) complaint.catatanPetugas = catatan;
      complaint.petugas = namaPetugas || this.state.currentUser.nama;

      this.addNotification({
        judul: `Update Tiket ${complaint.ticketNumber}`,
        pesan: `Status laporan diubah menjadi "${newStatus}" oleh ${complaint.petugas}.`,
        kategori: "Aduan"
      });

      this.emit("complaint:updated", complaint);
      return true;
    }
    return false;
  }

  // --- Water Quality Lab Tests ---
  addLabTest(testData) {
    const nextId = `LAB-2026-${String(this.state.labTests.length + 101).padStart(3, '0')}`;
    
    // Tentukan status baku mutu otomatis
    let statusKualitas = "Memenuhi Baku Mutu";
    const ph = parseFloat(testData.ph);
    const kekeruhan = parseFloat(testData.kekeruhan);

    if (ph < 6.5 || ph > 8.5 || kekeruhan > 5.0) {
      statusKualitas = kekeruhan > 10.0 ? "Tidak Memenuhi" : "Perlu Pemeriksaan";
    }

    const newTest = {
      id: nextId,
      tanggal: new Date().toISOString().replace('T', ' ').substring(0, 16),
      titikUji: testData.titikUji,
      wilayahId: parseInt(testData.wilayahId),
      ph: ph,
      kekeruhan: kekeruhan,
      suhu: parseFloat(testData.suhu),
      tds: parseFloat(testData.tds) || 110,
      klorin: parseFloat(testData.klorin) || 0.3,
      status: statusKualitas,
      metode: testData.metode || "Uji Laboratorium Lapangan",
      petugas: this.state.currentUser.nama
    };

    this.state.labTests.unshift(newTest);

    // Update sensor terkait jika ada
    const sensor = this.state.sensors.find(s => s.wilayahId === newTest.wilayahId);
    if (sensor) {
      sensor.ph = newTest.ph;
      sensor.kekeruhanNtu = newTest.kekeruhan;
      sensor.suhuC = newTest.suhu;
      sensor.statusKualitas = statusKualitas;
      sensor.lastUpdate = "Baru saja diuji";
    }

    this.emit("quality:added", newTest);
    return newTest;
  }

  // --- Maintenance Schedules ---
  addMaintenanceSchedule(scheduleData) {
    const nextId = this.state.maintenanceSchedules.length + 1;
    const newSchedule = {
      id: nextId,
      pompaKode: scheduleData.pompaKode,
      asetNama: scheduleData.asetNama,
      wilayahNama: scheduleData.wilayahNama,
      kegiatan: scheduleData.kegiatan,
      tipe: scheduleData.tipe,
      tanggal: scheduleData.tanggal,
      status: "Dijadwalkan",
      penanggungJawab: scheduleData.penanggungJawab || this.state.currentUser.nama,
      catatan: scheduleData.catatan || "Terjadwal dalam sistem SCADA."
    };

    this.state.maintenanceSchedules.push(newSchedule);

    this.addNotification({
      judul: `Jadwal Pemeliharaan Baru: ${newSchedule.asetNama}`,
      pesan: `Pekerjaan ${newSchedule.tipe} dijadwalkan pada ${newSchedule.tanggal}.`,
      kategori: "Pemeliharaan"
    });

    this.emit("maintenance:added", newSchedule);
    return newSchedule;
  }

  // --- Notifications ---
  addNotification(notif) {
    const newNotif = {
      id: Date.now(),
      judul: notif.judul,
      pesan: notif.pesan,
      waktu: "Baru saja",
      kategori: notif.kategori || "Sistem",
      isRead: false
    };
    this.state.notifications.unshift(newNotif);
    this.emit("notifications:updated", this.state.notifications);
  }

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => n.isRead = true);
    this.emit("notifications:updated", this.state.notifications);
  }

  // Reset to initial
  resetToFactory() {
    localStorage.removeItem(this.storageKey);
    this.state = this.loadState();
    window.location.reload();
  }
}

// Global Store Instance
window.store = new SmartWaterStore();

