import { useRef } from 'react'
import { motion } from 'framer-motion'
import site from '../content/site.json'
import projectData from '../content/projects.json'
import AnimatedButton from '../components/AnimatedButton.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const pageAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Makes things fade in + slide up when you scroll to them.
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Home() {
  const scrollRef = useRef(null)
  const projects = projectData.projects || []

  const scrollRow = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  return (
    <motion.main {...pageAnim}>
      {/* HERO */}
      <section id="home" className="section hero">
       <motion.img
  src="/uploads/title.svg"
  alt="Insyirah Zaini Portfolio"
  className="hero-title-img"
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
/>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {site.heroSubtitle}
        </motion.p>
        <motion.div
          className="btn-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {site.cvFile && (
            <AnimatedButton href={site.cvFile} external download>
              Download CV
            </AnimatedButton>
          )}
          <AnimatedButton href="/#projects" variant="outline">
            View projects
          </AnimatedButton>
        </motion.div>
      </section>

      {/* ABOUT + EDUCATION */}
      <section id="about" className="section">
        <motion.div className="about-card" {...reveal}>
          <div className="about-image">
            {site.profileImage ? (
              <img src={site.profileImage} alt={site.name} />
            ) : (
              <div className="about-placeholder">{site.name.charAt(0)}</div>
            )}
          </div>
          <div className="about-text">
            <h2 className="left">About me</h2>
            <p className="about-bio">{site.about}</p>
            <div className="edu-list">
              {site.education.map((e, i) => (
                <motion.div
                  className="education-item"
                  key={i}
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3>{e.title}</h3>
                  {e.place && <span className="edu-place">{e.place}</span>}
                  <p>{e.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section projects-section">
        <motion.div className="projects-wrap" {...reveal}>
          <h2>My Projects</h2>
          <p className="section-sub">
            A collection of my latest work across design, development, and creative projects
          </p>
          <div className="projects-container">
            <button className="scroll-btn left" onClick={() => scrollRow(-1)} aria-label="Scroll left">
              ‹
            </button>
            <div className="projects-scroll" ref={scrollRef}>
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRow(1)} aria-label="Scroll right">
              ›
            </button>
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <motion.div className="contact-wrap" {...reveal}>
          <h2>My Contact</h2>
          <p className="section-sub">{site.contactIntro}</p>
          <div className="contact-info">
            {site.phone && (
              <div className="contact-item">
                <strong>Phone</strong>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </div>
            )}
            {site.email && (
              <div className="contact-item">
                <strong>Email</strong>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            )}
            {site.social && (
              <div className="contact-item">
                <strong>Social media</strong>
                {site.socialUrl ? (
                  <a href={site.socialUrl} target="_blank" rel="noopener noreferrer">
                    {site.social}
                  </a>
                ) : (
                  <span>{site.social}</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
