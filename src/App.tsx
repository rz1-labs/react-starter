import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axiosLogo from './assets/axios.svg'
import reactRouterLogo from './assets/react-router.svg'
import tailwindcssLogo from './assets/tailwindcss.svg'
import daisyuiLogo from './assets/daisyui.svg'
import './App.css'
import meta from '../package.json'

interface Tool {
  name: string
  href: string
  version: string
  logo?: string
}

const stack: Tool[] = [
  {
    name: 'vite',
    href: 'https://vite.dev',
    version: meta.devDependencies['vite'],
    logo: viteLogo,
  },
  {
    name: 'react',
    href: 'https://react.dev',
    version: meta.dependencies['react'],
    logo: reactLogo,
  },
  {
    name: 'axios',
    href: 'https://axios-http.com/',
    version: meta.dependencies['axios'],
    logo: axiosLogo,
  },
  {
    name: 'react-router',
    href: 'https://reactrouter.com/',
    version: meta.dependencies['react-router'],
    logo: reactRouterLogo,
  },
  {
    name: 'tailwindcss',
    href: 'https://tailwindcss.com/',
    version: meta.dependencies['tailwindcss'],
    logo: tailwindcssLogo,
  },
  {
    name: 'daisyui',
    href: 'https://daisyui.com/',
    version: meta.dependencies['daisyui'],
    logo: daisyuiLogo,
  },
]

function App() {
  const [message, setMessage] = useState('Welcome!')

  const mouseHoverHandler = (tool: Tool) => {
    setMessage(`${tool.name} v${tool.version.substring(1)}`)
  }

  return (
    <>
      <h1>{message}</h1>
      <div className="divider mb-6"></div>
      <div className="flex">
        {stack.map((tool) => (
          <a
            href={tool.href}
            target="_blank"
            onMouseOver={() => mouseHoverHandler(tool)}
          >
            <div className="avatar indicator">
              <span className="indicator-item badge badge-secondary">
                {tool.name}
                {tool.version}
              </span>
              <img
                src={tool.logo}
                className={`logo ${tool.name}`}
                alt={`${tool.name} logo`}
              />
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

export default App
