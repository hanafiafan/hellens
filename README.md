# hellens.dev — Landing Page

Situs statis (React + Vite + Tailwind) untuk studio Hellens.dev.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Deploy

Situs statis di VPS (Coolify + Traefik, nginx container), di belakang Cloudflare CDN.

```bash
npm run build && rsync -a --delete dist/ vps-hellens:/home/ubuntu/hellens-landing/html/
```

Lihat [CLOUDFLARE-MIGRATION.md](CLOUDFLARE-MIGRATION.md) untuk konfigurasi DNS & cache rule.

## Halaman statis di `public/`

`privacy/`, `terms/`, `scraper/`, `karya/` adalah HTML biasa (bukan bagian dari SPA)
supaya terbaca crawler dan reviewer Google OAuth — HTML SPA-nya sendiri kosong.
`googlee5a1649c88e04fdc.html` adalah file verifikasi Search Console; **jangan dihapus**.

## Frame sequence (tidak masuk git)

Animasi scroll digerakkan oleh frame gambar, bukan video: `public/*-frames/` dan
`public/*.mp4` (~190 MB, ribuan file) sengaja di-`.gitignore` — repo akan membengkak
permanen tiap animasi diganti. Video sumbernya disimpan terpisah (di luar repo).

Cara membuat ulang dari sebuah video sumber:

```bash
# 1. Ekstrak frame. Kalau sumbernya <60fps, interpolasi dulu supaya scrub halus:
#    tambahkan filter "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:vsbmc=1,"
#    sebelum scale. Sumber yang sudah 60fps native tidak perlu diinterpolasi.
ffmpeg -i sumber.mp4 -vf "scale=1600:900:flags=lanczos" -start_number 1 /tmp/f/frame_%04d.png

# 2. Encode ke webp (ffmpeg di sebagian mesin tidak punya encoder libwebp,
#    jadi lewat cwebp). q55 untuk konten foto, q45 untuk konten penuh garis halus.
for f in /tmp/f/frame_*.png; do
  cwebp -quiet -q 55 -m 6 "$f" -o "public/nama-frames/$(basename "$f" .png).webp"
done
```

Untuk sequence panjang (>1000 frame), proses per-batch dan hapus PNG tiap batch —
2.000+ PNG mentah bisa memakan >6 GB disk.

Setelah itu sesuaikan di [src/components/ScrollFrameSequence.jsx](src/components/ScrollFrameSequence.jsx):
jumlah frame (`*_COUNT`), path, dan durasi scroll di `CLIP_DURATIONS`. Semua posisi
fase dihitung otomatis dari daftar itu — jangan tulis offset vh manual.
