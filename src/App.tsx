import { useState, useEffect } from 'react'
import './App.css'
import SocialCard from './components/SocialCard'
import { socialLinks } from './data/social-links'
import { HeroBokeh, MousePulse } from './components/canvas'
import Logo from './assets/logo.svg?react'
import StackAndFlowLogo from './assets/stackandflow.svg?react'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after mount
    setMounted(true)
  }, [])

  return (
    <div className="app">
      {/* Canvas Effects - Background Layer */}
      <HeroBokeh />

      {/* Red background layers matching agent-teams-docs */}
      <div className="app__accent" aria-hidden="true" />
      <div className="app__glow app__glow--primary" aria-hidden="true" />
      <div className="app__glow app__glow--secondary" aria-hidden="true" />
      <div className="app__spot app__spot--primary" aria-hidden="true" />
      <div className="app__spot app__spot--secondary" aria-hidden="true" />
      <div className="app__vignette" aria-hidden="true" />
      
      {/* Canvas Effects - Mouse Interaction Layer */}
      <MousePulse />
      
      <main className="main">
        <div className="container">
          {/* Hero Section */}
          <section className={`hero ${mounted ? 'fade-in-visible' : ''}`}>
            <Logo className='hero__logo' />
            <p className="hero__subtitle">
              Senior frontend software engineer, creador de contenido técnico y speker.
            </p>
            <p className="hero__description">
              "Si quieres algo, márcate un objetivo, diseña tu estrategia y ponte a trabajar. No esperes a que las cosas sucedan, haz que sucedan."
            </p>
          </section>

          {/* Social Links Grid */}
          <section className={`social-grid ${mounted ? 'fade-in-visible' : ''}`}>
            {socialLinks.map((link, index) => (
              <SocialCard
                key={link.platform}
                {...link}
                delay={index * 50}
              />
            ))}
          </section>
        </div>
      </main>

      <section className={`community-band ${mounted ? 'fade-in-visible' : ''}`}>
        <div className="community-band__inner container">
          <div className="community-band__content">
            <StackAndFlowLogo className='community-band__logo'/>
            <h2 className="community-band__title">Comunidad de desarrollo en Discord</h2>
            <p className="community-band__description">
              Únete para construir en comunidad, compartir conocimientos y colaborar en proyectos de software. ¡Te esperamos!
            </p>
          </div>

          <a
            className="community-band__cta"
            href="https://discord.gg/xffecBzMEQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acceder a Discord
          </a>
        </div>
      </section>

      <footer className={`footer ${mounted ? 'fade-in-visible' : ''}`}>
        <p className="footer__text">
          &copy; {new Date().getFullYear()} egdev. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}

export default App
