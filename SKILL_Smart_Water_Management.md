# SKILL.md
# Design Skill — Smart Water Management Pagar Alam

## 1. Identitas Proyek
- **Nama aplikasi:** Smart Water Management
- **Instansi:** Pemerintah Kota Pagar Alam
- **Unit terkait:** Dinas PUPR — UPTD Air Bersih
- **Lingkungan operasional:** Sistem SCADA UPTD dan Smart City Command Center
- **Slogan:** “Air Terpantau, Pengelolaan Lebih Baik”

Aplikasi ini merupakan dashboard web untuk memantau distribusi air, kualitas air, telemetri sensor, pengaduan warga, konsumsi per zona, serta pemeliharaan pompa dan jaringan.

## 2. Tujuan Skill
Dokumen ini menjadi pedoman AI designer dan developer saat membuat, mengembangkan, atau memperbaiki antarmuka Smart Water Management. Setiap halaman harus konsisten, responsif, mudah dipahami petugas, dan mengutamakan keterbacaan informasi operasional.

## 3. Arah Visual
Gunakan gaya **modern professional government dashboard**:
- Profesional, bersih, informatif, dan tepercaya.
- Dominasi warna biru yang merepresentasikan air dan layanan publik.
- Latar terang, kartu putih, border halus, dan bayangan lembut.
- Tata letak berbasis grid dengan hierarki informasi yang jelas.
- Hindari dekorasi berlebihan, gradasi mencolok, dan animasi yang mengganggu.

## 4. Sistem Desain

### 4.1 Warna
Gunakan token warna yang konsisten dengan implementasi sumber. Acuan penggunaannya:
| Peran | Penggunaan |
|---|---|
| Biru / primary | Navigasi aktif, tombol utama, tautan |
| Biru sangat muda / abu muda | Latar halaman |
| Putih / surface | Kartu, panel, tabel, modal |
| Abu gelap | Judul dan teks utama |
| Abu sedang | Keterangan dan metadata |
| Hijau | Sensor atau kondisi normal |
| Amber / kuning | Peringatan atau tekanan rendah |
| Merah | Gangguan kritis atau pemeliharaan |
| Cyan | Informasi atau pipa transmisi utama |

Status harus selalu dibedakan dengan teks atau ikon, bukan warna saja.

### 4.2 Tipografi
- Gunakan **Plus Jakarta Sans** dan **Inter** sesuai implementasi.
- Buat judul halaman lebih menonjol daripada isi.
- Pastikan label, tabel, angka KPI, satuan, dan keterangan mudah dibaca.
- Angka penting seperti tekanan dan volume harus mudah dipindai.

### 4.3 Bentuk dan elevasi
- Gunakan sudut membulat secara konsisten pada kartu, tombol, input, dan panel.
- Terapkan border tipis dan bayangan lembut.
- Hindari bayangan gelap atau efek tiga dimensi berlebihan.

## 5. Struktur Layout

### 5.1 Sidebar
Sidebar desktop berada di sisi kiri dengan lebar acuan sekitar 320 px sesuai kode sumber. Muat logo/identitas pemerintah, nama aplikasi, slogan, indikator status SCADA UPTD, dan navigasi.

Menu navigasi:
1. Ringkasan Eksekutif & Peta Distribusi
2. Monitoring Kualitas Air & Telemetri Sensor
3. Manajemen Pengaduan & Laporan Warga
4. Analisis Konsumsi & Zona Wilayah
5. Jadwal Pemeliharaan & Status Pompa

Tandai halaman aktif dengan jelas. Pada layar kecil, ubah sidebar menjadi drawer atau navigasi ringkas.

### 5.2 Header
Header memuat kolom pencarian, status sistem, notifikasi, dan profil pengguna. Jaga agar kontrol tidak terlalu padat.

### 5.3 Area konten
- Beri jarak cukup antara judul, ringkasan, dan konten utama.
- Gunakan grid responsif untuk KPI dan kartu.
- Beri judul serta keterangan pada tabel dan grafik.
- Peta harus memiliki legenda yang jelas.

### 5.4 Footer
Cantumkan Pemerintah Kota Pagar Alam, Smart City Command Center, Dinas PUPR — UPTD Air Bersih, dan © 2026.

## 6. Komponen Antarmuka

### 6.1 Kartu KPI
Tampilkan satu metrik utama per kartu, disertai label, nilai, satuan, dan konteks waktu jika tersedia. Hindari terlalu banyak warna.

### 6.2 Badge status
Gunakan label konsisten:
- **Normal:** hijau.
- **Peringatan:** amber/kuning.
- **Kritis/Gangguan:** merah.
- **Informasi:** cyan/biru.

Selalu sertakan teks status, misalnya “Normal” atau “Tekanan Rendah”.

### 6.3 Tabel data
Gunakan header ringkas, perataan angka dan satuan yang konsisten, serta state kosong, loading, dan error. Pada layar kecil, sediakan scroll horizontal atau alternatif kartu.

### 6.4 Grafik
Cantumkan judul, label sumbu, satuan, dan rentang waktu. Hindari terlalu banyak seri dan jangan menyimpulkan data yang tidak tersedia.

### 6.5 Peta distribusi
Legenda peta berdasarkan kode sumber:
- Hijau: sensor normal (tekanan ≥ 2,5 Bar).
- Amber: tekanan rendah (tekanan < 2,0 Bar).
- Merah: pipa dalam pemeliharaan.
- Cyan: pipa transmisi utama.

Jangan mengarang lokasi sensor, koordinat, atau kondisi jaringan. Jika data tidak tersedia, tampilkan status belum tersedia.

### 6.6 Alert dan notifikasi
Prioritaskan gangguan yang membutuhkan tindakan. Tampilkan jenis gangguan, lokasi/zona jika tersedia, waktu, dan status tindak lanjut. Bedakan informasi, peringatan, dan kondisi kritis. Gunakan toast untuk konfirmasi singkat saja.

### 6.7 Tombol dan kontrol
Gunakan label aksi spesifik, misalnya “Lihat Detail” atau “Tandai Selesai”. Sediakan state hover, focus, disabled, dan loading. Tombol utama harus lebih menonjol daripada tombol sekunder.

## 7. Pedoman per Halaman

### 7.1 Ringkasan Eksekutif & Peta Distribusi
Tujuan: memberi gambaran cepat kondisi layanan dan distribusi air. Prioritaskan KPI operasional, peta distribusi, legenda status jaringan/sensor, serta daftar alert penting.

### 7.2 Monitoring Kualitas Air & Telemetri Sensor
Tujuan: memantau parameter kualitas air dan data sensor. Prioritaskan nilai telemetri, status sensor, parameter yang tersedia, tren historis, dan penanda nilai yang perlu diperiksa. Jangan menetapkan ambang kualitas air tanpa sumber atau ketentuan.

### 7.3 Manajemen Pengaduan & Laporan Warga
Tujuan: membantu petugas mengelola laporan masyarakat. Prioritaskan daftar tiket, kategori, waktu laporan, status penanganan, detail laporan, dan tindak lanjut. Jangan menampilkan data pribadi warga secara berlebihan. Data dummy harus diberi label.

### 7.4 Analisis Konsumsi & Zona Wilayah
Tujuan: menyajikan pola konsumsi berdasarkan zona. Prioritaskan ringkasan konsumsi, perbandingan zona, tren waktu, serta filter zona/periode jika tersedia. Setiap nilai harus memiliki satuan dan periode.

### 7.5 Jadwal Pemeliharaan & Status Pompa
Tujuan: membantu petugas melihat jadwal pemeliharaan dan kondisi pompa. Prioritaskan jadwal, status pompa, informasi aset/lokasi jika tersedia, serta status pekerjaan. Jangan menyatakan kondisi pompa tanpa data pendukung.

## 8. Ikonografi
Gunakan Material Symbols Outlined sebagaimana implementasi sumber. Pilih ikon yang mudah dikenali dan konsisten. Jangan mencampur banyak gaya ikon. Ikon yang menyampaikan status atau aksi penting harus disertai label.

## 9. Spasi dan Grid
- Gunakan sistem jarak yang konsisten.
- Kelompokkan informasi yang saling berkaitan.
- Beri ruang kosong agar dashboard tidak terasa padat.
- Sejajarkan kartu, tabel, dan judul dalam satu grid.
- Hindari ukuran kartu yang berubah-ubah tanpa alasan.

## 10. Desain Responsif
- **Desktop:** sidebar terlihat, konten multi-kolom, tabel dan peta memanfaatkan ruang lebar.
- **Tablet:** kurangi jumlah kolom; sidebar dapat diperkecil atau menjadi drawer.
- **Mobile:** gunakan satu kolom, navigasi ringkas, kontrol mudah disentuh, dan tabel yang tetap terbaca.

Jangan menghilangkan informasi status penting pada layar kecil.

## 11. Interaksi dan State
Setiap komponen interaktif harus memiliki state default, hover, focus, active/selected, disabled, loading, empty, error, dan success sesuai kebutuhan. Aksi pengguna harus memberikan umpan balik. Minta konfirmasi untuk tindakan berdampak besar atau sulit dibatalkan.

## 12. Aksesibilitas
- Jaga kontras teks dan latar.
- Jangan mengandalkan warna saja untuk status.
- Berikan label jelas pada input dan tombol.
- Dukung navigasi keyboard.
- Gunakan ukuran teks yang terbaca.
- Berikan label aksesibel pada elemen visual penting.

## 13. Pedoman Teknis Desain
- Pertahankan struktur dan pola komponen yang sudah ada sebelum membuat pola baru.
- Gunakan kembali komponen kartu, badge, tabel, tombol, dan panel.
- Pertahankan konsistensi nama menu dan istilah berbahasa Indonesia.
- Jangan mengubah identitas instansi, nama modul, atau slogan tanpa instruksi.
- Jangan menambahkan fitur, metrik, integrasi, atau data yang tidak didukung kebutuhan.
- Jika informasi belum ditentukan, tandai belum tersedia atau ajukan pertanyaan.

## 14. Instruksi untuk AI Designer
Saat mengerjakan proyek:
1. Pelajari struktur halaman dan komponen yang sudah ada.
2. Pertahankan identitas visual Smart Water Management Pagar Alam.
3. Gunakan bahasa Indonesia untuk label dan navigasi.
4. Prioritaskan keterbacaan data operasional.
5. Buat desain responsif untuk desktop, tablet, dan mobile.
6. Pastikan status memiliki label yang jelas.
7. Gunakan data yang diberikan; jangan membuat klaim operasional dari data fiktif.
8. Jika menggunakan data dummy untuk mockup, beri label “Data Contoh”.
9. Jaga konsistensi antarhalaman dan hindari perubahan visual yang tidak diperlukan.

## 15. Hasil yang Diharapkan
Dashboard pemerintahan yang profesional, konsisten, responsif, dan mudah digunakan petugas. Informasi distribusi air, kualitas air, pengaduan warga, konsumsi, serta pemeliharaan harus dapat dipahami dengan cepat dan tidak menyesatkan pengguna.
