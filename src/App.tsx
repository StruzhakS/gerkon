import { lazy, Suspense, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, BatteryCharging, Check, ChevronDown, Clock3, Gauge, Headphones, LoaderCircle, MapPin, Menu, Network, Phone, Router, Star, X } from 'lucide-react'
import { Brand } from './components/Brand'
import { advantages, contactDetails, faqs, settlements, steps, tariffs } from './data/siteData'
import type { LeadFormData } from './types'
import { normalizeUkrainianPhone } from './utils/validation'

const LeadModal = lazy(() => import('./components/LeadModal').then((module) => ({ default: module.LeadModal })))

const iconMap = { network: Network, battery: BatteryCharging, gauge: Gauge, clock: Clock3, headphones: Headphones, router: Router }
type QuickFormStatus = 'idle' | 'sending' | 'success'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoaded, setModalLoaded] = useState(false)
  const [selectedTariff, setSelectedTariff] = useState('')
  const [leadValues, setLeadValues] = useState<Partial<LeadFormData>>({})
  const [quickStatus, setQuickStatus] = useState<QuickFormStatus>('idle')
  const [quickError, setQuickError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  function openLead(tariff = '', values: Partial<LeadFormData> = {}) {
    setSelectedTariff(tariff)
    setLeadValues(values)
    setModalLoaded(true)
    setModalOpen(true)
  }

  async function submitQuickLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const phone = normalizeUkrainianPhone(String(fields.get('phone') || ''))
    if (!phone) {
      setQuickError('Введіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX.')
      return
    }

    setQuickError('')
    setQuickStatus('sending')
    try {
      const { submitLead } = await import('./services/LeadService')
      await submitLead({ name: String(fields.get('name') || '').trim(), phone, settlement: String(fields.get('settlement') || ''), street: '', building: '', tariff: '', comment: '' })
      setQuickStatus('success')
    } catch (submissionError) {
      setQuickStatus('idle')
      setQuickError(submissionError instanceof Error ? submissionError.message : 'Не вдалося надіслати заявку. Спробуйте ще раз.')
    }
  }

  const links = [['Тарифи', '#tariffs'], ['Переваги', '#why'], ['Покриття', '#coverage'], ['Контакти', '#contacts']]

  return (
    <>
      <header className="site-header" id="top">
        <div className="header-inner"><Brand /><nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Головна навігація">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><div className="header-actions"><a className="header-phone" href={`tel:${contactDetails.phone}`}><Phone size={16} />{contactDetails.displayPhone}</a><button className="button button--small button--primary header-cta" onClick={() => openLead()}>Залишити заявку <ArrowRight size={16} /></button></div><button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid"></div><div className="hero-orbit hero-orbit--one"></div><div className="hero-orbit hero-orbit--two"></div><div className="fiber-field" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div className="hero-inner">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <span className="status-pill"><span className="status-dot"></span> Оптика вже поруч</span>
              <h1 id="hero-title">Інтернет,<br />який <span>тримає зв’язок.</span></h1>
              <p className="hero-lead">Швидкісний оптоволоконний інтернет для дому та бізнесу. До 1 Гбіт/с — і стабільність, на яку можна покластися.</p>
              <div className="hero-ctas"><button className="button button--primary button--large" onClick={() => openLead()}>Перевірити адресу <ArrowRight size={18} /></button><a className="button button--outline button--large" href="#tariffs">Переглянути тарифи</a></div>
              <div className="hero-proof"><div className="proof-icon"><BatteryCharging size={18} /></div><span>Працює без світла<small>з резервним живленням</small></span><span className="proof-divider"></span><span className="proof-speed">до <b>1 Гбіт/с</b><small>швидкість GPON</small></span></div>
            </motion.div>
            <motion.aside className="hero-form-panel" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }}>
              <span className="form-index">01 / ПЕРЕВІРКА ПОКРИТТЯ</span><h2>Вашій адресі<br />пощастило?</h2><p>Перевіримо підключення без зайвих дзвінків.</p>
              {quickStatus === 'success' ? <div className="quick-success" role="status"><span className="success-icon"><Check size={23} /></span><h3>Дякуємо!</h3><p>Заявку отримано. Наш менеджер зв’яжеться з вами найближчим часом.</p><button type="button" className="text-link" onClick={() => setQuickStatus('idle')}>Надіслати ще одну заявку <ArrowRight size={15} /></button></div> : <form className="quick-form" onSubmit={submitQuickLead} onChange={() => setQuickError('')}><label>Як до вас звертатися<input required name="name" autoComplete="name" placeholder="Ваше ім’я" /></label><label>Номер телефону<input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+380 00 000 00 00" /></label><label>Де підключаємо?<select required name="settlement" defaultValue=""><option value="" disabled>Населений пункт</option>{settlements.map((settlement) => <option key={settlement}>{settlement}</option>)}<option>Інший населений пункт</option></select></label>{quickError && <p className="form-error" role="alert">{quickError}</p>}<button className="button button--primary button--full" type="submit" disabled={quickStatus === 'sending'}>{quickStatus === 'sending' ? <><LoaderCircle className="spin" size={17} /> Надсилаємо…</> : <>Перевірити можливість <ArrowRight size={17} /></>}</button><small>Безкоштовна перевірка · відповімо найближчим часом</small></form>}
              <div className="panel-corner" aria-hidden="true">G</div>
            </motion.aside>
          </div>
          <a className="scroll-cue" href="#tariffs"><span>ПРОКРУТІТЬ</span><ArrowDown size={16} /></a><div className="hero-coordinate">48°26′ ПІВНІЧ · ЗАКАРПАТТЯ</div>
        </section>

        <section className="tariffs-section section-wrap" id="tariffs">
          <div className="section-heading"><div><span className="eyebrow">Тарифні плани · GPON</span><h2>Швидкість під<br className="desktop-break" /> ваш ритм життя.</h2></div><p>Від щоденних справ до 4K-стримінгу — оберіть свою швидкість. Остаточні умови підтвердимо після перевірки адреси.</p></div>
          <div className="tariff-grid">{tariffs.map((tariff, index) => <motion.article className={`tariff-card${tariff.featured ? ' tariff-card--featured' : ''}`} key={tariff.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.07 }}>
            {tariff.featured && <span className="popular-label">ВИБІР РОДИН</span>}<span className="tariff-number">0{index + 1}</span><h3>{tariff.name}</h3><div className="tariff-speed"><strong>{tariff.speed}</strong><span>Мбіт/с</span></div><div className="speed-track"><span style={{ width: `${Math.min(100, Number(tariff.speed) / 10)}%` }}></span></div><ul>{tariff.benefits.map((benefit) => <li key={benefit}><Check size={15} />{benefit}</li>)}</ul><div className="tariff-price"><strong>{tariff.price}</strong><span>₴ <small>/ місяць</small></span></div><button className={`button ${tariff.featured ? 'button--primary' : 'button--outline-dark'} button--full`} onClick={() => openLead(tariff.name)}>Підключити <ArrowRight size={16} /></button>
          </motion.article>)}</div>
          <p className="price-note">* Вартість тарифів наведена як стартовий приклад і потребує підтвердження компанією перед публікацією.</p>
        </section>

        <section className="why-section" id="why"><div className="section-wrap"><div className="section-heading section-heading--light"><div><span className="eyebrow">Чому Геркон</span><h2>Зв’язок, створений<br />для вашого життя.</h2></div><p>Ми будуємо оптичну інфраструктуру, щоб сучасний інтернет був поруч — сьогодні й надалі.</p></div><div className="advantage-grid">{advantages.map((item, index) => { const Icon = iconMap[item.icon as keyof typeof iconMap]; return <article className="advantage-item" key={item.title}><span className="advantage-icon"><Icon size={21} /></span><span className="advantage-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article> })}</div></div></section>

        <section className="steps-section section-wrap"><div className="section-heading"><div><span className="eyebrow">Підключення без квестів</span><h2>Чотири кроки.<br />І ви онлайн.</h2></div><button className="text-link" onClick={() => openLead()}>Почати зараз <ArrowRight size={17} /></button></div><div className="steps-line">{steps.map((step, index) => <article className="step-item" key={step.number}><div className="step-marker"><span>{step.number}</span>{index < steps.length - 1 && <i />}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

        <section className="coverage-section" id="coverage"><div className="coverage-pattern"></div><div className="section-wrap coverage-inner"><div className="coverage-copy"><span className="eyebrow">Наша мережа</span><h2>Закарпаття<br />на зв’язку.</h2><p>Розвиваємо GPON-мережу в області. Перелік міст — лише орієнтир: перевіримо покриття саме за вашою адресою.</p><button className="button button--primary" onClick={() => openLead()}>Перевірити адресу <ArrowRight size={17} /></button><span className="coverage-map-label"><MapPin size={15} /> ЗАКАРПАТСЬКА ОБЛАСТЬ</span></div><div className="settlement-list">{settlements.map((town, index) => <div className="settlement-row" key={town}><span className="settlement-pin"><MapPin size={16} /></span><span>{town}</span><small>0{index + 1}</small></div>)}<div className="settlement-row settlement-row--more"><span className="settlement-pin"><ArrowRight size={15} /></span><span>Ваш населений пункт?</span><button onClick={() => openLead()}>Запитати</button></div></div></div></section>

        <section className="reviews-section section-wrap"><div className="section-heading"><div><span className="eyebrow">Відгуки</span><h2>Слова, яким<br />можна довіряти.</h2></div><p>Тут публікуватимуться відгуки клієнтів лише з їхньою згодою — без вигаданих оцінок.</p></div><div className="review-placeholder"><div className="review-stars" aria-label="Залиште свою оцінку"><Star /><Star /><Star /><Star /><Star /></div><div className="review-quote-mark">“</div><h3>Ваш досвід має значення.</h3><p>Щойно підключилися? Поділіться враженням — ваша історія допоможе сусідам обрати зв’язок.</p><a className="button button--outline-dark" href={contactDetails.telegram} target="_blank" rel="noreferrer">Залишити відгук <ArrowRight size={16} /></a></div></section>

        <section className="about-section"><div className="section-wrap about-inner"><div className="about-art"><div className="about-signal"><span></span><span></span><span></span><span></span><span></span></div><div className="about-art-label"><span>GERKON / 01</span><b>Мережа майбутнього<br />починається локально.</b></div></div><div className="about-copy"><span className="eyebrow">Про Геркон</span><h2>Будуємо зв’язок.<br /><span>Розвиваємо край.</span></h2><p>Геркон створює сучасну GPON-інфраструктуру в Закарпатті. Ми поєднуємо технології, уважність до людей і послідовний розвиток мережі, щоб якісний інтернет ставав доступнішим у містах та громадах області.</p><div className="about-points"><span><Check size={16} /> Оптична мережа GPON</span><span><Check size={16} /> Локальна команда</span><span><Check size={16} /> Розвиток інфраструктури краю</span></div><button className="text-link" onClick={() => openLead()}>Дізнатися про підключення <ArrowRight size={17} /></button></div></div></section>

        <section className="faq-section section-wrap" id="faq"><div className="section-heading"><div><span className="eyebrow">FAQ</span><h2>Коротко про<br />головне.</h2></div><p>Не знайшли відповідь? Напишіть або залиште номер — допоможемо розібратись.</p></div><div className="faq-list">{faqs.map((faq, index) => <article className={`faq-item${openFaq === index ? ' faq-item--open' : ''}`} key={faq.question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.question}</span><ChevronDown size={19} /></button>{openFaq === index && <p>{faq.answer}</p>}</article>)}</div></section>

        <section className="final-cta"><div className="section-wrap final-cta-inner"><div><span className="eyebrow">Наступний крок — простий</span><h2>Перевіримо вашу<br />адресу разом?</h2></div><div className="final-cta-action"><p>Одна коротка заявка — і ви знатимете, чи є GPON поруч.</p><button className="button button--primary button--large" onClick={() => openLead()}>Залишити заявку <ArrowRight size={18} /></button><small>Безкоштовно · без зобов’язань</small></div></div></section>
      </main>

      <footer className="site-footer" id="contacts"><div className="section-wrap"><div className="footer-main"><div className="footer-brand"><Brand /><p>Будуємо GPON-мережу<br />в Закарпатті.</p></div><div className="footer-column"><span>ЗВ’ЯЗОК</span><a href={`tel:${contactDetails.phone}`}><Phone size={15} />{contactDetails.displayPhone}</a><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a><a href={contactDetails.telegram} target="_blank" rel="noreferrer">Telegram <ArrowRight size={14} /></a></div><div className="footer-column"><span>МИ ТУТ</span><p>{contactDetails.address}</p><p>{contactDetails.hours}</p><a href="#coverage">Перевірити покриття <ArrowRight size={14} /></a></div><button className="footer-apply" onClick={() => openLead()}>Підключити інтернет <ArrowRight size={18} /></button></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ГЕРКОН · GPON ЗАКАРПАТТЯ</span><a href="#top">НА ПОЧАТОК ↑</a><span>ЯКІСНИЙ ЗВ’ЯЗОК — БЛИЖЧЕ, НІЖ ЗДАЄТЬСЯ</span></div></div></footer>

      <div className="floating-actions"><a className="floating-button floating-button--telegram" href={contactDetails.telegram} target="_blank" rel="noreferrer" aria-label="Написати в Telegram" title="Написати в Telegram"><span className="telegram-glyph">➤</span></a><a className="floating-button floating-button--call" href={`tel:${contactDetails.phone}`} aria-label="Зателефонувати" title="Зателефонувати"><Phone size={20} /></a></div>
      <div className="mobile-sticky-cta"><button className="button button--primary button--full" onClick={() => openLead()}>Перевірити підключення <ArrowRight size={17} /></button></div>
      {modalLoaded && <Suspense fallback={null}><LeadModal open={modalOpen} onClose={() => setModalOpen(false)} selectedTariff={selectedTariff} initialValues={leadValues} /></Suspense>}
    </>
  )
}