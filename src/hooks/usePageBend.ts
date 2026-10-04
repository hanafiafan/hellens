import { useEffect } from 'react'
import { useGlBend } from './useGlBend'

// Reuses the landing page's fold effect (public/assets/page-bend-*.js): blocks curve away as they near the viewport bottom.
const bendUrl = '/assets/page-bend-Dj8UK15h.js'
const units = ':is(h1,h2,h3,p,dl,ul,form,.case-gallery,.next-case):not(:is(figure,article,li,dl,ul,.case-gallery) *)'

export function usePageBend() {
  useGlBend('.page-bend img')
  useEffect(() => {
    let dead = false
    let api: { destroy: () => void } | null = null
    import(/* @vite-ignore */ bendUrl).then((mod: { i: (root: Element | null, selector: string) => typeof api }) => {
      if (!dead) api = mod.i(document.querySelector('.page-bend'), `.page-bend ${units}`)
    }).catch(() => {})
    return () => { dead = true; api?.destroy() }
  }, [])
}
