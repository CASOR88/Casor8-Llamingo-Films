'use client';

import { useEffect, useRef, useState } from 'react';
import './team-map.css';

const services = [
  { n: '01', slug: 'creatividad', title: 'Creatividad', detail: 'Estrategia, concepto y dirección creativa para convertir una intuición en algo que nadie pueda ignorar.', character: '/characters/creative-artist.png' },
  { n: '02', slug: 'audiovisual', title: 'Audiovisual', detail: 'Comerciales, contenido, estudio y producción integral. Cada plano existe para provocar algo.', character: '/characters/cinema-llama.png' },
  { n: '03', slug: 'experiencias-btl', title: 'Experiencias & BTL', detail: 'Activaciones y experiencias que aparecen en el lugar y el momento precisos.', character: '/characters/btl-director.png' },
  { n: '04', slug: 'marketing-digital', title: 'Marketing digital', detail: 'Estrategia, tecnología y contenido para crecer sin perder la voz propia de la marca.', character: '/characters/digital-strategist.png' },
];

const cases = [
  { client: 'COCA-COLA', name: 'Trophy Tour 2026', tag: 'Experiencia & BTL', poster: '/posters/trophy-tour.png', className: 'project-red' },
  { client: 'AUDIOVISUAL', name: 'Historias que se sienten', tag: 'Producción integral', poster: '/posters/audiovisual.png', className: 'project-blue' },
  { client: 'INNOVACIÓN', name: 'Realidad aumentada', tag: 'Experiencia digital', poster: '/posters/innovation.png', className: 'project-lime' },
];

const team = [
  { name: 'Alejandra Pereira', role: 'Directora General', image: '/team/alejandra.png', copy: 'Conecta visión, negocio y equipo para que cada proyecto avance con propósito.', x: '33.5%', y: '15%' },
  { name: 'Andrea Gordón', role: 'Productora General', image: '/team/andrea.png', copy: 'Convierte cada idea en un plan real, preciso y listo para salir a escena.', x: '63%', y: '14%' },
  { name: 'Verónica Charvet', role: 'Ejecutiva de Cuenta', image: '/team/veronica.png', copy: 'Escucha, organiza y mantiene a clientes y equipo hablando el mismo idioma.', x: '10%', y: '43%' },
  { name: 'Santiago Pacheco', role: 'Director General Creativo', image: '/team/santiago.png', copy: 'Encuentra el concepto y dirige la forma en que una marca piensa, habla y se mueve.', x: '35%', y: '76%' },
  { name: 'Isa Almeida', role: 'Productora de Evento', image: '/team/isa.png', copy: 'Hace que la experiencia ocurra: tiempos, personas y detalles trabajando juntos.', x: '66%', y: '76%' },
  { name: 'Jalal Dubois', role: 'Director Creativo', image: '/team/jalal.png', copy: 'Convierte estrategia, cultura e intuición en ideas con una dirección clara y memorable.', x: '87%', y: '43%' },
];

const regions = [
  { id: 'guayaquil', label: 'Guayaquil', title: 'Energía que se mueve', copy: 'Calle, comercio y audiencias que convierten cada activación en conversación.', image: '/regions/costa.png', x: '38%', y: '57%' },
  { id: 'manta', label: 'Manta', title: 'Ideas frente al mar', copy: 'Experiencias frescas, turismo, deporte y marcas conectadas con el ritmo de la costa.', image: '/regions/costa.png', x: '32%', y: '47%' },
  { id: 'quito', label: 'Quito', title: 'Ideas a gran altura', copy: 'Cultura, ciudad y estrategia en el corazón creativo del país.', image: '/regions/sierra-norte.png', x: '49%', y: '31%' },
  { id: 'ambato', label: 'Ambato', title: 'Territorio que conecta', copy: 'Industria, tradición y experiencias construidas con precisión.', image: '/regions/sierra-centro.png', x: '50%', y: '49%' },
  { id: 'cuenca', label: 'Cuenca', title: 'Historias con raíz', copy: 'Patrimonio, arte y marcas contadas desde lo auténtico.', image: '/regions/sierra-sur.png', x: '47%', y: '68%' },
  { id: 'tena', label: 'Tena · Amazonía', title: 'La selva también habla', copy: 'Naturaleza, aventura y comunidades que inspiran experiencias memorables.', image: '/regions/oriente.png', x: '61%', y: '48%' },
  { id: 'galapagos', label: 'Puerto Ayora · Galápagos', title: 'Un mundo extraordinario', copy: 'Islas, conservación y relatos únicos que merecen una mirada responsable.', image: '/regions/galapagos.png', x: '17%', y: '67%' },
];

const clientBrands = [
  { name: 'Coca-Cola', logo: '/brands/coca-cola.svg' },
  { name: 'Adidas', logo: '/brands/adidas.svg' },
  { name: 'Banco Pichincha', logo: '/brands/banco-pichincha.svg' },
  { name: 'HP', logo: '/brands/hp.svg' },
  { name: 'Nestlé', logo: '/brands/nestle.svg' },
  { name: 'Pronaca', logo: null },
  { name: 'Maggi', logo: '/brands/maggi-real.svg' },
  { name: 'Yanbal', logo: '/brands/yanbal.svg' },
];

const noiseWords = ['scroll', 'brief', 'tendencia', 'likes', 'algoritmo', 'reunión', 'urgente', 'viral', 'data', 'feedback', 'deadline', 'contenido', 'presupuesto', 'click', 'campaña', 'personas'];
const caseStats = [
  { value: '18', label: 'años creando' },
  { value: '80+', label: 'producciones' },
  { value: '2M+', label: 'personas alcanzadas' },
];
const processVerbs = ['ESCUCHAMOS', 'ENCONTRAMOS', 'PRODUCIMOS', 'MOVEMOS'];

function LlamingoGuide() {
  const [look, setLook] = useState({ x: 0, y: 0, turn: 0, nod: 0 });
  const frame = useRef<number | null>(null);
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        setLook({ x: Math.max(-6, Math.min(6, x * 14)), y: Math.max(-4, Math.min(4, y * 10)), turn: Math.max(-16, Math.min(16, x * 34)), nod: Math.max(-4, Math.min(4, y * 9)) });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); if (frame.current) cancelAnimationFrame(frame.current); };
  }, []);
  return <div className="llama-orbit" aria-hidden="true" style={{ '--look-x': `${look.x}px`, '--look-y': `${look.y}px`, '--head-turn': `${look.turn}deg`, '--neck-turn': `${look.turn * .38}deg`, '--neck-shift': `${look.turn * .48}px`, '--head-nod': `${look.nod}px`, '--mascot-turn': `${look.turn * .22}deg`, '--mascot-shift': `${look.turn * .35}px` } as React.CSSProperties}><div className="llama-trail" /><div className="mascot-aura" /><img className="llamingo-mascot" src="/mascot-llamingo.png" alt="" /></div>;
}

export default function Home() {
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefSent, setBriefSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapPaused, setMapPaused] = useState(false);
  const [teamPaused, setTeamPaused] = useState(false);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeRegion, setActiveRegion] = useState<(typeof regions)[number] | null>(regions[0]);
  const previousFocus = useRef<HTMLElement | null>(null);
  const briefDialog = useRef<HTMLDivElement | null>(null);
  useEffect(() => { document.body.style.overflow = briefOpen || menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [briefOpen, menuOpen]);
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    root.classList.add('motion-ready');

    const revealObserver = reducedMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach((item) => reducedMotion ? item.classList.add('is-visible') : revealObserver?.observe(item));

    return () => {
      revealObserver?.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);
  useEffect(() => {
    if (!briefOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setBriefOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    const focusFrame = requestAnimationFrame(() => briefDialog.current?.querySelector<HTMLInputElement>('input')?.focus());
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(focusFrame);
      previousFocus.current?.focus();
    };
  }, [briefOpen]);
  useEffect(() => {
    let index = 0;
    if (mapPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % regions.length;
      setActiveRegion(regions[index]);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [mapPaused]);
  useEffect(() => {
    if (teamPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveTeamIndex((current) => (current + 1) % team.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [teamPaused]);
  const openBrief = () => {
    previousFocus.current = document.activeElement as HTMLElement;
    setBriefSent(false);
    setBriefOpen(true);
  };
  const handleBrief = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      'Hola Llamingo Films, quiero conversar sobre un proyecto.',
      '',
      `Nombre: ${form.get('name')}`,
      `Empresa: ${form.get('company')}`,
      `Correo: ${form.get('email')}`,
      `Proyecto: ${form.get('project')}`,
    ].join('\n');
    setBriefSent(true);
    window.open(`https://wa.me/593999937070?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <main>
    <header className="nav-shell">
      <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><span /><span /></button>
      <a className="brand" href="#inicio" aria-label="Llamingo Films, inicio">LLAMINGO<span>®</span></a>
      <nav aria-label="Navegación principal"><a href="#experiencia">Experiencia</a><a href="#creatividad">Servicios</a><a href="#puntas">Nosotros</a><a href="#contacto">Contacto</a></nav>
      <div className="header-phones" aria-label="Teléfonos de contacto"><span>Contactos</span><a href="tel:+593999937070">+593 99 993 7070</a><a href="tel:+593991237888">+593 99 123 7888</a></div>
      <button className="nav-cta" onClick={openBrief}>Iniciar proyecto <span>↗</span></button>
    </header>
    <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'} aria-hidden={!menuOpen}>
      <div className="mobile-menu-head"><a className="brand" href="#inicio" onClick={()=>setMenuOpen(false)}>LLAMINGO<span>®</span></a><button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">×</button></div>
      <p>MENÚ PRINCIPAL</p>
      <nav>
        <a onClick={()=>setMenuOpen(false)} href="#experiencia"><span>01</span>Experiencia</a>
        <a onClick={()=>setMenuOpen(false)} href="#creatividad"><span>02</span>Servicios</a>
        <a onClick={()=>setMenuOpen(false)} href="#puntas"><span>03</span>Los Puntas</a>
        <a onClick={()=>setMenuOpen(false)} href="#cobertura"><span>04</span>Ecuador bajo la lupa</a>
        <a onClick={()=>setMenuOpen(false)} href="#contacto"><span>05</span>Contacto</a>
      </nav>
      <div className="mobile-menu-footer">
        <a className="mobile-menu-whatsapp" href="https://wa.me/593999937070?text=Hola%20Llamingo%20Films%2C%20quiero%20conversar%20sobre%20un%20proyecto." target="_blank" rel="noreferrer"><i>WA</i><span>Conversar por WhatsApp</span></a>
        <div className="mobile-menu-social" aria-label="Redes sociales"><a href="https://www.instagram.com/llamingoagenciacreativa/" target="_blank" rel="noreferrer" aria-label="Instagram"><i>IG</i></a><a href="https://www.facebook.com/LlamingoFilms" target="_blank" rel="noreferrer" aria-label="Facebook"><i>f</i></a><a href="mailto:info@llamingofilms.com" aria-label="Correo"><i>@</i></a></div>
        <a href="tel:+593999937070">+593 99 993 7070</a>
      </div>
    </div>
    <a className="whatsapp-widget" href="https://wa.me/593999937070?text=Hola%20Llamingo%20Films%2C%20quiero%20conversar%20sobre%20un%20proyecto." target="_blank" rel="noreferrer" aria-label="Conversar con Llamingo Films por WhatsApp"><span>Hablemos</span><i>WA</i></a>
    <section className="hero cinematic-chapter" id="inicio"><div className="grain" /><LlamingoGuide /><div className="hero-stage"><div className="hero-copy"><h1 className="hero-title" aria-label="Somos productores de emociones"><span className="hero-enter delay-2">SOMOS</span><span className="outline hero-enter delay-3">PRODUCTORES</span><span className="hero-enter delay-3">DE EMOCIONES.</span></h1><p className="hero-summary hero-enter delay-4">Creamos ideas que conectan. Historias que se sienten. Experiencias que dejan huella.</p></div><div className="hero-options hero-enter delay-5"><p>¿Qué hacemos?</p>{services.map(s=><a href={`#${s.slug}`} key={s.n}><span>{s.n}</span><strong>{s.title}</strong><i>↗</i></a>)}</div></div></section>

    <section className="service-world creativity-world creativity-rebuilt cinematic-chapter" id="creatividad"><header className="creative-head" data-reveal="rise"><span>01 / CREATIVIDAD</span><h2>UNA IDEA.<br /><em>CUATRO SUPERPODERES.</em></h2><p>Del primer destello al impacto: construimos campañas completas a la velocidad de la cultura.</p></header><div className="creative-comic"><div className="creative-comic-track">{[...services, ...services].map((service,index)=>{const serviceIndex=index % services.length;const isDuplicate=index >= services.length;const isActive=serviceIndex === activeServiceIndex;return <article className={isActive ? 'is-active' : ''} aria-hidden={isDuplicate} aria-label={isDuplicate ? undefined : `Destacar ${service.title}`} aria-pressed={isDuplicate ? undefined : isActive} role={isDuplicate ? undefined : 'button'} tabIndex={isDuplicate ? -1 : 0} data-reveal={!isDuplicate ? 'card' : undefined} style={{'--reveal-index':serviceIndex} as React.CSSProperties} key={`${service.slug}-${index}`} onClick={()=>!isDuplicate&&setActiveServiceIndex(serviceIndex)} onFocus={()=>!isDuplicate&&setActiveServiceIndex(serviceIndex)} onKeyDown={(event)=>{if(!isDuplicate&&(event.key==='Enter'||event.key===' ')){event.preventDefault();setActiveServiceIndex(serviceIndex);}}}><i>0{serviceIndex+1}</i><img src={service.character} alt={isDuplicate ? '' : service.title} /><b>{service.title === 'Marketing digital' ? 'DIGITAL' : service.title.toUpperCase()}</b><small>{['Encontramos la idea.','La ponemos en escena.','La llevamos a la calle.','La hacemos viajar.'][serviceIndex]}</small></article>})}</div></div><button onClick={openBrief}>Activa el equipo ↗</button></section>

    <section className="work cinematic-chapter" id="experiencia"><div className="section-heading" data-reveal="rise"><p className="section-kicker">[ 18 años / trabajo en movimiento ]</p><h2>CASOS QUE<br /><span>DEJARON MARCA.</span></h2><p>Trayectoria, producción y resultados en una sola historia.</p></div><div className="case-stats" data-reveal="line"><div className="case-stats-track">{[0,1].map(copy=><div className="case-stats-group" aria-hidden={copy === 1} key={copy}>{caseStats.map(stat=><span key={`${copy}-${stat.value}`}><b>{stat.value}</b> {stat.label}</span>)}</div>)}</div></div><div className="projects"><div className="projects-track">{[...cases, ...cases].map((project,index)=><button aria-hidden={index >= cases.length} tabIndex={index >= cases.length ? -1 : 0} className={`project-card ${project.className}`} data-reveal={index < cases.length ? 'card' : undefined} style={{'--reveal-index':index % cases.length} as React.CSSProperties} key={`${project.client}-${index}`} onClick={openBrief}><span className="project-index">0{index % cases.length+1} / 03</span><div className="project-media"><img src={project.poster} alt="" /><span className="play">▶</span></div><div className="project-meta"><div><span>{project.client} · {project.tag}</span><h3>{project.name}</h3></div><span className="project-arrow">↗</span></div></button>)}</div></div></section>

    <section className="service-world audiovisual-world scene-world cinematic-chapter" id="audiovisual"><div className="scene-world-head" data-reveal="rise"><span>02 / AUDIOVISUAL</span><h2>HISTORIAS QUE<br /><em>SE SIENTEN.</em></h2><p>Una carretera andina, un auto y un equipo que convierte velocidad en emoción.</p><button onClick={openBrief}>Hagamos una toma ↗</button></div><figure className="campaign-scene" data-reveal="mask"><img src="/scenes/audiovisual-road-shoot.png" alt="Equipo de llamas filmando a una pareja en un auto deportivo por una carretera andina" /><figcaption><b>RODAJE / AUTOMOTRIZ</b><span>Dirección · cámara · sonido · producción</span></figcaption></figure></section>
    <section className="service-world btl-world scene-world cinematic-chapter" id="experiencias-btl"><div className="scene-world-head" data-reveal="rise"><span>03 / EXPERIENCIAS & BTL</span><h2>LA MARCA SALE.<br /><em>LA GENTE PARTICIPA.</em></h2><p>Una activación convierte un paseo cotidiano en un recuerdo compartido.</p><button onClick={openBrief}>Tomemos la calle ↗</button></div><figure className="campaign-scene" data-reveal="mask"><img src="/scenes/btl-la-carolina.png" alt="Activación de Coca-Cola con modelos y equipo Llamingo en el parque La Carolina de Quito" /><figcaption><b>BTL / LA CAROLINA</b><span>Experiencia · sampling · contenido · comunidad</span></figcaption></figure></section>
    <section className="service-world digital-world digital-rebuilt cinematic-chapter" id="marketing-digital"><div className="data-rain">{noiseWords.concat(noiseWords).map((w,i)=><span style={{'--i':i} as React.CSSProperties} key={`${w}-${i}`}>{w}</span>)}</div><div className="service-copy" data-reveal="rise"><span>04 / MARKETING DIGITAL</span><p>Señal entre el ruido</p><h2>HACEMOS QUE<br /><em>TE ENCUENTREN.</em></h2><p>{services[3].detail}</p><button onClick={openBrief}>Prendamos la señal ↗</button></div><img className="digital-character" data-reveal="character" src={services[3].character} alt="Llamingo estratega digital" /><div className="social-showcase" data-reveal="mask" aria-label="Ejemplo de campaña digital Taco Fest"><div className="social-heading"><span>CASO / TACO FEST</span><b>CAMPAÑA DIGITAL</b></div><div className="social-posts"><article><img src="/social/taco-post-1.png" alt="Publicación de Taco Fest: échale ojo al dato" /><i>♥ 2.4K</i></article><article><img src="/social/taco-post-2.png" alt="Publicación de Taco Fest: sí hay taco fest" /><i>↗ 418</i></article><article><img src="/social/taco-post-3.png" alt="Publicación de Taco Fest: cómo siempre" /><i>● 38K</i></article></div><p>Contenido que detiene el scroll, conversa y convierte atención en comunidad.</p></div></section>

    <section className="process cyberspace cinematic-chapter" id="proceso"><div className="word-cloud">{noiseWords.concat(noiseWords).map((w,i)=><span style={{'--i':i} as React.CSSProperties} key={`${w}-cloud-${i}`}>{w}</span>)}</div><div className="process-verbs" aria-hidden="true">{processVerbs.map((verb,index)=><span style={{'--verb-index':index} as React.CSSProperties} key={verb}>{verb}</span>)}</div><div className="process-core" data-reveal="rise"><p className="section-kicker">[ Entre millones de conversaciones ]</p><h2>EN ESTE MUNDO<br />LOCO Y RÁPIDO,<br /><em>NOSOTROS SÍ<br />ESCUCHAMOS.</em></h2><p>Encontramos la señal. Producimos la idea. Movemos a la gente.</p></div></section>

    <section className="team team-table cinematic-chapter" id="puntas"><div className="team-collaboration" onPointerEnter={()=>setTeamPaused(true)} onPointerLeave={()=>setTeamPaused(false)} onFocusCapture={()=>setTeamPaused(true)} onBlurCapture={()=>setTeamPaused(false)}><div className="team-intro" data-reveal="rise"><p className="section-kicker">[ Quienes dan vida a todo ]</p><h2><span>LOS</span> <em>PUNTAS.</em></h2><p>Cinco cabezas brillantes, una llama con actitud y una mesa donde las ideas empiezan a moverse.</p></div><div className="team-visual"><img className="team-table-image" src="/scenes/llamingo-team-table.png" alt="Equipo de Llamingo Films reunido alrededor de una mesa creativa, visto desde arriba" />{team.map((person,index)=><button className={activeTeamIndex===index?'team-hotspot active':'team-hotspot'} style={{left:person.x,top:person.y}} onMouseEnter={()=>setActiveTeamIndex(index)} onFocus={()=>setActiveTeamIndex(index)} onClick={()=>setActiveTeamIndex(index)} aria-label={`Conocer a ${person.name}, ${person.role}`} key={person.name}><i /><strong>{person.role}</strong></button>)}</div><aside className="team-profile" aria-live="polite"><img src={team[activeTeamIndex].image} alt={team[activeTeamIndex].name} /><div><span>0{activeTeamIndex+1} / 06 · EQUIPO</span><h3>{team[activeTeamIndex].name}</h3><b>{team[activeTeamIndex].role}</b><p>{team[activeTeamIndex].copy}</p></div></aside></div></section>

    <section className="trust" id="marcas"><div className="scene-tape tape-top"><div className="tape-track"><span>⚠ CREATIVIDAD EN ESCENA · NO CRUZAR · LLAMINGO FILMS · </span><span>⚠ CREATIVIDAD EN ESCENA · NO CRUZAR · LLAMINGO FILMS · </span></div></div><div className="logo-marquee" aria-label="Marcas que han trabajado con Llamingo Films"><div className="brand-track">{[...clientBrands, ...clientBrands].map((brand, index) => <div className={`brand-logo${brand.logo ? '' : ' brand-logo-pronaca'}${brand.name === 'HP' ? ' brand-logo-hp' : ''}${brand.name === 'Maggi' ? ' brand-logo-maggi' : ''}`} aria-hidden={index >= clientBrands.length} key={`${brand.name}-${index}`}>{brand.logo ? <img src={brand.logo} alt={index < clientBrands.length ? brand.name : ''} /> : <span>PRONACA</span>}</div>)}</div></div><div className="scene-tape tape-bottom"><div className="tape-track"><span>⚠ ZONA DE IDEAS · PRODUCCIÓN EN CURSO · NO DETENER · </span><span>⚠ ZONA DE IDEAS · PRODUCCIÓN EN CURSO · NO DETENER · </span></div></div></section>

    <section className="coverage interactive-map cinematic-chapter" id="cobertura"><div className="coverage-copy" data-reveal="rise"><p className="section-kicker">[ Llamingo BTL ]</p><h2>ECUADOR<br /><span>BAJO LA LUPA.</span></h2><div className="region-selector" aria-label="Seleccionar ciudad">{regions.map(r=><button className={activeRegion?.id===r.id?'active':''} onClick={()=>setActiveRegion(r)} key={`selector-${r.id}`}>{r.label}</button>)}</div></div><div className="coverage-stage" data-reveal="mask" onPointerEnter={()=>setMapPaused(true)} onPointerLeave={()=>setMapPaused(false)} onFocusCapture={()=>setMapPaused(true)} onBlurCapture={()=>setMapPaused(false)}><div className="map-canvas"><img className="coverage-map" src="/scenes/ecuador-relief.png" alt="Mapa tridimensional en relieve del Ecuador" /><img className="galapagos-relief" src="/scenes/galapagos-relief-final.png" alt="Relieve tridimensional de las islas Galápagos" />{regions.map(r=><button className={activeRegion?.id===r.id?'map-hotspot active':'map-hotspot'} style={{left:r.x,top:r.y}} onMouseEnter={()=>setActiveRegion(r)} onFocus={()=>setActiveRegion(r)} onClick={()=>setActiveRegion(r)} key={r.id} aria-label={`Explorar ${r.label}`}><span /></button>)}</div>{activeRegion&&<aside className={`region-lens region-lens-${activeRegion.id}`} aria-live="polite"><img src={activeRegion.image} alt={`Ilustración de ${activeRegion.label}`} /><div><span>{activeRegion.label}</span><h3>{activeRegion.title}</h3><p>{activeRegion.copy}</p></div></aside>}</div></section>

    <section className="contact cinematic-chapter" id="contacto"><div className="film-countdown"><span>03</span><span>02</span><span>01</span></div><div className="contact-top"><p>LLAMINGO FILMS PRESENTA</p><span>Quito · Ecuador<br />Una producción nacional</span></div><div className="finale-title" data-reveal="rise"><span>FIN DE ESTA PÁGINA.</span><h2>ENTONCES…<br /><em>¿HABLAMOS?</em></h2><button onClick={openBrief}>Iniciar una nueva historia <i>↗</i></button></div><footer className="contact-footer"><div className="footer-brand"><a className="brand" href="#inicio">LLAMINGO®</a><p>Agencia creativa + productora audiovisual</p></div><div className="footer-contact"><span>Quito · Ecuador</span><a href="mailto:info@llamingofilms.com">info@llamingofilms.com</a></div><nav className="footer-social" aria-label="Redes sociales"><a href="https://www.instagram.com/llamingoagenciacreativa/" target="_blank" rel="noreferrer" aria-label="Instagram de Llamingo"><i aria-hidden="true">IG</i><span>Instagram</span></a><a href="https://www.facebook.com/LlamingoFilms" target="_blank" rel="noreferrer" aria-label="Facebook de Llamingo"><i aria-hidden="true">f</i><span>Facebook</span></a><a href="mailto:info@llamingofilms.com" aria-label="Escribir por correo a Llamingo"><i aria-hidden="true">@</i><span>Email</span></a></nav><span className="footer-legal">© 2026 Llamingo Films</span></footer></section>

    {briefOpen&&<div className="brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" onMouseDown={e=>{if(e.target===e.currentTarget)setBriefOpen(false)}}><div className="brief-card" ref={briefDialog}><button className="brief-close" onClick={()=>setBriefOpen(false)} aria-label="Cerrar formulario">×</button><div><p className="section-kicker">[ Primera toma ]</p><h2 id="brief-title">CUÉNTANOS<br />LA <span>IDEA.</span></h2><p>Cuatro datos para comenzar una conversación memorable.</p></div><form onSubmit={handleBrief}><label>Tu nombre<input name="name" autoComplete="name" required placeholder="Nombre y apellido" /></label><label>Empresa<input name="company" autoComplete="organization" required placeholder="Marca o empresa" /></label><label>Correo<input name="email" type="email" autoComplete="email" required placeholder="hola@empresa.com" /></label><label>¿Qué quieres crear?<textarea name="project" required rows={3} placeholder="Campaña, producción, activación..." /></label><button type="submit">Enviar brief por WhatsApp <span>↗</span></button><p className="brief-status" aria-live="polite">{briefSent?'WhatsApp abierto con tu brief listo para enviar.':'Continuaremos la conversación directamente por WhatsApp.'}</p></form></div></div>}
  </main>;
}
