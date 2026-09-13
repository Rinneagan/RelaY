import React from 'react';
import { X, Crown, Sparkles, Zap, DownloadCloud, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onTogglePremium: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  onTogglePremium,
}) => {
  if (!isOpen) return null;

  const handleActivate = () => {
    onTogglePremium();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0A2540 0%, #0056D2 100%)',
            color: '#FFF',
            padding: '28px 32px',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 184, 0, 0.2)',
              border: '1px solid #FFB800',
              color: '#FFD700',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 800,
              marginBottom: '12px'
            }}
          >
            <Crown size={14} />
            RELAY TEK PREMIUM
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Ace your KNUST courses with unlimited study power
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Join thousands of KNUST students unlocking top marks and high CWA every semester.
          </p>
        </div>

        <div className="modal-body" style={{ padding: '28px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '8px', color: '#0056D2' }}>
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Instant Full Access</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Unlock all KNUST lecture slides, past questions (pasco), and formula sheets without waiting.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#F3E8FF', padding: '8px', borderRadius: '8px', color: '#7C3AED' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>RelaY AI Study Suite</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Unlimited AI summaries, interactive quiz generation, and live 24/7 AI tutor chat.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '8px', color: '#059669' }}>
                <DownloadCloud size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Offline Downloads & Print</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Save high-resolution original PDFs for offline studying during finals.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#FFFBEB', padding: '8px', borderRadius: '8px', color: '#D97706' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Ad-Free Experience</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Zero distractions, zero interruptions while preparing for exams.
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#F8FAFC',
              border: '2px solid #E2E8F0',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--primary-dark)' }}>
                  Semester Pass (Unlimited)
                </span>
                <span style={{ background: '#DEF7EC', color: '#03543F', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                  MOST POPULAR
                </span>
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Full access to all course documents & AI tools
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>$4.99<span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span></div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Billed semiannually</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleActivate}
              style={{
                flex: 1,
                background: isPremium ? '#DC2626' : 'var(--primary)',
                color: '#FFF',
                border: 'none',
                padding: '14px 24px',
                borderRadius: 'var(--radius-full)',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 86, 210, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              {isPremium ? 'Cancel Premium Subscription' : 'Start 30-Day Free Trial'}
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '14px 20px',
                background: 'transparent',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
