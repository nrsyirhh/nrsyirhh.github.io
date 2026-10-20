import site from '../content/site.json'

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {site.name}. All rights reserved.
    </footer>
  )
}
