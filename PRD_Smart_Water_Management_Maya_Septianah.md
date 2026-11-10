# PRODUCT REQUIREMENT DOCUMENT (PRD)

## SMART WATER MANAGEMENT

*Memantau Distribusi, Kualitas, dan Penggunaan Air Bersih*

Disusun oleh:

MAYA SEPTIANAH Program Studi Sistem Informasi Universitas Teknokrat
Indonesia

Dosen Pengampu/Pembimbing

Dr. Erliyan Redy Susanto, M.Kom.

PRODUCT REQUIREMENT DOCUMENT (PRD)

SMART WATER MANAGEMENT

*Sistem Monitoring Distribusi, Kualitas, dan Penggunaan Air Bersih*

## 1. PENDAHULUAN

### 1.1 Latar Belakang

Air bersih merupakan kebutuhan dasar masyarakat. Pengelolaan layanan air
bersih masih dapat

menghadapi berbagai kendala, antara lain distribusi yang tidak merata,
gangguan aliran,

kebocoran jaringan, keterbatasan informasi kualitas air, serta kurangnya
pemantauan penggunaan

air. Kondisi tersebut membutuhkan sistem informasi yang dapat
menghubungkan masyarakat,

petugas pengelola air, dan pemerintah daerah.

Smart Water Management dirancang sebagai aplikasi untuk memantau
distribusi, kualitas, dan

penggunaan air bersih. Aplikasi menyediakan informasi, pencatatan,
pelaporan gangguan, dan

tindak lanjut laporan dalam satu platform. Sistem direncanakan
menggunakan Rust pada sisi

backend dan PostgreSQL sebagai basis data.

### 1.2 Tujuan Produk

## 1. Memudahkan masyarakat memperoleh informasi mengenai distribusi air bersih.

## 2. Menyediakan informasi hasil pemeriksaan kualitas air berdasarkan parameter yang dicatat.

## 3. Mempermudah pelaporan kebocoran pipa dan gangguan distribusi.

## 4. Menyediakan catatan dan statistik penggunaan air.

## 5. Membantu petugas mengelola serta menindaklanjuti laporan masyarakat.

## 6. Meningkatkan transparansi informasi layanan air bersih.

### 1.3 Target Pengguna

-   Masyarakat: melihat informasi, memantau penggunaan, menerima
    notifikasi, dan membuat

pengaduan. - Petugas pengelola air/PDAM: memperbarui data distribusi,
memasukkan hasil pemeriksaan,

dan menangani laporan. - Admin pemerintah daerah/pengelola: mengelola
akun, wilayah, data, serta memantau laporan

dan statistik.

## 2. DESKRIPSI PRODUK

Smart Water Management merupakan aplikasi layanan informasi air bersih
yang berfokus pada

tiga fungsi utama, yaitu monitoring distribusi, monitoring kualitas, dan
monitoring penggunaan

air. Aplikasi juga menyediakan fitur pengaduan masyarakat dan notifikasi
untuk mendukung

komunikasi antara pengguna dan petugas.

### 2.1 Ruang Lingkup Produk

-   Menampilkan status dan jadwal distribusi air per wilayah.
-   Menampilkan hasil pemeriksaan kualitas air, seperti pH, kekeruhan,
    dan suhu, apabila

datanya tersedia. - Mencatat serta menampilkan penggunaan air
berdasarkan periode. - Menerima laporan gangguan dengan deskripsi, foto,
dan lokasi. - Memungkinkan petugas memperbarui status penanganan
laporan. - Mengirimkan pemberitahuan terkait gangguan dan perkembangan
laporan.

## 3. KEBUTUHAN FUNGSIONAL

ID / Fitur Deskripsi Kebutuhan Pengguna dapat melakukan registrasi,
login, dan logout. Sistem membedakan hak akses FR-01 Autentikasi
masyarakat, petugas, dan admin. Sistem menampilkan ringkasan distribusi,
informasi kualitas air, statistik penggunaan, FR-02 Dashboard serta
gangguan terbaru. Pengguna dapat melihat status distribusi dan jadwal
berdasarkan wilayah. Petugas/admin FR-03 Distribusi Air dapat
memperbarui status dan keterangan distribusi. Sistem menampilkan hasil
pemeriksaan pH, kekeruhan, suhu, tanggal pemeriksaan, dan FR-04 Kualitas
Air status sesuai aturan/standar yang ditetapkan pengelola. Sistem
menampilkan catatan penggunaan harian atau bulanan. Data dapat
dimasukkan FR-05 Penggunaan Air secara manual pada versi awal atau
diintegrasikan dengan meter digital pada tahap lanjutan. Masyarakat
dapat mengirim laporan berisi kategori, deskripsi, foto, dan lokasi.
Sistem FR-06 Pengaduan menyimpan laporan dan statusnya. Petugas dapat
memverifikasi laporan serta memperbarui status: diterima, diverifikasi,
FR-07 Tindak Lanjut dalam penanganan, dan selesai. Sistem menyediakan
pemberitahuan gangguan distribusi, jadwal perbaikan, dan FR-08
Notifikasi perubahan status laporan. FR-09 Manajemen Admin dapat
mengelola akun, wilayah, data distribusi, hasil pemeriksaan, dan
laporan. Data

## 4. KEBUTUHAN NON-FUNGSIONAL

Aspek Persyaratan

Password disimpan dalam bentuk hash; endpoint dibatasi berdasarkan
peran; komunikasi Keamanan menggunakan HTTPS pada lingkungan produksi.
API dirancang untuk merespons permintaan umum secara efisien dan
menggunakan Kinerja indeks database pada kolom pencarian yang sering
dipakai. Keandalan Data penting memiliki validasi, relasi, dan mekanisme
pencadangan database. Kemudahan Antarmuka menggunakan bahasa Indonesia,
navigasi sederhana, dan informasi status yang penggunaan mudah dipahami.
Arsitektur memungkinkan penambahan wilayah, pengguna, sensor IoT, dan
integrasi Skalabilitas eksternal. Frontend dapat dikembangkan sebagai
aplikasi Android dan berkomunikasi dengan Kompatibilitas backend melalui
REST API.

## 5. DESAIN DAN STRUKTUR APLIKASI

### 5.1 Daftar Halaman

Halaman Fungsi Splash Screen Menampilkan nama aplikasi dan identitas
Pemda serta Universitas Teknokrat Indonesia. Login/Registrasi
Autentikasi dan pembuatan akun pengguna. Dashboard Ringkasan kondisi
distribusi, kualitas, penggunaan, dan gangguan terbaru. Distribusi Air
Status dan jadwal distribusi berdasarkan wilayah. Kualitas Air Hasil
pemeriksaan dan tanggal pengujian. Penggunaan Air Grafik dan riwayat
penggunaan air. Pengaduan Form laporan gangguan dengan foto dan lokasi.
Notifikasi Informasi gangguan dan perkembangan laporan. Profil Informasi
akun dan pengaturan pengguna. Panel Petugas/Admin Pengelolaan data dan
tindak lanjut laporan sesuai hak akses.

### 5.2 Identitas Visual dan Logo

Aplikasi wajib menampilkan logo Pemerintah Daerah (Pemda) sesuai wilayah
implementasi dan

logo Universitas Teknokrat Indonesia. Kedua logo ditempatkan pada splash
screen serta halaman

login atau area identitas aplikasi. Logo harus menggunakan berkas resmi,
tidak terdistorsi, dan

mempertahankan proporsi serta warna aslinya.

Catatan: berkas logo belum dimasukkan ke dokumen ini karena logo Pemda
harus disesuaikan

dengan kabupaten/kota yang menjadi lokasi implementasi. Kotak
placeholder pada sampul dapat

diganti dengan logo resmi.

### 5.3 Footer Aplikasi

## 6. TEKNOLOGI YANG DIGUNAKAN

Teknologi Kegunaan Android Platform aplikasi untuk pengguna. Kotlin
Bahasa pemrograman antarmuka Android. Rust Backend untuk logika bisnis,
autentikasi, dan REST API. Axum Framework web Rust untuk membangun
endpoint API. PostgreSQL Basis data relasional untuk menyimpan data
aplikasi. Library Rust untuk akses database PostgreSQL secara
asynchronous dan pemeriksaan SQLx query. Serde Serialisasi dan
deserialisasi data, misalnya JSON. JWT Mekanisme token untuk autentikasi
dan otorisasi. Google Maps API Opsional, untuk menampilkan lokasi
laporan gangguan. Firebase Cloud Messaging Opsional, untuk push
notification pada perangkat.

## 7. RANCANGAN DATABASE POSTGRESQL

Rancangan berikut merupakan struktur awal. Tipe data, constraint,
indeks, serta relasi final perlu

ditetapkan pada tahap desain database dan implementasi.

Tabel Kolom Utama Keterangan id, nama, email, password_hash,
nomor_telepon, Menyimpan akun masyarakat, petugas, users role,
created_at dan admin. wilayah id, nama_wilayah, alamat, created_at
Menyimpan data wilayah layanan. id, wilayah_id, status,
jadwal_distribusi, keterangan, Menyimpan status dan jadwal distribusi
updated_at distribusi. id, wilayah_id, nilai_ph, kekeruhan, suhu,
Menyimpan hasil pemeriksaan kualitas kualitas_air status_kualitas,
tanggal_pemeriksaan air. id, user_id, jumlah_penggunaan, periode,
penggunaan_air Menyimpan catatan penggunaan air. tanggal_pencatatan id,
user_id, wilayah_id, kategori, deskripsi, foto_url, pengaduan Menyimpan
laporan masyarakat. latitude, longitude, status, created_at notifikasi
id, user_id, judul, pesan, status_baca, created_at Menyimpan notifikasi
pengguna.

### 7.1 Relasi Antar-Tabel

-   users ke penggunaan_air: satu pengguna dapat memiliki banyak catatan
    penggunaan air (one-

to-many). - users ke pengaduan: satu pengguna dapat membuat banyak
pengaduan (one-to-many). - users ke notifikasi: satu pengguna dapat
menerima banyak notifikasi (one-to-many). - wilayah ke distribusi: satu
wilayah dapat memiliki banyak catatan distribusi (one-to-many). -
wilayah ke kualitas_air: satu wilayah dapat memiliki banyak hasil
pemeriksaan (one-to-

many). - wilayah ke pengaduan: satu wilayah dapat memiliki banyak
laporan gangguan (one-to-

many).

### 7.2 Aturan Integritas Data

-   Setiap tabel memiliki primary key yang unik.
-   Kolom relasi menggunakan foreign key untuk menjaga konsistensi data.
-   Email pengguna diberi constraint UNIQUE.
-   Kolom wajib diberi NOT NULL sesuai kebutuhan.
-   Nilai pH dan jumlah penggunaan divalidasi agar berada pada rentang
    yang masuk akal.
-   Kolom status menggunakan nilai yang dibatasi, misalnya CHECK
    constraint atau tabel

referensi. - Indeks ditambahkan pada foreign key, waktu pencatatan,
wilayah, dan status yang sering

difilter.

## 8. VALIDASI KEBUTUHAN DENGAN RUST DAN POSTGRESQL

### 8.1 Validasi Rust

Rust sesuai digunakan sebagai backend karena mendukung keamanan memori,
konkurensi, dan

kinerja yang baik. Axum dapat menangani routing HTTP, SQLx menghubungkan
aplikasi

dengan PostgreSQL, Serde menangani format JSON, sedangkan library JWT
dapat digunakan

untuk autentikasi berbasis token. Validasi input dan pemeriksaan hak
akses tetap harus

diterapkan pada setiap endpoint.

### 8.2 Validasi PostgreSQL

PostgreSQL sesuai untuk kebutuhan ini karena mendukung relasi
antar-tabel, transaksi,

constraint, indeks, dan query analitik. Struktur data pengguna, wilayah,
distribusi, kualitas,

penggunaan, pengaduan, dan notifikasi dapat disimpan secara terstruktur.
Pengelolaan backup,

hak akses database, dan migrasi skema perlu disiapkan.

### 8.3 Matriks Kesesuaian Teknologi

Kebutuhan Implementasi Rust Objek PostgreSQL Hasil analisis Autentikasi
pengguna Endpoint autentikasi dan otorisasi users Sesuai rancangan
Monitoring distribusi API distribusi dan wilayah distribusi, wilayah
Sesuai rancangan Monitoring kualitas API hasil pemeriksaan kualitas_air,
wilayah Sesuai rancangan Monitoring API catatan penggunaan
penggunaan_air, users Sesuai rancangan penggunaan

Pengaduan API pengaduan dan unggah berkas pengaduan, users, wilayah
Sesuai rancangan masyarakat API notifikasi dan integrasi push Notifikasi
notifikasi, users Sesuai rancangan notification Manajemen wilayah API
administrasi wilayah wilayah Sesuai rancangan

Kesimpulan validasi: Rust dan PostgreSQL secara teknis dapat mendukung
kebutuhan backend

dan penyimpanan data Smart Water Management. Pernyataan ini merupakan
validasi kesesuaian

rancangan teknologi, bukan bukti bahwa aplikasi telah selesai dibangun
atau telah lulus

pengujian implementasi.

## 9. BATASAN PENGEMBANGAN (SCOPE)

### 9.1 Fitur Versi Awal (MVP)

-   Login dan registrasi dengan pembagian peran.
-   Dashboard informasi air bersih.
-   Informasi distribusi berdasarkan wilayah.
-   Pencatatan hasil pemeriksaan kualitas air oleh petugas.
-   Pencatatan penggunaan air secara manual atau impor data.
-   Pengaduan gangguan dengan deskripsi, foto, dan lokasi.
-   Pembaruan status laporan oleh petugas.
-   Notifikasi informasi dan status laporan.

### 9.2 Pengembangan Lanjutan

-   Integrasi sensor IoT untuk membaca aliran dan parameter kualitas air
    secara otomatis.
-   Deteksi kebocoran otomatis berdasarkan data sensor atau anomali
    pemakaian.
-   Peta jaringan distribusi dan pemetaan wilayah terdampak.
-   Prediksi kebutuhan air menggunakan analisis data historis atau
    machine learning.

Pada versi awal, data distribusi dan kualitas dapat dimasukkan petugas
melalui panel admin.

Penggunaan air dapat dicatat manual apabila belum tersedia integrasi
meter digital. Status

kualitas air harus ditentukan berdasarkan standar resmi yang dipilih dan
diverifikasi oleh pihak

berwenang; aplikasi tidak boleh menyatakan air aman hanya berdasarkan
data yang belum

tervalidasi.

## 10. KRITERIA KEBERHASILAN DAN PENGUJIAN

Area Uji Kriteria Penerimaan Akun Pengguna dapat registrasi, login,
logout, dan hanya mengakses fitur sesuai perannya. Distribusi Pengguna
dapat melihat status distribusi dan jadwal untuk wilayah yang dipilih.
Petugas dapat memasukkan hasil pemeriksaan dan pengguna dapat melihat
data beserta Kualitas tanggalnya. Penggunaan Sistem dapat menyimpan dan
menampilkan riwayat penggunaan berdasarkan periode. Pengaduan Masyarakat
dapat membuat laporan dan petugas dapat memperbarui statusnya. Database
Relasi dan constraint PostgreSQL berjalan tanpa inkonsistensi data. API
Endpoint Rust dapat diuji untuk respons berhasil, validasi input, dan
penanganan kesalahan. Logo Pemda dan Universitas Teknokrat Indonesia
tampil dengan benar setelah aset resmi Identitas tersedia. Footer Teks
copyright tampil sesuai ketentuan pada bagian footer aplikasi.

## 11. RISIKO DAN KETERGANTUNGAN

Risiko/Ketergantungan Mitigasi Logo Pemda belum ditentukan Memerlukan
konfirmasi kabupaten/kota dan file logo resmi. Belum ada sensor IoT Data
kualitas dan distribusi dimasukkan petugas pada MVP. Data kualitas tidak
konsisten Tetapkan parameter, satuan, metode pemeriksaan, dan standar
rujukan. Data penggunaan belum otomatis Gunakan input manual atau impor
data sebelum integrasi meter digital. Peta dan notifikasi eksternal
Memerlukan API key, konfigurasi layanan, dan pengujian integrasi.
Keamanan akun dan data Terapkan hashing password, HTTPS, otorisasi,
validasi input, dan backup.

## 12. PENUTUP

Smart Water Management diharapkan menjadi solusi digital untuk mendukung
pengelolaan air

bersih yang lebih terpantau, informatif, dan responsif. Integrasi Rust
sebagai backend dan

PostgreSQL sebagai database memberikan fondasi teknis untuk membangun
layanan API dan

penyimpanan data yang terstruktur. Pengembangan dilaksanakan secara
bertahap, dimulai dari

fitur inti yang dapat diuji, kemudian dilanjutkan dengan integrasi IoT,
pemetaan, dan analisis

prediktif.
