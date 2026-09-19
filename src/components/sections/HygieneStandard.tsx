import { motion, useReducedMotion } from 'framer-motion';
import { Check, Thermometer, ShieldCheck } from '@phosphor-icons/react';
import { imgProps } from '../../data/photos';

const checks = [
  { title: 'Autoclave 121°C',            desc: 'Semua tool metal disterilisasi untuk setiap klien, di depan matamu.' },
  { title: 'Barang sekali pakai',        desc: 'Buffer, file, dan tissue baru untuk setiap sesi, lalu dibuang.' },
  { title: 'Sarung tangan baru',         desc: 'Nail artist ganti sarung tangan tiap klien, tanpa terkecuali.' },
  { title: 'Disinfektan grade klinik',   desc: 'Meja dan alat didisinfeksi setiap selesai, sebelum klien berikutnya duduk.' },
];

export default function HygieneStandard() {
  const reduced = useReducedMotion();

  return (
    <section id="hygiene" className="section-rhythm hygiene-section" data-flavor="matcha">
      <div className="container-petale hygiene-grid">

        <div className="hygiene-visual">
          <div className="hygiene-photo photo-frame arch">
            <img {...imgProps('glovesBlue', 480, 620)} />
          </div>
          <div className="hygiene-photo-2 photo-frame">
            <img {...imgProps('toolsGloves', 240, 240)} />
          </div>
          <motion.div
            className="stamp"
            aria-hidden="true"
            initial={reduced ? false : { scale: 2.2, opacity: 0, rotate: -40 }}
            whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 }}
          >
            <Thermometer size={26} weight="fill" />
            <strong>STERIL</strong>
            <span>121°C</span>
          </motion.div>
        </div>

        <div className="hygiene-copy">
          <h2 className="display-lg">Bersih Bukan Bonus, Tapi Standar.</h2>
          <p className="lede">Kuku bersentuhan dengan banyak hal. Karena itu kebersihan kami mengikuti standar klinik, bukan salon biasa.</p>

          <ul className="check-list">
            {checks.map((c, i) => (
              <motion.li
                key={c.title}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ type: 'spring', stiffness: 280, damping: 22, delay: i * 0.1 }}
              >
                <motion.span
                  className="check-mark"
                  initial={reduced ? false : { scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 500, damping: 12, delay: 0.25 + i * 0.1 }}
                >
                  <Check size={18} weight="bold" />
                </motion.span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="hygiene-note"><ShieldCheck size={18} weight="fill" /> Mau lihat prosesnya langsung? Minta nail artist kami menunjukkan alatnya.</p>
        </div>

      </div>
    </section>
  );
}
