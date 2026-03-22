import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

const TITLE = 'GLAMMBOX'

const titleContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.06,
    },
  },
}

const titleLetterFull = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 32,
    rotateX: -72,
    filter: 'blur(10px)',
  },
  show: {
    opacity: [0, 1, 1],
    scale: [0, 1.045, 1],
    y: [32, -4, 0],
    rotateX: [-72, -8, 0],
    filter: ['blur(10px)', 'blur(2px)', 'blur(0px)'],
    transition: {
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const titleLetterReduced = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
}

export default function App() {
  const [showSlogan, setShowSlogan] = useState(false)
  const prefersReduced = useReducedMotion()

  const letterVariant = prefersReduced ? titleLetterReduced : titleLetterFull

  const imageDelay = 0.12 + 8 * 0.06 + 0.42 // ~1.02s

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Background radial gold haze */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '50vh',
          background: 'radial-gradient(ellipse at center top, rgba(158,123,69,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Global vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,10,7,0.72) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Stage */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'min(92vw, 1320px)',
          height: '100vh',
          padding: '3rem',
          gap: 'clamp(1rem, 2vh, 1.8rem)',
        }}
      >
        {/* Row 1 — Animated Title */}
        <motion.div
          variants={titleContainer}
          initial="hidden"
          animate="show"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.02em',
            perspective: '800px',
          }}
        >
          {TITLE.split('').map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariant}
              style={{
                fontFamily: 'var(--display-font)',
                fontWeight: 600,
                fontSize: 'clamp(4.5rem, 13vw, 10.5rem)',
                lineHeight: 0.9,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                display: 'inline-block',
                textShadow: '0 0 24px rgba(158,123,69,0.08)',
                transformOrigin: '50% 60%',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Row 2 — Team Portrait */}
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 1.06, filter: 'blur(12px)' }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: prefersReduced ? 0.4 : 1.05,
            delay: prefersReduced ? 0.3 : imageDelay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{
            position: 'relative',
            width: 'min(72vw, 820px)',
            aspectRatio: '16 / 8.8',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.34)',
          }}
        >
          <img
            src="/images/team.jpg"
            alt="GLAMMBOX team — Pat and the Rocket souls"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Vignette overlay on image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 50%, rgba(8,10,7,0.58) 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Darkening overlay when slogan revealed */}
          <motion.div
            initial={{ opacity: 0.18 }}
            animate={{ opacity: showSlogan ? 0.34 : 0.18 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8,10,7,1)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Row 3 — CTA + Slogan */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          {/* DISCOVER Button */}
          <motion.button
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.3 : 0.64,
              delay: prefersReduced ? 0.5 : 0.78,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            whileHover={!showSlogan ? { backgroundColor: 'rgba(158,123,69,0.12)', borderColor: '#9E7B45', y: -1 } : {}}
            whileTap={!showSlogan ? { y: 0 } : {}}
            onClick={() => !showSlogan && setShowSlogan(true)}
            aria-label="Reveal GLAMMBOX slogan"
            style={{
              height: '50px',
              padding: '0 26px',
              border: '1px solid rgba(158,123,69,0.56)',
              background: 'transparent',
              color: 'var(--text)',
              fontFamily: 'var(--body-font)',
              fontWeight: 600,
              fontSize: '0.78rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              cursor: showSlogan ? 'default' : 'pointer',
              opacity: showSlogan ? 0.55 : 1,
              transition: 'opacity 0.3s ease, background 240ms ease, border-color 240ms ease',
              outline: 'none',
            }}
          >
            DISCOVER
          </motion.button>

          {/* Slogan Reveal */}
          <AnimatePresence>
            {showSlogan && (
              <motion.div
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 26, filter: 'blur(14px)' }}
                animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReduced ? 0.3 : 1.18,
                  ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
                }}
                style={{
                  fontFamily: 'var(--display-font)',
                  fontWeight: 500,
                  fontSize: 'clamp(2rem, 4.4vw, 4.25rem)',
                  lineHeight: 1.02,
                  letterSpacing: '0.04em',
                  color: 'var(--text)',
                  textAlign: 'center',
                  maxWidth: '18ch',
                }}
              >
                One Vision. Four Minds. Infinite Builds.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title dims when slogan revealed */}
      </div>
    </div>
  )
}
