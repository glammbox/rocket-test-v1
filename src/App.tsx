import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'

const title = 'GLAMMBOX'
const labels = ['AI Director', 'Strategist', 'Builder', 'Eye', 'Mechanic']

function App() {
  const [revealed, setRevealed] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const letters = useMemo(() => title.split(''), [])

  return (
    <main className="page-shell">
      <div className="aura" aria-hidden="true" />

      <section className="hero">
        <motion.h1
          className="wordmark"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.06,
                delayChildren: shouldReduceMotion ? 0 : 0.12,
              },
            },
          }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="wordmark-letter"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 18,
                  filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: shouldReduceMotion ? 0.2 : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-stage"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.25 : 1.2, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0 : 0.4 }}
        >
          <img
            className="hero-image"
            src="/images/team.jpg"
            alt="Pat and the AI Director with the four GLAMMBOX Rocket souls staged behind them in cinematic light"
          />
        </motion.div>

        <motion.button
          type="button"
          className="discover-button"
          onClick={() => setRevealed(true)}
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02, boxShadow: '0 0 26px rgba(158, 123, 69, 0.18)' }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, delay: shouldReduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          Discover
        </motion.button>

        <div className="slogan-wrap">
          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.p
                key="slogan"
                className="slogan"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, filter: shouldReduceMotion ? 'blur(0px)' : 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                One Vision. Four Minds. Infinite Builds.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.div
          className="micro-labels"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, delay: shouldReduceMotion ? 0 : 1.05 }}
        >
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </motion.div>
      </section>
    </main>
  )
}

export default App
