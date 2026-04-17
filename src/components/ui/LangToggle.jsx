import { useLang } from '../../context/LangContext'

export default function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button onClick={toggle} data-cursor="hover"
      className="flex items-center gap-2 label-luxury"
      style={{ fontSize: '0.6rem' }}>
      <span style={{ color: lang === 'es' ? 'var(--color-text)' : 'rgba(240,237,232,0.35)' }}>ES</span>
      <span style={{ color: 'var(--color-accent)' }}>|</span>
      <span style={{ color: lang === 'en' ? 'var(--color-text)' : 'rgba(240,237,232,0.35)' }}>EN</span>
    </button>
  )
}
