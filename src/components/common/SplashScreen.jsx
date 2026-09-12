import React, { useEffect, useState } from 'react'
import { asset } from '../../utils/assets'

/**
 * Premium seafood splash screen.
 *
 * Sequence:
 *  0.10s  Logo drops in with scale
 *  0.60s  Brand name rises
 *  1.00s  Decorative line expands
 *  1.40s  Waves appear smoothly
 *  1.80s  Tagline fades in
 *  2.20s  Loading dots appear
 *  3.50s  Fade out begins
 *  4.20s  onDone() fires
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
      setTimeout(() => setPhase(4), 1400),
      setTimeout(() => setPhase(5), 1800),
      setTimeout(() => setPhase(6), 2200),
      setTimeout(() => setPhase(7), 3500),
      setTimeout(() => onDone?.(), 4200),
    ]
    return () => t.forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-800 ${
        phase >= 7 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(175deg, #0B2638 0%, #0D3045 55%, #0B2638 100%)' }}
      aria-live="polite"
      aria-label="Loading Kingstown Sea Food"
    >
      {/* ── Ambient depth glows ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'rgba(8,127,140,0.12)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'rgba(32,184,197,0.07)' }} />
      </div>

      {/* ── Wave layers at bottom ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 overflow-hidden transition-all duration-1200 ease-out ${
          phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        aria-hidden="true"
      >
        {/* Deep wave */}
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" style={{ width: '100%', height: 130, display: 'block' }}>
          <path
            d="M0,65 C200,110 400,20 600,60 C800,100 1000,25 1200,65 C1300,85 1370,55 1440,65 L1440,130 L0,130 Z"
            fill="rgba(8,127,140,0.25)"
          >
            <animateTransform attributeName="transform" type="translate" from="0,0" to="-180,0" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>
        {/* Surface wave */}
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
          className={`absolute bottom-0 transition-all duration-1200 delay-300 ease-out ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '100%', height: 90, display: 'block' }}>
          <path
            d="M0,45 C240,80 480,10 720,45 C960,80 1200,15 1440,45 L1440,90 L0,90 Z"
            fill="rgba(32,184,197,0.15)"
          >
            <animateTransform attributeName="transform" type="translate" from="180,0" to="0,0" dur="3.8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* ── Swimming fish ── */}
      <div
        className={`absolute transition-all duration-1200 ease-out ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ bottom: '12%', left: 0, right: 0 }}
        aria-hidden="true"
      >
        {/* The fish wrapper swims side to side */}
        <div style={{ animation: 'splashSwim 4s ease-in-out infinite', display: 'inline-block', marginLeft: '10%' }}>
          <RealisticFish />
        </div>
      </div>

      {/* ── Bubble particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { w: 6,  left: '12%', bottom: '22%', dur: '4.2s', delay: '0.3s' },
          { w: 4,  left: '28%', bottom: '30%', dur: '3.6s', delay: '1.5s' },
          { w: 8,  left: '72%', bottom: '18%', dur: '5s',   delay: '0.8s' },
          { w: 5,  left: '85%', bottom: '35%', dur: '3.9s', delay: '2.1s' },
          { w: 3,  left: '55%', bottom: '55%', dur: '3.3s', delay: '0.5s' },
        ].map((b, i) => (
          <span
            key={i}
            className="bubble absolute"
            style={{ width: b.w, height: b.w, left: b.left, bottom: b.bottom, '--dur': b.dur, '--delay': b.delay }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-4">

        {/* Logo */}
        <div
          className="mb-7 transition-all duration-800 ease-out"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(-30px) scale(0.8) rotate(-8deg)',
          }}
        >
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              border: '2px solid rgba(32,184,197,0.35)',
              background: 'rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px -10px rgba(8,127,140,0.5)',
            }}
          >
            <img
              src={asset('/images/mainlogo.png')}
              alt="Kingstown Sea Food"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Brand name */}
        <div
          className="text-center transition-all duration-800 ease-out"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h1
            className="font-bold text-white tracking-wide leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', letterSpacing: '0.04em' }}
          >
            Kingstown Sea Food
          </h1>
          <div
            className="mx-auto mt-3 h-px"
            style={{
              width: phase >= 3 ? '160px' : '0px',
              transition: 'width 0.6s ease-out',
              background: 'linear-gradient(90deg, transparent, #20B8C5, transparent)',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-5 text-sm sm:text-base text-center max-w-xs leading-relaxed transition-all duration-800"
          style={{
            color: 'rgba(221,243,239,0.75)',
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          Fresh from Trusted Farms · Bhimavaram, Andhra Pradesh
        </p>

        {/* Loading indicator */}
        <div
          className="flex items-center gap-1.5 mt-7 transition-all duration-600"
          style={{ opacity: phase >= 6 ? 1 : 0 }}
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: 6, height: 6,
                backgroundColor: '#20B8C5',
                animation: `splashDot 1.4s ease-in-out ${i * 0.22}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes splashDot {
          0%, 75%, 100% { transform: scale(0.55); opacity: 0.35; }
          37.5%          { transform: scale(1.3);  opacity: 1; }
        }
        @keyframes splashSwim {
          0%   { transform: translateX(0px)   translateY(0px)   rotate(0deg); }
          15%  { transform: translateX(55px)  translateY(-10px) rotate(-2deg); }
          30%  { transform: translateX(110px) translateY(4px)   rotate(1deg); }
          45%  { transform: translateX(165px) translateY(-8px)  rotate(-1.5deg); }
          60%  { transform: translateX(220px) translateY(5px)   rotate(2deg); }
          75%  { transform: translateX(165px) translateY(-6px)  rotate(-1deg); }
          90%  { transform: translateX(80px)  translateY(3px)   rotate(0.5deg); }
          100% { transform: translateX(0px)   translateY(0px)   rotate(0deg); }
        }
        @keyframes tailBeat {
          0%,100% { d: path("M0,28 C8,14 14,6 18,28 C14,50 8,42 0,28 Z"); }
          50%     { d: path("M0,28 C6,10 16,4 22,28 C16,52 6,46 0,28 Z"); }
        }
        @keyframes finWave {
          0%,100% { transform: rotate(-5deg); }
          50%     { transform: rotate(8deg); }
        }
        @keyframes bodyBend {
          0%,100% { transform: scaleY(1) rotate(-1deg); }
          50%     { transform: scaleY(0.97) rotate(1deg); }
        }
      `}</style>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Realistic fish SVG with animated parts
   Modeled as a sleek ocean fish (similar to a
   vannamei prawn's natural prey — a small pelagic).
   Uses separate SVG groups animated independently.
──────────────────────────────────────────────── */
function RealisticFish() {
  return (
    <svg
      width="160"
      height="80"
      viewBox="0 0 160 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 4px 16px rgba(8,127,140,0.5))' }}
    >
      <defs>
        {/* Fish body gradient — silver-blue ocean fish */}
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#C8EAF0" />
          <stop offset="40%"  stopColor="#87CEDC" />
          <stop offset="100%" stopColor="#4A9EB5" />
        </linearGradient>
        {/* Belly lighter */}
        <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#E8F6FA" />
          <stop offset="100%" stopColor="#B8DDE8" />
        </linearGradient>
        {/* Tail gradient */}
        <linearGradient id="tailGrad" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#3A8FA8" />
          <stop offset="100%" stopColor="#1F6E84" />
        </linearGradient>
        {/* Scale shimmer */}
        <radialGradient id="shineGrad" cx="65%" cy="35%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* ── Tail fin — animates with body wave ── */}
      <g style={{ transformOrigin: '28px 40px', animation: 'tailBeatGroup 0.55s ease-in-out infinite alternate' }}>
        {/* Upper lobe */}
        <path d="M28,40 L4,18 L14,40 Z" fill="url(#tailGrad)" opacity="0.9" />
        {/* Lower lobe */}
        <path d="M28,40 L4,62 L14,40 Z" fill="url(#tailGrad)" opacity="0.85" />
        {/* Central tail ridge */}
        <path d="M28,40 L10,40 L4,38 L4,42 L10,40 Z" fill="rgba(31,110,132,0.7)" />
      </g>

      {/* ── Main body — subtle bend animation ── */}
      <g style={{ transformOrigin: '90px 40px', animation: 'bodyBend 0.7s ease-in-out infinite alternate' }}>
        {/* Body shape */}
        <ellipse cx="90" cy="40" rx="62" ry="23" fill="url(#bodyGrad)" />
        {/* Belly lighter region */}
        <ellipse cx="88" cy="46" rx="52" ry="13" fill="url(#bellyGrad)" opacity="0.6" />
        {/* Lateral line — the realistic iridescent stripe */}
        <path
          d="M36,36 C55,33 75,34 105,36 C120,37 135,38 148,39"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Scale texture — small ellipses */}
        {[
          [60,37],[72,35],[84,34],[96,35],[108,37],[120,38],[132,39],
          [66,43],[78,42],[90,41],[102,42],[114,43],
        ].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="5.5" ry="3.5"
            fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
        ))}
        {/* Shine */}
        <ellipse cx="90" cy="40" rx="62" ry="23" fill="url(#shineGrad)" />
      </g>

      {/* ── Dorsal fin ── */}
      <g style={{ transformOrigin: '88px 17px', animation: 'finWave 0.9s ease-in-out infinite alternate' }}>
        <path
          d="M55,26 C68,10 82,8 95,12 C102,14 108,18 110,26"
          fill="rgba(74,158,181,0.75)"
          stroke="rgba(31,110,132,0.4)"
          strokeWidth="0.8"
        />
      </g>

      {/* ── Pectoral fin ── */}
      <g style={{ transformOrigin: '80px 46px', animation: 'finWave 0.75s ease-in-out 0.2s infinite alternate' }}>
        <path
          d="M72,46 C80,55 90,56 95,50 C90,46 80,44 72,46 Z"
          fill="rgba(74,158,181,0.6)"
          stroke="rgba(31,110,132,0.3)"
          strokeWidth="0.7"
        />
      </g>

      {/* ── Anal fin (small bottom fin) ── */}
      <path d="M100,58 C106,64 112,65 116,60 C112,57 106,56 100,58 Z"
        fill="rgba(58,143,168,0.5)" />

      {/* ── Head — drawn on top ── */}
      {/* Head base */}
      <ellipse cx="145" cy="40" rx="18" ry="17" fill="url(#bodyGrad)" />
      {/* Snout */}
      <path d="M155,40 C160,38 162,39 162,40 C162,41 160,42 155,40 Z"
        fill="#4A9EB5" />
      {/* Gill cover line */}
      <path d="M132,26 C128,32 127,48 132,54"
        stroke="rgba(31,110,132,0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="149" cy="36" r="5.5" fill="#1A3540" />
      <circle cx="149" cy="36" r="4" fill="#0D2830" />
      {/* Iris */}
      <circle cx="149" cy="36" r="2.5" fill="#2A5C6A" />
      {/* Pupil */}
      <circle cx="149" cy="36" r="1.5" fill="#050F14" />
      {/* Eye shine — makes it look alive */}
      <circle cx="150.5" cy="34.5" r="1.1" fill="rgba(255,255,255,0.8)" />
      {/* Mouth */}
      <path d="M161,41 C159,42.5 157,42 156,41" stroke="#2A6878" strokeWidth="1"
        fill="none" strokeLinecap="round" />
      {/* Head shine */}
      <ellipse cx="145" cy="40" rx="18" ry="17" fill="url(#shineGrad)" opacity="0.5" />

      {/* ── Tail animation group keyframes injected via style ── */}
      <style>{`
        @keyframes tailBeatGroup {
          0%   { transform: rotate(-12deg); }
          100% { transform: rotate(12deg); }
        }
      `}</style>
    </svg>
  )
}
