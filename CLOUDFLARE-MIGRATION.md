# Migrasi hellens.dev ke Cloudflare (free plan)

Tujuan: origin VPS (43.163.80.202) cuma melayani tiap file **sekali**, sisanya dilayani edge
Cloudflare. Per 17 Sep 2026 aset statisnya sudah 151 MB (frame sequence hero, kabin,
kokpit, dan jet), jadi offload ini makin penting. Origin sekarang: TTFB 1,6 detik, ~9 KB/detik per koneksi — itu bottleneck utamanya,
bukan ukuran file.

Nol perubahan kode. URL tidak berubah.

---

## 1. Kondisi DNS sekarang (per 15 Sep 2026)

Nameserver aktif: `athena.dns-parking.com` / `apollo.dns-parking.com` (Hostinger).

| Type  | Name                    | Value             | Status setelah migrasi |
|-------|-------------------------|-------------------|------------------------|
| A     | `hellens.dev`           | 43.163.80.202     | **Proxied** (awan oranye) |
| CNAME | `www`                   | `hellens.dev`     | **Proxied** (awan oranye) |
| A     | `marketing`             | 43.163.80.202     | DNS only (abu-abu) |
| A     | `jobs`                  | 43.163.80.202     | DNS only (abu-abu) |
| A     | `scraper`               | 43.163.80.202     | DNS only (abu-abu) |
| A     | `coolify`               | 43.163.80.202     | DNS only (abu-abu) |

Tidak ada MX, TXT, SPF, DKIM, DMARC, atau CAA — tidak ada yang bisa hilang. Email pakai Gmail
(`hellensdev@gmail.com`), bukan email domain, jadi tidak ada risiko email mati.

**Kenapa subdomain lain dibiarkan abu-abu:** `coolify` adalah dashboard Coolify (websocket +
terminal), dan ketiganya pakai sertifikat Let's Encrypt via Traefik HTTP-01. Biarkan abu-abu
dulu sampai apex terbukti aman; sampai saat itu perilakunya persis seperti sekarang.

---

## 2. Langkah migrasi

1. Cloudflare → **Add a site** → `hellens.dev` → pilih plan **Free**.
2. Cloudflare auto-scan DNS. Cocokkan hasilnya dengan tabel di atas — **6 record**. Tambahkan
   yang kurang secara manual.
3. Set proxy status sesuai kolom terakhir: hanya `hellens.dev` dan `www` yang oranye.
4. Cloudflare memberi 2 nameserver. Ganti nameserver di **Hostinger** (registrar) dengan keduanya.
5. Tunggu propagasi (biasanya 5 menit – 2 jam). Cek: `dig +short NS hellens.dev`.

## 3. Setelan Cloudflare setelah domain aktif

- **SSL/TLS → Overview**: mode **Full (strict)**. Origin sudah punya sertifikat LE yang valid.
- **SSL/TLS → Edge Certificates**: `Always Use HTTPS` = ON.
  (Cloudflare mengecualikan `/.well-known/acme-challenge/` dari redirect ini, jadi renewal
  Let's Encrypt di Traefik tetap jalan.)
- **Speed → Optimization**: Brotli ON, HTTP/3 ON (default-nya sudah ON).
- **Caching → Cache Rules** → buat 1 rule:
  - Nama: `static-assets`
  - Expression (pakai editor "Edit expression"):
    ```
    (starts_with(http.request.uri.path, "/scroll-frames/")) or
    (starts_with(http.request.uri.path, "/window-frames/")) or
    (starts_with(http.request.uri.path, "/clouds-frames/")) or
    (starts_with(http.request.uri.path, "/clouds2-frames/")) or
    (starts_with(http.request.uri.path, "/cabin-frames/")) or
    (starts_with(http.request.uri.path, "/cockpit-frames/")) or
    (starts_with(http.request.uri.path, "/jet-frames/")) or
    (starts_with(http.request.uri.path, "/karya-img/")) or
    (starts_with(http.request.uri.path, "/scrape-designs/")) or
    (starts_with(http.request.uri.path, "/logos-sphere/")) or
    (starts_with(http.request.uri.path, "/portfolio/")) or
    (starts_with(http.request.uri.path, "/brand/")) or
    (starts_with(http.request.uri.path, "/assets/"))
    ```
  - Cache eligibility: **Eligible for cache**
  - Edge TTL: **Override → 1 month**
  - Browser TTL: **Respect origin** (origin sudah kirim `max-age=2592000`)

## 4. Verifikasi setelah aktif

```bash
# harus muncul cf-cache-status: HIT pada permintaan kedua
curl -sI https://hellens.dev/scroll-frames/frame_100.webp | grep -i "cf-cache-status\|server\|cache-control"

# bandingkan dengan angka origin sekarang: ttfb 1.6s, speed ~9 KB/s
curl -s -o /dev/null -w "ttfb=%{time_starttransfer}s total=%{time_total}s speed=%{speed_download}B/s\n" \
  https://hellens.dev/scroll-frames/frame_101.webp

# subdomain lain harus tetap hidup
for h in marketing jobs scraper coolify; do curl -s -o /dev/null -w "$h %{http_code}\n" https://$h.hellens.dev/; done
```

Setelah apex stabil 1-2 hari dan sertifikat Traefik sempat renew, subdomain lain boleh ikut
di-proxy satu per satu (opsional — mereka ringan, tidak mendesak).

## 5. Catatan & risiko

- **Video mp4** (`hero-video.mp4`, `loop-section.mp4`, `end-loop.mp4` — total 12 MB): ToS free
  plan membatasi penyajian konten video dalam jumlah besar. 12 MB klip pendek praktis aman, tapi
  kalau suatu saat Cloudflare protes, pindahkan 3 file itu ke R2 (free 10 GB, egress gratis) dan
  ganti `src`-nya. Tidak perlu sekarang.
- **Kalau renewal sertifikat origin bermasalah**, alternatif permanen: pakai Cloudflare **Origin
  Certificate** (berlaku 15 tahun) di Traefik, sehingga tidak bergantung ACME sama sekali.
- **Rollback**: kembalikan nameserver ke `athena/apollo.dns-parking.com` di Hostinger. Semua
  record di atas identik dengan yang sekarang, jadi kembali ke kondisi awal.
- R2 **belum diperlukan**. R2 pun mensyaratkan domain sudah ada di Cloudflare, jadi langkah 1-2
  di atas tetap prasyaratnya. Kalau nanti ingin origin VPS benar-benar lepas dari beban aset,
  84 MB frame muat gampang di free tier 10 GB.
