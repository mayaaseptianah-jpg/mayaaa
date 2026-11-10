-- =====================================================================
-- DATABASE SCHEMA: SMART WATER MANAGEMENT KOTA PAGAR ALAM
-- Instansi : Pemerintah Kota Pagar Alam — Dinas PUPR (UPTD Air Bersih)
-- Kampus   : Universitas Teknokrat Indonesia
-- Penulis  : Maya Septianah (Sistem Informasi)
-- Pembimbing: Dr. Erliyan Redy Susanto, M.Kom.
-- Sesuai   : PRD Smart Water Management (Bab 7 & 8)
-- RDBMS    : PostgreSQL 14+
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('masyarakat', 'petugas', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_distribusi AS ENUM ('Normal', 'Tekanan Rendah', 'Pemeliharaan', 'Gangguan Aliran');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_kualitas AS ENUM ('Memenuhi Baku Mutu', 'Perlu Pemeriksaan', 'Tidak Memenuhi');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE kategori_pengaduan AS ENUM (
        'Pipa Bocor', 
        'Aliran Mati', 
        'Air Keruh / Bau', 
        'Tekanan Rendah', 
        'Meteran Rusak', 
        'Lainnya'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_pengaduan AS ENUM ('Diterima', 'Diverifikasi', 'Dalam Penanganan', 'Selesai');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABEL WILAYAH (KECAMATAN / ZONA DISTRIBUSI PAGAR ALAM)
CREATE TABLE IF NOT EXISTS wilayah (
    id SERIAL PRIMARY KEY,
    kode_wilayah VARCHAR(20) UNIQUE NOT NULL,
    nama_wilayah VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    populasi_jiwa INT DEFAULT 0,
    jumlah_sambungan_rumah INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABEL PENGGUNA (USERS)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nomor_telepon VARCHAR(25),
    role user_role NOT NULL DEFAULT 'masyarakat',
    wilayah_id INT REFERENCES wilayah(id) ON DELETE SET NULL,
    nomor_meter VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL DISTRIBUSI AIR
CREATE TABLE IF NOT EXISTS distribusi (
    id SERIAL PRIMARY KEY,
    wilayah_id INT NOT NULL REFERENCES wilayah(id) ON DELETE CASCADE,
    status status_distribusi NOT NULL DEFAULT 'Normal',
    jadwal_distribusi VARCHAR(120) NOT NULL, -- e.g., '24 Jam Nonstop' atau '06:00 - 18:00 WIB'
    debit_aliran_lps NUMERIC(8,2) DEFAULT 0.00, -- Liter per detik
    tekanan_rata_rata_bar NUMERIC(4,2) DEFAULT 0.00, -- Standar >= 2.5 Bar
    keterangan TEXT,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABEL PEMERIKSAAN KUALITAS AIR
CREATE TABLE IF NOT EXISTS kualitas_air (
    id SERIAL PRIMARY KEY,
    wilayah_id INT NOT NULL REFERENCES wilayah(id) ON DELETE CASCADE,
    titik_sensor_id VARCHAR(50) NOT NULL,
    lokasi_sampling VARCHAR(150) NOT NULL,
    nilai_ph NUMERIC(4,2) NOT NULL CHECK (nilai_ph >= 0.00 AND nilai_ph <= 14.00), -- Standar Permenkes 6.5 - 8.5
    kekeruhan_ntu NUMERIC(6,2) NOT NULL CHECK (kekeruhan_ntu >= 0.00), -- Standar Permenkes < 5.0 NTU
    suhu_celsius NUMERIC(4,2) NOT NULL, -- Rentang wajar 20 - 30 °C
    tds_ppm NUMERIC(6,2), -- Total Dissolved Solids (< 300 ppm baik)
    klorin_bebas_mg_l NUMERIC(4,2), -- 0.2 - 0.5 mg/L
    status_kualitas status_kualitas NOT NULL DEFAULT 'Memenuhi Baku Mutu',
    metode_uji VARCHAR(50) DEFAULT 'Telemetri Sensor IoT', -- atau 'Uji Laboratorium Kimia'
    petugas_id INT REFERENCES users(id) ON DELETE SET NULL,
    tanggal_pemeriksaan TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. TABEL PENGGUNAAN AIR (KONSUMSI)
CREATE TABLE IF NOT EXISTS penggunaan_air (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wilayah_id INT NOT NULL REFERENCES wilayah(id) ON DELETE CASCADE,
    nomor_meter VARCHAR(50) NOT NULL,
    periode VARCHAR(20) NOT NULL, -- format: 'YYYY-MM' e.g. '2026-10'
    meter_awal_m3 NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    meter_akhir_m3 NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    jumlah_penggunaan_m3 NUMERIC(10,2) GENERATED ALWAYS AS (meter_akhir_m3 - meter_awal_m3) STORED,
    tanggal_pencatatan DATE NOT NULL DEFAULT CURRENT_DATE,
    sumber_data VARCHAR(30) DEFAULT 'Manual' CHECK (sumber_data IN ('Manual', 'Smart Meter IoT', 'Estimasi'))
);

-- 8. TABEL PENGADUAN GANGGUAN MASYARAKAT
CREATE TABLE IF NOT EXISTS pengaduan (
    id SERIAL PRIMARY KEY,
    nomor_tiket VARCHAR(30) UNIQUE NOT NULL, -- e.g., 'TKT-2026-PA-001'
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    wilayah_id INT NOT NULL REFERENCES wilayah(id) ON DELETE CASCADE,
    nama_pelapor VARCHAR(120) NOT NULL,
    nomor_kontak VARCHAR(25) NOT NULL,
    kategori kategori_pengaduan NOT NULL,
    deskripsi TEXT NOT NULL,
    foto_url TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    alamat_patokan TEXT NOT NULL,
    status status_pengaduan NOT NULL DEFAULT 'Diterima',
    catatan_petugas TEXT,
    foto_penyelesaian_url TEXT,
    petugas_penangan_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. TABEL NOTIFIKASI
CREATE TABLE IF NOT EXISTS notifikasi (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    judul VARCHAR(150) NOT NULL,
    pesan TEXT NOT NULL,
    kategori VARCHAR(30) DEFAULT 'Gangguan' CHECK (kategori IN ('Gangguan', 'Pemeliharaan', 'Aduan', 'Kualitas', 'Sistem')),
    prioritas VARCHAR(20) DEFAULT 'Medium' CHECK (prioritas IN ('Low', 'Medium', 'High', 'Urgent')),
    status_baca BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. TABEL STASIUN POMPA & ASET JARINGAN (SCADA UPTD)
CREATE TABLE IF NOT EXISTS stasiun_pompa (
    id SERIAL PRIMARY KEY,
    kode_aset VARCHAR(30) UNIQUE NOT NULL,
    nama_stasiun VARCHAR(100) NOT NULL,
    wilayah_id INT REFERENCES wilayah(id) ON DELETE SET NULL,
    tipe_pompa VARCHAR(50) NOT NULL, -- e.g., 'Submersible Intake', 'Booster Centrifugal'
    kapasitas_lps NUMERIC(8,2) NOT NULL,
    tekanan_bar NUMERIC(4,2) DEFAULT 0.00,
    status_operasional VARCHAR(30) DEFAULT 'Aktif' CHECK (status_operasional IN ('Aktif', 'Standby', 'Maintenance', 'Off/Rusak')),
    running_hours INT DEFAULT 0,
    arus_listrik_ampere NUMERIC(6,2) DEFAULT 0.00,
    suhu_motor_celsius NUMERIC(5,2) DEFAULT 0.00,
    lokasi_koordinat VARCHAR(50),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 11. TABEL JADWAL PEMELIHARAAN
CREATE TABLE IF NOT EXISTS jadwal_pemeliharaan (
    id SERIAL PRIMARY KEY,
    pompa_id INT REFERENCES stasiun_pompa(id) ON DELETE CASCADE,
    wilayah_id INT REFERENCES wilayah(id) ON DELETE CASCADE,
    jenis_kegiatan VARCHAR(120) NOT NULL,
    tipe_pemeliharaan VARCHAR(30) DEFAULT 'Preventive' CHECK (tipe_pemeliharaan IN ('Preventive', 'Corrective', 'Inspeksi')),
    tanggal_rencana DATE NOT NULL,
    status_pekerjaan VARCHAR(30) DEFAULT 'Dijadwalkan' CHECK (status_pekerjaan IN ('Dijadwalkan', 'Sedang Dikerjakan', 'Selesai', 'Ditunda')),
    penanggung_jawab VARCHAR(100) NOT NULL,
    catatan_perbaikan TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 12. INDEKS UNTUK OPTIMASI PERFORMA (PRD Bab 4 & Bab 7)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_pengaduan_status ON pengaduan(status);
CREATE INDEX IF NOT EXISTS idx_pengaduan_wilayah ON pengaduan(wilayah_id);
CREATE INDEX IF NOT EXISTS idx_kualitas_air_tanggal ON kualitas_air(tanggal_pemeriksaan DESC);
CREATE INDEX IF NOT EXISTS idx_penggunaan_air_periode ON penggunaan_air(periode, user_id);
CREATE INDEX IF NOT EXISTS idx_notifikasi_user ON notifikasi(user_id, status_baca);

-- 13. VIEW: RINGKASAN MONITORING EKSEKUTIF SCADA
CREATE OR REPLACE VIEW view_ringkasan_eksekutif AS
SELECT 
    COUNT(DISTINCT w.id) AS total_wilayah,
    COALESCE(SUM(w.jumlah_sambungan_rumah), 0) AS total_pelanggan_sr,
    COALESCE(AVG(d.tekanan_rata_rata_bar), 0) AS rerata_tekanan_jaringan_bar,
    COALESCE(SUM(d.debit_aliran_lps), 0) AS total_debit_distribusi_lps,
    (SELECT COUNT(*) FROM pengaduan WHERE status IN ('Diterima', 'Diverifikasi', 'Dalam Penanganan')) AS tiket_gangguan_aktif,
    (SELECT COUNT(*) FROM stasiun_pompa WHERE status_operasional = 'Aktif') AS pompa_aktif,
    (SELECT COUNT(*) FROM stasiun_pompa) AS total_pompa
FROM wilayah w
LEFT JOIN distribusi d ON w.id = d.wilayah_id;

