import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// One card in the "Projects" row. Clicking it opens /projects/<slug>.
export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="project-card-wrap"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/projects/${project.slug}`} className="project-card">
        <div className="project-thumbnail">
          {project.cover && (
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              onError={(e) => {
                // if the picture is missing, just show the pink gradient
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <span className="thumb-overlay">View project →</span>
        </div>
        <div className="project-content">
          <div className="project-category">{project.category}</div>
          <h3>{project.title}</h3>
          <p className="project-description">{project.summary}</p>
        </div>
      </Link>
    </motion.div>
  )
}
