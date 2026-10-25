import { motion } from 'framer-motion'

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div
  className="bg-image"
  style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background.gif)` }}/>
    </div>
  )
}
