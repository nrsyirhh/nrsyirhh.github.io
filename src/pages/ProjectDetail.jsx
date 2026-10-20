import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import projectData from '../content/projects.json'
import AnimatedButton from '../components/AnimatedButton.jsx'

const pageAnim = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

// A section of text, only shown if you actually filled it in.
function TextBlock({ title, text }) {
  if (!text || !text.trim()) return null
  return (
    <motion.div
      className="detail-block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="left">{title}</h2>
      <p>{text}</p>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const projects = projectData.projects || []
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) {
    return (
      <motion.main className="detail" {...pageAnim}>
        <div className="detail-card">
          <h1>Project not found</h1>
          <p>Sorry, I couldn't find that project.</p>
          <AnimatedButton href="/#projects">← Back to projects</AnimatedButton>
        </div>
      </motion.main>
    )
  }

  const next = projects[(index + 1) % projects.length]
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Duration', value: project.duration },
    { label: 'Team', value: project.team },
  ].filter((f) => f.value)

  return (
    <motion.main className="detail" {...pageAnim}>
      <div className="detail-card">
        <Link to="/#projects" className="back-link">
          ← Back to projects
        </Link>

        <div className="project-category">{project.category}</div>
        <h1>{project.title}</h1>
        <p className="detail-summary">{project.summary}</p>

        {project.cover && (
          <img
            className="detail-cover"
            src={project.cover}
            alt={project.title}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}

        {facts.length > 0 && (
          <div className="facts">
            {facts.map((f) => (
              <div className="fact" key={f.label}>
                <span className="fact-label">{f.label}</span>
                <span className="fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        )}

        {project.tools && project.tools.length > 0 && (
          <div className="tags">
            {project.tools.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}

        <TextBlock title="Overview" text={project.overview} />
        <TextBlock title="The problem" text={project.problem} />
        <TextBlock title="My solution" text={project.solution} />
        <TextBlock title="What I learned" text={project.learned} />

        {project.gallery && project.gallery.length > 0 && (
          <div className="detail-block">
            <h2 className="left">Gallery</h2>
            <div className="gallery">
              {project.gallery.map((g, i) => (
                <motion.img
                  key={i}
                  src={g.image || g}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="btn-row left-row">
            {project.links.map((l, i) => (
              <AnimatedButton key={i} href={l.url} external variant={i === 0 ? 'solid' : 'outline'}>
                {l.label}
              </AnimatedButton>
            ))}
          </div>
        )}

        {projects.length > 1 && (
          <Link to={`/projects/${next.slug}`} className="next-project">
            Next project: <strong>{next.title}</strong> →
          </Link>
        )}
      </div>
    </motion.main>
  )
}
