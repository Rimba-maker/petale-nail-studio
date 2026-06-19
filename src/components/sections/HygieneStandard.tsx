import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Microscope, Drop, ShieldCheck, Flask } from '@phosphor-icons/react';

const ICO = { size: 36, weight: 'light' as const, color: 'var(--color-rose)' };

const standards = [
  {
    icon: <Microscope {...ICO} />,
    title: 'Autoclave Sterilization 121°C',
    desc: 'Semua tool metal di-steril per klien menggunakan autoclave berstandar medis.',
  },
  {
    icon: <Drop {...ICO} />,
    title: 'Single-Use Items',
    desc: 'Buffer, file, dan tissue sekali pakai — tidak pernah di-recycle antar klien.',
  },
  {
    icon: <ShieldCheck {...ICO} />,
    title: 'Fresh Gloves Per Session',
    desc: 'Sarung tangan baru untuk setiap klien, tanpa kompromi.',
  },
  {
    icon: <Flask {...ICO} />,
    title: 'Hospital-Grade Disinfectant',
    desc: 'Meja & alat di-disinfect dengan produk klinik setelah setiap sesi.',
  },
];

export default function HygieneStandard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="hygiene"
      className="section-rhythm"
      style={{ backgroundColor: 'var(--color-surface-dark)' }}
    >
      <div className="container-petale" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--color-rose)',
            marginBottom: '12px',
          }}>
            Standar Kami
          </p>
          <h2
            className="display-md"
            style={{ color: 'var(--color-on-dark)', marginBottom: '16px' }}
          >
            Hygiene Bukan Pilihan,<br />Tapi Standar.
          </h2>
          <p style={{ color: 'var(--color-on-dark-soft)', maxWidth: '480px', marginInline: 'auto', lineHeight: '1.65' }}>
            Kami tahu kuku bersentuhan dengan banyak hal. Karena itu, hygiene kami mengikuti standar klinik — bukan salon biasa.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {standards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                boxShadow: `0 0 0 1px var(--color-rose), 0 8px 32px rgba(201,107,138,0.18)`,
              }}
              style={{
                backgroundColor: 'var(--color-surface-dark-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '32px',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.2s',
              }}
            >
              <motion.div
                style={{ marginBottom: '20px', display: 'flex' }}
                initial={{ rotate: 0 }}
                animate={inView ? { rotate: [0, 360] } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: 'easeOut' }}
              >
                {item.icon}
              </motion.div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontWeight: 400,
                color: 'var(--color-on-dark)',
                marginBottom: '10px',
                letterSpacing: '-0.2px',
                lineHeight: '1.3',
              }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--color-on-dark-soft)', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
