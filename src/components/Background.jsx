import { motion } from 'framer-motion'

// Soft pastel background with slowly floating bubbles.
// To use your own picture/GIF instead, see GUIDE.md ("Change the background").
const bubbles = [
  { left: '8%', top: '18%', size: 14, delay: 0 },
  { left: '28%', top: '62%', size: 10, delay: 2 },
  { left: '48%', top: '38%', size: 18, delay: 4 },
  { left: '68%', top: '72%', size: 12, delay: 1 },
  { left: '88%', top: '28%', size: 16, delay: 3 },
  { left: '18%', top: '85%', size: 9, delay: 5 },
  { left: '78%', top: '12%', size: 11, delay: 6 },
]

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div
  className="bg-image"
  style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background.gif)` }}/>
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="bubble"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size }}
          animate={{ y: [0, -80, -160, -80, 0], x: [0, 30, -30, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}
    </div>
  )
}
