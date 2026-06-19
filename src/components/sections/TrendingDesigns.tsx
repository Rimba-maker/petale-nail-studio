import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const B = 'https://images.unsplash.com';
const Q = 'auto=format&fit=crop&q=80&w=400';

const trending = [
  { id: 1, name: 'Glazed Donut',  tag: '#glazeddonut',  src: `${B}/photo-1604654894610-df63bc536371?${Q}&h=530`,              service: 'Chrome / Foil' },
  { id: 2, name: 'Soft Minimal',  tag: '#softminimal',  src: `${B}/photo-1604654894610-df63bc536371?${Q}&h=530&crop=entropy`, service: 'Basic Manicure' },
  { id: 3, name: 'Y2K Chrome',    tag: '#y2kchrome',    src: `${B}/photo-1519014816548-bf5fe059798b?${Q}&h=530`,              service: '3D / Chrome' },
  { id: 4, name: 'Vanilla Latte', tag: '#vanillalatte', src: `${B}/photo-1519014816548-bf5fe059798b?${Q}&h=530&crop=top`,     service: 'Gel Polish' },
  { id: 5, name: 'Blush French',  tag: '#blushfrench',  src: `${B}/photo-1604654894610-df63bc536371?${Q}&h=530&crop=top`,    service: 'Gel Polish' },
  { id: 6, name: '3D Jelly',      tag: '#3djelly',      src: `${B}/photo-1604654894610-df63bc536371?${Q}&h=530&crop=bottom`, service: '3D Art' },
  { id: 7, name: 'Marble Swirl',  tag: '#marbleswirl',  src: `${B}/photo-1519014816548-bf5fe059798b?${Q}&h=530&crop=center`, service: 'Detailed Art' },
  { id: 8, name: 'Sakura Garden', tag: '#sakuragarden', src: `${B}/photo-1519014816548-bf5fe059798b?${Q}&h=530&crop=bottom`, service: 'Floral Art' },
];

export default function TrendingDesigns() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.6;

    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current -= speed;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const doubled = [...trending, ...trending];

  return (
    <section
      id="trending"
      className="section-rhythm"
      style={{ backgroundColor: 'var(--color-surface-soft)', overflow: 'hidden' }}
    >
      <div className="container-petale" style={{ marginBottom: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Trending</p>
          <h2 className="display-md">Trending Bulan Ini</h2>
        </div>
      </div>

      {/* Carousel */}
      <div
        style={{ overflow: 'hidden', cursor: 'grab' }}
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
      >
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: '16px', width: 'max-content', paddingInline: '24px' }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              style={{
                flexShrink: 0,
                width: '240px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-canvas)',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
              }}
            >
              <div style={{ aspectRatio: '3/4', position: 'relative' }}>
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Trending pulse tag */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--color-rose)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                  }}
                >
                  Trending
                </motion.div>
              </div>

              <div style={{ padding: '16px' }}>
                <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '2px' }}>
                  {item.name}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-rose)', fontWeight: 500, marginBottom: '12px' }}>
                  {item.tag}
                </p>
                <a
                  href="#booking"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '8px 0',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-rose-light)',
                    color: 'var(--color-rose-deep)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-rose)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-rose-light)')}
                  onClick={e => (e.currentTarget.style.color = '#fff')}
                >
                  Quick Book
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
