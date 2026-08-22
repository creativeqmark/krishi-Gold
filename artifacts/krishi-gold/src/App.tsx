import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import markPath from '@assets/krishi-gold-mark_1787373769982.png';
import montagePath from '@assets/file_000000003d5c8208a43fda8d3a4a5a2b_1787311627424_1787373770045.png';

const queryClient = new QueryClient();

type IconName = 'menu' | 'phone' | 'arrow' | 'drop' | 'leaf' | 'shield' | 'heart' | 'seed' | 'check' | 'mail' | 'pin' | 'whatsapp' | 'spark';

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (name === 'menu') return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
  if (name === 'phone') return <svg {...common}><path d="M6.5 3.8 9 3l2 4.6-2.1 1.7a14.6 14.6 0 0 0 5.8 5.8l1.7-2.1 4.6 2-.8 2.5a2 2 0 0 1-2.1 1.4C10.8 18.1 5.9 13.2 3.1 5.9a2 2 0 0 1 1.4-2.1Z" /></svg>;
  if (name === 'arrow') return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  if (name === 'drop') return <svg {...common}><path d="M12 3s6 6.1 6 11a6 6 0 1 1-12 0c0-4.9 6-11 6-11Z" /><path d="M9.5 15.5a3 3 0 0 0 2.5 1.5" /></svg>;
  if (name === 'leaf') return <svg {...common}><path d="M19.5 4.5C11 4.3 5.8 7.1 5.4 12.4c-.3 4.1 3.1 6.4 6.3 5.2 4.6-1.8 6-7.2 7.8-13.1Z" /><path d="M4 21c3.5-5 7-8.2 13.5-12.5" /></svg>;
  if (name === 'shield') return <svg {...common}><path d="m12 3 7 3v5.4c0 4.5-2.8 7.6-7 9.6-4.2-2-7-5.1-7-9.6V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (name === 'heart') return <svg {...common}><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" /></svg>;
  if (name === 'seed') return <svg {...common}><ellipse cx="12" cy="12" rx="4.2" ry="7" transform="rotate(38 12 12)" /><path d="M12 19V9M8.5 12.2 12 14M15.5 9.5 12 12" /></svg>;
  if (name === 'check') return <svg {...common}><path d="m5 12.5 4.2 4L19 7" /></svg>;
  if (name === 'mail') return <svg {...common}><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === 'pin') return <svg {...common}><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
  if (name === 'whatsapp') return <svg {...common}><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.3 2 1.5 3.3 3.5 4.3 1.1.5 1.5-.4 2-.9l1.3.6c.3.2.2.8-.1 1.2-.7.9-2.1.8-3.3.3-2.5-1-4.5-3-5.3-5.2-.4-1.2.1-2.5 1-2.7.5-.1.8.1 1 .6l.4 1.1-.5.7Z" /></svg>;
  return <svg {...common}><path d="m12 3 1.2 5.8L19 10l-5.8 1.2L12 17l-1.2-5.8L5 10l5.8-1.2L12 3Z" /><path d="m19 16 .5 2.5L22 19l-2.5.5L19 22l-.5-2.5L16 19l2.5-.5L19 16Z" /></svg>;
}

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Why Krishi Gold', '#why'],
  ['Products', '#products'],
  ['Our Process', '#process'],
  ['Talk to Us', '#talk'],
  ['Contact', '#contact'],
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="kg-nav" data-testid="header-site">
      <div className="kg-shell kg-nav-inner">
        <a href="#home" className="kg-brand" data-testid="link-home-logo">
          <img src={markPath} alt="Krishi Gold mark" />
          <span className="kg-brand-word"><strong>Krishi Gold</strong>Enterprises</span>
        </a>
        <button className="kg-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" data-testid="button-toggle-navigation"><Icon name="menu" size={22} /></button>
        <nav className={`kg-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
          <a href="tel:+919450466097" className="kg-button kg-button-gold" data-testid="link-call-header"><Icon name="phone" size={14} /> Talk to Us</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="kg-hero">
      <div className="kg-shell kg-hero-grid">
        <div className="kg-reveal">
          <div className="kg-eyebrow" data-testid="text-hero-eyebrow">Pure · Natural · Trusted</div>
          <h1 data-testid="text-hero-title">Pure Mustard Oil.<br /><em>Purely Krishi Gold.</em></h1>
          <p className="kg-hero-copy" data-testid="text-hero-description">Natural goodness, trusted quality and the richness of carefully selected mustard seeds — pressed with care in every drop.</p>
          <div className="kg-hero-actions">
            <a href="#products" className="kg-button kg-button-gold" data-testid="link-explore-products">Explore Products <Icon name="arrow" size={15} /></a>
            <a href="#talk" className="kg-button kg-button-outline" data-testid="link-talk-hero"><Icon name="phone" size={14} /> Talk to Us</a>
          </div>
        </div>
        <div className="kg-hero-art kg-reveal kg-delay-1" data-testid="image-hero-products">
          <div className="kg-sun" />
          <span className="kg-seed s1" /><span className="kg-seed s2" /><span className="kg-seed s3" /><span className="kg-seed s4" />
          <img className="kg-product-img" src={montagePath} alt="Krishi Gold mustard oil collection" />
        </div>
      </div>
    </section>
  );
}

const quickMarks = [
  { icon: 'drop' as IconName, title: '100% Pure', copy: 'Nothing extra' },
  { icon: 'leaf' as IconName, title: 'Natural & Healthy', copy: 'Goodness within' },
  { icon: 'shield' as IconName, title: 'Quality Assured', copy: 'Tested with care' },
  { icon: 'heart' as IconName, title: 'Goodness in Every Drop', copy: 'Made for families' },
];

function QuickMarks() {
  return <div className="kg-shell kg-cream" style={{ borderRadius: 18 }} data-testid="section-trust-marks"><div className="kg-mark-row">{quickMarks.map((item, index) => <div className="kg-mark-card" key={item.title} data-testid={`card-trust-${index}`}><div className="kg-icon-disc"><Icon name={item.icon} size={20} /></div><strong>{item.title}</strong><span>{item.copy}</span></div>)}</div></div>;
}

const benefits = [
  { icon: 'drop' as IconName, title: 'Pure & Natural', text: '100% pure mustard oil with no shortcuts.' },
  { icon: 'seed' as IconName, title: 'Carefully Selected Seeds', text: 'The best mustard seeds from trusted farms.' },
  { icon: 'leaf' as IconName, title: 'Cold Pressed Goodness', text: 'Traditional cold pressing for rich flavour.' },
  { icon: 'shield' as IconName, title: 'Quality Assured', text: 'Strict quality checks at every step.' },
  { icon: 'heart' as IconName, title: 'Traditional Care', text: 'Backed by Indian tradition and taste.' },
  { icon: 'check' as IconName, title: 'Trusted Purity', text: 'Millions of meals, one trusted brand.' },
];

function About() {
  return (
    <section id="about" className="kg-section">
      <div className="kg-shell kg-about-grid">
        <div className="kg-about-card kg-reveal" data-testid="image-about-product">
          <img src={montagePath} alt="Krishi Gold mustard oil bottle" />
          <span className="kg-leaf-stroke" />
        </div>
        <div className="kg-reveal kg-delay-1">
          <div className="kg-eyebrow">Our story</div>
          <h2 className="kg-title" data-testid="text-about-title">About Krishi Gold</h2>
          <p className="kg-section-lead" data-testid="text-about-description">Krishi Gold is a premium mustard oil brand built on purity, quality and trust. We bring you the natural goodness of carefully selected mustard seeds, processed with care to deliver rich flavours, strong aroma and maximum nutrition.</p>
          <p className="kg-section-lead" style={{ marginTop: 14 }}>Our mission is simple — to provide every home with pure, natural and healthy mustard oil that you can trust.</p>
          <p className="kg-gold" style={{ fontSize: 12, fontWeight: 700, marginTop: 19 }}>— Prakash Kumar Bharti · Owner</p>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="kg-section kg-dark-section">
      <div className="kg-shell">
        <div className="kg-eyebrow">The Krishi Gold difference</div>
        <h2 className="kg-title" data-testid="text-why-title">Why Krishi Gold?</h2>
        <p className="kg-section-lead">The everyday goodness your family deserves, made with a little more care at every stage.</p>
        <div className="kg-benefits">{benefits.map((benefit, index) => <article className="kg-benefit" key={benefit.title} data-testid={`card-benefit-${index}`}><div className="kg-gold"><Icon name={benefit.icon} size={23} /></div><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div>
      </div>
    </section>
  );
}

const products = [
  { size: '500 ml', price: '₹130', label: 'Perfect for everyday cooking' },
  { size: '1 Litre', price: '₹240', label: 'The family kitchen favourite', featured: true },
  { size: '5 Litre', price: '₹1,175', label: 'Goodness for every gathering' },
];

function Products() {
  return (
    <section id="products" className="kg-section">
      <div className="kg-shell">
        <div className="kg-products-head"><div><div className="kg-eyebrow">Our range</div><h2 className="kg-title" data-testid="text-products-title">Our Mustard Oil</h2><p className="kg-section-lead">Choose the pack that fits your needs.</p></div><a href="#contact" className="kg-button kg-button-outline" data-testid="link-products-contact">Ask about availability <Icon name="arrow" size={15} /></a></div>
        <div className="kg-products-grid">
          {products.map((product, index) => <article className={`kg-product-card ${product.featured ? 'featured' : ''}`} key={product.size} data-testid={`card-product-${product.size.replace(' ', '-').toLowerCase()}`}>
            <div className="kg-product-photo"><img src={montagePath} alt={`Krishi Gold ${product.size} mustard oil`} /></div>
            <h3>Krishi Gold<br />Mustard Oil</h3><p>{product.label}</p>
            <div className="kg-product-meta"><div><span className="kg-size">{product.size}</span><span className="kg-price">{product.price}</span></div><a className="kg-button kg-button-dark" href="#contact" data-testid={`link-enquire-product-${index}`}><Icon name="whatsapp" size={15} /> Enquire</a></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  ['Quality Seeds', 'Selected with care'],
  ['Cleaning', 'Pure from the start'],
  ['Cold Pressed Extraction', 'Rich natural flavour'],
  ['Filtration', 'Clear and clean'],
  ['Packaging', 'Ready for your home'],
];

function Process() {
  return (
    <section id="process" className="kg-section kg-process-light">
      <div className="kg-shell kg-process-grid">
        <div><div className="kg-eyebrow">From farm to home</div><h2 className="kg-title" data-testid="text-process-title">Our Process</h2><p className="kg-section-lead">Carefully handled from seed to bottle, so every pour keeps the character of the mustard seed.</p><div className="kg-process-list">{processSteps.map(([title, copy], index) => <div className="kg-process-step" key={title} data-testid={`step-process-${index}`}><div className="kg-step-num">{index + 1}</div><strong>{title}</strong><small>{copy}</small></div>)}</div></div>
        <div className="kg-process-aside" data-testid="card-process-promise"><div className="kg-gold"><Icon name="spark" size={25} /></div><h3>Every drop keeps its honest character.</h3><p>We preserve the aroma, colour and natural goodness your family has loved for generations.</p><a href="#talk" className="kg-button kg-button-gold" data-testid="link-process-talk">Talk to our team <Icon name="arrow" size={15} /></a></div>
      </div>
      <div className="kg-shell kg-testimonial"><div><blockquote>“Pure mustard oil, made for pure moments around the family table.”</blockquote><cite>Krishi Gold Enterprises</cite></div></div>
    </section>
  );
}

function ContactCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return <div className="kg-contact-card" data-testid={`card-contact-${title.toLowerCase()}`}><div className="kg-icon-disc"><Icon name={icon} size={19} /></div><div><h3>{title}</h3><p>{children}</p></div></div>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };
  return (
    <section id="talk" className="kg-section">
      <div className="kg-shell kg-contact-wrap">
        <div>
          <div className="kg-eyebrow">We'd love to hear from you</div><h2 className="kg-title" data-testid="text-contact-title">Talk to Us</h2><p className="kg-section-lead">We’re here to help with your questions, orders and anything else you’d like to know.</p>
          <div className="kg-contact-cards">
            <ContactCard icon="phone" title="Phone">+91 94504660972{'\n'}7480033168</ContactCard>
            <ContactCard icon="mail" title="Email">krishigold@gmail.com</ContactCard>
            <ContactCard icon="pin" title="Address">Pipra, Madhepur,{'\n'}Madhubani, Bihar - 847408</ContactCard>
            <ContactCard icon="whatsapp" title="WhatsApp">95044660972</ContactCard>
          </div>
        </div>
        <form className="kg-contact-form" onSubmit={submit} data-testid="form-contact">
          <div className="kg-eyebrow" style={{ color: '#9a710b' }}>Send a message</div><h3 className="kg-title" style={{ fontSize: 32, marginTop: 10 }}>Let’s connect.</h3>
          <div className="kg-form-grid">
            <div className="kg-field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="How should we call you?" data-testid="input-name" /></div>
            <div className="kg-field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" required placeholder="+91" data-testid="input-phone" /></div>
            <div className="kg-field full"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="Tell us what you need..." data-testid="input-message" /></div>
          </div>
          <button type="submit" className="kg-button kg-button-dark" style={{ marginTop: 18 }} data-testid="button-submit-contact">{sent ? <><Icon name="check" size={15} /> Message received</> : <>Send message <Icon name="arrow" size={15} /></>}</button>
          <p className="kg-form-note" data-testid="text-contact-note">{sent ? 'Thank you. A member of our team will get back to you shortly.' : 'Usually replies within one working day.'}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="kg-footer" id="contact"><div className="kg-shell kg-footer-grid"><div><a href="#home" className="kg-brand" data-testid="link-footer-logo"><img src={markPath} alt="Krishi Gold mark" /><span className="kg-brand-word"><strong>Krishi Gold</strong>Enterprises</span></a><p>Premium mustard oil made with natural goodness, rich flavour and trusted quality. For a healthier tomorrow, choose Krishi Gold.</p><span className="kg-gold" style={{ fontSize: 11, letterSpacing: '.13em' }}>Pure · Natural · Trusted</span></div><div><h3>Explore</h3><div className="kg-footer-links">{navItems.slice(0, 5).map(([label, href]) => <a key={href} href={href} data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}</div></div><div><h3>Reach us</h3><div className="kg-footer-links"><a href="tel:+919450466097" data-testid="link-footer-phone">+91 94504660972</a><a href="mailto:krishigold@gmail.com" data-testid="link-footer-email">krishigold@gmail.com</a><a href="#talk" data-testid="link-footer-message">Send a message</a></div></div></div><div className="kg-shell kg-footer-bottom"><span>© 2024 Krishi Gold. All rights reserved.</span><span>Made for Indian homes, with care.</span></div></footer>;
}

function Home() {
  return <div className="kg-page"><Header /><main><Hero /><QuickMarks /><About /><Why /><Products /><Process /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;