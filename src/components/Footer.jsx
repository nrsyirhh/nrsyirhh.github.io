import site from '../content/site.json'

export default function Footer() {
  return (
    <footer className="footer">
      © 2025. {site.name}. All rights reserved.
    </footer>
  )
}
