import { useState, useEffect, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import typescriptLogo from './assets/typescript.svg'
import i18nextLogo from './assets/i18next.svg'
import locizeLogo from './assets/locize.svg'
import hourglass from './assets/hourglass.webp'
import './App.css'
import { useTranslation, Trans } from 'react-i18next'

type LngRet = { [lng: string]: { nativeName: string } }

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()
  const [lngs, setLngs] = useState<LngRet>({ en: { nativeName: 'English' }})

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err: unknown, ret: LngRet) => {
      if (err) return // TODO: handle err...
      setLngs(ret)
    })
  }, [i18n])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img src={typescriptLogo} className="logo typescript" alt="TypeScript logo" />
        </a>
        <a href="https://www.i18next.com" target="_blank">
          <img src={i18nextLogo} className="logo i18next" alt="i18next logo" />
        </a>
        <a href="https://www.locize.com" target="_blank">
          <img src={locizeLogo} className="logo locize" alt="locize logo" />
        </a>
      </div>
      <h1>Vite + React + TypeScript + i18next + locize</h1>
      <div className="card">
        {Object.keys(lngs).map((lng) => {
          const isSelected = i18n.resolvedLanguage === lng
          return (
            <button
              key={lng}
              type="submit"
              disabled={isSelected}
              onClick={() => {
                i18n.changeLanguage(lng)
                setCount(count + 1)
              }}
            >
              {lngs[lng].nativeName.split(',')[0]}
            </button>
          )
        })}
        <p>
          <i>{t('counter', { count })}</i>
        </p>

        <p>
          <Trans i18nKey="editCode">
            Edit <code>src/App.tsx</code> and save to test HMR
          </Trans>
        </p>
      </div>
      <p className="read-the-docs">
        {t('clickLogos')}
      </p>
    </>
  )
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback={<img src={hourglass} className="hourglass" alt="loading" />}>
      <App />
    </Suspense>
  )
}