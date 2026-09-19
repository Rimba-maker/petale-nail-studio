import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Plus, Hand, Footprints, Flame, Diamond } from '@phosphor-icons/react';
import { imgProps } from '../../data/photos';

const addons = [
  { id: 'hand',     name: 'Hand Spa',        price: 75,  desc: 'Scrub, pijat, dan masker paraffin',        Icon: Hand,       flavor: 'strawberry' },
  { id: 'foot',     name: 'Foot Spa Deluxe', price: 100, desc: 'Rendam, scrub, callus removal, pijat',     Icon: Footprints, flavor: 'matcha' },
  { id: 'paraffin', name: 'Paraffin Wax',    price: 50,  desc: 'Mandi lilin pelembap untuk tangan halus',  Icon: Flame,      flavor: 'mango' },
  { id: 'bridal',   name: 'Bridal Trial',    price: 750, desc: 'Konsultasi + 2 desain percobaan pernikahan', Icon: Diamond,     flavor: 'taro', flat: true },
] as const;

const rp = (k: number) => (k >= 1000 ? `Rp ${(k / 1000).toString().replace('.', ',')}jt` : `Rp ${k}k`);

export default function Addons() {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const reduced = useReducedMotion();

  const toggle = (id: string) =>
    setPicked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const total = addons.filter(a => picked.has(a.id)).reduce((s, a) => s + a.price, 0);

  return (
    <section id="addons" className="section-rhythm addons-section">
      <div className="container-petale addons-grid">

        <div className="addons-visual">
          <div className="addons-photo-a photo-frame arch"><img {...imgProps('handSpaTulip', 400, 520)} /></div>
          <div className="addons-photo-b photo-frame"><img {...imgProps('pediPink', 260, 260)} /></div>
          <div className="addons-photo-c photo-frame"><img {...imgProps('bottlesPastel', 220, 220)} /></div>
        </div>

        <div className="addons-copy">
          <h2 className="display-lg">Tambah Topping, Biar Makin Spesial</h2>
          <p className="lede">Seperti boba, kuku juga enak kalau ada topping. Tap yang kamu mau dan lihat totalnya.</p>

          <ul className="topping-list">
            {addons.map(a => {
              const on = picked.has(a.id);
              return (
                <li key={a.id}>
                  <motion.button
                    type="button"
                    className={`topping${on ? ' on' : ''}`}
                    data-flavor={a.flavor}
                    aria-pressed={on}
                    onClick={() => toggle(a.id)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={reduced ? undefined : { y: -3, rotate: -0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                  >
                    <span className="topping-icon"><a.Icon size={24} weight="fill" /></span>
                    <span className="topping-text">
                      <strong>{a.name}</strong>
                      <small>{a.desc}</small>
                    </span>
                    <span className="topping-price">{'flat' in a ? '' : '+'}{rp(a.price)}</span>
                    <span className="topping-check" aria-hidden="true">{on ? <Check size={16} weight="bold" /> : <Plus size={16} weight="bold" />}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <div className="topping-total" aria-live="polite">
            <span>Total topping</span>
            <AnimatePresence mode="popLayout">
              <motion.strong
                key={total}
                initial={reduced ? false : { y: 12, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                {total === 0 ? 'Rp 0' : rp(total)}
              </motion.strong>
            </AnimatePresence>
            <a href="#booking" className="btn-primary">Lanjut pesan</a>
          </div>
        </div>

      </div>
    </section>
  );
}
