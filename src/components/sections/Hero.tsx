import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkle, ArrowRight, CheckCircle, FlowerLotus, Camera, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react';
import { imgProps, type PhotoKey } from '../../data/photos';

const flavors: { id: string; label: string; photo: PhotoKey; caption: string }[] = [
  { id: 'strawberry', label: 'Strawberry Milk', photo: 'heartsPink',  caption: 'Heart French' },
  { id: 'taro',       label: 'Taro Latte',      photo: 'lilacPastel', caption: 'Lilac Pastel' },
  { id: 'matcha',     label: 'Matcha Mint',     photo: 'pastelMuted', caption: 'Sage Milk' },
  { id: 'mango',      label: 'Mango Pop',       photo: 'yellowTips',  caption: 'Sunny Tips' },
];

const menuTicker = ['Gel Polish', 'French Tip', 'Chrome', '3D Art', 'Bridal', 'Acrylic', 'BIAB', 'Spa Pedicure', 'Custom Design'];

const points = [
  { Icon: Camera,      text: 'Bawa screenshot, kami recreate' },
  { Icon: ShieldCheck, text: 'Alat steril untuk tiap klien' },
  { Icon: WhatsappLogo, text: 'Booking cepat via WhatsApp' },
];

function BounceLine({ text, delay, reduced }: { text: string; delay: number; reduced: boolean }) {
  return (
    <span className="bounce-line" aria-hidden="true">
      {[...text].map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className="bounce-space" />
        ) : (
          <motion.span
            key={i}
            className="bounce-ch"
            initial={reduced ? false : { y: '0.9em', scale: 0.5, opacity: 0, rotate: i % 2 ? 9 : -9 }}
            animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 11, delay: delay + i * 0.045 }}
            whileHover={reduced ? undefined : { y: '-0.12em', rotate: i % 2 ? -6 : 6, scale: 1.08, transition: { type: 'spring', stiffness: 500, damping: 12 } }}
          >
            {ch}
          </motion.span>
        )
      )}
    </span>
  );
}

export default function Hero() {
  const reducedPref = useReducedMotion();
  const reduced = !!reducedPref;
  const [flavor, setFlavor] = useState(flavors[0]);

  // the picked flavor re-tints menu board, tabs and awning too (they inherit from <html>)
  useEffect(() => { document.documentElement.dataset.flavor = flavor.id; }, [flavor]);

  return (
    <section id="top" className="hero pearls" data-flavor={flavor.id}>
      <div className="container-petale hero-grid">

        <div className="hero-copy">
          <h1 className="display-xl hero-title" aria-label="Kuku Lucu, Hati Happy.">
            <BounceLine text="Kuku Lucu," delay={0.1} reduced={reduced} />
            <span className="hero-hl">
              <BounceLine text="Hati Happy." delay={0.55} reduced={reduced} />
            </span>
          </h1>

          <p className="lede hero-lede">
            Studio nail art dengan ratusan desain siap pakai. Pilih rasa favoritmu, atau bawa screenshot Pinterest-mu, biar kami yang bikin kukumu jadi lucu.
          </p>

          <div className="flavor-picker" role="radiogroup" aria-label="Pilih rasa mood-mu">
            <span className="flavor-label">Pilih rasa mood-mu</span>
            <div className="flavor-dots">
              {flavors.map(f => (
                <motion.button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={flavor.id === f.id}
                  aria-label={f.label}
                  title={f.label}
                  data-flavor={f.id}
                  className="flavor-dot"
                  onClick={() => setFlavor(f)}
                  whileTap={{ scale: 0.8 }}
                  animate={{ scale: flavor.id === f.id ? 1.18 : 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                />
              ))}
            </div>
            <span className="flavor-name" aria-live="polite">{flavor.label}</span>
          </div>

          <div className="hero-actions">
            <a href="#booking" className="btn-primary"><Sparkle size={16} weight="fill" /> Pesan Slot</a>
            <a href="#services" className="btn-secondary">Intip Menu <ArrowRight size={16} weight="bold" /></a>
          </div>

          <ul className="hero-points">
            {points.map(({ Icon, text }) => (
              <li key={text}><Icon size={18} weight="fill" /> {text}</li>
            ))}
          </ul>
        </div>

        <div className="hero-collage">
          <div className="hero-arch photo-frame arch">
            <AnimatePresence mode="wait">
              <motion.img
                key={flavor.id}
                {...imgProps(flavor.photo, 560, 700, true)}
                initial={reduced ? false : { scale: 1.12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              />
            </AnimatePresence>
          </div>
          <span className="sticker hero-cap" style={{ '--sticker': 'var(--flavor)', '--r': '-5deg' } as React.CSSProperties}>
            <CheckCircle size={15} weight="fill" /> {flavor.caption}
          </span>

          <div className="hero-bubble photo-frame">
            <img {...imgProps('pastelSmoothie', 240, 240, true)} />
          </div>
          <div className="hero-tile photo-frame">
            <img {...imgProps('stiletto3d', 260, 260, true)} />
          </div>
          <span className="sticker hero-tag" style={{ '--sticker': 'var(--color-mango)', '--r': '6deg' } as React.CSSProperties}>
            <Sparkle size={14} weight="fill" /> 3D Art
          </span>

          <div className="hero-spin" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="hero-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
              </defs>
              <text>
                <textPath href="#hero-circle" textLength="278" lengthAdjust="spacing">PETALÉ NAIL STUDIO • KUKU LUCU • </textPath>
              </text>
            </svg>
            <FlowerLotus size={24} weight="bold" className="hero-spin-icon" />
          </div>
        </div>
      </div>

      <div className="awning" aria-hidden="true">
        <div className="awning-clip">
          <div className="awning-track">
            {[0, 1].map(k => (
              <div className="awning-set" key={k}>
                {menuTicker.map(t => (
                  <span key={t + k}>{t}<Sparkle size={14} weight="fill" /></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
