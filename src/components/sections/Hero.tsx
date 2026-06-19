import { motion, useReducedMotion } from 'framer-motion';
import { FlowerLotus, Sparkle, Star, PaintBrush } from '@phosphor-icons/react';

type PetalType = 'flower' | 'sparkle' | 'star';

const petals: { type: PetalType; x: string; y: string; delay: number; size: number }[] = [
  { type: 'flower',  x: '8%',  y: '18%', delay: 0,   size: 26 },
  { type: 'sparkle', x: '90%', y: '12%', delay: 1.2, size: 20 },
  { type: 'flower',  x: '5%',  y: '72%', delay: 2.1, size: 18 },
  { type: 'star',    x: '85%', y: '65%', delay: 0.7, size: 14 },
  { type: 'sparkle', x: '72%', y: '25%', delay: 1.8, size: 16 },
  { type: 'flower',  x: '18%', y: '85%', delay: 0.4, size: 14 },
  { type: 'star',    x: '55%', y: '8%',  delay: 2.5, size: 12 },
  { type: 'sparkle', x: '92%', y: '80%', delay: 1.5, size: 15 },
];

const PetalIcon = ({ type, size }: { type: PetalType; size: number }) => {
  const props = { size, weight: 'thin' as const, color: 'var(--color-rose)' };
  if (type === 'sparkle') return <Sparkle {...props} />;
  if (type === 'star')    return <Star {...props} />;
  return <FlowerLotus {...props} />;
};

const cuteReveal = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 180, damping: 18, delay: i * 0.1 },
  }),
};

const badges = [
  { icon: <Sparkle size={14} weight="fill" color="var(--color-rose)" />,    text: 'Reviewed by Vogue ID' },
  { icon: <PaintBrush size={14} weight="regular" color="var(--color-rose)" />, text: '1.000+ Designs Done' },
  { icon: <Star size={14} weight="fill" color="var(--color-rose)" />,        text: '4.9 Google Rating' },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-canvas)',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Floating petal particles */}
      {!reduced && petals.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            opacity: 0.3,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          animate={{ y: [0, -28, 0], x: [0, 12, 0], rotate: [0, 360] }}
          transition={{ duration: 8 + i * 0.6, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        >
          <PetalIcon type={p.type} size={p.size} />
        </motion.span>
      ))}

      {/* Soft blush blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '55%',
          aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(201,107,138,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-8%',
          width: '40%',
          aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(201,107,138,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-petale" style={{ width: '100%', paddingBlock: '80px 96px' }}>
        <div style={{ maxWidth: '720px', marginInline: 'auto', textAlign: 'center' }}>

          {/* Eye-brow label */}
          <motion.div
            custom={0} variants={cuteReveal} initial="hidden" animate="visible"
            style={{ marginBottom: '24px' }}
          >
            <span className="badge badge-rose" style={{ fontSize: '12px', letterSpacing: '1.5px' }}>
              ✿ Premium Nail Art Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="display-xl"
            custom={1} variants={cuteReveal} initial="hidden" animate="visible"
            style={{ marginBottom: '24px', fontStyle: 'italic' }}
          >
            Kuku Cantik,{' '}
            <span style={{ color: 'var(--color-rose)' }}>Mood Naik.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            custom={2} variants={cuteReveal} initial="hidden" animate="visible"
            style={{
              fontSize: '18px',
              lineHeight: '1.65',
              color: 'var(--color-muted)',
              marginBottom: '40px',
              maxWidth: '580px',
              marginInline: 'auto',
            }}
          >
            Nail art studio dengan 500+ desain ready, gel polish premium, dan standar
            hygiene rumah sakit. Karena detail kecil bikin perbedaan besar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} variants={cuteReveal} initial="hidden" animate="visible"
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}
          >
            <a href="#catalog" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
              Lihat Desain
            </a>
            <a href="#booking" className="btn-secondary" style={{ fontSize: '15px', padding: '16px 32px' }}>
              Book Sekarang
            </a>
          </motion.div>

          {/* Social proof badges */}
          <motion.div
            custom={4} variants={cuteReveal} initial="hidden" animate="visible"
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {badges.map((b) => (
              <div
                key={b.text}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-surface-card)',
                  border: '1px solid var(--color-hairline)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-body-strong)',
                }}
              >
                {b.icon}
                {b.text}
              </div>
            ))}
          </motion.div>

        </div>

        {/* Hero image strip */}
        <motion.div
          custom={5} variants={cuteReveal} initial="hidden" animate="visible"
          style={{ marginTop: '64px' }}
        >
          <HeroImageStrip />
        </motion.div>
      </div>
    </section>
  );
}

function HeroImageStrip() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80', alt: 'Nail art floral detail', aspect: '3/4' },
    { src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80&crop=top', alt: 'Gel polish application', aspect: '3/4' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80&crop=entropy', alt: 'Minimalist nail art elegant', aspect: '3/4' },
    { src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80&crop=bottom', alt: 'Chrome nails detail', aspect: '3/4' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80&crop=center', alt: 'Nail studio ambiance', aspect: '16/9' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        maxWidth: '1000px',
        marginInline: 'auto',
      }}
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03, zIndex: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            borderRadius: i === 4 ? '16px' : '12px',
            overflow: 'hidden',
            aspectRatio: img.aspect,
            boxShadow: 'var(--shadow-card)',
            gridColumn: i === 4 ? 'span 2' : 'span 1',
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
