// Single source for every photo on the page. All are free-to-use stock from
// Unsplash (u) and Pexels (p); each ID was fetched and viewed before being listed.
// Use imgProps(key, width, height) in .astro and .tsx alike.

type Photo = { s: 'u' | 'p'; id: string; alt: string; pos?: string };

export const photos = {
  // ── nails: pastel & cute ──
  stiletto3d:     { s: 'u', id: '1780402695873-d3053ee43f11', alt: 'Kuku stiletto panjang dengan hiasan 3D warna pastel dan cincin', pos: '50% 40%' },
  heartsPink:     { s: 'u', id: '1754799670410-b282791342c3', alt: 'Kuku putih dan pink dengan desain hati' },
  lilacPastel:    { s: 'p', id: '6774348',  alt: 'Dua tangan dengan kuku pastel warna-warni di latar ungu' },
  lilacFace:      { s: 'p', id: '6774877',  alt: 'Perempuan bersweter lilac menyentuh wajah dengan kuku pastel' },
  pastelSmoothie: { s: 'p', id: '36655811', alt: 'Manikur pastel sambil memegang smoothie' },
  cupcakeLilac:   { s: 'p', id: '11866583', alt: 'Tangan dengan kuku lilac memegang cupcake mainan' },
  pastelMuted:    { s: 'u', id: '1688583417770-ff6cc18071dc', alt: 'Kuku pastel lembut warna sage, lilac, dan krem' },
  pastelSoft:     { s: 'u', id: '1688583417757-9060cba25399', alt: 'Kuku pastel pink, lilac, dan krem dari dekat' },
  coralPink:      { s: 'u', id: '1727199433272-70fdb94c8430', alt: 'Dua tangan dengan kuku pink koral' },
  yellowTips:     { s: 'u', id: '1601244668565-afba8cbd2b51', alt: 'Kuku ujung kuning dan pink di latar peach' },
  loveRed:        { s: 'u', id: '1519014816548-bf5fe059798b', alt: 'Kuku pink dengan tulisan love' },
  blueOmbre:      { s: 'u', id: '1772322586702-73125782bd99', alt: 'Kuku ombre biru dan putih' },
  frenchDaisy:    { s: 'u', id: '1762373349045-c2decd4ec3f3', alt: 'Kuku french manicure memegang bunga daisy kecil' },
  classicFrench:  { s: 'p', id: '13038494', alt: 'Kuku french tip klasik' },
  bridalRing:     { s: 'u', id: '1735264143075-9694eb02ad86', alt: 'Tangan dengan kuku nude elegan dan cincin' },
  pinkFlower:     { s: 'p', id: '20758448', alt: 'Kuku pink memegang bunga krisan pink' },
  pinkGlitter:    { s: 'p', id: '34835283', alt: 'Kuku pink french dengan glitter' },
  pinkFloral:     { s: 'p', id: '34835287', alt: 'Kuku pink dengan aksen bunga putih di latar biru' },
  polkaBottles:   { s: 'p', id: '7066298',  alt: 'Kuku polkadot warna-warni memegang botol kutek' },
  colorfulPastel: { s: 'p', id: '38283820', alt: 'Kuku pastel lilac, biru, dan kuning' },
  lilacBlue:      { s: 'p', id: '14753641', alt: 'Kuku lilac dengan lengan sweter biru' },

  peachCream:     { s: 'p', id: '7664093',  alt: 'Tangan dengan kuku lilac dan nude di atas kain peach' },
  starBlue:       { s: 'p', id: '15477639', alt: 'Kuku biru muda dengan bintang perak kecil' },
  milkOmbre:      { s: 'p', id: '17471377', alt: 'Kuku ombre pink dan putih di atas sweter biru muda' },
  skyDoodle:      { s: 'p', id: '5871918',  alt: 'Tangan dengan nail art minimalis di latar biru langit' },
  matchaHoodie:   { s: 'p', id: '8872320',  alt: 'Tangan dengan kuku pink di atas hoodie hijau' },

  mintToes:       { s: 'p', id: '4963822',  alt: 'Kuku kaki hijau mint di atas karpet' },

  // ── objects & mood ──
  dripBottles:    { s: 'u', id: '1763987300719-fd27c51a3227', alt: 'Tumpukan botol kutek pink dan lilac dengan tetesan cat' },
  bottlesPastel:  { s: 'u', id: '1667769462514-1fd738b38498', alt: 'Empat botol kutek warna pastel di meja putih' },
  shelves:        { s: 'u', id: '1619607146034-5a05296c8f9a', alt: 'Rak emas penuh botol kutek warna-warni' },
  boba4:          { s: 'u', id: '1747016804753-866c3ed6b3b7', alt: 'Empat gelas boba warna-warni dengan sedotan' },
  candyHands:     { s: 'p', id: '8670189',  alt: 'Tangan penuh permen warna-warni' },

  // ── process, hygiene, spa ──
  glovesBlue:     { s: 'p', id: '7755221',  alt: 'Nail artist bersarung tangan lateks biru sedang manikur' },
  toolsGloves:    { s: 'p', id: '6135673',  alt: 'Manikur dengan sarung tangan dan alat steril di keranjang pink' },
  uvLamp:         { s: 'p', id: '4783335',  alt: 'Manikur dari atas dengan lampu UV dan kutek merah' },
  handSpaTulip:   { s: 'p', id: '10181437', alt: 'Manikur di meja putih dengan bunga tulip' },
  pediPink:       { s: 'p', id: '17056220', alt: 'Pedikur dengan kutek pink oleh terapis bersarung tangan' },
  salonTechs:     { s: 'p', id: '34930101', alt: 'Dua terapis melakukan pedikur di salon kuku modern' },
  swatchFan:      { s: 'p', id: '34930138', alt: 'Kipas contoh warna kutek di salon' },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function photoUrl(key: PhotoKey, w: number, h?: number): string {
  const p: Photo = photos[key];
  const size = h ? `&w=${w}&h=${h}` : `&w=${w}`;
  return p.s === 'u'
    ? `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&q=75${size}`
    : `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&fit=crop${size}`;
}

/** Props for <img>: sized, 2x srcset, lazy by default (pass eager for above the fold). */
export function imgProps(key: PhotoKey, w: number, h?: number, eager = false) {
  const p: Photo = photos[key];
  return {
    src: photoUrl(key, w, h),
    srcSet: `${photoUrl(key, w, h)} 1x, ${photoUrl(key, w * 2, h ? h * 2 : undefined)} 2x`,
    alt: p.alt,
    width: w,
    height: h ?? Math.round(w * 1.25),
    loading: eager ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    style: p.pos ? { objectPosition: p.pos } : undefined,
  };
}
