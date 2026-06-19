# PRD: Petalé Nail Studio — Nail Art Studio

## 1. Brand Identity

**Nama Brand:** Petalé Nail Studio
**Alasan Naming:** "Petalé" (terinspirasi dari "petal" = kelopak bunga) memberi kesan feminine, delicate, dan artsy. Cocok untuk nail studio premium yang fokus di art & detail. Aksen é-nya kasih touch boutique-y.

**Tagline:** *"Tiny Canvas, Big Statement."*

**Target Audience:**
- Wanita usia 18-40 (primary)
- Mahasiswi & young professional yang aware self-care
- Bride-to-be (paket bridal nail)
- Content creator / influencer
- Lokasi: kota besar, area mall & lifestyle district

**Brand Voice:**
- Tone: Feminine, playful, artsy, elevated
- Style copywriting: Cute tapi premium, banyak referensi visual & color terminology
- Avoid: Bahasa terlalu serius / kaku, body-shaming

---

## 2. Tech Stack

- **Framework:** Astro 5 (SSG)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript (strict)
- **Animation:** Framer Motion via React islands
- **Deploy:** Netlify (static)
- **Images:** Unsplash + Pexels

---

## 3. Section Breakdown

| # | Section | Type | Tujuan |
|---|---------|------|--------|
| 1 | Navbar | `.astro` static | Logo cute, nav, CTA "Book" |
| 2 | Hero | React island `client:load` | Visual nail art stunning |
| 3 | Services | React island `client:visible` | Menu services + harga |
| 4 | Design Catalog | React island `client:visible` | Lookbook nail art (kategorisasi) |
| 5 | Trending Designs | React island `client:visible` | Carousel desain trending bulan ini |
| 6 | Process | `.astro` static | Step-by-step pengalaman di Petalé |
| 7 | Hygiene Standard | React island `client:visible` | USP: sterilization, single-use tools |
| 8 | Add-ons | React island `client:visible` | Hand spa, foot care, paraffin treatment |
| 9 | Membership | `.astro` static | Subscription & gift card |
| 10 | Locations | `.astro` static | Cabang + map |
| 11 | Book CTA | React island `client:idle` | Form booking |
| 12 | Footer | `.astro` static | Sosmed, kontak, jam |

---

## 4. Copywriting (Bahasa Indonesia)

### Navbar
- Menu: Services • Designs • Membership • Lokasi • Cerita
- CTA: **Book Now ✨**

### Hero
- **Headline:** Kuku Cantik, Mood Naik.
- **Subheadline:** Nail art studio dengan 500+ desain ready, gel polish premium, dan standar hygiene rumah sakit. Karena detail kecil bikin perbedaan besar.
- **CTA Primary:** Lihat Desain
- **CTA Secondary:** Book Sekarang

Mini badge: "Reviewed by Vogue ID" • "1.000+ Designs Done" • "4.9 ⭐ Google Rating"

### Services
- **Heading:** Pilih Yang Cocok Hari Ini
- **Subheading:** Semua sudah include cuticle care & basic shaping. Pilih warna polos atau ajak nail artist kami berkarya.

Grid services:

**MANICURE:**
- 💅 **Basic Manicure** — *Rp 95k* (45 min) — Cuticle care, shape, polish
- 💅 **Gel Polish Manicure** — *Rp 150k* (60 min) — Long-lasting gel finish
- 💅 **Acrylic Extension** — *Rp 350k* (120 min) — Custom length & shape
- 💅 **BIAB / Builder Gel** — *Rp 250k* (90 min) — Strengthening overlay

**PEDICURE:**
- 🦶 **Basic Pedicure** — *Rp 125k* (60 min)
- 🦶 **Spa Pedicure** — *Rp 195k* (90 min) — Includes foot soak & scrub
- 🦶 **Gel Pedicure** — *Rp 175k* (75 min)

**NAIL ART:**
- 🎨 **Simple Art** (1-3 nails) — *+Rp 25k* per kuku
- 🎨 **Detailed Art** (per kuku) — *+Rp 50k*
- 🎨 **3D Art / Chrome / Foil** — *+Rp 75k* per kuku
- 🎨 **Full Custom Design** — *Konsultasi*

### Design Catalog
- **Heading:** Lookbook Petalé
- **Subheading:** Browse 500+ desain. Bawa screenshot, kami recreate untukmu.

Filter chips:
- All • Minimalist • French • Chrome • 3D • Floral • Abstract • Seasonal • Bridal

Grid masonry: 30+ foto nail art dengan caption (nama desain, services yang dipakai)

### Trending Designs
- **Heading:** Trending Bulan Ini
- Carousel horizontal 8-10 desain trending dengan hashtag bulan ini
- Quick book button per desain

### Process
- **Heading:** Pengalaman 90 Menit Bermakna
- Timeline visual:
  1. **☕ Welcome Drink** — Pilih kopi, teh, atau lemon water
  2. **🤝 Konsultasi Singkat** — Diskusi desain & cek kondisi kuku
  3. **🧼 Sterilization** — Tools steril 121°C autoclave depan mata kamu
  4. **💅 Pampering Session** — Cuticle care, shaping, base coat
  5. **🎨 Nail Art Magic** — Nail artist mulai berkarya
  6. **✨ Top Coat & UV Cure** — Finishing untuk hasil tahan lama
  7. **📸 Photo Moment** — Spot foto cantik untuk OOTD nail-mu

### Hygiene Standard
- **Heading:** Hygiene Bukan Pilihan, Tapi Standar.
- **Body:** Kami tahu kuku bersentuhan dengan banyak hal. Karena itu, hygiene kami mengikuti standar klinik — bukan salon biasa.
- 4 cards:
  - 🔬 **Autoclave Sterilization 121°C** — Semua tool metal di-steril per klien
  - 🧴 **Single-Use Items** — Buffer, file, dan tissue sekali pakai
  - 🧤 **Fresh Gloves Per Session** — Sarung tangan baru untuk setiap klien
  - 🧪 **Hospital-Grade Disinfectant** — Meja & alat di-disinfect tiap selesai

### Add-ons
- **Heading:** Make It Extra Special
- Cards:
  - 🌿 **Hand Spa** *(+Rp 75k)* — Scrub, massage, paraffin mask
  - 💆 **Foot Spa Deluxe** *(+Rp 100k)* — Soak, scrub, callus removal, massage
  - 🕯️ **Paraffin Treatment** *(+Rp 50k)* — Moisturizing wax bath
  - 🌸 **Bridal Trial** *(Rp 750k)* — Konsultasi + 2 trial design untuk pernikahan

### Membership
- **Heading:** Petalé Members
- 2 cards:

**🌸 Monthly Beauty Pass**
*Rp 850k / bulan*
- 1x Gel Manicure
- 1x Gel Pedicure
- 10% off nail art
- 5% off acrylic & BIAB

**💎 Quarterly Indulgence**
*Rp 2.4jt / 3 bulan (hemat 15%)*
- 3x Gel Manicure
- 3x Gel Pedicure
- 1x Spa Pedicure
- 15% off everything
- Free hand spa monthly

**🎁 Gift Card**
- Mulai Rp 200k, fleksibel sesuai layanan

### Locations
- **Heading:** Mampir Ke Petalé
- 3 cabang:
  - **Petalé Senayan** — Plaza Senayan, Lt. 3 (flagship)
  - **Petalé Kuningan** — Kota Kasablanka, Lt. 2
  - **Petalé Surabaya** — Pakuwon Mall
- Map embed + jam (10:00-22:00)

### Book CTA
- **Heading:** Slot Cepat Habis, Book Dulu Yuk!
- Mini booking form: Cabang • Service • Tanggal • Nail artist preferred
- **CTA:** Book via WhatsApp / Form

### Footer
- Tagline: *"Crafted, polished, loved."*
- Sosmed: IG (@petale.id), TikTok, Pinterest (untuk inspirasi)
- Newsletter: "Get monthly design inspo & exclusive promo"

---

## 5. Image References

| Section | Source | URL / Search Term | Alt Text | Dimensi |
|---------|--------|-------------------|----------|---------|
| Hero | Unsplash | https://unsplash.com/s/photos/nail-art-aesthetic | "Nail art tangan elegan" | 1920x1080 |
| Service - Manicure | Pexels | https://www.pexels.com/search/manicure%20process/ | "Manicure session" | 600x800 |
| Service - Gel Polish | Unsplash | https://unsplash.com/s/photos/gel-polish-nails | "Gel polish application" | 600x800 |
| Service - Acrylic | Pexels | https://www.pexels.com/search/acrylic%20nails%20extension/ | "Acrylic extension" | 600x800 |
| Service - Pedicure | Unsplash | https://unsplash.com/s/photos/pedicure-spa | "Pedicure foot spa" | 600x800 |
| Design Catalog (15-30) | Unsplash + Pexels | https://unsplash.com/s/photos/nail-art-design-aesthetic | Berbagai nail art | 600x600 |
| Trending - Minimalist | Pexels | https://www.pexels.com/search/minimalist%20nail/ | "Minimalist nail art" | 600x600 |
| Trending - French | Unsplash | https://unsplash.com/s/photos/french-tip-nails | "French tip modern" | 600x600 |
| Trending - Chrome | Unsplash | https://unsplash.com/s/photos/chrome-nails | "Chrome metallic nails" | 600x600 |
| Process - Welcome drink | Pexels | https://www.pexels.com/search/coffee%20cafe%20cute/ | "Welcome drink salon" | 600x600 |
| Process - Sterilization | Unsplash | https://unsplash.com/s/photos/manicure-tools-sterile | "Sterilization process" | 600x600 |
| Hygiene - Autoclave | Pexels | https://www.pexels.com/search/clinic%20sterilization/ | "Autoclave equipment" | 800x600 |
| Add-ons - Hand spa | Unsplash | https://unsplash.com/s/photos/hand-spa-treatment | "Hand spa relaxation" | 800x600 |
| Add-ons - Foot spa | Pexels | https://www.pexels.com/search/foot%20spa%20pedicure/ | "Foot spa deluxe" | 800x600 |
| Locations - Interior | Unsplash | https://unsplash.com/s/photos/nail-salon-interior-pink | "Interior nail studio aesthetic" | 1600x900 |

---

## 6. Animation Spec (Framer Motion)

### Hero (React island, `client:load`)
```tsx
// Floating petal / sparkle particles di background
const floatingPetal = (delay: number) => ({
  y: [0, -30, 0],
  x: [0, 15, 0],
  rotate: [0, 360],
  transition: { 
    duration: 8 + Math.random() * 4, 
    repeat: Infinity, 
    delay,
    ease: "easeInOut" 
  }
})

// Headline reveal with cute bounce
const cuteReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 14 }
  }
}
```

### Services (React island, `client:visible`)
- Cards stagger reveal `staggerChildren: 0.08`
- Hover: card lift + emoji icon scale + pastel gradient shift
- Tab Manicure/Pedicure/Nail Art: `layoutId` smooth indicator

### Design Catalog Masonry (React island, `client:visible`)
- Masonry layout dengan `layout` prop
- Filter chips: `AnimatePresence` + `layout` untuk smooth reflow
- Image hover: scale + soft pink overlay slide-up dengan design name
- Click → lightbox modal pakai `layoutId` morph animation
- Like button micro-interaction (heart fill animation)

### Trending Carousel (React island, `client:visible`)
- Horizontal scroll snap dengan momentum
- Auto-scroll subtle (pause on hover)
- Trending tag pulse: `scale: [1, 1.1, 1]` infinite

### Process Timeline (React island, `client:visible`)
- Vertical timeline dengan curved SVG path
- Path draw animation via `pathLength` saat scroll
- Step numbers reveal sequential + emoji bounce
- Active step (hover) glow effect

### Hygiene Standard (React island, `client:visible`)
- 4 cards reveal stagger
- Icon: rotate 360 on enter `rotate: [0, 360]`
- Card hover: subtle glow border accent

### Add-ons (React island, `client:visible`)
- Cards reveal stagger
- Hover: card tilt 3D dengan mouse position tracking
- Price tag: micro bounce animation

### Booking Form
- Multi-step form smooth transition
- Calendar pop-in animation
- Submit: confetti animation on success pakai library `canvas-confetti` lewat motion onAnimationComplete

### Scroll Reveal Pattern (reusable)
```tsx
const softFloat = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
}
```

### Cursor Effect (optional, desktop)
- Custom cursor: sparkle trail saat hover di design catalog
- Implement: `useMotionValue` + lag follower particles

### Hydration Strategy
- `client:load` → Hero
- `client:visible` → Services, Catalog, Trending, Hygiene, Add-ons
- `client:idle` → Booking form
- Sisanya: static

---

## 7. SEO Meta

- **Title:** Petalé Nail Studio — Premium Nail Art Jakarta & Surabaya
- **Description:** Nail studio dengan 500+ desain, gel polish premium, dan standar hygiene rumah sakit. Manicure, pedicure, acrylic extension, nail art. Book online.
- **Keywords:** nail art jakarta, nail studio, gel polish jakarta, acrylic extension, manicure premium, nail art surabaya
- **OG Image:** Flat lay tangan dengan signature nail art Petalé (1200x630)
- **Schema:** `BeautySalon` + `Service` schema
