import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useLang } from '../context/LangContext'

export default function PrivacyPage() {
  const navigate = useNavigate()
  const { lang } = useLang()

  const today = new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  const sections = lang === 'es' ? [
    {
      title: '1. Responsable del tratamiento',
      body:  'Luminal es el responsable del tratamiento de los datos personales facilitados a través de este sitio web de presentación comercial.',
    },
    {
      title: '2. Datos que recogemos',
      body:  'Recogemos exclusivamente los datos que usted nos facilita voluntariamente a través del formulario de presupuesto: nombre, teléfono, correo electrónico, sistema de interés y cualquier mensaje adicional. En el caso de clientes con obra en curso, gestionamos también los datos asociados al contrato (código de obra, dirección, sistemas instalados).',
    },
    {
      title: '3. Finalidad del tratamiento',
      body:  'Sus datos son utilizados para: (a) elaborar y enviar presupuestos, (b) contactarle para concertar visitas técnicas o llamadas, (c) dar seguimiento a su obra en el portal de cliente, y (d) remitirle documentación comercial relacionada con su consulta. No se utilizarán para ningún otro fin sin su consentimiento.',
    },
    {
      title: '4. Base legal',
      body:  'El tratamiento se basa en el consentimiento expreso del interesado (art. 6.1.a RGPD), prestado mediante la aceptación de la presente política en el formulario. Puede retirar su consentimiento en cualquier momento.',
    },
    {
      title: '5. Conservación',
      body:  'Los datos se conservarán durante el tiempo necesario para atender su solicitud y cumplir con las obligaciones legales aplicables. Los datos de presupuestos no aceptados se eliminarán transcurridos 24 meses.',
    },
    {
      title: '6. Sus derechos',
      body:  'De conformidad con el RGPD y la LOPDGDD, usted tiene derecho a acceder, rectificar, suprimir, oponerse, portar y limitar el tratamiento de sus datos personales. Para ejercer estos derechos, puede contactar con nosotros a través de los canales indicados en este sitio.',
    },
    {
      title: '7. Analítica anónima',
      body:  'Esta aplicación registra de forma anónima la navegación por las distintas páginas para entender qué sistemas despiertan más interés. No se utilizan cookies de terceros ni se recoge información personal hasta que usted envía voluntariamente el formulario de presupuesto.',
    },
  ] : [
    {
      title: '1. Data Controller',
      body:  'Luminal is responsible for processing the personal data provided through this commercial presentation website.',
    },
    {
      title: '2. Data We Collect',
      body:  'We collect only the data you voluntarily provide through the quote form: name, phone number, email, system of interest, and any additional message. For clients with ongoing projects, we also manage data associated with the contract (project code, address, installed systems).',
    },
    {
      title: '3. Purpose of Processing',
      body:  'Your data is used to: (a) prepare and send quotes, (b) contact you to arrange technical visits or calls, (c) provide project tracking through the client portal, and (d) send commercial documentation related to your enquiry. It will not be used for any other purpose without your consent.',
    },
    {
      title: '4. Legal Basis',
      body:  "Processing is based on the data subject's express consent (Art. 6.1.a GDPR), given by accepting this policy in the form. You may withdraw your consent at any time.",
    },
    {
      title: '5. Retention',
      body:  'Data will be retained for as long as necessary to attend to your request and comply with applicable legal obligations. Data from non-accepted quotes will be deleted after 24 months.',
    },
    {
      title: '6. Your Rights',
      body:  'In accordance with the GDPR, you have the right to access, rectify, erase, object to, port, and restrict the processing of your personal data. To exercise these rights, please contact us through the channels listed on this site.',
    },
    {
      title: '7. Anonymous Analytics',
      body:  'This application anonymously records browsing across the different pages to understand which systems generate the most interest. No third-party cookies are used and no personal information is collected until you voluntarily submit the quote form.',
    },
  ]

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(91,143,168,0.12)' }}>
          <button onClick={() => navigate(-1)} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.45)'}>
            <ChevronLeft size={14} />
            {lang === 'es' ? 'Volver' : 'Back'}
          </button>
          <span className="label-luxury text-text/40 hidden sm:block" style={{ fontSize: '0.55rem' }}>
            LUMINAL
          </span>
          <LangToggle />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-10 flex flex-col gap-8">
            <div>
              <p className="label-luxury mb-2"
                style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(91,143,168,0.65)' }}>
                {lang === 'es' ? 'INFORMACIÓN LEGAL' : 'LEGAL INFORMATION'}
              </p>
              <h1 className="display-heading text-text"
                style={{ fontSize: 'clamp(1.1rem,4vw,1.8rem)', letterSpacing: '0.1em' }}>
                {lang === 'es' ? 'POLÍTICA DE PRIVACIDAD' : 'PRIVACY POLICY'}
              </h1>
              <p className="label-luxury mt-2" style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.5)' }}>
                {lang === 'es' ? `Última actualización: ${today}` : `Last updated: ${today}`}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {sections.map(s => (
                <div key={s.title}
                  style={{ borderTop: '1px solid rgba(91,143,168,0.12)', paddingTop: '1.25rem' }}>
                  <p className="label-luxury mb-3"
                    style={{ fontSize: '0.58rem', color: 'var(--color-accent)', letterSpacing: '0.1em' }}>
                    {s.title}
                  </p>
                  <p className="font-sans font-light text-text/60"
                    style={{ fontSize: '0.82rem', lineHeight: 1.85 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4" style={{ borderTop: '1px solid rgba(91,143,168,0.15)' }}>
              <button onClick={() => navigate(-1)} data-cursor="hover"
                className="label-luxury px-6 py-3 transition-all duration-300"
                style={{ border: '1px solid rgba(91,143,168,0.35)', color: 'rgba(91,143,168,0.75)', fontSize: '0.58rem' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(91,143,168,0.35)'; e.currentTarget.style.color = 'rgba(91,143,168,0.75)' }}>
                {lang === 'es' ? '← Volver' : '← Back'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
