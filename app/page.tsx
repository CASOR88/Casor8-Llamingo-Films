'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  { n: '01', title: 'Estrategia & creatividad', detail: 'Conceptos de campaña, comunicación, investigación y dirección creativa para convertir objetivos en ideas relevantes.' },
  { n: '02', title: 'Producción audiovisual', detail: 'Comerciales, contenido, videoclips, animación 2D/3D y producciones que sostienen una idea hasta el último frame.' },
  { n: '03', title: 'Experiencias & BTL', detail: 'Activaciones, eventos y experiencias de marca que llevan la campaña de la pantalla a la calle.' },
  { n: '04', title: 'Digital & performance', detail: 'Estrategia digital, social media, pauta, analítica, contenido y productos web orientados a resultados.' },
];

const projects = [
  { client: 'MAGGI', name: 'La parada del sabor', tag: 'Campaña ATL', className: 'project-red' },
  { client: 'YANBAL', name: 'Alma Latina', tag: 'Producción', className: 'project-blue' },
  { client: 'SVELTY', name: '¿Qué te mueve?', tag: 'Brand film', className: 'project-lime' },
];

function LlamingoGuide() {
  const [position, setPosition] = useState({ x: 50, y: 55 });
  const [look, setLook] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        setPosition({ x, y });
        setLook({ x: Math.max(-4, Math.min(4, (x - 50) / 10)), y: Math.max(-3, Math.min(3, (y - 45) / 14)) });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="llama-orbit" aria-hidden="true" style={{ '--cursor-x': `${position.x}%`, '--cursor-y': `${position.y}%`, '--look-x': `${look.x}px`, '--look-y': `${look.y}px` } as React.CSSProperties}>
      <div className="llama-trail" />
      <div className="llama-head">
        <span className="llama-ear ear-left" /><span className="llama-ear ear-right" />
        <span className="llama-hair h1" /><span className="llama-hair h2" /><span className="llama-hair h3" />
        <span className="llama-eye eye-left"><i /></span><span className="llama-eye eye-right"><i /></span>
        <span className="llama-snout"><i /></span>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#inicio" aria-label="Llamingo Films, inicio">LLAMINGO<span>®</span></a>
        <nav aria-label="Navegación principal"><a href="#trabajo">Trabajo</a><a href="#servicios">Servicios</a><a href="#nosotros">Nosotros</a></nav>
        <a className="nav-cta" href="#contacto">Iniciar proyecto <span>↗</span></a>
      </header>
      <section className="hero" id="inicio">
        <div className="grain" />
        <LlamingoGuide />
        <p className="eyebrow hero-enter delay-1">Agencia creativa + productora audiovisual · Quito, EC</p>
        <h1 className="hero-title" aria-label="Ideas que se vuelven imposibles de ignorar">
          <span className="hero-enter delay-2">IDEAS QUE SE</span>
          <span className="outline hero-enter delay-3">VUELVEN IMPOSIBLES</span>
          <span className="hero-enter delay-4">DE IGNORAR.</span>
        </h1>
        <div className="hero-bottom hero-enter delay-5">
          <p>Publicidad, producción y experiencias que mueven marcas — y personas.</p>
          <a className="circle-cta" href="#trabajo" aria-label="Ver trabajos"><span>VER<br />TRABAJOS</span><i>↓</i></a>
        </div>
        <div className="direction-line"><span>Tu cursor dirige la escena</span></div>
      </section>

      <section className="manifesto" id="nosotros">
        <p className="section-kicker">[ Por qué Llamingo ]</p>
        <div className="manifesto-grid">
          <h2>No hacemos<br />contenido.<br /><em>Hacemos que<br />algo pase.</em></h2>
          <div className="manifesto-copy">
            <p className="big-copy">18 años convirtiendo retos de marcas en historias que la gente decide mirar.</p>
            <p>Somos una agencia creativa y productora ecuatoriana. Entendemos el territorio, la cultura y el oficio de llevar una idea desde el concepto hasta la pantalla, la calle y los resultados.</p>
            <a className="text-link" href="#servicios">Descubre cómo trabajamos <span>→</span></a>
          </div>
        </div>
        <div className="stats" aria-label="Datos de Llamingo Films">
          <div><strong>18</strong><span>Años creando</span></div>
          <div><strong>85+</strong><span>Marcas y clientes</span></div>
          <div><strong>24</strong><span>Provincias alcanzadas</span></div>
          <div><strong>60+</strong><span>Talentos en producción</span></div>
        </div>
      </section>

      <section className="work" id="trabajo">
        <div className="section-heading"><p className="section-kicker">[ Trabajo seleccionado ]</p><h2>CASOS QUE<br /><span>DEJARON MARCA.</span></h2><p>Ideas reales. Producciones reales.<br />Impacto que no necesita adjetivos.</p></div>
        <div className="projects">
          {projects.map((project, index) => (
            <a className={`project-card ${project.className}`} href="#contacto" key={project.client} aria-label={`Ver caso ${project.name}`}>
              <span className="project-index">0{index + 1} / 03</span>
              <div className="project-art"><b>{project.client.slice(0,1)}</b><i>{project.tag}</i></div>
              <div className="project-meta"><div><span>{project.client}</span><h3>{project.name}</h3></div><span className="project-arrow">↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="services" id="servicios">
        <p className="section-kicker">[ Todo lo que una idea necesita ]</p>
        <div className="services-layout">
          <div className="services-intro"><h2>UNA AGENCIA.<br />TODO EL<br /><em>RECORRIDO.</em></h2><p>Entramos donde nos necesites. Nos quedamos hasta que funcione.</p></div>
          <div className="service-list">
            {services.map((service, index) => (
              <button className={activeService === index ? 'service-row active' : 'service-row'} key={service.n} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)} aria-expanded={activeService === index}>
                <span>{service.n}</span><h3>{service.title}</h3><i>{activeService === index ? '−' : '+'}</i>
                <p>{service.detail}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="process">
        <p className="section-kicker">[ Un proceso sin humo ]</p>
        <div className="process-track">
          <div><span>01</span><h3>Escuchamos</h3><p>Objetivos antes que formatos.</p></div><b>→</b>
          <div><span>02</span><h3>Encontramos</h3><p>La idea que ordena todo.</p></div><b>→</b>
          <div><span>03</span><h3>Producimos</h3><p>Con oficio, ritmo y precisión.</p></div><b>→</b>
          <div><span>04</span><h3>Movemos</h3><p>La campaña y sus resultados.</p></div>
        </div>
      </section>

      <section className="trust" aria-label="Marcas que han confiado en Llamingo Films">
        <p>Ideas compartidas con</p>
        <div className="logo-marquee"><div><span>COCA-COLA</span><span>MAGGI</span><span>YANBAL</span><span>ADIDAS</span><span>NESTLÉ</span><span>POWERADE</span><span>PRONACA</span><span>COCA-COLA</span><span>MAGGI</span></div></div>
      </section>

      <section className="contact" id="contacto">
        <div className="contact-top"><p>¿Tienes un proyecto en mente?</p><span>Quito · Ecuador<br />Trabajamos en todo el país</span></div>
        <a className="contact-link" href="mailto:info@llamingofilms.com"><span>HAGAMOS ALGO</span><strong>QUE NADIE PUEDA<br />IGNORAR.</strong><i>↗</i></a>
        <footer><a className="brand" href="#inicio">LLAMINGO®</a><p>Agencia creativa + productora audiovisual</p><div><a href="https://www.instagram.com/llamingofilms/">Instagram</a><a href="https://www.facebook.com/181252731921319">Facebook</a><a href="mailto:info@llamingofilms.com">Email</a></div><span>© 2026</span></footer>
      </section>
    </main>
  );
}
