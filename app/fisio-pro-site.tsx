'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const whatsapp =
  'https://wa.me/5519971282430?text=Olá%2C%20gostaria%20de%20agendar%20uma%20avaliação%20na%20Fisio%20Pro.';

const specialties = [
  {
    number: '01',
    title: 'Fisioterapia esportiva',
    text: 'Tratamento, prevenção e retorno seguro ao esporte com progressão baseada na sua resposta.',
    image: '/images/mobility-youth.jpeg',
    alt: 'Fisioterapia esportiva individualizada na Fisio Pro',
  },
  {
    number: '02',
    title: 'Ortopedia e trauma',
    text: 'Um plano preciso para recuperar mobilidade, força e confiança após lesões ou cirurgias.',
    image: '/images/ultrasound-treatment.jpeg',
    alt: 'Tratamento ortopédico com tecnologia na Fisio Pro',
  },
  {
    number: '03',
    title: 'Recovery & performance',
    text: 'Estratégias de recuperação e treinamento terapêutico para sustentar sua melhor performance.',
    image: '/images/recovery-compression.jpeg',
    alt: 'Sessão de recovery na Fisio Pro',
  },
];

const journey = [
  ['01', 'Escutar', 'Sua história, sua rotina e o movimento que você quer recuperar.'],
  ['02', 'Investigar', 'Uma avaliação funcional para entender a causa, não apenas o sintoma.'],
  ['03', 'Construir', 'Um plano individual, claro e progressivo, feito para a sua realidade.'],
  ['04', 'Evoluir', 'Acompanhamento contínuo até você se movimentar com autonomia.'],
];

const academyPillars = [
  ['Formação continuada', 'Conteúdo que aproxima ciência e prática clínica.'],
  ['Workshops clínicos', 'Experiências aplicáveis à rotina profissional.'],
  ['Mentoria', 'Discussão de casos, raciocínio e desenvolvimento.'],
];

const technologyItems = [
  {
    title: 'Avaliação funcional',
    text: 'Análise detalhada de mobilidade, força, controle e padrões de movimento para identificar a origem da limitação e definir objetivos mensuráveis.',
  },
  {
    title: 'Terapia manual',
    text: 'Técnicas aplicadas de forma individual para reduzir desconfortos, recuperar mobilidade e preparar o corpo para voltar a se movimentar com segurança.',
  },
  {
    title: 'Eletroterapia e laser',
    text: 'Recursos utilizados como apoio ao tratamento para modular a dor, favorecer a recuperação tecidual e potencializar a resposta clínica quando indicados.',
  },
  {
    title: 'Treinamento terapêutico',
    text: 'Exercícios planejados e acompanhados para reconstruir força, estabilidade, coordenação e confiança nas atividades do dia a dia ou do esporte.',
  },
  {
    title: 'Recovery',
    text: 'Estratégias de recuperação, como compressão pneumática e mobilidade orientada, para controlar a fadiga e manter o corpo pronto para o próximo desafio.',
  },
];

function ArrowLink({
  children,
  href,
  light = false,
}: {
  children: React.ReactNode;
  href: string;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`arrow-link group inline-flex items-center justify-between gap-8 rounded-full border px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.17em] transition duration-500 ${
        light
          ? 'border-white/30 hover:bg-white hover:text-black'
          : 'border-black/25 hover:bg-black hover:text-white'
      }`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

export function FisioProSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [openTechnology, setOpenTechnology] = useState<number | null>(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroDone(true), 1650);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('intro-lock', !introDone || menuOpen);
    return () => document.body.classList.remove('intro-lock');
  }, [introDone, menuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    root.classList.add('motion-ready');

    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && !reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
      );
      revealItems.forEach((item) => observer?.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const updateScrollEffects = () => {
      const y = window.scrollY;
      root.style.setProperty('--hero-shift', `${Math.min(y * 0.09, 90)}px`);
      const scene = document.querySelector<HTMLElement>('[data-immersive]');
      if (scene) {
        const rect = scene.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        scene.style.setProperty('--scene-progress', progress.toFixed(3));
        scene.style.setProperty('--scene-scale', (1.02 + progress * 0.08).toFixed(3));
        scene.style.setProperty('--scene-shift', `${(progress * -20).toFixed(1)}px`);
        scene.style.setProperty('--scene-copy-shift', `${((1 - progress) * 22).toFixed(1)}px`);
        scene.style.setProperty('--scene-opacity', (0.58 + progress * 0.42).toFixed(3));
        scene.style.setProperty('--scene-kicker-opacity', (0.42 + progress * 0.58).toFixed(3));
        scene.style.setProperty('--scene-progress-width', `${(progress * 100).toFixed(1)}%`);
      }
    };

    let lenis: Lenis | undefined;
    let animationFrame = 0;
    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on('scroll', updateScrollEffects);
      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrame = requestAnimationFrame(raf);
      };
      animationFrame = requestAnimationFrame(raf);
    } else {
      window.addEventListener('scroll', updateScrollEffects, { passive: true });
    }

    updateScrollEffects();
    return () => {
      observer?.disconnect();
      revealItems.forEach((item) => item.classList.remove('is-visible'));
      root.classList.remove('motion-ready');
      window.removeEventListener('scroll', updateScrollEffects);
      cancelAnimationFrame(animationFrame);
      lenis?.destroy();
    };
  }, []);

  const moveGallery = (direction: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.scrollBy({ left: gallery.clientWidth * 0.82 * direction, behavior: 'smooth' });
  };

  return (
    <main className="bg-background text-foreground">
      <div className={`preloader ${
        introDone ? 'preloader-done' : ''
      }`} aria-hidden="true">
        <div className="preloader-top">
          <span>FISIO PRO</span>
          <span>REABILITAÇÃO & PERFORMANCE</span>
        </div>
        <div className="preloader-mark">
          <img src="/images/logo-loader.webp" alt="Fisio Pro" width="900" height="381" />
          <p>Preparando o movimento</p>
        </div>
        <div className="preloader-bottom">
          <span className="preloader-line"><span /></span>
          <span>100</span>
        </div>
      </div>

      <header className="site-header absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 text-white md:px-10 md:py-7 lg:px-14">
        <a href="#inicio" aria-label="Fisio Pro — início" className="flex items-center gap-3">
          <img src="/images/mark-white.png" alt="" width="44" height="44" className="h-11 w-11 rounded-full object-cover" />
          <span className="text-[12px] font-semibold tracking-[0.24em]">FISIO PRO</span>
        </a>

        <nav className="hidden items-center gap-9 text-[10px] font-semibold uppercase tracking-[0.17em] lg:flex" aria-label="Navegação principal">
          <a href="#metodo" className="nav-link">Método</a>
          <a href="#especialidades" className="nav-link">Especialidades</a>
          <a href="#espaco" className="nav-link">O espaço</a>
          <a href="#equipe" className="nav-link">Equipe</a>
          <a href="#academy" className="nav-link">Academy</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="header-cta hidden items-center gap-3 rounded-full border border-white/35 bg-black/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md transition hover:bg-white hover:text-black sm:flex"
          >
            Agendar avaliação <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <Button
            type="button"
            variant="ghost"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/10 p-0 text-white backdrop-blur-md hover:bg-white hover:text-black lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <section id="inicio" className="hero-v2 relative min-h-[100svh] overflow-hidden bg-black text-white">
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile-v2.webp" />
          <img
            className="hero-media h-full w-full object-cover"
            src="/images/hero-desktop-v2.webp"
            alt="Estrutura de reabilitação e performance da Fisio Pro"
            width="1920"
            height="1080"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-v2-shade absolute inset-0" />
        <div className="hero-grid absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-7 pt-28 md:px-10 md:pb-10 lg:px-14 lg:pb-12">
          <div className="hero-copy">
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70 md:text-[11px]">
              Fisioterapia esportiva • Ortopedia • Recovery
            </p>
            <h1 className="max-w-[1320px] text-[clamp(3.7rem,10vw,10.8rem)] font-medium leading-[0.78] tracking-[-0.072em]">
              Movimento é
              <span className="block font-serif font-normal italic tracking-[-0.055em]">liberdade.</span>
            </h1>
          </div>
          <div className="mt-8 grid gap-6 border-t border-white/30 pt-5 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-[13px] leading-6 text-white/76 md:text-base md:leading-7">
              Recuperar o movimento é recuperar possibilidades. Aqui, ciência, estratégia e cuidado trabalham juntos para levar você adiante.
            </p>
            <a href="#metodo" className="group flex items-center justify-between gap-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75 md:text-[10px]">
              Conheça a Fisio Pro
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/35 transition group-hover:bg-white group-hover:text-black">
                <ArrowDown className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <div className="marquee-wrap border-y border-black/10 bg-[#e5e1d8] py-4" aria-hidden="true">
        <div className="marquee-track text-[10px] font-semibold uppercase tracking-[0.26em]">
          {[0, 1].map((set) => (
            <div className="flex shrink-0 items-center" key={set}>
              {['Ciência', 'Movimento', 'Cuidado', 'Performance', 'Autonomia', 'Resultado'].map((word) => (
                <span className="flex items-center" key={`${set}-${word}`}>
                  <span className="mx-6 h-1 w-1 rounded-full bg-black" />
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="metodo" className="content-section bg-[#f2efe8] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid items-start gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div className="method-copy lg:sticky lg:top-20">
              <p className="eyebrow" data-reveal>Nosso método</p>
              <h2 className="mt-6 max-w-[760px] text-[clamp(3rem,5.8vw,6.8rem)] font-medium leading-[.9] tracking-[-0.06em]" data-reveal>
                Seu corpo não é um protocolo.
                <span className="mt-2 block font-serif font-normal italic text-black/44">É uma história em movimento.</span>
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-7 text-black/62 md:text-lg md:leading-8" data-reveal>
                A avaliação começa pela escuta e ganha profundidade no movimento. Cada decisão clínica é explicada, acompanhada e ajustada para você.
              </p>
              <div className="mt-9" data-reveal>
                <ArrowLink href={whatsapp}>Agendar minha avaliação</ArrowLink>
              </div>
            </div>

            <figure className="method-visual relative min-h-[580px] overflow-hidden md:min-h-[760px]" data-reveal>
              <img
                src="/images/treadmill.jpeg"
                alt="Fisioterapeuta acompanhando uma avaliação funcional"
                width="1280"
                height="854"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-6 pt-28 text-white md:p-9">
                <p className="max-w-xs text-sm leading-6 text-white/75">Avaliação funcional individual, do primeiro contato ao retorno completo.</p>
                <span className="font-serif text-6xl italic text-white/80 md:text-8xl">01</span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="content-section bg-black px-5 py-20 text-white md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <p className="eyebrow text-white/50" data-reveal>Como enxergamos você</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <h2 className="max-w-5xl text-[clamp(3.1rem,7.5vw,8.6rem)] font-medium leading-[.84] tracking-[-0.07em]" data-reveal>
              Antes da lesão, existe uma pessoa.
            </h2>
            <p className="max-w-lg text-base leading-8 text-white/55 lg:pb-3" data-reveal>
              Esporte, trabalho, família e rotina fazem parte do plano. A reabilitação precisa devolver função sem afastar você de quem você é.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-[1.35fr_.65fr] md:gap-6">
            <figure className="media-reveal h-[58svh] min-h-[440px] overflow-hidden" data-reveal>
              <img src="/images/assessment-team.jpeg" alt="Equipe avaliando um jovem atleta" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
            <figure className="media-reveal h-[48svh] min-h-[380px] overflow-hidden md:mt-28" data-reveal>
              <img src="/images/functional-older.jpeg" alt="Treino funcional acompanhado por fisioterapeuta" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <section id="especialidades" className="content-section bg-[#f2efe8] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="eyebrow" data-reveal>Especialidades</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(3rem,6.5vw,7.4rem)] font-medium leading-[.87] tracking-[-0.065em]" data-reveal>
                Cuidado visível. Evolução real.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-black/58 md:text-base" data-reveal>
              Cada especialidade parte da mesma ideia: entender bem para cuidar melhor.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-4 lg:gap-6">
            {specialties.map((item, index) => (
              <article key={item.number} className={`specialty-card ${index === 1 ? 'md:mt-20' : ''}`} data-reveal>
                <figure className="aspect-[4/5] overflow-hidden bg-black">
                  <img src={item.image} alt={item.alt} width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </figure>
                <div className="border-b border-black/20 pb-7 pt-5">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-black/38">{item.number}</span>
                  <h3 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.035em] lg:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-black/58">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="immersive-story relative h-[100svh] bg-black text-white md:h-[155svh]" data-immersive>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src="/images/mobility-youth.jpeg"
            alt="Atendimento individual para recuperar o movimento"
            width="1280"
            height="854"
            loading="lazy"
            decoding="async"
            className="immersive-image absolute inset-0 h-full w-full object-cover"
          />
          <div className="immersive-shade absolute inset-0" />
          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-7 md:px-10 md:py-10 lg:px-14">
            <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65">
              <span>O movimento transforma</span>
              <span className="scene-counter">02 — 03</span>
            </div>
            <div>
              <p className="immersive-kicker mb-4 text-[10px] uppercase tracking-[0.22em] text-white/65">Da limitação à possibilidade</p>
              <blockquote className="immersive-title max-w-[1280px] text-[clamp(3.2rem,8vw,9rem)] font-medium leading-[.84] tracking-[-0.07em]">
                Voltar não basta.
                <span className="block font-serif font-normal italic">Volte melhor.</span>
              </blockquote>
              <div className="mt-7 h-px w-full bg-white/25"><span className="scene-progress block h-px bg-white" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section bg-[#d9d4ca] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto grid max-w-[1640px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <p className="eyebrow" data-reveal>Uma jornada clara</p>
            <h2 className="mt-6 max-w-xl text-[clamp(3rem,5vw,6rem)] font-medium leading-[.9] tracking-[-0.06em]" data-reveal>
              Você entende cada próximo passo.
            </h2>
          </div>
          <div className="border-t border-black/20">
            {journey.map(([number, title, text]) => (
              <article key={number} className="journey-row grid grid-cols-[44px_1fr] gap-3 border-b border-black/20 py-7 md:grid-cols-[64px_.6fr_1fr] md:gap-8 md:py-10" data-reveal>
                <span className="pt-1 text-[10px] font-semibold tracking-[0.18em] text-black/38">{number}</span>
                <h3 className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">{title}</h3>
                <p className="col-start-2 max-w-lg text-sm leading-7 text-black/60 md:col-start-auto md:text-base">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section bg-[#f2efe8] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow" data-reveal>Tecnologia com propósito</p>
              <h2 className="mt-6 max-w-3xl text-[clamp(3rem,5.8vw,6.6rem)] font-medium leading-[.89] tracking-[-0.065em]" data-reveal>
                Precisão para decidir. Presença para cuidar.
              </h2>
            </div>
            <div className="lg:pt-24" data-reveal>
              <p className="max-w-xl text-base leading-8 text-black/62 md:text-lg">
                A tecnologia amplia o olhar clínico, mas é a experiência humana que orienta cada escolha.
              </p>
              <div className="technology-list mt-9 border-y border-black/15">
                {technologyItems.map((item, index) => {
                  const isOpen = openTechnology === index;
                  return (
                    <div key={item.title} className="technology-item border-b border-black/15 last:border-b-0">
                      <button
                        type="button"
                        className="technology-trigger flex w-full items-center justify-between gap-5 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.15em]"
                        aria-expanded={isOpen}
                        aria-controls={`technology-panel-${index}`}
                        onClick={() => setOpenTechnology(isOpen ? null : index)}
                      >
                        <span>{item.title}</span>
                        <span className={`technology-plus grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/20 text-base font-normal ${isOpen ? 'is-open' : ''}`} aria-hidden="true">+</span>
                      </button>
                      <div id={`technology-panel-${index}`} className={`technology-panel ${isOpen ? 'is-open' : ''}`}>
                        <div>
                          <p className="max-w-xl pb-6 pr-10 text-sm font-normal leading-6 tracking-normal text-black/58 normal-case md:text-base md:leading-7">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-5">
            <figure className="media-reveal col-span-2 h-[520px] overflow-hidden md:col-span-7 md:h-[760px]" data-reveal>
              <img src="/images/electrotherapy.jpeg" alt="Aplicação de eletroterapia durante atendimento" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
            <figure className="media-reveal col-span-1 h-72 overflow-hidden md:col-span-5 md:mt-24 md:h-[540px]" data-reveal>
              <img src="/images/equipment.jpeg" alt="Equipamentos clínicos da Fisio Pro" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
            <figure className="media-reveal col-span-1 h-72 overflow-hidden md:col-span-4 md:-mt-28 md:h-[480px]" data-reveal>
              <img src="/images/compression-care.jpeg" alt="Atendimento de recovery por compressão" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <section id="espaco" className="content-section bg-black py-20 text-white md:py-28 lg:py-36">
        <div className="px-5 md:px-10 lg:px-14">
          <div className="mx-auto flex max-w-[1640px] flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-white/50" data-reveal>Nosso espaço</p>
              <h2 className="mt-6 max-w-5xl text-[clamp(3rem,6.4vw,7.3rem)] font-medium leading-[.87] tracking-[-0.065em]" data-reveal>
                Espaço para o corpo reencontrar confiança.
              </h2>
            </div>
            <div className="flex gap-2" data-reveal>
              <Button type="button" variant="ghost" className="h-11 w-11 rounded-full border border-white/25 p-0 text-white hover:bg-white hover:text-black" aria-label="Foto anterior" onClick={() => moveGallery(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" className="h-11 w-11 rounded-full border border-white/25 p-0 text-white hover:bg-white hover:text-black" aria-label="Próxima foto" onClick={() => moveGallery(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div ref={galleryRef} className="space-gallery mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mt-20 md:gap-6 md:px-10 lg:px-14">
          {[
            ['/images/studio-panorama.jpeg', 'Vista panorâmica da estrutura Fisio Pro'],
            ['/images/studio-wide.jpeg', 'Área completa de treinamento da Fisio Pro'],
            ['/images/space-bw.jpeg', 'Detalhes dos equipamentos de treinamento'],
            ['/images/studio-ground.jpeg', 'Estrutura funcional vista ao nível do solo'],
          ].map(([src, alt], index) => (
            <figure key={src} className={`gallery-slide media-reveal relative h-[62svh] min-h-[460px] shrink-0 snap-center overflow-hidden ${
              index % 2 ? 'w-[72vw] md:w-[48vw]' : 'w-[86vw] md:w-[62vw]'
            }`} data-reveal>
              <img src={src} alt={alt} width="1280" height="854" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-white drop-shadow md:bottom-7 md:left-7">0{index + 1} / 04</span>
            </figure>
          ))}
        </div>
      </section>

      <section id="equipe" className="content-section bg-[#f2efe8] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow" data-reveal>Equipe Fisio Pro</p>
              <h2 className="mt-6 text-[clamp(3rem,5.6vw,6.4rem)] font-medium leading-[.9] tracking-[-0.065em]" data-reveal>
                Técnica que inspira confiança.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-black/58 lg:mt-24" data-reveal>
              Profissionais que unem raciocínio clínico, atualização constante e atenção genuína à sua evolução.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-6">
            <figure className="team-portrait relative h-[72svh] min-h-[580px] overflow-hidden" data-reveal>
              <img src="/images/therapist-giovanni.jpeg" alt="Fisioterapeuta da equipe Fisio Pro" width="1280" height="854" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-28 text-white">
                <p className="text-xl font-medium">Ciência e raciocínio clínico</p>
                <p className="mt-1 text-sm text-white/58">Cuidado orientado por cada resposta do corpo.</p>
              </figcaption>
            </figure>
            <figure className="team-portrait relative h-[72svh] min-h-[580px] overflow-hidden sm:mt-20" data-reveal>
              <img src="/images/therapist-rauny.jpeg" alt="Fisioterapeuta da equipe Fisio Pro" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-28 text-white">
                <p className="text-xl font-medium">Escuta e acompanhamento</p>
                <p className="mt-1 text-sm text-white/58">Presença em todas as etapas da evolução.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="academy" className="academy-v2 content-section bg-[#d9d4ca] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto grid max-w-[1640px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24">
          <div className="academy-card flex min-h-[360px] items-center justify-center overflow-hidden bg-white p-7 md:min-h-[560px] md:p-12" data-reveal>
            <img src="/images/logo-academy.jpg" alt="Fisio Pro Academy — Ciência, Ensino, Resultados" width="900" height="1600" loading="lazy" decoding="async" className="academy-logo w-full max-w-[620px] mix-blend-multiply" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>Fisio Pro Academy</p>
            <h2 className="mt-6 max-w-3xl text-[clamp(3rem,5.5vw,6.4rem)] font-medium leading-[.9] tracking-[-0.065em]" data-reveal>
              Conhecimento para transformar a prática.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-black/62" data-reveal>
              A Academy é o ambiente de formação da Fisio Pro: experiência clínica compartilhada com profundidade, método e aplicação.
            </p>
            <div className="mt-9 border-t border-black/20" data-reveal>
              {academyPillars.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[34px_1fr] gap-3 border-b border-black/20 py-5 md:grid-cols-[42px_.7fr_1fr] md:gap-5">
                  <span className="text-[10px] font-semibold text-black/35">0{index + 1}</span>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="col-start-2 text-sm leading-6 text-black/55 md:col-start-auto">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-9" data-reveal>
              <ArrowLink href={`${whatsapp}%20Também%20quero%20saber%20sobre%20a%20Fisio%20Pro%20Academy.`}>Receber novidades da Academy</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="closing-cta bg-[#f2efe8] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <p className="eyebrow" data-reveal>Seu próximo movimento começa aqui</p>
          <h2 className="mt-8 max-w-[1450px] text-[clamp(3.4rem,9vw,10.4rem)] font-medium leading-[.8] tracking-[-0.075em]" data-reveal>
            Pronto para voltar ao seu melhor?
          </h2>
          <div className="mt-14 grid gap-9 border-t border-black/20 pt-7 md:mt-20 md:grid-cols-[1fr_auto] md:items-end">
            <div className="space-y-3" data-reveal>
              <a href="tel:+5519971282430" className="block text-2xl font-medium tracking-[-0.03em] transition hover:opacity-55">(19) 97128-2430</a>
              <a href="https://www.instagram.com/fisiopro19/" target="_blank" rel="noreferrer" className="inline-flex text-sm text-black/55 transition hover:text-black">@fisiopro19</a>
            </div>
            <div data-reveal><ArrowLink href={whatsapp}>Agendar avaliação</ArrowLink></div>
          </div>
        </div>
      </section>

      <footer className="footer-v2 bg-black px-5 pb-8 pt-10 text-white md:px-10 md:pb-10 md:pt-14 lg:px-14">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <a href="#inicio" aria-label="Fisio Pro — voltar ao início" className="inline-flex items-center gap-4">
                <img src="/images/mark-white.png" alt="" width="66" height="66" className="h-16 w-16 rounded-full" />
                <span className="text-xl font-semibold tracking-[0.2em]">FISIO PRO</span>
              </a>
              <p className="mt-8 max-w-lg text-3xl font-medium leading-tight tracking-[-0.035em] text-white/80 md:text-5xl">
                Ciência para mover.<br />Cuidado para evoluir.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="footer-label">Navegação</p>
                <nav className="mt-5 flex flex-col gap-3 text-sm text-white/58">
                  <a href="#metodo" className="hover:text-white">Método</a>
                  <a href="#especialidades" className="hover:text-white">Especialidades</a>
                  <a href="#espaco" className="hover:text-white">O espaço</a>
                </nav>
              </div>
              <div>
                <p className="footer-label">Institucional</p>
                <nav className="mt-5 flex flex-col gap-3 text-sm text-white/58">
                  <a href="#equipe" className="hover:text-white">Equipe</a>
                  <a href="#academy" className="hover:text-white">Academy</a>
                  <a href="#contato" className="hover:text-white">Contato</a>
                </nav>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="footer-label">Fale conosco</p>
                <div className="mt-5 flex flex-col gap-3 text-sm text-white/58">
                  <a href="tel:+5519971282430" className="hover:text-white">(19) 97128-2430</a>
                  <a href="https://www.instagram.com/fisiopro19/" target="_blank" rel="noreferrer" className="hover:text-white">@fisiopro19</a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/32 sm:flex-row">
            <p>© 2026 Fisio Pro. Todos os direitos reservados.</p>
            <p>Fisioterapia • Reabilitação • Performance</p>
          </div>
        </div>
      </footer>

      <a href={whatsapp} target="_blank" rel="noreferrer" className="mobile-book fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center justify-between rounded-full bg-white px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_14px_40px_rgba(0,0,0,.25)] md:hidden">
        Agendar avaliação <ArrowUpRight className="h-4 w-4" />
      </a>

      <div className={`mobile-menu fixed inset-0 z-50 bg-black text-white transition duration-500 lg:hidden ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="flex items-center justify-between px-5 py-5 md:px-10">
          <span className="text-[12px] font-semibold tracking-[0.24em]">FISIO PRO</span>
          <Button type="button" variant="ghost" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 p-0 text-white hover:bg-white hover:text-black" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex h-[calc(100%-90px)] flex-col justify-center px-5 md:px-10" aria-label="Menu móvel">
          {[
            ['Método', '#metodo'],
            ['Especialidades', '#especialidades'],
            ['O espaço', '#espaco'],
            ['Equipe', '#equipe'],
            ['Academy', '#academy'],
          ].map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-t border-white/15 py-4 text-[clamp(2.1rem,10vw,4rem)] tracking-[-0.045em] last:border-b">
              <span>{label}</span>
              <span className="text-[9px] font-semibold tracking-[0.18em] text-white/35">0{index + 1}</span>
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
