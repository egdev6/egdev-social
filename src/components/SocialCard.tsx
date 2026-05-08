import { useState, useEffect } from 'react'
import './SocialCard.css'

export interface SocialCardProps {
  platform: string
  handle: string
  url: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  description: string
  delay?: number
}

function SocialCard({ platform, handle, url, Icon, description, delay = 0 }: SocialCardProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card ${visible ? 'social-card--visible' : ''}`}
      aria-label={`Visitar ${platform}`}
    >
      <div className="social-card__inner">
        {/* Icon */}
        <div className="social-card__icon-wrapper">
          <Icon className="social-card__icon" />
        </div>

        {/* Content */}
        <div className="social-card__content">
          <h3 className="social-card__platform">{platform}</h3>
          <p className="social-card__handle">{handle}</p>
          <p className="social-card__description">{description}</p>
        </div>

        {/* Hover arrow indicator */}
        <div className="social-card__arrow">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 10h12m0 0l-4-4m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  )
}

export default SocialCard
