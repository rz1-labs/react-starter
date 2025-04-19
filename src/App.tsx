import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axiosLogo from './assets/axios.svg'
import reactRouterLogo from './assets/react-router.svg'
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
]

function App() {
  const [message, setMessage] = useState('Welcome!')

  const mouseHoverHandler = (tool: Tool) => {
    setMessage(`${tool.name} v${tool.version.substring(1)}`)
  }

  return (
    <>
      <h1>{message}</h1>
      <div>
        {stack.map((tool) => (
          <a
            href={tool.href}
            target="_blank"
            onMouseOver={() => mouseHoverHandler(tool)}
          >
            <img
              src={tool.logo}
              className={`logo ${tool.name}`}
              alt={`${tool.name} logo`}
            />
          </a>
        ))}
      </div>
    </>
  )
}

export default App
