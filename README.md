# School Management System

Sistem Manajemen Sekolah _Full-Stack_ yang dirancang dengan **Clean Architecture**, menawarkan pengalaman pengguna (UX) setingkat _Single Page Application_ (SPA) yang sangat responsif. Proyek ini dibangun sebagai solusi untuk manajemen entitas Kelas, Guru, dan Siswa dengan pelaporan data terpadu.

## 🚀 Fitur Utama

1. **Autentikasi Aman:** Sistem Login dan Registrasi berbasis Laravel Breeze.
2. **Manajemen Kelas, Guru, dan Siswa:** Operasi CRUD penuh menggunakan _Modal/Dialog_ (True SPA) tanpa memuat ulang halaman (_page reload_).
3. **Dashboard Laporan Terpadu:** Algoritma _rendering_ tabel gabungan dinamis (`rowSpan`) yang menampilkan relasi Kelas, Guru, dan Siswa dalam satu tampilan elegan tanpa duplikasi nama kelas.
4. **UX Premium:**
    - Umpan balik aksi (sukses/gagal) menggunakan **Toaster** (_shadcn/ui sonner_).
    - Pencegahan penghapusan tidak sengaja menggunakan **Alert Dialog** konfirmasi.
    - Paginasi data dinamis untuk menjaga performa saat memuat ribuan baris data.

## 🏗 Arsitektur & Pola Desain (Design Patterns)

Proyek ini tidak menggunakan arsitektur MVC konvensional, melainkan menerapkan standar _Enterprise Clean Architecture_:

-   **Thin Controllers:** _Controller_ murni hanya menerima _Request_ dan mengembalikan _Response_ Inertia.
-   **Form Requests:** Validasi data yang ketat dan dinamis, dipisahkan dari logika _Controller_.
-   **API Resources:** Memformat _payload_ data yang dikirim ke _Frontend_, menyembunyikan kolom sensitif, dan mengoptimalkan _Eager Loading_.
-   **Service Layer:** Tempat bersarangnya aturan bisnis (_Business Logic_), menjaga _Controller_ tetap bersih.
-   **Repository Pattern (dengan Interfaces):** Mengabstraksi logika _query_ ORM pangkalan data (_Database_) dan menjamin _scalability_.

## 🛠 Teknologi yang Digunakan

-   **Backend:** Laravel 12, PHP 8.2, MySQL
-   **Frontend:** React.js, Inertia.js
-   **Styling & UI:** Tailwind CSS, shadcn/ui (Radix UI)
-   **Tooling:** Vite, Composer, NPM

---

## 🛠️ Cara Instalasi & Menjalankan

Ikuti langkah berikut untuk menjalankan aplikasi di lingkungan lokal:

### Prasyarat

-   PHP 8.2 atau lebih baru
-   Composer
-   Node.js & NPM
-   MySQL

### Langkah-langkah

1. **Clone Repository**

```bash
git clone https://github.com/muhananaufal/school-app.git
cd school-app
```

2. **Install Dependensi Backend & Frontend**

```bash
composer install
npm install
```

3. **Konfigurasi Environment**
   Salin file `.env.example` menjadi `.env` dan sesuaikan koneksi database Anda.

```bash
cp .env.example .env
php artisan key:generate
```

_Pastikan database (misal: `shcool_app_db`) sudah dibuat di MySQL._

4. **Migrasi & Seeding Database**
   Jalankan perintah ini untuk membuat tabel dan mengisi data dummy agar aplikasi siap didemokan.

```bash
php artisan migrate --seed
```

5. **Jalankan Aplikasi**
   Buka dua terminal terpisah:

```bash
# Terminal 1 (Backend Server)
php artisan serve

# Terminal 2 (Frontend Build/Watch)
npm run dev
```

6. **Akses Aplikasi**
   Buka browser dan kunjungi `http://localhost:8000`.

-   **Login Email:** `admin@schoolapp.com`
-   **Password:** `password`

---

### **Catatan Pengembang**

-   **UI Framework:** Menggunakan **shadcn/ui** untuk komponen atomik (Button, Dialog, Input) guna mempercepat pengembangan dengan tetap menjaga konsistensi desain dan aksesibilitas.
-   **State Management:** Menggunakan state lokal React + Inertia props.

---

© 2026 ConnecThink Technical Test.
