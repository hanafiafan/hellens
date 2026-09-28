import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export function Footer() {
  const { language } = useLanguage()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!document.querySelector('link[href="/experience/main.css"]')) {
      const stylesheet = document.createElement('link')
      stylesheet.rel = 'stylesheet'
      stylesheet.href = '/experience/main.css'
      document.head.appendChild(stylesheet)
    }

    const initUnicorn = () => {
      if ((window as any).UnicornStudio?.init) {
        try {
          (window as any).UnicornStudio.init()
        } catch (e) {
          console.warn('UnicornStudio init error:', e)
        }
      } else {
        const existingScript = document.querySelector('script[src*="unicornStudio"]')
        if (!existingScript) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.8/dist/unicornStudio.umd.js'
          script.onload = () => {
            if ((window as any).UnicornStudio?.init) {
              try {
                (window as any).UnicornStudio.init()
              } catch (e) {
                console.warn('UnicornStudio init error:', e)
              }
            }
          }
          document.head.appendChild(script)
        }
      }
    }

    const timer = setTimeout(initUnicorn, 150)
    return () => clearTimeout(timer)
  }, [])

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    const email = 'hellensdev@gmail.com'
    navigator.clipboard?.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      window.location.href = `mailto:${email}`
    })
  }

  return (
    <footer className="section outro" aria-labelledby="outro-title">
      <div
        className="outro__fx"
        aria-hidden="true"
        data-us-project="HfdY3nAq99Kc0BCtuBfP"
        data-us-scale="1"
        data-us-dpi="1"
        data-us-fps="30"
      />
      <div className="outro__inner">
        <h2
          className="outro__title"
          id="outro-title"
          aria-label={language === 'id' ? 'MARI BANGUN HAL BESAR BERIKUTNYA' : 'LET’S BUILD THE NEXT BIG THING'}
        >
          <span>{language === 'id' ? 'MARI BANGUN' : 'LET’S BUILD'}</span>
          <span>{language === 'id' ? 'HAL BESAR BERIKUTNYA' : 'THE NEXT BIG THING'}</span>
        </h2>

        <a
          className="outro__social"
          href="https://wa.me/6285726465083"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <span className="outro__roll" aria-hidden="true">
            <span className="outro__roll-ch" style={{ '--i': 0 } as React.CSSProperties}><span>W</span><span>W</span></span>
            <span className="outro__roll-ch" style={{ '--i': 1 } as React.CSSProperties}><span>h</span><span>h</span></span>
            <span className="outro__roll-ch" style={{ '--i': 2 } as React.CSSProperties}><span>a</span><span>a</span></span>
            <span className="outro__roll-ch" style={{ '--i': 3 } as React.CSSProperties}><span>t</span><span>t</span></span>
            <span className="outro__roll-ch" style={{ '--i': 4 } as React.CSSProperties}><span>s</span><span>s</span></span>
            <span className="outro__roll-ch" style={{ '--i': 5 } as React.CSSProperties}><span>A</span><span>A</span></span>
            <span className="outro__roll-ch" style={{ '--i': 6 } as React.CSSProperties}><span>p</span><span>p</span></span>
            <span className="outro__roll-ch" style={{ '--i': 7 } as React.CSSProperties}><span>p</span><span>p</span></span>
          </span>
          <svg className="outro__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 17V7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a
          className="outro__mail"
          href="mailto:hellensdev@gmail.com"
          aria-label={copied ? 'Email copied to clipboard!' : 'Copy email to clipboard'}
          data-copy-button={copied ? 'copied' : ''}
          data-copy-email="hellensdev@gmail.com"
          onClick={handleCopyEmail}
        >
          <span className="copy-email-icon copy-email-icon--lg" aria-hidden="true">
            <span className="copy-email-icon__el" />
            <span className="copy-email-icon__el">
              <svg viewBox="0 0 36 36" fill="none">
                <path d="M7.5 22.5H6C5.20435 22.5 4.44129 22.1839 3.87868 21.6213C3.31607 21.0587 3 20.2956 3 19.5V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H19.5C20.2956 3 21.0587 3.31607 21.6213 3.87868C22.1839 4.44129 22.5 5.20435 22.5 6V7.5M16.5 13.5H30C31.6569 13.5 33 14.8431 33 16.5V30C33 31.6569 31.6569 33 30 33H16.5C14.8431 33 13.5 31.6569 13.5 30V16.5C13.5 14.8431 14.8431 13.5 16.5 13.5Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="copy-email-icon__el">
              <svg viewBox="0 0 36 36" fill="none">
                <path d="M30 9L13.5 25.5L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
          <span className="copy-email-text__wrap">
            <span data-copy-email-element="" className="copy-email-text__el">hellensdev@gmail.com</span>
            <span className="copy-email-text__el">Click to copy email</span>
            <span className="copy-email-text__el">Copied to clipboard!</span>
          </span>
        </a>
      </div>

      <div className="outro__meta">
        <span>© 2026 HELLENS DEVELOPER</span>
      </div>
    </footer>
  )
}

