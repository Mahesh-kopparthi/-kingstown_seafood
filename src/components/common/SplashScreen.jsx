import React, { useEffect, useState } from 'react'
import { asset } from '../../utils/assets'

/**
 * Premium cinematic ocean splash screen.
 *
 * Sequence:
 *  0.15s  Logo fades in with subtle scale
 *  0.80s  Brand name rises elegantly
 *  1.40s  Decorative line expands
 *  2.00s  Ocean waves appear smoothly
 *  2.60s  Tagline fades in
 *  3.20s  Minimal loader appears
 *  4.50s  Fade out begins
 *  5.20s  onDone() fires
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2000),
      setTimeout(() => setPhase(5), 2600),
      setTimeout(() => setPhase(6), 3200),
      setTimeout(() => setPhase(7), 4500),
      setTimeout(() => onDone?.(), 5200),
    ]
    return () => t.forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        phase >= 7 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ 
        background: 'linear-gradient(180deg, #0A1F2E 0%, #0D2838 40%, #0B2638 70%, #081D2A 100%)'
      }}
      aria-live="polite"
      aria-label="Loading Kingstown Sea Food"
    >
      {/* ── Cinematic ambient lighting ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top light ray */}
        <div 
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl transition-opacity duration-2000"
          style={{ 
            background: 'radial-gradient(circle, rgba(32,184,197,0.15) 0%, transparent 70%)',
            opacity: phase >= 1 ? 1 : 0,
            transform: 'translateX(-50%)'
          }} 
        />
        {/* Bottom ambient glow */}
        <div 
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl transition-opacity duration-2000 delay-500"
          style={{ 
            background: 'radial-gradient(circle, rgba(8,127,140,0.12) 0%, transparent 70%)',
            opacity: phase >= 2 ? 1 : 0
          }} 
        />
        {/* Subtle center glow */}
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl transition-opacity duration-2000 delay-1000"
          style={{ 
            background: 'radial-gradient(circle, rgba(45,200,220,0.08) 0%, transparent 60%)',
            opacity: phase >= 3 ? 1 : 0,
            transform: 'translate(-50%, -50%)'
          }} 
        />
      </div>

      {/* ── Cinematic ocean waves at bottom ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 overflow-hidden transition-all duration-1500 ease-out ${
          phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
        }`}
        aria-hidden="true"
      >
        {/* Deep ocean wave */}
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          style={{ width: '100%', height: 120, display: 'block' }}
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(8,127,140,0.3)" />
              <stop offset="100%" stopColor="rgba(8,127,140,0.05)" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C180,100 360,20 540,60 C720,100 900,30 1080,60 C1260,90 1380,50 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGrad1)"
          >
            <animateTransform attributeName="transform" type="translate" from="0,0" to="-200,0" dur="6s" repeatCount="indefinite" />
          </path>
        </svg>
        
        {/* Mid ocean wave */}
        <svg 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none"
          className={`absolute bottom-0 transition-all duration-1500 delay-300 ease-out ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '100%', height: 80, display: 'block' }}
        >
          <defs>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(32,184,197,0.2)" />
              <stop offset="100%" stopColor="rgba(32,184,197,0.03)" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C200,70 400,10 600,40 C800,70 1000,15 1200,40 C1350,55 1410,35 1440,40 L1440,80 L0,80 Z"
            fill="url(#waveGrad2)"
          >
            <animateTransform attributeName="transform" type="translate" from="200,0" to="0,0" dur="4.5s" repeatCount="indefinite" />
          </path>
        </svg>

        {/* Surface wave */}
        <svg 
          viewBox="0 0 1440 50" 
          preserveAspectRatio="none"
          className={`absolute bottom-0 transition-all duration-1500 delay-600 ease-out ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '100%', height: 50, display: 'block' }}
        >
          <defs>
            <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(45,200,220,0.15)" />
              <stop offset="100%" stopColor="rgba(45,200,220,0.02)" />
            </linearGradient>
          </defs>
          <path
            d="M0,25 C240,45 480,5 720,25 C960,45 1200,10 1440,25 L1440,50 L0,50 Z"
            fill="url(#waveGrad3)"
          >
            <animateTransform attributeName="transform" type="translate" from="0,0" to="-150,0" dur="3.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* ── Subtle light particles (caustics effect) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { w: 3,  left: '15%', top: '25%', dur: '6s', delay: '0s' },
          { w: 2,  left: '35%', top: '40%', dur: '5s', delay: '1.2s' },
          { w: 4,  left: '65%', top: '20%', dur: '7s', delay: '0.5s' },
          { w: 2.5, left: '80%', top: '45%', dur: '5.5s', delay: '2s' },
          { w: 3.5, left: '50%', top: '60%', dur: '6.5s', delay: '0.8s' },
          { w: 2,  left: '25%', top: '70%', dur: '4.5s', delay: '1.8s' },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-opacity duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              width: p.w,
              height: p.w,
              left: p.left,
              top: p.top,
              background: 'rgba(45,200,220,0.3)',
              filter: 'blur(1px)',
              animation: `lightParticle ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-4">

        {/* Logo */}
        <div
          className="mb-8 transition-all duration-1000 ease-out"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
          }}
        >
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(32,184,197,0.25)',
              background: 'rgba(255,255,255,0.04)',
              boxShadow: '0 25px 70px -15px rgba(8,127,140,0.4), 0 0 40px rgba(32,184,197,0.1)',
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
          className="text-center transition-all duration-1000 ease-out"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          <h1
            className="font-bold text-white tracking-wider leading-tight"
            style={{ 
              fontSize: 'clamp(2rem, 5.5vw, 2.8rem)', 
              letterSpacing: '0.08em',
              textShadow: '0 2px 20px rgba(8,127,140,0.3)'
            }}
          >
            Kingstown Sea Food
          </h1>
          <div
            className="mx-auto mt-4 h-px"
            style={{
              width: phase >= 3 ? '140px' : '0px',
              transition: 'width 0.8s ease-out',
              background: 'linear-gradient(90deg, transparent, rgba(32,184,197,0.6), transparent)',
              boxShadow: '0 0 10px rgba(32,184,197,0.3)',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-6 text-sm sm:text-base text-center max-w-sm leading-relaxed transition-all duration-1000"
          style={{
            color: 'rgba(200,230,235,0.7)',
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'translateY(0)' : 'translateY(10px)',
            letterSpacing: '0.02em',
          }}
        >
          Fresh from Trusted Farms · Bhimavaram, Andhra Pradesh
        </p>

        {/* Minimal premium loader */}
        <div
          className="flex items-center gap-2 mt-8 transition-all duration-800"
          style={{ opacity: phase >= 6 ? 1 : 0 }}
          aria-hidden="true"
        >
          <div
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              background: 'linear-gradient(135deg, #20B8C5, #2DC8D6)',
              boxShadow: '0 0 12px rgba(32,184,197,0.5)',
              animation: 'premiumPulse 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes premiumPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6;
            box-shadow: 0 0 12px rgba(32,184,197,0.5);
          }
          50% { 
            transform: scale(1.4); 
            opacity: 1;
            box-shadow: 0 0 20px rgba(32,184,197,0.8);
          }
        }
        @keyframes lightParticle {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(10px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-10px) translateX(8px) scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
