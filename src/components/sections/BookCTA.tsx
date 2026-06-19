import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Confetti, Sparkle } from '@phosphor-icons/react';

type Step = 1 | 2 | 3;

const branches = ['Petalé Senayan', 'Petalé Kuningan', 'Petalé Surabaya'];
const services = [
  'Basic Manicure', 'Gel Polish Manicure', 'Acrylic Extension', 'BIAB / Builder Gel',
  'Basic Pedicure', 'Spa Pedicure', 'Gel Pedicure',
  'Simple Art', 'Detailed Art', '3D / Chrome / Foil', 'Full Custom Design',
];
const artists = ['Siapa saja (first available)', 'Nindi', 'Sasha', 'Lia', 'Kezia'];

interface FormData {
  branch: string;
  service: string;
  date: string;
  artist: string;
  name: string;
  phone: string;
}

export default function BookCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    branch: '', service: '', date: '', artist: '', name: '', phone: '',
  });

  const update = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const canNext1 = form.branch && form.service;
  const canNext2 = form.date;
  const canSubmit = form.name && form.phone;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const msg = encodeURIComponent(
      `Halo Petalé! Saya mau booking:\n\n` +
      `📍 Cabang: ${form.branch}\n` +
      `💅 Service: ${form.service}\n` +
      `📅 Tanggal: ${form.date}\n` +
      `👤 Nail Artist: ${form.artist || 'Siapa saja'}\n` +
      `👩 Nama: ${form.name}\n` +
      `📱 No. HP: ${form.phone}`
    );
    window.open(`https://wa.me/6281200010001?text=${msg}`, '_blank');
    setSubmitted(true);

    // Confetti
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 120,
        spread: 80,
        colors: ['#c96b8a', '#f7e2ec', '#faf9f5', '#ad5474', '#efe9de'],
        origin: { y: 0.6 },
      });
    } catch {
      // silently fail if confetti unavailable
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit:  { opacity: 0, x: -40 },
  };

  return (
    <section
      id="booking"
      className="section-rhythm"
      style={{ backgroundColor: 'var(--color-surface-dark)' }}
    >
      <div className="container-petale" ref={ref}>
        <div style={{ maxWidth: '560px', marginInline: 'auto' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <p style={{
              fontSize: '12px', fontWeight: 500, letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--color-rose)', marginBottom: '12px',
            }}>
              Booking
            </p>
            <h2 className="display-md" style={{ color: 'var(--color-on-dark)', marginBottom: '12px' }}>
              Slot Cepat Habis,<br />Book Dulu Yuk!
            </h2>
            <p style={{ color: 'var(--color-on-dark-soft)', fontSize: '15px' }}>
              Isi form di bawah, kami follow up via WhatsApp.
            </p>
          </motion.div>

          {/* Step indicator */}
          {!submitted && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
              {([1, 2, 3] as Step[]).map(s => (
                <div
                  key={s}
                  style={{
                    height: '4px',
                    flex: 1,
                    borderRadius: '9999px',
                    backgroundColor: step >= s ? 'var(--color-rose)' : 'rgba(255,255,255,0.12)',
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </div>
          )}

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: 'var(--shadow-modal)',
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '16px 0' }}
                >
                  <div style={{ marginBottom: '16px', color: 'var(--color-rose)' }}>
                    <Confetti size={56} weight="light" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, marginBottom: '8px' }}>
                    Yeay, hampir selesai!
                  </h3>
                  <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>
                    Cek WhatsApp kamu — tim Petalé akan segera konfirmasi slot-mu.
                  </p>
                  <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(1); setForm({ branch:'',service:'',date:'',artist:'',name:'',phone:'' }); }}>
                    Book Lagi
                  </button>
                </motion.div>
              ) : step === 1 ? (
                <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <FormLabel>Pilih Cabang</FormLabel>
                  <SelectGrid options={brands} value={form.branch} onSelect={v => update('branch', v)} />

                  <FormLabel style={{ marginTop: '24px' }}>Pilih Service</FormLabel>
                  <select
                    value={form.service}
                    onChange={e => update('service', e.target.value)}
                    style={selectStyle}
                  >
                    <option value="">Pilih service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <button
                    className="btn-primary"
                    disabled={!canNext1}
                    onClick={() => setStep(2)}
                    style={{ width: '100%', justifyContent: 'center', marginTop: '24px', opacity: canNext1 ? 1 : 0.45 }}
                  >
                    Lanjut →
                  </button>
                </motion.div>
              ) : step === 2 ? (
                <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <FormLabel>Pilih Tanggal</FormLabel>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => update('date', e.target.value)}
                    style={selectStyle}
                  />

                  <FormLabel style={{ marginTop: '24px' }}>Nail Artist (opsional)</FormLabel>
                  <SelectGrid options={artists} value={form.artist} onSelect={v => update('artist', v)} cols={2} />

                  <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                    <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>
                      ← Kembali
                    </button>
                    <button
                      className="btn-primary"
                      disabled={!canNext2}
                      onClick={() => setStep(3)}
                      style={{ flex: 1, justifyContent: 'center', opacity: canNext2 ? 1 : 0.45 }}
                    >
                      Lanjut →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <FormLabel>Nama Kamu</FormLabel>
                  <input
                    type="text"
                    placeholder="Nama lengkap..."
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    style={selectStyle}
                  />

                  <FormLabel style={{ marginTop: '16px' }}>No. WhatsApp</FormLabel>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    style={selectStyle}
                  />

                  <div style={{
                    backgroundColor: 'var(--color-surface-card)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginTop: '20px',
                    fontSize: '13px',
                    color: 'var(--color-muted)',
                    lineHeight: '1.6',
                  }}>
                    <strong style={{ color: 'var(--color-ink)' }}>Ringkasan</strong><br />
                    {form.branch} · {form.service}<br />
                    {form.date} · {form.artist || 'Siapa saja'}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1, justifyContent: 'center' }}>
                      ← Kembali
                    </button>
                    <button
                      className="btn-primary"
                      disabled={!canSubmit}
                      onClick={handleSubmit}
                      style={{ flex: 2, justifyContent: 'center', opacity: canSubmit ? 1 : 0.45 }}
                    >
                      <Sparkle size={15} weight="fill" /> Book via WhatsApp
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const brands = ['Petalé Senayan', 'Petalé Kuningan', 'Petalé Surabaya'];

function FormLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '8px', ...style }}>
      {children}
    </p>
  );
}

function SelectGrid({ options, value, onSelect, cols = 3 }: {
  options: string[]; value: string; onSelect: (v: string) => void; cols?: number;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '8px' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          style={{
            padding: '10px 8px',
            borderRadius: '10px',
            border: `1.5px solid ${value === opt ? 'var(--color-rose)' : 'var(--color-hairline)'}`,
            backgroundColor: value === opt ? 'var(--color-rose-light)' : 'var(--color-canvas)',
            color: value === opt ? 'var(--color-rose-deep)' : 'var(--color-body)',
            fontSize: '13px',
            fontWeight: value === opt ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.15s',
            textAlign: 'center',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  border: '1.5px solid var(--color-hairline)',
  backgroundColor: 'var(--color-canvas)',
  color: 'var(--color-ink)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer',
};
