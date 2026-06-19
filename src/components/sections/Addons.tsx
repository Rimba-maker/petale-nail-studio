import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Leaf, Shower, Flame, FlowerLotus } from '@phosphor-icons/react';

const ICO_DARK = { size: 36, weight: 'light' as const, color: 'rgba(255,255,255,0.9)' };
const ICO_LIGHT = { size: 36, weight: 'light' as const, color: 'var(--color-rose)' };

const addons = [
  {
    icon: (h: boolean) => <Leaf {...(h ? ICO_DARK : ICO_LIGHT)} />,
    name: 'Hand Spa',
    price: '+Rp 75k',
    desc: 'Scrub exfoliating, massage relaksasi, masker paraffin hangat untuk tangan lembut sempurna.',
    highlight: false,
  },
  {
    icon: (h: boolean) => <Shower {...(h ? ICO_DARK : ICO_LIGHT)} />,
    name: 'Foot Spa Deluxe',
    price: '+Rp 100k',
    desc: 'Foot soak aromaterapi, scrub, callus removal, hingga massage panjang yang bikin kaki ringan.',
    highlight: true,
  },
  {
    icon: (h: boolean) => <Flame {...(h ? ICO_DARK : ICO_LIGHT)} />,
    name: 'Paraffin Treatment',
    price: '+Rp 50k',
    desc: 'Mandi lilin paraffin hangat untuk hidrasi maksimal — kulit tangan & kaki jadi baby soft.',
    highlight: false,
  },
  {
    icon: (h: boolean) => <FlowerLotus {...(h ? ICO_DARK : ICO_LIGHT)} />,
    name: 'Bridal Trial Package',
    price: 'Rp 750k',
    desc: 'Konsultasi mendalam + 2 trial design untuk hari pernikahanmu. Termasuk hand spa premium.',
    highlight: false,
  },
];

function TiltCard({ children, highlight }: { children: React.ReactNode; highlight: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        backgroundColor: highlight ? 'var(--color-rose)' : 'var(--color-canvas)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        border: highlight ? 'none' : '1px solid var(--color-hairline)',
        boxShadow: 'var(--shadow-card)',
        cursor: 'default',
      }}
      whileHover={{ boxShadow: 'var(--shadow-hover)' }}
    >
      {children}
    </motion.div>
  );
}

export default function Addons() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="addons" className="section-rhythm" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container-petale" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <p className="section-label" style={{ marginBottom: '12px' }}>Add-ons</p>
          <h2 className="display-md" style={{ marginBottom: '12px' }}>Make It Extra Special</h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '400px', marginInline: 'auto' }}>
            Lengkapi sesi kamu dengan perawatan ekstra yang bikin pengalaman makin bermakna.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          perspective: '1200px',
        }}>
          {addons.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard highlight={item.highlight}>
                <div style={{ marginBottom: '20px', lineHeight: 1, display: 'flex' }}>{item.icon(item.highlight)}</div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '19px',
                  fontWeight: 400,
                  color: item.highlight ? '#fff' : 'var(--color-ink)',
                  marginBottom: '10px',
                  letterSpacing: '-0.2px',
                }}>
                  {item.name}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: item.highlight ? 'rgba(255,255,255,0.82)' : 'var(--color-muted)',
                  lineHeight: '1.65',
                  marginBottom: '24px',
                }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <motion.span
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 500,
                      color: item.highlight ? '#fff' : 'var(--color-rose)',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {item.price}
                  </motion.span>
                  <a
                    href="#booking"
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: item.highlight ? '#fff' : 'var(--color-rose)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Tambahkan →
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
