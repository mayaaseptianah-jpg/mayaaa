/**
 * SMART WATER MANAGEMENT KOTA PAGAR ALAM - DATA ENGINE
 * Dataset Awal Berdasarkan PRD & SKILL.md
 * Instansi: Pemerintah Kota Pagar Alam — Dinas PUPR (UPTD Air Bersih)
 */

window.SMART_WATER_DATA = {
  metadata: {
    appName: "Smart Water Management",
    instance: "Pemerintah Kota Pagar Alam",
    unit: "Dinas PUPR — UPTD Air Bersih",
    commandCenter: "Smart City Command Center Pagar Alam",
    slogan: "Air Terpantau, Pengelolaan Lebih Baik",
    year: "2026",
    isSampleData: true,
    sampleBadgeText: "Data Contoh / Simulasi"
  },

  // 5 Wilayah / Kecamatan di Kota Pagar Alam
  zones: [
    {
      id: 1,
      kode: "PA-01",
      nama: "Pagar Alam Utara",
      center: [-4.0150, 103.2550],
      populasi: 46500,
      sambunganRumah: 7820,
      status: "Normal",
      jadwal: "24 Jam Nonstop",
      debitLps: 68.5,
      tekananBar: 2.85,
      keterangan: "Pasokan stabil dari Reservoir Utama Lematang Indah.",
      kualitasAir: "Memenuhi Baku Mutu",
      riwayatKonsumsiM3: [42100, 43500, 44800, 43900, 45200, 46100] // 6 bulan terakhir
    },
    {
      id: 2,
      kode: "PA-02",
      nama: "Pagar Alam Selatan",
      center: [-4.0320, 103.2720],
      populasi: 49200,
      sambunganRumah: 8450,
      status: "Tekanan Rendah",
      jadwal: "24 Jam (Tekanan fluktuatif pkl 17:00-20:00)",
      debitLps: 52.2,
      tekananBar: 1.85,
      keterangan: "Peningkatan beban konsumsi jam puncak di kawasan padat Nendagung.",
      kualitasAir: "Memenuhi Baku Mutu",
      riwayatKonsumsiM3: [48900, 49200, 50100, 51000, 50800, 51600]
    },
    {
      id: 3,
      kode: "PA-03",
      nama: "Dempo Tengah",
      center: [-4.0450, 103.2920],
      populasi: 18900,
      sambunganRumah: 2940,
      status: "Normal",
      jadwal: "24 Jam Nonstop",
      debitLps: 34.0,
      tekananBar: 2.70,
      keterangan: "Distribusi gravitasi mandiri dari bak penampung Candi Jaya lancar.",
      kualitasAir: "Memenuhi Baku Mutu",
      riwayatKonsumsiM3: [16800, 17100, 16900, 17400, 17200, 17600]
    },
    {
      id: 4,
      kode: "PA-04",
      nama: "Dempo Utara",
      center: [-3.9850, 103.2380],
      populasi: 24300,
      sambunganRumah: 3620,
      status: "Pemeliharaan",
      jadwal: "Bergilir (06:00 - 18:00 WIB)",
      debitLps: 28.4,
      tekananBar: 1.60,
      keterangan: "Pembersihan pipa transmisi dan overhaul pompa di segmen Bumi Agung.",
      kualitasAir: "Perlu Pemeriksaan",
      riwayatKonsumsiM3: [21400, 21900, 22100, 21800, 22400, 21900]
    },
    {
      id: 5,
      kode: "PA-05",
      nama: "Dempo Selatan",
      center: [-4.0720, 103.3250],
      populasi: 16800,
      sambunganRumah: 2410,
      status: "Normal",
      jadwal: "24 Jam Nonstop",
      debitLps: 26.8,
      tekananBar: 2.55,
      keterangan: "Jaringan transmisi pipa hilir beroperasi sesuai standar operasional.",
      kualitasAir: "Memenuhi Baku Mutu",
      riwayatKonsumsiM3: [14200, 14500, 14300, 14800, 14600, 15000]
    }
  ],

  // Jaringan Pipa Distribusi GIS (GeoJSON LineString coords di Pagar Alam)
  // Sesuai legenda SKILL.md:
  // Cyan: Pipa transmisi utama
  // Hijau: Sensor normal (tekanan >= 2.5 Bar)
  // Amber: Tekanan rendah (< 2.0 Bar)
  // Merah: Pipa dalam pemeliharaan
  pipelineNetworks: [
    {
      id: "PIPE-TR-01",
      name: "Pipa Transmisi Utama Intake Lematang -> Reservoir Pagar Alam",
      type: "transmission",
      color: "#06B6D4", // Cyan
      weight: 5,
      status: "Pipa Transmisi Utama",
      coordinates: [
        [-4.0050, 103.2420],
        [-4.0125, 103.2510],
        [-4.0150, 103.2550],
        [-4.0250, 103.2650]
      ]
    },
    {
      id: "PIPE-DS-01",
      name: "Jalur Distribusi Sekunder Curup Jare - Pagar Alam Utara",
      type: "normal",
      color: "#10B981", // Hijau
      weight: 4,
      status: "Tekanan Normal (2.85 Bar)",
      coordinates: [
        [-4.0150, 103.2550],
        [-4.0080, 103.2620],
        [-4.0130, 103.2750]
      ]
    },
    {
      id: "PIPE-DS-02",
      name: "Jalur Distribusi Nendagung - Pagar Alam Selatan",
      type: "low_pressure",
      color: "#F59E0B", // Amber
      weight: 4,
      status: "Tekanan Rendah (1.85 Bar)",
      coordinates: [
        [-4.0250, 103.2650],
        [-4.0320, 103.2720],
        [-4.0380, 103.2800]
      ]
    },
    {
      id: "PIPE-MT-01",
      name: "Segmen Jaringan Pipa Lereng Dempo - Bumi Agung",
      type: "maintenance",
      color: "#EF4444", // Merah
      weight: 4,
      status: "Dalam Pemeliharaan / Perbaikan",
      coordinates: [
        [-3.9850, 103.2380],
        [-3.9920, 103.2410],
        [-4.0050, 103.2420]
      ]
    },
    {
      id: "PIPE-DS-03",
      name: "Jalur Pipa Gravitasi Dempo Tengah - Candi Jaya",
      type: "normal",
      color: "#10B981", // Hijau
      weight: 3.5,
      status: "Tekanan Normal (2.70 Bar)",
      coordinates: [
        [-4.0320, 103.2720],
        [-4.0450, 103.2920],
        [-4.0550, 103.3050]
      ]
    }
  ],

  // Titik Telemetri Sensor Kualitas Air & Tekanan Real-time
  sensors: [
    {
      id: "SNS-PAU-01",
      nama: "Sensor Intake Curup Jare",
      wilayahId: 1,
      wilayahNama: "Pagar Alam Utara",
      coords: [-4.0150, 103.2550],
      ph: 7.25,
      kekeruhanNtu: 1.45,
      suhuC: 23.5,
      tekananBar: 2.85,
      tdsPpm: 118,
      status: "Normal",
      statusKualitas: "Memenuhi Baku Mutu",
      lastUpdate: "10 Nov 2026, 17:15 WIB"
    },
    {
      id: "SNS-PAS-02",
      nama: "Sensor Pipa Distribusi RSUD Nendagung",
      wilayahId: 2,
      wilayahNama: "Pagar Alam Selatan",
      coords: [-4.0320, 103.2720],
      ph: 7.10,
      kekeruhanNtu: 2.10,
      suhuC: 24.1,
      tekananBar: 1.85,
      tdsPpm: 134,
      status: "Peringatan",
      statusKualitas: "Memenuhi Baku Mutu",
      lastUpdate: "10 Nov 2026, 17:20 WIB"
    },
    {
      id: "SNS-DMT-01",
      nama: "Sensor Bak Pelepas Tekan Jokoh",
      wilayahId: 3,
      wilayahNama: "Dempo Tengah",
      coords: [-4.0450, 103.2920],
      ph: 6.85,
      kekeruhanNtu: 1.80,
      suhuC: 22.8,
      tekananBar: 2.70,
      tdsPpm: 102,
      status: "Normal",
      statusKualitas: "Memenuhi Baku Mutu",
      lastUpdate: "10 Nov 2026, 17:05 WIB"
    },
    {
      id: "SNS-DMU-03",
      nama: "Sensor Mata Air Dempo - Bumi Agung",
      wilayahId: 4,
      wilayahNama: "Dempo Utara",
      coords: [-3.9850, 103.2380],
      ph: 7.40,
      kekeruhanNtu: 4.20,
      suhuC: 21.0,
      tekananBar: 1.60,
      tdsPpm: 95,
      status: "Peringatan",
      statusKualitas: "Perlu Pemeriksaan",
      lastUpdate: "10 Nov 2026, 16:50 WIB"
    },
    {
      id: "SNS-DMS-01",
      nama: "Sensor Transmisi Lubuk Buntak",
      wilayahId: 5,
      wilayahNama: "Dempo Selatan",
      coords: [-4.0720, 103.3250],
      ph: 7.05,
      kekeruhanNtu: 1.95,
      suhuC: 24.6,
      tekananBar: 2.55,
      tdsPpm: 126,
      status: "Normal",
      statusKualitas: "Memenuhi Baku Mutu",
      lastUpdate: "10 Nov 2026, 17:10 WIB"
    }
  ],

  // Data Pemeriksaan Laboratorium & Log Pengujian Kualitas Air
  labTests: [
    {
      id: "LAB-2026-101",
      tanggal: "2026-11-10 14:00",
      titikUji: "Intake Curup Jare (PA-01)",
      wilayahId: 1,
      ph: 7.25,
      kekeruhan: 1.45,
      suhu: 23.5,
      tds: 118,
      klorin: 0.35,
      status: "Memenuhi Baku Mutu",
      metode: "Telemetri Sensor IoT",
      petugas: "Maya Septianah, S.Kom."
    },
    {
      id: "LAB-2026-100",
      tanggal: "2026-11-10 10:30",
      titikUji: "Mata Air Bumi Agung (PA-04)",
      wilayahId: 4,
      ph: 7.40,
      kekeruhan: 4.20,
      suhu: 21.0,
      tds: 95,
      klorin: 0.20,
      status: "Perlu Pemeriksaan",
      metode: "Uji Kimia Spektrofotometri",
      petugas: "Maya Septianah, S.Kom."
    },
    {
      id: "LAB-2026-099",
      tanggal: "2026-11-09 15:45",
      titikUji: "Distribusi RSUD Nendagung (PA-02)",
      wilayahId: 2,
      ph: 7.10,
      kekeruhan: 2.10,
      suhu: 24.1,
      tds: 134,
      klorin: 0.30,
      status: "Memenuhi Baku Mutu",
      metode: "Telemetri Sensor IoT",
      petugas: "Hendra Wijaya"
    },
    {
      id: "LAB-2026-098",
      tanggal: "2026-11-08 09:15",
      titikUji: "Bak Pelepas Jokoh (PA-03)",
      wilayahId: 3,
      ph: 6.85,
      kekeruhan: 1.80,
      suhu: 22.8,
      tds: 102,
      klorin: 0.28,
      status: "Memenuhi Baku Mutu",
      metode: "Telemetri Sensor IoT",
      petugas: "Maya Septianah, S.Kom."
    }
  ],

  // Data Tiket Pengaduan Warga
  complaints: [
    {
      id: 1,
      ticketNumber: "TKT-2026-PA-001",
      pelapor: "Ahmad Fauzi",
      telepon: "0852-6712-3345",
      wilayahId: 2,
      wilayahNama: "Pagar Alam Selatan",
      kategori: "Pipa Bocor",
      deskripsi: "Pipa sambungan utama di pinggir jalan trotoar retak dan air bertekanan meluap ke badan jalan.",
      alamat: "Jl. Kolonel Atmo No. 45, Nendagung (Depan Minimarket)",
      coords: [-4.0298, 103.2685],
      foto: "assets/images/sample_leak.jpg",
      status: "Dalam Penanganan", // Diterima, Diverifikasi, Dalam Penanganan, Selesai
      createdAt: "10 Nov 2026, 08:30 WIB",
      catatanPetugas: "Tim teknisi UPTD Regu 2 sedang melakukan penggalian dan penggantian klem pipa HDPE 3 inch.",
      petugas: "Maya Septianah (UPTD Air Bersih)"
    },
    {
      id: 2,
      ticketNumber: "TKT-2026-PA-002",
      pelapor: "Siti Nurhaliza",
      telepon: "0821-8199-7761",
      wilayahId: 4,
      wilayahNama: "Dempo Utara",
      kategori: "Tekanan Rendah",
      deskripsi: "Aliran air sejak pagi sangat kecil hanya menetes, bak penampungan air tidak terisi penuh.",
      alamat: "Dusun Agung Lawangan RT 03 RW 01",
      coords: [-3.9875, 103.2351],
      foto: null,
      status: "Diverifikasi",
      createdAt: "10 Nov 2026, 09:15 WIB",
      catatanPetugas: "Petugas mendeteksi penurunan debit dari katup pembagi hulu, dalam penjadwalan inspeksi katup.",
      petugas: "Maya Septianah (UPTD Air Bersih)"
    },
    {
      id: 3,
      ticketNumber: "TKT-2026-PA-003",
      pelapor: "Bambang Supriyanto",
      telepon: "0813-9022-1144",
      wilayahId: 1,
      wilayahNama: "Pagar Alam Utara",
      kategori: "Air Keruh / Bau",
      deskripsi: "Air berwarna agak kekuningan dan keruh setelah hujan lebat kemarin sore.",
      alamat: "Komp. Perumahan Curup Jare Indah Blok C",
      coords: [-4.0152, 103.2554],
      foto: null,
      status: "Selesai",
      createdAt: "09 Nov 2026, 14:00 WIB",
      catatanPetugas: "Pembersihan endapan sedimen pada wash-out valve selesai dilakukan. Kualitas air kembali jernih (NTU 1.45).",
      petugas: "Maya Septianah (UPTD Air Bersih)"
    },
    {
      id: 4,
      ticketNumber: "TKT-2026-PA-004",
      pelapor: "Hj. Rohana",
      telepon: "0853-4412-9900",
      wilayahId: 3,
      wilayahNama: "Dempo Tengah",
      kategori: "Aliran Mati",
      deskripsi: "Aliran air mati total sejak subuh pkl 05:00 WIB tanpa pemberitahuan sebelumnya.",
      alamat: "Desa Candi Jaya Lintang Belakang Masjid Al-Falah",
      coords: [-4.0412, 103.2891],
      foto: null,
      status: "Diterima",
      createdAt: "10 Nov 2026, 11:20 WIB",
      catatanPetugas: "Laporan baru diterima sistem. Menunggu penugasan tim verifikasi lapangan.",
      petugas: "-"
    }
  ],

  // Data Stasiun Pompa SCADA & Reservoir UPTD
  pumps: [
    {
      id: 1,
      kode: "PMP-LMT-01",
      nama: "Intake & Pompa Utama Sungai Lematang",
      wilayahNama: "Pagar Alam Utara",
      tipe: "Submersible High-Capacity",
      kapasitasLps: 120.0,
      tekananBar: 4.20,
      status: "Aktif",
      runningHours: 4320,
      arusListrikAmp: 42.5,
      suhuMotorC: 48.2,
      debitAktualLps: 118.4,
      efisiensiPersen: 96
    },
    {
      id: 2,
      kode: "PMP-BST-02",
      nama: "Stasiun Pompa Booster Dempo Makmur",
      wilayahNama: "Pagar Alam Selatan",
      tipe: "Booster Centrifugal Horisontal",
      kapasitasLps: 80.0,
      tekananBar: 3.80,
      status: "Aktif",
      runningHours: 2890,
      arusListrikAmp: 31.0,
      suhuMotorC: 45.0,
      debitAktualLps: 76.5,
      efisiensiPersen: 92
    },
    {
      id: 3,
      kode: "PMP-RSV-03",
      nama: "Reservoir Gravitasi Curup Mangkok",
      wilayahNama: "Dempo Utara",
      tipe: "Gravity Flow & Regulating Valve",
      kapasitasLps: 65.0,
      tekananBar: 2.90,
      status: "Aktif",
      runningHours: 1240,
      arusListrikAmp: 14.5,
      suhuMotorC: 38.5,
      debitAktualLps: 62.0,
      efisiensiPersen: 98
    },
    {
      id: 4,
      kode: "PMP-BST-04",
      nama: "Stasiun Pompa Distribusi Bumi Agung",
      wilayahNama: "Dempo Utara",
      tipe: "Multistage Booster Pump",
      kapasitasLps: 45.0,
      tekananBar: 1.60,
      status: "Maintenance",
      runningHours: 5120,
      arusListrikAmp: 0.0,
      suhuMotorC: 26.0,
      debitAktualLps: 0.0,
      efisiensiPersen: 0
    }
  ],

  // Data Jadwal Pemeliharaan Pompa & Jaringan Pipa
  maintenanceSchedules: [
    {
      id: 1,
      pompaKode: "PMP-BST-04",
      asetNama: "Stasiun Pompa Distribusi Bumi Agung",
      wilayahNama: "Dempo Utara",
      kegiatan: "Penggantian Mechanical Seal & Overhaul Bearing Motor",
      tipe: "Corrective",
      tanggal: "2026-11-10",
      status: "Sedang Dikerjakan",
      penanggungJawab: "Agus Salim (Teknisi Mesin UPTD)",
      catatan: "Sedang proses alignment poros motor dan pompa booster."
    },
    {
      id: 2,
      pompaKode: "PMP-LMT-01",
      asetNama: "Intake & Pompa Utama Sungai Lematang",
      wilayahNama: "Pagar Alam Utara",
      kegiatan: "Pembersihan Saringan Intake & Kalibrasi Pressure Transmitter",
      tipe: "Preventive",
      tanggal: "2026-11-13",
      status: "Dijadwalkan",
      penanggungJawab: "Maya Septianah & Tim SCADA",
      catatan: "Pemeliharaan rutin berkala triwulan sensor SCADA intake."
    },
    {
      id: 3,
      pompaKode: "PMP-BST-02",
      asetNama: "Stasiun Pompa Booster Dempo Makmur",
      wilayahNama: "Pagar Alam Selatan",
      kegiatan: "Inspeksi Panel Inverter VFD & Pengukuran Tahanan Isolasi",
      tipe: "Preventive",
      tanggal: "2026-11-17",
      status: "Dijadwalkan",
      penanggungJawab: "Hendra Wijaya (Divisi Listrik)",
      catatan: "Antisipasi lonjakan arus listrik saat jam operasional puncak."
    }
  ],

  // Data Simulasi Konsumsi Pelanggan Mandiri
  sampleCustomers: [
    {
      nomorMeter: "MTR-PAU-0421",
      nama: "Ahmad Fauzi",
      alamat: "Jl. Kolonel Atmo No. 45, Nendagung",
      wilayahNama: "Pagar Alam Selatan",
      golongan: "Rumah Tangga 2 (RT-2)",
      tarifPerM3: 2800,
      pemakaianBulanIniM3: 24.5,
      tagihanBulanIniRp: 68600,
      statusBayar: "Lunas",
      histori: [
        { bulan: "Mei 2026", pemakaian: 22.0, biaya: 61600 },
        { bulan: "Jun 2026", pemakaian: 23.5, biaya: 65800 },
        { bulan: "Jul 2026", pemakaian: 25.0, biaya: 70000 },
        { bulan: "Agu 2026", pemakaian: 24.0, biaya: 67200 },
        { bulan: "Sep 2026", pemakaian: 26.5, biaya: 74200 },
        { bulan: "Okt 2026", pemakaian: 24.5, biaya: 68600 }
      ]
    },
    {
      nomorMeter: "MTR-DEM-0189",
      nama: "Siti Nurhaliza",
      alamat: "Dusun Agung Lawangan RT 03 RW 01",
      wilayahNama: "Dempo Utara",
      golongan: "Rumah Tangga 1 (RT-1)",
      tarifPerM3: 2400,
      pemakaianBulanIniM3: 16.2,
      tagihanBulanIniRp: 38880,
      statusBayar: "Belum Bayar",
      histori: [
        { bulan: "Mei 2026", pemakaian: 15.0, biaya: 36000 },
        { bulan: "Jun 2026", pemakaian: 16.5, biaya: 39600 },
        { bulan: "Jul 2026", pemakaian: 17.0, biaya: 40800 },
        { bulan: "Agu 2026", pemakaian: 15.8, biaya: 37920 },
        { bulan: "Sep 2026", pemakaian: 16.0, biaya: 38400 },
        { bulan: "Okt 2026", pemakaian: 16.2, biaya: 38880 }
      ]
    }
  ],

  // Notifikasi Sistem
  notifications: [
    {
      id: 1,
      judul: "Peringatan Tekanan Rendah Pagar Alam Selatan",
      pesan: "Sensor SNS-PAS-02 mendeteksi tekanan 1.85 Bar pada jam beban puncak kawasan Nendagung.",
      waktu: "10 Nov 2026, 17:00 WIB",
      kategori: "Gangguan",
      isRead: false
    },
    {
      id: 2,
      judul: "Pemeliharaan Pompa Booster Bumi Agung",
      pesan: "Overhaul bearing pompa PMP-BST-04 sedang berlangsung. Aliran air dialihkan via gravitasi.",
      waktu: "10 Nov 2026, 10:15 WIB",
      kategori: "Pemeliharaan",
      isRead: false
    },
    {
      id: 3,
      judul: "Laporan Gangguan Baru Masuk",
      pesan: "Tiket TKT-2026-PA-004 (Aliran Mati di Candi Jaya) menunggu verifikasi dari petugas.",
      waktu: "10 Nov 2026, 11:20 WIB",
      kategori: "Aduan",
      isRead: true
    }
  ]
};

