import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Fire } from '@phosphor-icons/react';
import { imgProps, type PhotoKey } from '../../data/photos';

const trending: { rank: number; name: string; tag: string; photo: PhotoKey; flavor: string }[] = [
  { rank: 1, name: 'Heart Milk',      tag: '#heartfrench',   photo: 'heartsPink',    flavor: 'strawberry' },
  { rank: 2, name: '3D Pastel Pop',   tag: '#3dnails',       photo: 'stiletto3d',    flavor: 'taro' },
  { rank: 3, name: 'Sprinkle Party',  tag: '#polkadotnails', photo: 'polkaBottles',  flavor: 'mango' },
  { rank: 4, name: 'Blueberry Ombre', tag: '#ombrenails',    photo: 'blueOmbre',     flavor: 'blueberry' },
  { rank: 5, name: 'Taro Latte',      tag: '#pastelnails',   photo: 'lilacPastel',   flavor: 'taro' },
  { rank: 6, name: 'Coral Crush',     tag: '#coralnails',    photo: 'coralPink',     flavor: 'strawberry' },
  { rank: 7, name: 'Daisy Matcha',    tag: '#daisynails',    photo: 'frenchDaisy',   flavor: 'matcha' },
  { rank: 8, name: 'Sky Doodle',      tag: '#skynails',      photo: 'skyDoodle',     flavor: 'blueberry' },
];

export default function TrendingDesigns() {
  const track = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="trending" className="section-rhythm trending-section scallop-b scallop-t" style={{ '--edge': 'var(--color-blush)' } as React.CSSProperties}>
      <div className="container-petale">

        <div className="trending-head">
          <div className="section-head">
            <h2 className="display-lg">Lagi Viral Bulan Ini</h2>
            <p className="lede">Delapan desain yang lagi kami suka bulan ini (urutannya contoh saja). Sekali tap, langsung pesan.</p>
          </div>
          <div className="trending-nav">
            <button type="button" className="round-btn" onClick={() => scrollBy(-1)} aria-label="Geser ke kiri"><ArrowLeft size={20} weight="bold" /></button>
            <button type="button" className="round-btn" onClick={() => scrollBy(1)} aria-label="Geser ke kanan"><ArrowRight size={20} weight="bold" /></button>
          </div>
        </div>

        <ul className="trending-track" ref={track} aria-label="Desain trending">
          {trending.map((t, i) => (
            <motion.li
              key={t.name}
              className="trend-card"
              data-flavor={t.flavor}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: Math.min(i, 3) * 0.08 }}
              whileHover={reduced ? undefined : { y: -8, rotate: i % 2 ? 1.2 : -1.2 }}
            >
              <div className="trend-photo photo-frame">
                <img {...imgProps(t.photo, 300, 400)} />
                <span className="sticker trend-rank" style={{ '--sticker': 'var(--flavor)', '--r': '-8deg' } as React.CSSProperties}>
                  {t.rank <= 3 ? <Fire size={14} weight="fill" /> : null} #{t.rank}
                </span>
              </div>
              <h3 className="trend-name">{t.name}</h3>
              <p className="trend-tag">{t.tag}</p>
              <a href="#booking" className="btn-primary trend-cta">Pesan</a>
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  );
}
