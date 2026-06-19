import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart } from '@phosphor-icons/react';

type Filter = 'All' | 'Minimalist' | 'French' | 'Chrome' | '3D' | 'Floral' | 'Abstract' | 'Seasonal' | 'Bridal';

interface Design {
  id: number;
  name: string;
  category: Exclude<Filter, 'All'>;
  src: string;
  service: string;
  tall?: boolean;
}

const BASE = 'https://images.unsplash.com';
const Q    = 'auto=format&fit=crop&q=80';

const designs: Design[] = [
  { id: 1,  name: 'Soft Latte',       category: 'Minimalist', src: `${BASE}/photo-1604654894610-df63bc536371?${Q}&w=400&h=530`,  service: 'Gel Polish Manicure', tall: true },
  { id: 2,  name: 'Baby French Tip',  category: 'French',     src: `${BASE}/photo-1604654894610-df63bc536371?${Q}&w=400&h=400&crop=entropy`, service: 'Gel Polish Manicure' },
  { id: 3,  name: 'Mirror Chrome',    category: 'Chrome',     src: `${BASE}/photo-1519014816548-bf5fe059798b?${Q}&w=400&h=530`,  service: '3D / Chrome / Foil', tall: true },
  { id: 4,  name: 'Velvet 3D Rose',   category: '3D',         src: `${BASE}/photo-1604654894610-df63bc536371?${Q}&w=400&h=400&crop=top`,    service: 'Detailed Art' },
  { id: 5,  name: 'Daisy Garden',     category: 'Floral',     src: `${BASE}/photo-1519014816548-bf5fe059798b?${Q}&w=400&h=530&crop=top`,    service: 'Detailed Art', tall: true },
  { id: 6,  name: 'Ink Abstract',     category: 'Abstract',   src: `${BASE}/photo-1604654894610-df63bc536371?${Q}&w=400&h=400&crop=bottom`, service: 'Full Custom Design' },
  { id: 7,  name: 'Winter Snowflake', category: 'Seasonal',   src: `${BASE}/photo-1519014816548-bf5fe059798b?${Q}&w=400&h=400`,             service: 'Detailed Art' },
  { id: 8,  name: 'Bridal Lace',      category: 'Bridal',     src: `${BASE}/photo-1604654894610-df63bc536371?${Q}&w=400&h=530&crop=faces`,  service: 'Full Custom Design', tall: true },
  { id: 9,  name: 'Nude Square',      category: 'Minimalist', src: `${BASE}/photo-1519014816548-bf5fe059798b?${Q}&w=400&h=400&crop=center`, service: 'Basic Manicure' },
  { id: 10, name: 'Classic French',   category: 'French',     src: `${BASE}/photo-1519014816548-bf5fe059798b?${Q}&w=400&h=530&crop=bottom`, service: 'Gel Polish Manicure', tall: true },
  { id: 11, name: 'Gold Foil',        category: 'Chrome',     src: `${BASE}/photo-1604654894610-df63bc536371?${Q}&w=400&h=400&crop=right`,  service: '3D / Chrome / Foil' },
  { id: 12, name: 'Cherry Blossom',   category: 'Floral',     src: `${BASE}/photo-1519014816548-bf5fe059798b?${Q}&w=400&h=400&crop=left`,   service: 'Detailed Art' },
];

const filters: Filter[] = ['All', 'Minimalist', 'French', 'Chrome', '3D', 'Floral', 'Abstract', 'Seasonal', 'Bridal'];

export default function DesignCatalog() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [lightbox, setLightbox] = useState<Design | null>(null);
  const reduced = useReducedMotion();

  const filtered = activeFilter === 'All' ? designs : designs.filter(d => d.category === activeFilter);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="catalog" className="section-rhythm" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="container-petale">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Lookbook</p>
          <h2 className="display-md" style={{ marginBottom: '12px' }}>Lookbook Petalé</h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '420px', marginInline: 'auto' }}>
            Browse 500+ desain. Bawa screenshot, kami recreate untukmu.
          </p>
        </div>

        {/* Filter chips — Pinterest style */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '40px',
        }}>
          {filters.map(f => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`chip${activeFilter === f ? ' active' : ''}`}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Masonry grid — Pinterest style, 8px gutters */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            style={{
              columns: 'var(--masonry-cols, 4)',
              columnGap: '10px',
            }}
            className="masonry-grid"
          >
            {filtered.map((design) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(design)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '10px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  aspectRatio: design.tall ? '3/4' : '1/1',
                  backgroundColor: 'var(--color-surface-card)',
                }}
                whileHover="hover"
              >
                <img
                  src={design.src}
                  alt={design.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Hover overlay */}
                <motion.div
                  variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                  initial="initial"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(20,20,19,0.72) 0%, transparent 55%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                  }}
                >
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{design.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '12px' }}>{design.service}</p>
                </motion.div>

                {/* Like button */}
                <button
                  onClick={(e) => toggleLike(design.id, e)}
                  aria-label={liked.has(design.id) ? 'Unlike' : 'Like'}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <motion.span
                    animate={{ scale: liked.has(design.id) ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      size={15}
                      weight={liked.has(design.id) ? 'fill' : 'regular'}
                      color={liked.has(design.id) ? 'var(--color-rose)' : 'var(--color-muted)'}
                    />
                  </motion.span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                backgroundColor: 'rgba(20,20,19,0.72)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <motion.div
                layoutId={`card-${lightbox.id}`}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  maxWidth: '480px',
                  width: '100%',
                  boxShadow: 'var(--shadow-modal)',
                }}
              >
                <img
                  src={lightbox.src.replace('w=400', 'w=800').replace('h=530', 'h=600').replace('h=400', 'h=600')}
                  alt={lightbox.name}
                  style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
                />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, marginBottom: '6px' }}>
                    {lightbox.name}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '14px', marginBottom: '20px' }}>
                    {lightbox.service} · {lightbox.category}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="#booking" className="btn-primary" onClick={() => setLightbox(null)}>
                      Book Design Ini
                    </a>
                    <button className="btn-secondary" onClick={() => setLightbox(null)}>
                      Tutup
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .masonry-grid {
          --masonry-cols: 4;
        }
        @media (max-width: 1024px) { .masonry-grid { --masonry-cols: 3; } }
        @media (max-width: 640px)  { .masonry-grid { --masonry-cols: 2; } }
      `}</style>
    </section>
  );
}
