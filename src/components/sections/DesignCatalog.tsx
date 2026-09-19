import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, X } from '@phosphor-icons/react';
import { imgProps, type PhotoKey } from '../../data/photos';

type Flavor = 'strawberry' | 'taro' | 'matcha' | 'mango' | 'blueberry' | 'vanilla';

const flavorLabel: Record<Flavor, string> = {
  strawberry: 'Strawberry',
  taro: 'Taro',
  matcha: 'Matcha',
  mango: 'Mango',
  blueberry: 'Blueberry',
  vanilla: 'Vanilla',
};
const filters: (Flavor | 'all')[] = ['all', 'strawberry', 'taro', 'matcha', 'mango', 'blueberry', 'vanilla'];

interface Design {
  name: string;
  flavor: Flavor;
  photo: PhotoKey;
  technique: string;
  service: string;
  tall?: boolean;
}

const designs: Design[] = [
  { name: 'Heart Milk',      flavor: 'strawberry', photo: 'heartsPink',     technique: 'Nail art',   service: 'Detailed Art', tall: true },
  { name: 'Coral Crush',     flavor: 'strawberry', photo: 'coralPink',      technique: 'Gel polish', service: 'Gel Polish Manicure' },
  { name: 'Love Letter',     flavor: 'strawberry', photo: 'loveRed',        technique: 'Lettering',  service: 'Detailed Art', tall: true },
  { name: 'Pink Cloud',      flavor: 'strawberry', photo: 'pinkGlitter',    technique: 'Glitter',    service: 'Gel Polish Manicure' },
  { name: 'Blossom Pink',    flavor: 'strawberry', photo: 'pinkFlower',     technique: 'Gel polish', service: 'Gel Polish Manicure' },
  { name: 'Pink Petal',      flavor: 'strawberry', photo: 'pinkFloral',     technique: 'Nail art',   service: 'Detailed Art', tall: true },
  { name: 'Taro Latte',      flavor: 'taro',       photo: 'lilacPastel',    technique: 'Pastel',     service: 'Gel Polish Manicure' },
  { name: 'Lilac Dream',     flavor: 'taro',       photo: 'lilacBlue',      technique: 'Pastel',     service: 'Gel Polish Manicure', tall: true },
  { name: 'Cupcake Pop',     flavor: 'taro',       photo: 'cupcakeLilac',   technique: 'Pastel',     service: 'Gel Polish Manicure' },
  { name: 'Sage Milk',       flavor: 'matcha',     photo: 'pastelMuted',    technique: 'Minimalis',  service: 'Gel Polish Manicure' },
  { name: 'Daisy Matcha',    flavor: 'matcha',     photo: 'frenchDaisy',    technique: 'French',     service: 'Gel Polish Manicure', tall: true },
  { name: 'Matcha Latte',    flavor: 'matcha',     photo: 'matchaHoodie',   technique: 'Gel polish', service: 'Gel Polish Manicure' },
  { name: 'Sunny Tips',      flavor: 'mango',      photo: 'yellowTips',     technique: 'French',     service: 'Gel Polish Manicure', tall: true },
  { name: 'Sprinkle Party',  flavor: 'mango',      photo: 'polkaBottles',   technique: 'Polkadot',   service: 'Detailed Art' },
  { name: 'Candy Pop',       flavor: 'mango',      photo: 'candyHands',     technique: 'Pastel',     service: 'Gel Polish Manicure', tall: true },
  { name: 'Confetti Pastel', flavor: 'mango',      photo: 'colorfulPastel', technique: 'Pastel',     service: 'Gel Polish Manicure' },
  { name: 'Blueberry Ombre', flavor: 'blueberry',  photo: 'blueOmbre',      technique: 'Ombre',      service: 'Gel Polish Manicure', tall: true },
  { name: 'Star Blue',       flavor: 'blueberry',  photo: 'starBlue',       technique: 'Nail art',   service: 'Detailed Art' },
  { name: 'Sky Doodle',      flavor: 'blueberry',  photo: 'skyDoodle',      technique: 'Nail art',   service: 'Detailed Art', tall: true },
  { name: 'Classic French',  flavor: 'vanilla',    photo: 'classicFrench',  technique: 'French',     service: 'Gel Polish Manicure' },
  { name: 'Bridal Ring',     flavor: 'vanilla',    photo: 'bridalRing',     technique: 'Bridal',     service: 'Full Custom Design', tall: true },
  { name: 'Peach Cream',     flavor: 'vanilla',    photo: 'peachCream',     technique: 'Pastel',     service: 'Gel Polish Manicure' },
  { name: 'Soft Cream',      flavor: 'vanilla',    photo: 'pastelSoft',     technique: 'Minimalis',  service: 'Basic Manicure', tall: true },
];

export default function DesignCatalog() {
  const [active, setActive] = useState<Flavor | 'all'>('all');
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Design | null>(null);
  const reduced = useReducedMotion();

  const shown = active === 'all' ? designs : designs.filter(d => d.flavor === active);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleLike = (name: string) =>
    setLiked(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  return (
    <section id="catalog" className="section-rhythm catalog-section">
      <div className="container-petale">

        <div className="section-head">
          <h2 className="display-lg">Pilih Rasa Kukumu</h2>
          <p className="lede">Ratusan desain, disusun per rona seperti rak permen. Tap satu yang bikin jatuh hati, atau bawa screenshot, kami recreate untukmu.</p>
        </div>

        <div className="chip-row" role="group" aria-label="Filter rasa">
          {filters.map(f => (
            <button
              key={f}
              type="button"
              className={`chip${active === f ? ' active' : ''}`}
              data-flavor={f === 'all' ? 'strawberry' : f}
              aria-pressed={active === f}
              onClick={() => setActive(f)}
            >
              {f !== 'all' && <span className="dot" />}
              {f === 'all' ? 'Semua rasa' : flavorLabel[f]}
            </button>
          ))}
        </div>

        <motion.div layout className="look-grid">
          <AnimatePresence mode="popLayout">
            {shown.map(d => (
              <motion.article
                key={d.name}
                layout
                className={`look-card${d.tall ? ' tall' : ''}`}
                data-flavor={d.flavor}
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <button type="button" className="look-open" onClick={() => setOpen(d)} aria-label={`Lihat detail ${d.name}`}>
                  <img {...imgProps(d.photo, 360, d.tall ? 480 : 360)} />
                </button>
                <span className="sticker look-name" style={{ '--sticker': 'var(--flavor-soft)', '--r': '-3deg' } as React.CSSProperties}>{d.name}</span>
                <button
                  type="button"
                  className="look-like"
                  aria-pressed={liked.has(d.name)}
                  aria-label={liked.has(d.name) ? `Batal suka ${d.name}` : `Suka ${d.name}`}
                  onClick={() => toggleLike(d.name)}
                >
                  <motion.span animate={{ scale: liked.has(d.name) ? [1, 1.5, 1] : 1 }} transition={{ duration: 0.3 }}>
                    <Heart size={18} weight={liked.has(d.name) ? 'fill' : 'bold'} color={liked.has(d.name) ? 'var(--color-rose-ink)' : 'var(--color-cocoa)'} />
                  </motion.span>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="look-modal-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={open.name}
                className="look-modal"
                data-flavor={open.flavor}
                onClick={e => e.stopPropagation()}
                initial={reduced ? false : { scale: 0.8, opacity: 0, rotate: -3 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <div className="look-modal-photo photo-frame">
                  <img {...imgProps(open.photo, 640, 520)} />
                </div>
                <div className="look-modal-body">
                  <h3 className="display-md">{open.name}</h3>
                  <div className="look-modal-tags">
                    <span className="chip active" data-flavor={open.flavor}><span className="dot" />{flavorLabel[open.flavor]}</span>
                    <span className="chip">{open.technique}</span>
                  </div>
                  <p className="look-modal-service">Cocok dengan layanan <strong>{open.service}</strong>.</p>
                  <div className="look-modal-actions">
                    <a href="#booking" className="btn-primary" onClick={() => setOpen(null)}>Pesan desain ini</a>
                    <button type="button" className="btn-secondary" onClick={() => setOpen(null)} autoFocus>Tutup</button>
                  </div>
                </div>
                <button type="button" className="look-modal-x" aria-label="Tutup" onClick={() => setOpen(null)}><X size={18} weight="bold" /></button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
