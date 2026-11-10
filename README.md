# SMART WATER MANAGEMENT — KOTA PAGAR ALAM
*Sistem Informasi Monitoring Distribusi, Kualitas, dan Penggunaan Air Bersih*

Dokumentasi implementasi aplikasi web dashboard SCADA UPTD dan Smart City Command Center berdasarkan **Product Requirement Document (PRD)** dan **SKILL.md Design System**.

---

## 1. Identitas Proyek & Akademik

* **Nama Produk:** Smart Water Management
* **Instansi Mitra:** Pemerintah Kota Pagar Alam — Dinas PUPR (UPTD Air Bersih)
* **Lingkungan Operasional:** Sistem SCADA UPTD & Smart City Command Center Kota Pagar Alam
* **Slogan Layanan:** *“Air Terpantau, Pengelolaan Lebih Baik”*
* **Pengembang:** Maya Septianah (Program Studi Sistem Informasi, Universitas Teknokrat Indonesia)
* **Dosen Pembimbing:** Dr. Erliyan Redy Susanto, M.Kom.
* **Tahun:** 2026

---

## 2. Struktur Berkas & Direktori Proyek

```text
UTS_Maya/
│
├── index.html                                   # Dashboard Utama Berbasis Web (Single Page Application)
├── README.md                                    # Dokumentasi & Panduan Pengujian Sistem
├── PRD_Smart_Water_Management_Maya_Septianah.md  # Dokumen Spesifikasi Kebutuhan Produk (PRD)
├── SKILL_Smart_Water_Management.md               # Pedoman Desain Visual & UI/UX Sistem
│
├── assets/
│   ├── css/
│   │   └── style.css                            # Token desain, status badge semantik, & style cetak
│   ├── images/
│   │   ├── logo_pagaralam.jpg                   # Logo resmi Pemerintah Kota Pagar Alam
│   │   ├── logo_teknokrat.png                   # Logo resmi Universitas Teknokrat Indonesia
│   │   ├── logo_pagaralam.svg                   # Vektor logo Pemkot Pagar Alam
│   │   └── logo_teknokrat.svg                   # Vektor logo Universitas Teknokrat Indonesia
│   └── js/
│       ├── data.js                              # Dataset awal infrastruktur air 5 kecamatan Pagar Alam
│       ├── state.js                             # State store reaktif & sinkronisasi LocalStorage
│       ├── app.js                               # Router, navigasi modul, role switcher, pencarian, notifikasi
│       └── components/
│           ├── overview.js                      # Modul 1: Ringkasan Eksekutif & Peta GIS Leaflet
│           ├── quality.js                       # Modul 2: Monitoring Kualitas Air & Uji Lab Permenkes
│           ├── complaints.js                    # Modul 3: Manajemen Aduan Warga & Workflow Petugas
│           ├── consumption.js                   # Modul 4: Analisis Konsumsi Zona & Cek Meter Mandiri
│           └── maintenance.js                   # Modul 5: Status Pompa SCADA & Jadwal Pemeliharaan
│
└── database/
    ├── schema.sql                               # Skema PostgreSQL DDL (Tabel, Relasi, Indeks, Views)
    └── seeds.sql                                # Data inisialisasi awal wilayah Pagar Alam
```

---

## 3. Matriks Pemenuhan Kebutuhan Fungsional (PRD Bab 3)

| ID Fitur | Kebutuhan PRD | Status | Implementasi pada Aplikasi |
|---|---|---|---|
| **FR-01** | Autentikasi & Pembagian Peran | **Selesai** | Tersedia **Role Switcher** di topbar (*Masyarakat*, *Petugas UPTD*, *Admin Command Center*) untuk simulasi hak akses. |
| **FR-02** | Dashboard Ringkasan Eksekutif | **Selesai** | 4 Kartu KPI operasional, Peta SCADA GIS, panel alert darurat, dan rekap wilayah se-Pagar Alam. |
| **FR-03** | Manajemen Distribusi Air | **Selesai** | Status aliran 5 kecamatan, jadwal distribusi, dan modal formulir pembaruan status distribusi oleh petugas. |
| **FR-04** | Monitoring Kualitas Air | **Selesai** | Parameter pH, kekeruhan (NTU), suhu, TDS, kesesuaian standar Permenkes 2/2023, grafik tren 7 hari, dan form input uji lab. |
| **FR-05** | Catatan Penggunaan Air | **Selesai** | Rekap konsumsi bulanan ($m^3$), komparasi antar-zona, grafik fluktuasi jam puncak, dan fitur cek meter mandiri pelanggan. |
| **FR-06** | Modul Pengaduan Warga | **Selesai** | Form pengaduan publik dengan kategori, alamat patokan, deskripsi gangguan, koordinat, dan simulasi lampiran foto. |
| **FR-07** | Tindak Lanjut Laporan | **Selesai** | Alur status tiket: *Diterima* $\rightarrow$ *Diverifikasi* $\rightarrow$ *Dalam Penanganan* $\rightarrow$ *Selesai* dengan catatan lapangan teknisi UPTD. |
| **FR-08** | Notifikasi Gangguan & Operasional | **Selesai** | Panel notifikasi dinamis pada topbar dengan penanda unread badge dan auto-broadcast saat ada tiket baru. |
| **FR-09** | Manajemen Data & Pemeliharaan | **Selesai** | Monitoring stasiun pompa SCADA, jam operasi (*running hours*), dan form penjadwalan pemeliharaan preventif/korektif. |

---

## 4. Panduan Menjalankan & Menguji Aplikasi

### A. Membuka Aplikasi
1. Buka berkas `index.html` langsung di browser modern apa saja (Google Chrome, Microsoft Edge, Brave, Mozilla Firefox).
2. Sistem tidak memerlukan instalasi dependensi rumit (*zero dependency runtime*), langsung dapat digunakan.

### B. Skenario Pengujian Fitur:
1. **Peta GIS SCADA (Modul 1):**
   * Periksa jalur pipa transmisi utama (**Cyan**), pipa normal (**Hijau**), pipa tekanan rendah (**Amber**), dan pipa perbaikan (**Merah**).
   * Klik marker sensor atau pompa pada peta untuk melihat popup status telemetri real-time.
2. **Uji Input Laboratorium (Modul 2):**
   * Pilih peran *Petugas UPTD Air Bersih* di topbar.
   * Klik tombol **"Input Hasil Uji Laboratorium"**.
   * Masukkan nilai pH (misal 7.2) dan kekeruhan (misal 1.8 NTU), lalu simpan. Sistem akan memvalidasi kepatuhan baku mutu dan menyimpan catatan secara persisten.
3. **Uji Pengaduan Warga (Modul 3):**
   * Klik tombol **"Buat Laporan Aduan Baru"**.
   * Isi kategori pipa bocor dan deskripsi masalah. Tiket otomatis terbit (misal: `TKT-2026-PA-005`).
   * Buka tiket tersebut melalui tombol **"Tindak Lanjut"** untuk memajukan status penanganan dari *Diterima* menjadi *Dalam Penanganan* atau *Selesai*.
4. **Uji Cek Meter Pelanggan (Modul 4):**
   * Pada modul Analisis Konsumsi, masukkan nomor meter `MTR-PAU-0421` atau `MTR-DEM-0189` untuk melihat grafik pemakaian 6 bulan dan estimasi biaya tagihan air.
5. **Uji Pencarian Cepat (Global Search):**
   * Tekan tombol kombinasi `Ctrl + K` pada keyboard atau klik kolom pencarian di header.
   * Ketik nama wilayah (misal: "Dempo"), nomor tiket, atau stasiun pompa untuk lompat langsung ke data terkait.

---

## 5. Implementasi Basis Data PostgreSQL

Untuk lingkungan produksi, berkas skema DDL PostgreSQL dan data inisialisasi tersedia di:
* `database/schema.sql`: Berisi definisi tipe ENUM, tabel relasional (`users`, `wilayah`, `distribusi`, `kualitas_air`, `penggunaan_air`, `pengaduan`, `notifikasi`, `stasiun_pompa`, `jadwal_pemeliharaan`), *foreign keys*, *check constraints*, indeks, dan VIEW analisis.
* `database/seeds.sql`: Berisi data inisialisasi 5 kecamatan se-Kota Pagar Alam, user demo, dan telemetri awal.

Cara impor ke PostgreSQL:
```bash
psql -U postgres -d postgres -c "CREATE DATABASE smart_water_pagaralam;"
psql -U postgres -d smart_water_pagaralam -f database/schema.sql
psql -U postgres -d smart_water_pagaralam -f database/seeds.sql
```

