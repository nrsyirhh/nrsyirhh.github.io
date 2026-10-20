import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Made once here (not inside the component) so it doesn't get rebuilt on every render.
const MotionLink = motion.create(Link)

/**
 * A reusable animated pill button.
 *
 * Use it like this:
 *   <AnimatedButton href="/#projects">View projects</AnimatedButton>   (goes to a page on this site)
 *   <AnimatedButton href="https://canva.com/..." external>Open</AnimatedButton>   (opens another website)
 *   <AnimatedButton variant="outline">Outline style</AnimatedButton>
 */
export default function AnimatedButton({
  children,
  href,
  external = false,
  variant = 'solid',
  download = false,
  onClick,
}) {
  const className = `btn ${variant === 'outline' ? 'btn-outline' : ''}`
  const motionProps = {
    whileHover: { y: -4, scale: 1.04 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 18 },
  }

  if (href && external) {
    return (
      <motion.a
        className={className}
        href={href}
        target={download ? undefined : '_blank'}
        rel="noopener noreferrer"
        download={download || undefined}
        {...motionProps}
      >
        <span>{children}</span>
      </motion.a>
    )
  }

  if (href) {
    return (
      <MotionLink className={className} to={href} {...motionProps}>
        <span>{children}</span>
      </MotionLink>
    )
  }

  return (
    <motion.button className={className} onClick={onClick} {...motionProps}>
      <span>{children}</span>
    </motion.button>
  )
}
