import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { PaintBrush, Footprints, Palette, Clock } from '@phosphor-icons/react';
import { imgProps, type PhotoKey } from '../../data/photos';

type Tab = 'manicure' | 'pedicure' | 'nailart';

const tabs: { id: Tab; label: string; Icon: typeof PaintBrush; photo: PhotoKey; sticker: string }[] = [
  { id: 'manicure', label: 'Manicure', Icon: PaintBrush, photo: 'pastelMuted', sticker: 'Paling laris' },
  { id: 'pedicure', label: 'Pedicure', Icon: Footprints, photo: 'mintToes',    sticker: 'Kaki happy' },
  { id: 'nailart',  label: 'Nail Art', Icon: Palette,    photo: 'stiletto3d',  sticker: 'Bebas request' },
];

const menu: Record<Tab, { name: string; price: string; duration: string; desc: string }[]> = {
  manicure: [
    { name: 'Basic Manicure',      price: 'Rp 95k',  duration: '45 min',  desc: 'Cuticle care, shape & polish' },
    { name: 'Gel Polish Manicure', price: 'Rp 150k', duration: '60 min',  desc: 'Warna awet dengan finish glossy' },
    { name: 'Acrylic Extension',   price: 'Rp 350k', duration: '120 min', desc: 'Panjang dan bentuk sesuai maumu' },
    { name: 'BIAB / Builder Gel',  price: 'Rp 250k', duration: '90 min',  desc: 'Lapisan penguat untuk kuku rapuh' },
  ],
  pedicure: [
    { name: 'Basic Pedicure', price: 'Rp 125k', duration: '60 min', desc: 'Cuticle care, shape & polish' },
    { name: 'Spa Pedicure',   price: 'Rp 195k', duration: '90 min', desc: 'Rendam, scrub & pijat kaki' },
    { name: 'Gel Pedicure',   price: 'Rp 175k', duration: '75 min', desc: 'Gel awet untuk kuku kaki' },
  ],
  nailart: [
    { name: 'Simple Art',         price: '+Rp 25k',    duration: 'per kuku',      desc: '1-3 kuku aksen, desain minimalis' },
    { name: 'Detailed Art',       price: '+Rp 50k',    duration: 'per kuku',      desc: 'Pola rumit dan detail halus' },
    { name: '3D / Chrome / Foil', price: '+Rp 75k',    duration: 'per kuku',      desc: 'Efek dimensi dan metalik' },
    { name: 'Full Custom Design', price: 'Konsultasi', duration: 'sesuai desain', desc: 'Bawa referensi, kami wujudkan' },
  ],
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 22, delay: i * 0.06 },
  }),
};

export default function Services() {
  const [active, setActive] = useState<Tab>('manicure');
  const reduced = useReducedMotion();
  const tab = tabs.find(t => t.id === active)!;

  return (
    <section id="services" className="section-rhythm menu-section">
      <div className="container-petale">

        <div className="section-head">
          <h2 className="display-lg">Menu Petalé</h2>
          <p className="lede">Semua sudah termasuk cuticle care & basic shaping. Pilih warna polos, atau ajak nail artist kami berkarya.</p>
        </div>

        <div className="menu-tabs" role="tablist" aria-label="Kategori layanan">
          {tabs.map(t => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls="menu-panel"
              className="menu-tab"
              onClick={() => setActive(t.id)}
            >
              {active === t.id && (
                <motion.span layoutId="menu-tab-pill" className="menu-tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />
              )}
              <span className="menu-tab-label"><t.Icon size={18} weight="bold" /> {t.label}</span>
            </button>
          ))}
        </div>

        <div className="menu-board" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <div className="menu-photo-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                className="menu-photo photo-frame arch"
                initial={reduced ? false : { opacity: 0, y: 24, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <img {...imgProps(tab.photo, 460, 600)} />
              </motion.div>
            </AnimatePresence>
            <span className="sticker menu-sticker" style={{ '--sticker': 'var(--flavor)', '--r': '-6deg' } as React.CSSProperties}>{tab.sticker}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab.id}
              className="menu-list"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {menu[tab.id].map((item, i) => (
                <motion.li
                  key={item.name}
                  className="menu-row"
                  variants={rowVariants}
                  custom={i}
                  whileHover={reduced ? undefined : { x: 6, rotate: -0.6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  <div className="menu-line">
                    <span className="menu-name">{item.name}</span>
                    <span className="menu-dots" aria-hidden="true" />
                    <span className="menu-price">{item.price}</span>
                  </div>
                  <p className="menu-desc">
                    {item.desc}
                    <span className="menu-time"><Clock size={14} weight="bold" /> {item.duration}</span>
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
