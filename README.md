# @egdev — Social Links Landing

Landing minimalista con enlaces sociales. Diseño inspirado en [agent-teams-docs](https://github.com/egdev/agent-teams-docs): fondo oscuro con grid pattern, glow rojo neón, tipografía Space Grotesk, y cards elegantes con hover interactivo.

## Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool y dev server
- **CSS puro** — Sin frameworks, diseño custom
- **vite-plugin-svgr** — Importa SVGs como componentes React

## Características

- ✨ Diseño minimalista y profesional
- 🌑 Fondo oscuro con grid pattern sutil
- 🔴 Glow neón rojo en hover (#ff0036)
- 🎨 **Efectos canvas animados:**
  - **HeroBokeh** — Partículas flotantes de fondo con efecto bokeh fotográfico
  - **MousePulse** — Trail y anillos de pulso al hacer click/mover el mouse (solo desktop)
- 📱 Responsive — mobile, tablet, desktop
- ⚡ Animaciones suaves con cubic-bezier
- 🎨 Tipografía Space Grotesk (Google Fonts)
- ♿ Accesibilidad — ARIA labels, semántica HTML5

## Estructura del proyecto

```
egdev-social/
├── src/
│   ├── assets/
│   │   └── logo.svg             # SVGs para el proyecto
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── HeroBokeh.tsx    # Canvas de fondo con partículas bokeh
│   │   │   ├── HeroBokeh.css    # Estilos del canvas bokeh
│   │   │   ├── MousePulse.tsx   # Canvas de interacción con mouse
│   │   │   └── index.ts         # Barrel export
│   │   ├── SocialCard.tsx       # Componente card individual
│   │   └── SocialCard.css       # Estilos del card
│   ├── data/
│   │   └── social-links.ts      # Configuración de enlaces (EDITAR AQUÍ)
│   ├── App.tsx                  # Componente principal
│   ├── App.css                  # Estilos layout principal
│   ├── index.css                # Estilos globales + grid background
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts            # Types para Vite + SVG
├── index.html                   # HTML base
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Dev server (localhost:5173)
pnpm dev

# Build producción
pnpm build

# Preview build
pnpm preview
```

## Deploy en GitHub Pages

- El workflow de Pages está en `.github/workflows/deploy.yml`
- El dominio personalizado está definido en `public/CNAME`
- Dominio configurado: `www.egdev.es`

## Uso de SVGs

El proyecto soporta importar SVGs de dos formas:

### Como componente React (recomendado)
```tsx
import { ReactComponent as Logo } from './assets/logo.svg?react'

function Header() {
  return <Logo className="logo" />
}
```

### Como URL estática
```tsx
import logoUrl from './assets/logo.svg'

function Avatar() {
  return <img src={logoUrl} alt="Logo" />
}
```

**Convención:** 
- Los SVGs viven en `src/assets/`
- Usa `?react` al final del import para obtener el componente
- Sin `?react` obtienes la URL del asset
- El componente respeta `className`, `style`, y props SVG estándar

## Configuración de enlaces

**Archivo:** `src/data/social-links.ts`

Edita el array `socialLinks` para actualizar:
- `platform` — Nombre de la plataforma
- `handle` — Tu usuario/handle
- `url` — URL completa a tu perfil
- `icon` — Emoji representativo
- `description` — Texto descriptivo corto

### Placeholders actuales

Todos los enlaces usan datos placeholder:
- URLs: `https://platform.com/egdev`
- Handles: `@egdev` o `egdev`

**Reemplaza con tus datos reales antes de deployment.**

## Estilo Visual

Reutiliza la línea visual de `agent-teams-docs`:

- **Fondo:** Negro puro `#000000` con grid pattern blanco al 2.5% de opacidad
- **Grid:** 40px × 40px
- **Canvas Effects:**
  - **HeroBokeh:** Partículas flotantes tipo bokeh fotográfico con gradientes radiales rojos, movimiento vertical ascendente con drift horizontal aleatorio, optimizado para mobile (30fps, menos partículas)
  - **MousePulse:** Trail del mouse + anillos expansivos en click, deshabilitado en touch devices
- **Tipografía:** Space Grotesk (weights 400, 500, 600, 700)
- **Brand color:** `#ff0036` (rojo neón vivid)
- **Hover effects:** 
  - Border neón rojo
  - Box shadow con múltiples capas de glow
  - Transform: translateY + scale
- **Transiciones:** 250ms ease con cubic-bezier para animaciones suaves

## Tokens de diseño

```css
--color-bg: #000000
--color-surface: #0a0a0a
--color-border: #1a1a1a
--color-brand-primary: #ff0036
--glow-intense: múltiples capas de box-shadow rojo
```

## Sin dependencias extra

- ❌ No usa Docusaurus
- ❌ No usa Tailwind
- ❌ No usa bibliotecas de iconos (usa emojis)
- ✅ Solo React + TypeScript + Vite
- ✅ CSS puro con variables nativas
- ✅ Google Fonts para tipografía

## Licencia

MIT
