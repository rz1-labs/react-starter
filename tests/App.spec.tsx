import { userEvent } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

import App from '../src/App'
import meta from '../package.json'

type ToolExpectation = {
  name: string
  href: string
  version: string
}

const tools: ToolExpectation[] = [
  {
    name: 'vite',
    href: 'https://vite.dev',
    version: meta.devDependencies.vite,
  },
  {
    name: 'react',
    href: 'https://react.dev',
    version: meta.dependencies.react,
  },
  {
    name: 'axios',
    href: 'https://axios-http.com/',
    version: meta.dependencies.axios,
  },
  {
    name: 'react-router',
    href: 'https://reactrouter.com/',
    version: meta.dependencies['react-router'],
  },
]

const getToolAnchor = (container: HTMLElement, href: string) => {
  const anchor = container.querySelector(`a[href="${href}"]`)

  if (!anchor) {
    throw new Error(`Expected anchor with href ${href}`)
  }

  return anchor
}

describe('App', () => {
  it('renders the welcome heading and all tool cards', async () => {
    const screen = await render(<App />)

    await expect
      .element(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Welcome!')

    expect(screen.container.querySelectorAll('a')).toHaveLength(tools.length)

    for (const tool of tools) {
      await expect
        .element(screen.getByRole('img', { name: `${tool.name} logo` }))
        .toBeVisible()
    }
  })

  it('updates the heading message when each tool is hovered', async () => {
    const screen = await render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })

    for (const tool of tools) {
      const anchor = getToolAnchor(screen.container, tool.href)
      await userEvent.hover(anchor)

      await expect
        .element(heading)
        .toHaveTextContent(`${tool.name} v${tool.version.substring(1)}`)
    }
  })

  it('derives displayed versions from package metadata and normalizes prefixes', async () => {
    const screen = await render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })

    for (const tool of tools) {
      const anchor = getToolAnchor(screen.container, tool.href)
      await userEvent.hover(anchor)

      const normalizedVersion = tool.version.substring(1)
      await expect
        .element(heading)
        .toHaveTextContent(`${tool.name} v${normalizedVersion}`)

      expect(tool.version.startsWith('^')).toBe(true)
      expect(normalizedVersion.includes('^')).toBe(false)
    }
  })

  it('provides link target behavior and alt text conventions for each tool', async () => {
    const screen = await render(<App />)

    for (const tool of tools) {
      const anchor = getToolAnchor(screen.container, tool.href)

      expect(anchor).toHaveAttribute('href', tool.href)
      expect(anchor).toHaveAttribute('target', '_blank')

      await expect
        .element(screen.getByRole('img', { name: `${tool.name} logo` }))
        .toBeVisible()
    }
  })
})
