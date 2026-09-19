import { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Confetti, Sparkle, ArrowRight, ArrowLeft, CaretDown } from '@phosphor-icons/react';
import { imgProps } from '../../data/photos';

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

const empty: FormData = { branch: '', service: '', date: '', artist: '', name: '', phone: '' };

export default function BookCTA() {
  const reduced = useReducedMotion();
  const uid = useId();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>(empty);

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

    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 140,
        spread: 90,
        colors: ['#f2789f', '#c9b6f2', '#a9ddb8', '#ffcf5c', '#ffdde8', '#4a2333'],
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
    } catch {
      // silently fail if confetti unavailable
    }
  };

  const slide = {
    enter:  { opacity: 0, x: reduced ? 0 : 40 },
    center: { opacity: 1, x: 0 },
    exit:   { opacity: 0, x: reduced ? 0 : -40 },
  };

  return (
    <section id="booking" className="section-rhythm book-section pearls" data-flavor="strawberry" style={{ '--surface': 'var(--color-blush)' } as React.CSSProperties}>
      <div className="container-petale book-grid">

        <div className="book-visual">
          <div className="book-photo photo-frame arch"><img {...imgProps('milkOmbre', 460, 600)} /></div>
          <div className="book-bottles photo-frame"><img {...imgProps('dripBottles', 200, 200)} /></div>
          <span className="sticker book-sticker" style={{ '--sticker': 'var(--color-mango)', '--r': '-7deg' } as React.CSSProperties}>
            <Sparkle size={14} weight="fill" /> Slot cepat habis!
          </span>
        </div>

        <div className="book-main">
          <div className="section-head">
            <h2 className="display-lg">Slot Cepat Habis, Book Dulu Yuk!</h2>
            <p className="lede">Isi tiga langkah kecil ini, kami lanjut konfirmasi lewat WhatsApp.</p>
          </div>

          {!submitted && (
            <div className="pearl-steps" role="img" aria-label={`Langkah ${step} dari 3`}>
              {([1, 2, 3] as Step[]).map(s => (
                <motion.span
                  key={s}
                  className={`pearl${step >= s ? ' filled' : ''}`}
                  animate={{ scale: step === s ? 1.25 : 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                />
              ))}
              <span className="pearl-text">Langkah {step} / 3</span>
            </div>
          )}

          <div className="order-slip">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="slip-success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                >
                  <Confetti size={64} weight="fill" color="var(--color-rose-ink)" />
                  <h3 className="display-md">Yeay, hampir selesai!</h3>
                  <p>Cek WhatsApp kamu. Tim Petalé akan segera konfirmasi slot-mu.</p>
                  <button type="button" className="btn-primary" onClick={() => { setSubmitted(false); setStep(1); setForm(empty); }}>
                    Book lagi
                  </button>
                </motion.div>
              ) : step === 1 ? (
                <motion.div key="step1" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <fieldset className="field-group">
                    <legend>Pilih cabang</legend>
                    <OptionGrid options={branches} value={form.branch} onSelect={v => update('branch', v)} />
                  </fieldset>

                  <div className="field">
                    <label htmlFor={`${uid}-service`}>Pilih layanan</label>
                    <div className="select-wrap">
                      <select id={`${uid}-service`} value={form.service} onChange={e => update('service', e.target.value)}>
                        <option value="">Pilih layanan...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <CaretDown size={18} weight="bold" className="select-caret" aria-hidden="true" />
                    </div>
                  </div>

                  <button type="button" className="btn-primary slip-btn" disabled={!canNext1} onClick={() => setStep(2)}>
                    Lanjut <ArrowRight size={16} weight="bold" />
                  </button>
                </motion.div>
              ) : step === 2 ? (
                <motion.div key="step2" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="field">
                    <label htmlFor={`${uid}-date`}>Pilih tanggal</label>
                    <input
                      id={`${uid}-date`}
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => update('date', e.target.value)}
                    />
                  </div>

                  <fieldset className="field-group">
                    <legend>Nail artist (opsional)</legend>
                    <OptionGrid options={artists} value={form.artist} onSelect={v => update('artist', v)} cols={2} />
                  </fieldset>

                  <div className="slip-actions">
                    <button type="button" className="btn-secondary" onClick={() => setStep(1)}><ArrowLeft size={16} weight="bold" /> Kembali</button>
                    <button type="button" className="btn-primary" disabled={!canNext2} onClick={() => setStep(3)}>Lanjut <ArrowRight size={16} weight="bold" /></button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step3" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="field">
                    <label htmlFor={`${uid}-name`}>Nama kamu</label>
                    <input id={`${uid}-name`} type="text" autoComplete="name" placeholder="Nama lengkap" value={form.name} onChange={e => update('name', e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor={`${uid}-phone`}>No. WhatsApp</label>
                    <input id={`${uid}-phone`} type="tel" inputMode="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" value={form.phone} onChange={e => update('phone', e.target.value)} />
                  </div>

                  <div className="slip-summary">
                    <strong>Ringkasan pesanan</strong>
                    <span>{form.branch} · {form.service}</span>
                    <span>{form.date} · {form.artist || 'Siapa saja'}</span>
                  </div>

                  <div className="slip-actions">
                    <button type="button" className="btn-secondary" onClick={() => setStep(2)}><ArrowLeft size={16} weight="bold" /> Kembali</button>
                    <button type="button" className="btn-primary" disabled={!canSubmit} onClick={handleSubmit}>
                      <Sparkle size={16} weight="fill" /> Book via WhatsApp
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

function OptionGrid({ options, value, onSelect, cols = 3 }: {
  options: string[]; value: string; onSelect: (v: string) => void; cols?: number;
}) {
  return (
    <div className="option-grid" style={{ '--cols': cols } as React.CSSProperties}>
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className={`option${value === opt ? ' selected' : ''}`}
          aria-pressed={value === opt}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
