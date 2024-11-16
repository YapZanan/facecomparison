# Panduan Installasi dan Penggunaan Face Comparison Python + EEL

Panduan ini akan membantu Anda meng-clone dan menginstall proyek _Face Comparison_ berbasis Python dan EEL di komputer Anda, serta menjalankan aplikasi untuk membandingkan wajah menggunakan model machine learning.

---

## **Persyaratan Sistem**

Sebelum memulai, pastikan sistem Anda memenuhi persyaratan berikut:

1. **Python**  
   Pastikan Python sudah terinstal di komputer Anda. Anda dapat mengunduhnya dari [sini](https://www.python.org/downloads/).  
   Disarankan menggunakan versi Python 3.7 atau lebih baru.

2. **pip**  
   Pastikan Anda memiliki `pip` (package manager untuk Python) yang terinstal. Jika belum, Anda bisa menginstalnya dengan menjalankan perintah berikut di terminal/command prompt:

   ```bash
   python -m ensurepip --upgrade
   ```

3. **Git**  
   Anda memerlukan Git untuk meng-clone repository. Pastikan Git sudah terinstal di komputer Anda. Jika belum, Anda dapat mengunduhnya di [sini](https://git-scm.com/downloads).

---

## Langkah 1: Clone Repository

Langkah pertama adalah meng-clone repository ini di komputer Anda. Anda bisa meng-clone repository ini dengan cara menjalankan perintah berikut di terminal/command prompt:

```bash
git clone https://github.com/YapZanan/facecomparison
```

---

## Langkah 2: Membuat Virtual Environment (Opsional)

Jika Anda ingin menggunakan virtual environment, Anda bisa membuatnya dengan cara menjalankan perintah berikut di terminal/command prompt:

**Di Windows**:

```bash
python -m venv venv
```

**Di Linux/MacOS**:

```bash
python3 -m venv venv
```

Lalu, Anda bisa mengaktifkan virtual environment dengan cara menjalankan perintah berikut di terminal/command prompt:

**Di Windows**:

```bash
venv\Scripts\activatey
```

**Di Linux/MacOS**:

```bash
source venv/bin/activate
```

---

## Langkah 3: Install Dependencies

Setelah membuat virtual environment (jika digunakan), Anda perlu menginstal semua dependencies yang diperlukan oleh proyek. Pastikan Anda berada di dalam folder proyek, kemudian jalankan perintah berikut untuk menginstal semua dependencies:

```bash
pip install -r requirements.txt
```

---

## Langkah 4: Menjalankan Program

Anda bisa menjalankan program dengan cara menjalankan perintah berikut di terminal/command prompt:

```bash
python app.py
```

---

## Catatan

- Model yang Pertama Kali Digunakan:  
  Ketika pertama kali menjalankan aplikasi, program akan membutuhkan waktu sedikit lebih lama karena harus mendownload model machine learning yang diperlukan untuk membandingkan wajah. Pastikan koneksi internet Anda aktif.
