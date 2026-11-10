-- =====================================================================
-- DATABASE SEEDS: SMART WATER MANAGEMENT KOTA PAGAR ALAM
-- Data Inisialisasi Wilayah, Pengguna, Sensor, Distribusi, & Aset SCADA
-- Sesuai: PRD Smart Water Management Pagar Alam
-- =====================================================================

-- 1. DATA WILAYAH KOTA PAGAR ALAM
INSERT INTO wilayah (id, kode_wilayah, nama_wilayah, deskripsi, populasi_jiwa, jumlah_sambungan_rumah) VALUES
(1, 'PA-01', 'Pagar Alam Utara', 'Kecamatan pusat perdagangan dan pemukiman padat (Curup Jare, Bangun Rejo)', 46500, 7820),
(2, 'PA-02', 'Pagar Alam Selatan', 'Kecamatan perkotaan, perkantoran, dan fasilitas publik (Besemah Serasan, Nendagung)', 49200, 8450),
(3, 'PA-03', 'Dempo Tengah', 'Wilayah transisi pemukiman dan perkebunan teh/kopi (Candi Jaya, Jokoh)', 18900, 2940),
(4, 'PA-04', 'Dempo Utara', 'Kawasan lereng Gunung Dempo, sumber air baku mata air alam (Agung Lawangan, Bumi Agung)', 24300, 3620),
(5, 'PA-05', 'Dempo Selatan', 'Wilayah hilir dan pertanian dengan elevasi variatif (Lubuk Buntak, Penjalang)', 16800, 2410)
ON CONFLICT (id) DO NOTHING;

-- 2. DATA PENGGUNA (USERS SESUAI PRD & ROLE SWITCHING)
INSERT INTO users (id, nama, email, password_hash, nomor_telepon, role, wilayah_id, nomor_meter) VALUES
(1, 'Maya Septianah, S.Kom.', 'petugas.maya@pagaralam.go.id', '$2b$12$e9q.X11Q5kZf8J...', '0812-7890-4421', 'petugas', 1, NULL),
(2, 'Dr. Erliyan Redy Susanto, M.Kom.', 'admin.command@pagaralam.go.id', '$2b$12$f0w.Y22R6lAg9K...', '0811-7301-9988', 'admin', 2, NULL),
(3, 'Ahmad Fauzi (Warga)', 'fauzi.pga@gmail.com', '$2b$12$g1x.Z33S7mBh0L...', '0852-6712-3345', 'masyarakat', 1, 'MTR-PAU-0421'),
(4, 'Siti Nurhaliza (Warga)', 'siti.dempo@gmail.com', '$2b$12$h2y.A44T8nCi1M...', '0821-8199-7761', 'masyarakat', 4, 'MTR-DEM-0189')
ON CONFLICT (id) DO NOTHING;

-- 3. DATA STATUS DISTRIBUSI PER WILAYAH
INSERT INTO distribusi (id, wilayah_id, status, jadwal_distribusi, debit_aliran_lps, tekanan_rata_rata_bar, keterangan) VALUES
(1, 1, 'Normal', '24 Jam Nonstop', 68.50, 2.85, 'Pasokan dari Reservoir Utama Lematang stabil dan optimal'),
(2, 2, 'Tekanan Rendah', '24 Jam (Tekanan fluktuatif pkl 17:00-20:00)', 52.20, 1.85, 'Peningkatan pemakaian jam puncak di kawasan Nendagung'),
(3, 3, 'Normal', '24 Jam Nonstop', 34.00, 2.70, 'Distribusi gravitasi mandiri dari bak penampung Candi Jaya lancar'),
(4, 4, 'Pemeliharaan', 'Jadwal Bergilir (06:00 - 18:00 WIB)', 28.40, 1.60, 'Pembersihan pipa transmisi utama di segmen Bumi Agung'),
(5, 5, 'Normal', '24 Jam Nonstop', 26.80, 2.55, 'Jaringan pipa transmisi hilir beroperasi sesuai standar operasional')
ON CONFLICT (id) DO NOTHING;

-- 4. DATA PEMERIKSAAN KUALITAS AIR (SESUAI BAKU MUTU PERMENKES)
INSERT INTO kualitas_air (id, wilayah_id, titik_sensor_id, lokasi_sampling, nilai_ph, kekeruhan_ntu, suhu_celsius, tds_ppm, klorin_bebas_mg_l, status_kualitas, metode_uji, petugas_id) VALUES
(1, 1, 'SNS-PAU-01', 'Reservoir Curup Jare (Intake Utama)', 7.25, 1.45, 23.5, 118.0, 0.35, 'Memenuhi Baku Mutu', 'Telemetri Sensor IoT', 1),
(2, 2, 'SNS-PAS-02', 'Pipa Distribusi Nendagung Depan RSUD', 7.10, 2.10, 24.1, 134.5, 0.30, 'Memenuhi Baku Mutu', 'Telemetri Sensor IoT', 1),
(3, 3, 'SNS-DMT-01', 'Bak Pelepas Tekan Jokoh', 6.85, 1.80, 22.8, 102.0, 0.28, 'Memenuhi Baku Mutu', 'Telemetri Sensor IoT', 1),
(4, 4, 'SNS-DMU-03', 'Mata Air Gunung Dempo - Bumi Agung', 7.40, 4.20, 21.0, 95.0, 0.20, 'Perlu Pemeriksaan', 'Uji Laboratorium Kimia', 1),
(5, 5, 'SNS-DMS-01', 'Jaringan Transmisi Lubuk Buntak', 7.05, 1.95, 24.6, 126.0, 0.32, 'Memenuhi Baku Mutu', 'Telemetri Sensor IoT', 1)
ON CONFLICT (id) DO NOTHING;

-- 5. DATA PENGADUAN GANGGUAN MASYARAKAT
INSERT INTO pengaduan (id, nomor_tiket, user_id, wilayah_id, nama_pelapor, nomor_kontak, kategori, deskripsi, foto_url, latitude, longitude, alamat_patokan, status, catatan_petugas) VALUES
(1, 'TKT-2026-PA-001', 3, 2, 'Ahmad Fauzi', '0852-6712-3345', 'Pipa Bocor', 'Pipa sambungan utama di pinggir jalan raya trotoar retak dan air meluap ke badan jalan.', 'assets/images/sample_leak.jpg', -4.029810, 103.268500, 'Jl. Kolonel Atmo No. 45, Nendagung (Depan Minimarket)', 'Dalam Penanganan', 'Tim teknisi UPTD Regu 2 sedang melakukan penggalian dan penggantian klem pipa HDPE 3 inch.'),
(2, 'TKT-2026-PA-002', 4, 4, 'Siti Nurhaliza', '0821-8199-7761', 'Tekanan Rendah', 'Aliran air dari pagi sangat kecil hanya menetes, bak penampungan tidak terisi.', NULL, -3.987500, 103.235100, 'Dusun Agung Lawangan RT 03 RW 01', 'Diverifikasi', 'Petugas mengecek debit katup pembagi di sektor hulu Dempo Utara.'),
(3, 'TKT-2026-PA-003', NULL, 1, 'Bambang Supriyanto', '0813-9022-1144', 'Air Keruh / Bau', 'Air berwarna kecokelatan setelah hujan lebat kemarin sore.', NULL, -4.015200, 103.255400, 'Komp. Perumahan Curup Jare Indah Blok C', 'Selesai', 'Pembersihan endapan sedimen pada wash-out valve selesai dilakukan pkl 11:30 WIB. Air kembali jernih.'),
(4, 'TKT-2026-PA-004', NULL, 3, 'Hj. Rohana', '0853-4412-9900', 'Aliran Mati', 'Aliran air terhenti total sejak pkl 06.00 WIB tanpa pemberitahuan.', NULL, -4.041200, 103.289100, 'Desa Candi Jaya Lintang Belakang Masjid', 'Diterima', 'Laporan telah diteruskan ke Mandor Distribusi Wilayah Dempo Tengah untuk pengecekan stasiun pompa.')
ON CONFLICT (id) DO NOTHING;

-- 6. DATA STASIUN POMPA SCADA & RESERVOIR UPTD AIR BERSIH
INSERT INTO stasiun_pompa (id, kode_aset, nama_stasiun, wilayah_id, tipe_pompa, kapasitas_lps, tekanan_bar, status_operasional, running_hours, arus_listrik_ampere, suhu_motor_celsius, lokasi_koordinat) VALUES
(1, 'PMP-LMT-01', 'Intake & Pompa Utama Sungai Lematang', 1, 'Submersible High-Capacity', 120.00, 4.20, 'Aktif', 4320, 42.5, 48.2, '-4.0125, 103.2510'),
(2, 'PMP-BST-02', 'Stasiun Pompa Booster Dempo Makmur', 2, 'Booster Centrifugal Horisontal', 80.00, 3.80, 'Aktif', 2890, 31.0, 45.0, '-4.0310, 103.2720'),
(3, 'PMP-RSV-03', 'Reservoir Gravitasi Curup Mangkok', 4, 'Gravity Flow & Regulating Valve', 65.00, 2.90, 'Aktif', 1240, 14.5, 38.5, '-3.9810, 103.2280'),
(4, 'PMP-BST-04', 'Stasiun Pompa Distribusi Bumi Agung', 4, 'Multistage Booster Pump', 45.00, 1.60, 'Maintenance', 5120, 0.0, 26.0, '-3.9920, 103.2410')
ON CONFLICT (id) DO NOTHING;

-- 7. DATA JADWAL PEMELIHARAAN
INSERT INTO jadwal_pemeliharaan (id, pompa_id, wilayah_id, jenis_kegiatan, tipe_pemeliharaan, tanggal_rencana, status_pekerjaan, penanggung_jawab, catatan_perbaikan) VALUES
(1, 4, 4, 'Penggantian Mechanical Seal & Overhaul Bearing Motor', 'Corrective', CURRENT_DATE, 'Sedang Dikerjakan', 'Agus Salim (Teknisi Mesin UPTD)', 'Pengerjaan berlangsung di workshop stasiun Bumi Agung, estimasi selesai sore hari.'),
(2, 1, 1, 'Pembersihan Saringan Intake & Kalibrasi Pressure Transmitter', 'Preventive', CURRENT_DATE + INTERVAL '3 days', 'Dijadwalkan', 'Maya Septianah & Tim SCADA', 'Pengecekan rutin triwulanan sensor telemetri intake utama Lematang.'),
(3, 2, 2, 'Inspeksi Panel Inverter VFD & Pengukuran Tahanan Isolasi', 'Preventive', CURRENT_DATE + INTERVAL '7 days', 'Dijadwalkan', 'Hendra Wijaya (Divisi Listrik)', 'Preventive berkala mencegah trip arus lebih pada jam beban puncak.')
ON CONFLICT (id) DO NOTHING;

-- 8. DATA NOTIFIKASI SISTEM
INSERT INTO notifikasi (id, user_id, judul, pesan, kategori, prioritas, status_baca) VALUES
(1, 1, 'Peringatan Tekanan Rendah Pagar Alam Selatan', 'Sensor SNS-PAS-02 mendeteksi penurunan tekanan di bawah ambang batas (1.85 Bar) di kawasan Nendagung.', 'Gangguan', 'High', FALSE),
(2, 1, 'Jadwal Overhaul Pompa Bumi Agung', 'Pemeliharaan pompa booster Bumi Agung sedang berjalan hari ini, pasokan dialihkan sementara.', 'Pemeliharaan', 'Medium', FALSE),
(3, 1, 'Laporan Gangguan Baru Masuk', 'Tiket TKT-2026-PA-004 (Aliran Mati di Desa Candi Jaya) menunggu verifikasi dari petugas.', 'Aduan', 'High', FALSE)
ON CONFLICT (id) DO NOTHING;

