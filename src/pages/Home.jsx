import { useRef } from 'react'
import { motion } from 'framer-motion'
import site from '../content/site.json'
import projectData from '../content/projects.json'
import AnimatedButton from '../components/AnimatedButton.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Lanyard from './lanyard.jsx';
import carousel from '../components/carousel'; // Adjust path if needed
import CircularCarousel from '../components/carousel.jsx'

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
  
  const mappedProjects = projects.map((p) => ({
    src: p.image || 'https://picsum.photos/400/600', // Fallback image if missing
    alt: p.title,
    title: p.title,
    subtitle: p.category || p.description || 'Project'

  }));

  const carouselItems = [...mappedProjects, ...mappedProjects];


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
         <div className="about-image" style={{ 
  position: 'absolute', 
  top: '0px', 
  left: '100%', 
  transform: 'translateX(-60%)', 
  width: '1050px', 
  height: '800px', 
  zIndex: 10,
  background: 'transparent' 
}}>

          <Lanyard 
  frontImage={('/uploads/front-lanyard.svg')}
  backImage={('/uploads/strap.jpg')}
  orientation="portrait" 
  finish="glossy"
  size={0.38}
  cardColor="#ffffff" 
  strapImage= {('/uploads/strap.jpg')}
/>
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
      {/* PROJECTS */}
      <section id="projects" className="section projects-section">
        <motion.div className="projects-wrap" {...reveal}>
          <h2>My Projects</h2>
          <p className="section-sub">
            A collection of my latest work across design, development, and creative projects
          </p>
          
          {/* New Circular Carousel replacing the scroll buttons and ProjectCards */}
          <div style={{ width: '100%', height: '560px', position: 'relative', marginTop: '40px' }}>
            <CircularCarousel
              items={carouselItems}
              preset="panorama" 
              intro="rise"
              cardWidth={220}
              gap={35}
              aspectRatio={0.75} /* 0.75 makes the cards taller, like portrait photos */
              speed={10}
              captions={true}
               onError={(e) => {
                // if the picture is missing, just show the pink gradient
                e.currentTarget.style.display = 'none'
              }}
              onItemClick={(item, index) => {
    const originalProject = projects[index % projects.length];
    if (originalProject.slug) {
      window.location.href = `/project/${originalProject.slug}`;
    } else if (originalProject.link) {
      window.open(originalProject.link, '_blank'); // Opens external links in a new tab
    }
              }}
            />
            

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
