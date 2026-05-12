'use client'

import Link from 'next/link'
import WellnessFeed from "./components/home/WellnessFeed";

/* ── Whisper card data ── */
const whispers = [
  { color: '#50C9C3', text: '"Finally a place where I could talk about my anxiety without being judged."', time: '2h ago' },
  { color: '#4A90E2', text: '"The community responses helped me feel less alone."', time: '5h ago' },
  { color: '#9B8FD6', text: '"No sign-up, no pressure. Just support when I needed it most."', time: '8h ago' },
]

export default function HomePage() {
  return (
    <>
      {/* Google Fonts — add to your layout.tsx <head> instead if preferred */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500&display=swap');

        /* orbit keyframes */
        @keyframes spinCW  { to { transform: rotate(360deg);  } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }

        /* fade up entrance */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ambient orb drift */
        @keyframes drift {
          from { transform: translate(0, 0) scale(1);       }
          to   { transform: translate(18px, 22px) scale(1.06); }
        }

        /* anon dot blink */
        @keyframes blink {
          0%, 100% { opacity: 1;    transform: scale(1);    }
          50%       { opacity: 0.45; transform: scale(0.8); }
        }

        /* underline sweep on accent word */
        @keyframes sweepIn { to { transform: scaleX(1); } }

        /* floating whisper cards */
        @keyframes float1 {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0);  }
          50%       { transform: translateY(6px); }
        }

        /* orbit groups */
        .orbit-cw-fast  { animation: spinCW  14s linear infinite; transform-box: fill-box; transform-origin: center; }
        .orbit-ccw-mid  { animation: spinCCW 20s linear infinite; transform-box: fill-box; transform-origin: center; }
        .orbit-cw-slow  { animation: spinCW  26s linear infinite; transform-box: fill-box; transform-origin: center; }
        .orbit-ccw-fast { animation: spinCCW 14s linear infinite; transform-box: fill-box; transform-origin: center; }
        .orbit-cw-mid   { animation: spinCW  20s linear infinite; transform-box: fill-box; transform-origin: center; }
        .orbit-ccw-slow { animation: spinCCW 26s linear infinite; transform-box: fill-box; transform-origin: center; }

        /* accent underline */
        .accent-word { position: relative; display: inline-block; }
        .accent-word::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px;
          width: 100%; height: 2.5px;
          background: linear-gradient(90deg, #4A90E2, #50C9C3);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          animation: sweepIn 1s 0.8s ease forwards;
        }
      `}</style>

      <main
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: '#F7F9FD',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Ambient background orbs ── */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          filter: 'blur(70px)', pointerEvents: 'none',
          width: 380, height: 380,
          background: 'rgba(74,144,226,0.10)',
          top: -100, right: -80,
          animation: 'drift 9s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', borderRadius: '50%',
          filter: 'blur(70px)', pointerEvents: 'none',
          width: 280, height: 280,
          background: 'rgba(80,201,195,0.09)',
          bottom: -60, left: -60,
          animation: 'drift 9s 2.5s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', borderRadius: '50%',
          filter: 'blur(70px)', pointerEvents: 'none',
          width: 200, height: 200,
          background: 'rgba(155,143,214,0.09)',
          top: '50%', left: '40%',
          animation: 'drift 9s 4s ease-in-out infinite alternate',
        }} />

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <section
          style={{
            position: 'relative', zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '52px 20px 0',
          }}
        >
          {/* Anonymous pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(74,144,226,0.10)',
            border: '1px solid rgba(74,144,226,0.22)',
            borderRadius: 999, padding: '6px 16px',
            fontSize: 12, color: '#4A90E2', letterSpacing: '0.4px',
            marginBottom: 36,
            animation: 'fadeUp 0.6s ease both',
          }}>
            {/* pulsing dot */}
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#50C9C3', display: 'inline-block',
              animation: 'blink 2.2s ease-in-out infinite',
            }} />
            You are completely anonymous here
          </div>

          {/* ── HEADLINE ROW with side orbital rings ── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 0, marginBottom: 10, width: '100%', maxWidth: 700,
            animation: 'fadeUp 0.6s 0.1s ease both',
          }}>

            {/* LEFT ring */}
            <RingLeft />

            {/* Headline text */}
            <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(30px, 5.5vw, 46px)',
                color: '#1F2933', lineHeight: 1.15, display: 'block',
              }}>
                A safe place to
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(30px, 5.5vw, 46px)',
                color: '#1F2933', lineHeight: 1.15, display: 'block',
              }}>
                <span
                  className="accent-word"
                  style={{ color: '#4A90E2', fontStyle: 'italic' }}
                >
                  speak freely.
                </span>
              </span>
            </div>

            {/* RIGHT ring */}
            <RingRight />

          </div>

          {/* Subtext */}
          <p style={{
            fontSize: 15, color: '#6B7280',
            textAlign: 'center', maxWidth: 400, lineHeight: 1.7,
            margin: '18px auto 32px',
            animation: 'fadeUp 0.6s 0.2s ease both',
          }}>
            Share what&apos;s on your mind — without your name, without judgment, without fear.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            justifyContent: 'center',
            animation: 'fadeUp 0.6s 0.3s ease both',
            marginBottom: 44,
          }}>
            <Link href="/share?type=public" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#4A90E2', color: '#fff',
              border: 'none', borderRadius: 14,
              padding: '12px 22px', fontSize: 14,
              fontFamily: "'Outfit', sans-serif", fontWeight: 500,
              textDecoration: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}>
              <GlobeSmIcon />
              Share with community
            </Link>

            <Link href="/share?type=private" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.85)', color: '#1F2933',
              border: '1px solid rgba(74,144,226,0.22)',
              borderRadius: 14, padding: '12px 22px', fontSize: 14,
              fontFamily: "'Outfit', sans-serif", fontWeight: 500,
              textDecoration: 'none', backdropFilter: 'blur(8px)',
              transition: 'transform 0.15s, background 0.15s',
            }}>
              <LockSmIcon />
              Get private support
            </Link>
          </div>

          {/* Floating whisper cards */}
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.6s 0.45s ease both',
            marginBottom: 44, padding: '0 16px',
          }}>
            {whispers.map((w, i) => (
              <WhisperCard key={i} {...w} index={i} />
            ))}
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex', gap: 8, justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.6s 0.5s ease both',
            marginBottom: 52,
          }}>
            <TrustBadge icon={<ShieldIcon />} label="Anonymous session" />
            <TrustBadge icon={<ClockIcon />}  label="Posts expire in 14 days" />
            <TrustBadge icon={<LockIcon />}   label="Data not stored" />
          </div>
        </section>

        {/*======================== 
        Wellness Feed 
        ============================*/}
        <WellnessFeed/>

        {/* ══════════════════════════════════════
            HOW IT WORKS SECTION
        ══════════════════════════════════════ */}
        <section style={{
          background: '#EEF3FC',
          padding: '48px 20px 56px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 26, textAlign: 'center',
              color: '#1F2933', margin: '0 0 6px',
            }}>
              How Secure Talk works
            </h2>
            <p style={{
              textAlign: 'center', color: '#6B7280',
              fontSize: 14, marginBottom: 32,
            }}>
              A simple, safe process designed to help you open up.
            </p>

            <div style={{
              // display: 'grid',
              // gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 14, marginBottom: 32,
            }}>
              <StepCard
                iconBg="rgba(74,144,226,0.10)"
                icon={<StepBulbIcon />}
                title="Share freely"
                desc="Express what's on your mind without revealing your identity."
              />
              <StepCard
                iconBg="rgba(80,201,195,0.10)"
                icon={<StepLockIcon />}
                title="Choose privacy"
                desc="Decide if your post is public or private to a counsellor."
              />
              <StepCard
                iconBg="rgba(155,143,214,0.10)"
                icon={<StepChatIcon />}
                title="Get support"
                desc="Receive thoughtful responses from the community."
              />
              <StepCard
                iconBg="rgba(76,175,80,0.10)"
                icon={<StepLeafIcon />}
                title="Feel heard"
                desc="You don't have to carry everything alone."
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/share" style={{
                display: 'inline-block',
                background: '#4A90E2', color: '#fff',
                borderRadius: 16, padding: '14px 36px',
                fontSize: 15, fontWeight: 500,
                fontFamily: "'Outfit', sans-serif",
                textDecoration: 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}>
                Start sharing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

/* ══════════════════════════════════════════
   ORBITAL RING — LEFT
   Heart icon at core, CW inner / CCW mid / CW outer
══════════════════════════════════════════ */
function RingLeft() {
  return (
    <div style={{ flexShrink: 0, position: 'relative', width: 110, height: 110 }}>
      <svg
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* Outermost orbit — slow CW */}
        <g className="orbit-cw-slow" style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="50" stroke="rgba(155,143,214,0.18)" strokeWidth="0.8" strokeDasharray="3 5" />
          <circle cx="55" cy="5"  r="4"   fill="#9B8FD6" opacity="0.6" />
          <circle cx="105" cy="55" r="3.5" fill="#9B8FD6" opacity="0.4" />
          <circle cx="20" cy="95" r="4"   fill="#9B8FD6" opacity="0.55" />
        </g>

        {/* Mid orbit — CCW */}
        <g className="orbit-ccw-mid" style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="36" stroke="rgba(80,201,195,0.22)" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="55" cy="19" r="4.5" fill="#50C9C3" opacity="0.75" />
          <circle cx="91" cy="55" r="3.5" fill="#50C9C3" opacity="0.5" />
          <circle cx="30" cy="82" r="4"   fill="#50C9C3" opacity="0.65" />
        </g>

        {/* Inner orbit — fast CW */}
        <g className="orbit-cw-fast" style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="22" stroke="rgba(74,144,226,0.25)" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="55" cy="33" r="4"   fill="#4A90E2" opacity="0.85" />
          <circle cx="77" cy="55" r="3.5" fill="#4A90E2" opacity="0.6" />
          <circle cx="55" cy="77" r="4"   fill="#4A90E2" opacity="0.75" />
          <circle cx="33" cy="55" r="3.5" fill="#4A90E2" opacity="0.55" />
        </g>

        {/* Core circle */}
        <circle cx="55" cy="55" r="13" fill="white" opacity="0.95" />
        <circle cx="55" cy="55" r="13" stroke="rgba(74,144,226,0.18)" strokeWidth="0.8" />

        {/* Heart icon */}
        <path
          d="M55 61 C55 61 48 56.5 48 52.5 C48 49.8 50.2 48 52.5 48.8 C53.7 49.2 55 51 55 51 C55 51 56.3 49.2 57.5 48.8 C59.8 48 62 49.8 62 52.5 C62 56.5 55 61 55 61Z"
          fill="rgba(74,144,226,0.15)"
          stroke="#4A90E2"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Pulse ring */}
        <circle cx="55" cy="55" r="17" stroke="rgba(74,144,226,0.12)" strokeWidth="1.5">
          <animate attributeName="r"       values="17;24;17" dur="3s"   repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3s"  repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════
   ORBITAL RING — RIGHT
   Shield/check icon at core, CCW inner / CW mid / CCW outer
══════════════════════════════════════════ */
function RingRight() {
  return (
    <div style={{ flexShrink: 0, position: 'relative', width: 110, height: 110 }}>
      <svg
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* Outermost orbit — slow CCW */}
        <g className="orbit-ccw-slow" style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="50" stroke="rgba(155,143,214,0.18)" strokeWidth="0.8" strokeDasharray="3 5" />
          <circle cx="55" cy="5"  r="4"   fill="#9B8FD6" opacity="0.55" />
          <circle cx="5"  cy="55" r="3.5" fill="#9B8FD6" opacity="0.4" />
          <circle cx="88" cy="92" r="4"   fill="#9B8FD6" opacity="0.6" />
        </g>

        {/* Mid orbit — CW */}
        <g className="orbit-cw-mid" style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="36" stroke="rgba(80,201,195,0.22)" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="55" cy="19" r="4.5" fill="#50C9C3" opacity="0.65" />
          <circle cx="19" cy="55" r="3.5" fill="#50C9C3" opacity="0.5" />
          <circle cx="78" cy="84" r="4"   fill="#50C9C3" opacity="0.75" />
        </g>

        {/* Inner orbit — fast CCW */}
        <g className="orbit-ccw-fast" style={{ transformOrigin: '55px 55px' }}>
          <circle cx="55" cy="55" r="22" stroke="rgba(74,144,226,0.25)" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="55" cy="33" r="4"   fill="#4A90E2" opacity="0.75" />
          <circle cx="33" cy="55" r="3.5" fill="#4A90E2" opacity="0.55" />
          <circle cx="55" cy="77" r="4"   fill="#4A90E2" opacity="0.85" />
          <circle cx="77" cy="55" r="3.5" fill="#4A90E2" opacity="0.6" />
        </g>

        {/* Core circle */}
        <circle cx="55" cy="55" r="13" fill="white" opacity="0.95" />
        <circle cx="55" cy="55" r="13" stroke="rgba(74,144,226,0.18)" strokeWidth="0.8" />

        {/* Shield + check icon */}
        <path
          d="M55 48 L49 50.8v3.2c0 2.8 2.5 5 6 5.6 3.5-.6 6-2.8 6-5.6v-3.2L55 48z"
          fill="rgba(76,175,80,0.15)"
          stroke="#4CAF50"
          strokeWidth="1.1"
        />
        <path
          d="M52.5 54l2 2 3.5-2.8"
          stroke="#4CAF50"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pulse ring */}
        <circle cx="55" cy="55" r="17" stroke="rgba(80,201,195,0.12)" strokeWidth="1.5">
          <animate attributeName="r"       values="17;24;17"  dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

/* ── Whisper Card ── */
function WhisperCard({ color, text, time, index }: { color: string; text: string; time: string; index: number }) {
  const animations = ['float1 6s ease-in-out infinite', 'float2 7s 0.8s ease-in-out infinite', 'float1 8s 1.6s ease-in-out infinite']
  return (
    <div style={{
      background: 'rgba(255,255,255,0.88)',
      border: '1px solid rgba(229,231,235,0.85)',
      borderRadius: 18, padding: '12px 15px',
      maxWidth: 190,
      fontSize: 11.5, color: '#6B7280',
      fontStyle: 'italic', lineHeight: 1.55,
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
      animation: animations[index] ?? animations[0],
    }}>
      <span style={{
        display: 'inline-block', width: 6, height: 6,
        borderRadius: '50%', background: color,
        marginRight: 4, verticalAlign: 'middle', marginBottom: 6,
      }} />
      {text}
      <div style={{ fontSize: 10, color: '#9CA3AF', fontStyle: 'normal', marginTop: 5 }}>
        Anonymous · {time}
      </div>
    </div>
  )
}

/* ── Step Card ── */
function StepCard({ iconBg, icon, title, desc }: { iconBg: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20,
      padding: '20px 16px', textAlign: 'center',
      border: '1px solid rgba(229,231,235,0.9)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 13,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: iconBg, margin: '0 auto 13px',
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 13.5, fontWeight: 500, color: '#1F2933', marginBottom: 5 }}>{title}</h3>
      <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6 }}>{desc}</p>
    </div>
  )
}

/* ── Trust Badge ── */
function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'rgba(255,255,255,0.8)',
      border: '1px solid rgba(229,231,235,0.9)',
      borderRadius: 999, padding: '6px 14px',
      fontSize: 11.5, color: '#6B7280',
      backdropFilter: 'blur(6px)',
    }}>
      {icon}{label}
    </span>
  )
}

/* ══════════════════════════════════════ ICONS ══════════════════════════════════════ */

function GlobeSmIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="1.3" />
      <path d="M7.5 1.5a6 6 0 010 12M7.5 1.5a6 6 0 000 12" stroke="white" strokeWidth="0.9" />
      <path d="M1.5 7.5h12" stroke="white" strokeWidth="0.9" />
    </svg>
  )
}

function LockSmIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2.5" y="6.5" width="10" height="7" rx="1.4" stroke="#50C9C3" strokeWidth="1.2" />
      <path d="M5 6.5V5a2.5 2.5 0 015 0v1.5" stroke="#50C9C3" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L1.5 3.2v3c0 2.5 1.8 4.4 4.5 5 2.7-.6 4.5-2.5 4.5-5v-3L6 1z" stroke="#4CAF50" strokeWidth="1.1" fill="rgba(76,175,80,0.1)" />
      <path d="M4 6l1.5 1.5 2.5-2" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="#4A90E2" strokeWidth="1.1" fill="rgba(74,144,226,0.07)" />
      <path d="M6 3.5v3l1.5 1" stroke="#4A90E2" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="5" width="9" height="6" rx="1.2" stroke="#6B7280" strokeWidth="1.1" fill="rgba(107,114,128,0.07)" />
      <path d="M4 5V4a2 2 0 014 0v1" stroke="#6B7280" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function StepBulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3C8.5 3 6.5 5 6.5 7.5c0 1.6.9 3 2.3 3.7V14h4.4v-2.8C14.6 10.5 15.5 9.1 15.5 7.5 15.5 5 13.5 3 11 3z" fill="rgba(74,144,226,0.15)" stroke="#4A90E2" strokeWidth="1.2" />
      <rect x="8.5" y="14" width="5" height="1.4" rx="0.7" fill="#4A90E2" fillOpacity="0.5" />
      <rect x="9" y="16" width="4" height="1" rx="0.5" fill="#4A90E2" fillOpacity="0.3" />
    </svg>
  )
}

function StepLockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3.5" y="9.5" width="15" height="9" rx="1.8" fill="rgba(80,201,195,0.12)" stroke="#50C9C3" strokeWidth="1.2" />
      <path d="M7 9.5V8a4 4 0 018 0v1.5" stroke="#50C9C3" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="14.5" r="1.8" fill="#50C9C3" fillOpacity="0.7" />
    </svg>
  )
}

function StepChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4.5 4.5h13a1 1 0 011 1v9a1 1 0 01-1 1H7.5L3.5 18V5.5a1 1 0 011-1z" fill="rgba(155,143,214,0.12)" stroke="#9B8FD6" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7.5 9h7M7.5 12h5" stroke="#9B8FD6" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function StepLeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 19s-7-4-7-10C4 5.8 7 3.5 11 3.5S18 5.8 18 9c0 6-7 10-7 10z" fill="rgba(76,175,80,0.12)" stroke="#4CAF50" strokeWidth="1.2" />
      <path d="M11 19v-8M11 11C9.5 10 8 9.5 7 10" stroke="#4CAF50" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}