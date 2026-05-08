import LinkedinIcon from '../assets/linkedin.svg?react'
import XIcon from '../assets/x.svg?react'
import GithubIcon from '../assets/github.svg?react'
import TwitchIcon from '../assets/twitch.svg?react'
import YoutubeIcon from '../assets/youtube.svg?react'
import InstagramIcon from '../assets/instagram.svg?react'

export interface SocialLink {
  platform: string
  handle: string
  url: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  description: string
}

/**
 * Social links configuration
 * 
 * TODO: Replace placeholder URLs and handles with real data
 * - All URLs use placeholder format: https://platform.com/handle
 * - All handles use placeholder format: @handle or /handle
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    handle: '@egdev',
    url: 'https://www.linkedin.com/in/egdev',
    Icon: LinkedinIcon,
    description: 'Contenido técnico, arquitectura y storytelling profesional'
  },
  {
    platform: 'X (Twitter)',
    handle: '@egdev66',
    url: 'https://x.com/egdev66',
    Icon: XIcon,
    description: 'Anuncios, noticias y eventos'
  },
  {
    platform: 'GitHub',
    handle: '@egdev6',
    url: 'https://github.com/egdev6',
    Icon: GithubIcon,
    description: 'Código abierto, proyectos y contribuciones'
  },
  {
    platform: 'Twitch',
    handle: '@egdev6',
    url: 'https://www.twitch.tv/egdev6',
    Icon: TwitchIcon,
    description: 'Live coding, Q&A y comunidad en tiempo real'
  },
  {
    platform: 'YouTube',
    handle: '@egdev6',
    url: 'https://www.youtube.com/@egdev6',
    Icon: YoutubeIcon,
    description: 'Resubida de Twitch, tutoriales y contenido técnico'
  },
  {
    platform: 'Instagram',
    handle: '@egdev',
    url: 'https://www.instagram.com/egdev',
    Icon: InstagramIcon,
    description: 'Vida personal, amigos, familia y viajes'
  }
]
