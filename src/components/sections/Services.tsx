import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaintBrush, Footprints, Palette, Sparkle } from '@phosphor-icons/react';

type Tab = 'manicure' | 'pedicure' | 'nailart';

const ICO = { size: 32, weight: 'light' as const, color: 'var(--color-rose)' };

const services = {
  manicure: [
    { icon: <PaintBrush {...ICO} />, name: 'Basic Manicure',       price: 'Rp 95k',     duration: '45 min',      desc: 'Cuticle care, shape & polish' },
    { icon: <PaintBrush {...ICO} />, name: 'Gel Polish Manicure',  price: 'Rp 150k',    duration: '60 min',      desc: 'Long-lasting gel finish' },
    { icon: <PaintBrush {...ICO} />, name: 'Acrylic Extension',    price: 'Rp 350k',    duration: '120 min',     desc: 'Custom length & shape' },
    { icon: <PaintBrush {...ICO} />, name: 'BIAB / Builder Gel',   price: 'Rp 250k',    duration: '90 min',      desc: 'Strengthening overlay' },
  ],
  pedicure: [
    { icon: <Footprints {...ICO} />, name: 'Basic Pedicure',       price: 'Rp 125k',    duration: '60 min',      desc: 'Cuticle care, shape & polish' },
    { icon: <Footprints {...ICO} />, name: 'Spa Pedicure',         price: 'Rp 195k',    duration: '90 min',      desc: 'Foot soak, scrub & massage' },
    { icon: <Footprints {...ICO} />, name: 'Gel Pedicure',         price: 'Rp 175k',    duration: '75 min',      desc: 'Long-lasting gel on feet' },
  ],
  nailart: [
    { icon: <Palette {...ICO} />,    name: 'Simple Art',           price: '+Rp 25k',    duration: 'per kuku',    desc: '1-3 accent nails, minimal designs' },
    { icon: <Palette {...ICO} />,    name: 'Detailed Art',         price: '+Rp 50k',    duration: 'per kuku',    desc: 'Intricate patterns & details' },
    { icon: <Palette {...ICO} />,    name: '3D / Chrome / Foil',   price: '+Rp 75k',    duration: 'per kuku',    desc: 'Dimensional & metallic effects' },
    { icon: <Palette {...ICO} />,    name: 'Full Custom Design',   price: 'Konsultasi', duration: 'Sesuai desain', desc: 'Bawa referensi, kami wujudkan' },
  ],
};

const tabs: { id: Tab; label: string }[] = [
  { id: 'manicure', label: 'Manicure' },
  { id: 'pedicure', label: 'Pedicure' },
  { id: 'nailart',  label: 'Nail Art' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Services() {
  const [active, setActive] = useState<Tab>('manicure');

  return (
    <section id="services" className="section-rhythm" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container-petale">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Services</p>
          <h2 className="display-md" style={{ marginBottom: '16px' }}>
            Pilih Yang Cocok Hari Ini
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', marginInline: 'auto', lineHeight: '1.65' }}>
            Semua sudah include cuticle care & basic shaping. Pilih warna polos atau ajak nail artist kami berkarya.
          </p>
        </div>

        {/* Tabs with layoutId indicator */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                position: 'relative',
                padding: '10px 24px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: active === tab.id ? 'var(--color-ink)' : 'var(--color-muted)',
                backgroundColor: 'transparent',
                transition: 'color 0.2s',
              }}
            >
              {active === tab.id && (
                <motion.span
                  layoutId="tab-indicator"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-canvas)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {services[active].map((svc, i) => (
              <motion.div
                key={svc.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-hairline-soft)',
                  cursor: 'default',
                }}
              >
                <div style={{ marginBottom: '16px', lineHeight: 1, display: 'flex' }}>
                  {svc.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  marginBottom: '8px',
                  letterSpacing: '-0.2px',
                }}>
                  {svc.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
                  {svc.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: 'var(--color-rose)',
                    letterSpacing: '-0.3px',
                  }}>
                    {svc.price}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--color-muted-soft)',
                    fontWeight: 500,
                  }}>
                    {svc.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#booking" className="btn-primary">
            <Sparkle size={14} weight="fill" /> Book Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
