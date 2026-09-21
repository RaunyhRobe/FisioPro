'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  AtSign,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const whatsapp =
  'https://wa.me/5519971265215?text=Olá%2C%20gostaria%20de%20agendar%20uma%20avaliação%20na%20Fisio%20Pro.';

const googleMaps =
  'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x94cf2fa64a030c7d:0xc510b059950b33a4?entry=s&sa=X&ved=2ahUKEwixgPmP_N6WAxWWPrkGHVJcE-sQ4kB6BAgVEAA&hl=pt';

const instagram = 'https://www.instagram.com/fisiopro019/';
const academyInstagram = 'https://www.instagram.com/fisiopro.academy?stkn=MmJuZXV0Y2FiZzI0';

const teamMembers = [
  {
    name: 'Dr. Guilherme Lira',
    role: 'Fisioterapeuta e gestor da Fisio Pro',
    tagline: 'Movimento, precisão e performance aplicados à reabilitação.',
    bio: 'Fisioterapeuta com sólida experiência em reabilitação ortopédica e esportiva, prevenção de lesões e desenvolvimento de performance. Sua atuação combina conhecimento científico, experiência clínica e estratégias individualizadas para proporcionar uma recuperação segura, eficiente e orientada a resultados.',
    image: '/images/team-guilherme-lira.png',
    imageWidth: 1280,
    imageHeight: 854,
    alt: 'Dr. Guilherme Lira, fisioterapeuta e gestor da Fisio Pro',
    objectPosition: '50% 38%',
    formations: [
      'Graduação em Fisioterapia',
      'Pós-graduação em Ortopedia Multiprofissional — Hospital Israelita Albert Einstein',
      'Pós-graduação em Eletroterapia de Alta Performance',
      'Formação em Terapia Manipulativa Ortopédica',
      'Formação FIFA 11+ — prevenção de lesões no futebol',
      'Aperfeiçoamentos em ortopedia, esporte, performance e reabilitação',
    ],
    experience: [
      'Coordenador do Núcleo de Excelência em Performance e Prevenção de clube de futebol profissional por dois anos',
      'Gestor da Fisio Pro',
      'Ampla experiência na reabilitação de lesões ortopédicas e esportivas',
      'Professor e ministrante de cursos para profissionais da saúde',
    ],
    expertise: 'Reabilitação ortopédica · Fisioterapia esportiva · Prevenção de lesões · Performance · Eletroterapia · Retorno ao esporte',
  },
  {
    name: 'Dr. Matheus Kertis',
    role: 'Fisioterapeuta',
    tagline: 'Experiência clínica e precisão para uma reabilitação segura e eficiente.',
    bio: 'Fisioterapeuta com ampla experiência em reabilitação ortopédica, traumato-ortopédica e esportiva, com atuação direcionada à recuperação funcional e ao retorno seguro às atividades. Sua abordagem integra conhecimento técnico, experiência clínica e estratégias individualizadas em cada etapa do processo de reabilitação.',
    image: '/images/team-matheus-kertis.jpg',
    imageWidth: 1066,
    imageHeight: 1600,
    alt: 'Dr. Matheus Kertis, fisioterapeuta da equipe Fisio Pro',
    objectPosition: '50% 27%',
    formations: [
      'Graduação em Fisioterapia',
      'Especialização em Fisioterapia Esportiva',
      'Aperfeiçoamentos em reabilitação ortopédica, traumato-ortopédica e esportiva',
      'Experiência em protocolos de recuperação funcional e retorno ao esporte',
    ],
    experience: [
      'Ampla atuação em reabilitação ortopédica e traumato-ortopédica',
      'Experiência na reabilitação de lesões esportivas',
      'Sólida experiência em pós-operatórios ortopédicos',
      'Atuação na recuperação funcional e no retorno seguro às atividades',
    ],
    expertise: 'Reabilitação ortopédica · Traumato-ortopedia · Fisioterapia esportiva · Pós-operatório · Recuperação funcional · Retorno ao esporte',
  },
];

const specialties = [
  {
    number: '01',
    title: 'Fisioterapia esportiva',
    text: 'Prevenção, reabilitação e retorno ao esporte com testes objetivos e critérios claros para cada avanço.',
    image: '/images/sports-rehab.jpeg',
    alt: 'Atleta realizando exercício específico durante a reabilitação esportiva',
  },
  {
    number: '02',
    title: 'Ortopedia e pós-operatório',
    text: 'Um plano individual por fases para recuperar mobilidade, força e independência após dor, lesão ou cirurgia.',
    image: '/images/orthopedic-assessment.jpeg',
    alt: 'Avaliação ortopédica com medição objetiva de movimento',
  },
  {
    number: '03',
    title: 'Recovery & performance',
    text: 'Treinamento terapêutico e recursos avançados, quando indicados, para apoiar a recuperação e a prontidão física.',
    image: '/images/tecare-treatment.jpeg',
    alt: 'Tecnologia TECARE integrada ao atendimento manual na Fisio Pro',
  },
];

const journey = [
  ['01', 'Diagnóstico', 'Entendemos sua história, sua rotina, a lesão e o movimento que você precisa recuperar.'],
  ['02', 'Testes objetivos', 'Medimos mobilidade, força e controle para definir um ponto de partida e metas reais.'],
  ['03', 'Plano por fases', 'Cada etapa tem objetivos e critérios clínicos claros, ajustados à resposta do seu corpo.'],
  ['04', 'Retorno seguro', 'Reavaliamos sua evolução até a alta e o retorno à rotina ou ao esporte com confiança.'],
];

const academyPillars = [
  ['Formação continuada', 'Conteúdo que aproxima ciência e prática clínica.'],
  ['Workshops clínicos', 'Experiências aplicáveis à rotina profissional.'],
  ['Mentoria', 'Discussão de casos, raciocínio e desenvolvimento.'],
];

const academyProducts = [
  {
    title: 'Fisio Pro Clinical Pack',
    description: '5 guias essenciais para avaliação, raciocínio clínico e recursos terapêuticos.',
    href: 'https://go.hotmart.com/D107332616U',
  },
  {
    title: '50 Testes Ortopédicos Essenciais',
    description: 'Um material prático da Fisio Pro Academy para apoiar avaliações mais completas.',
    href: 'https://go.hotmart.com/B107331573B',
  },
  {
    title: 'Lesões Musculares e suas Classificações',
    description: 'Conteúdo direcionado à compreensão e classificação das lesões musculares.',
    href: 'https://go.hotmart.com/H107258672J?dp=1',
  },
  {
    title: 'Protocolo de Laser Terapêutico',
    description: 'Dosimetria aplicada a patologias e uso clínico do laser terapêutico.',
    href: 'https://go.hotmart.com/N107258552B?dp=1',
  },
  {
    title: 'Protocolo de Ultrassom Terapêutico',
    description: 'Uso direcionado do ultrassom para potencializar resultados na prática clínica.',
    href: 'https://go.hotmart.com/W107234519I?dp=1',
  },
];

const technologyItems = [
  {
    title: 'Testes objetivos',
    text: 'Mobilidade, força, controle e padrões de movimento são medidos para orientar decisões, acompanhar a evolução e reduzir o espaço para achismos.',
  },
  {
    title: 'TECARE FISIO',
    text: 'Tecnologia de tecarterapia e diatermia utilizada quando indicada para apoiar o controle da dor, a recuperação e o retorno às atividades.',
  },
  {
    title: 'Hands Free + terapia manual',
    text: 'Pulseiras condutoras permitem integrar o estímulo da TECARE às mãos do fisioterapeuta durante técnicas manuais, sem perder o cuidado próximo.',
  },
  {
    title: 'Treinamento terapêutico',
    text: 'Exercícios planejados para reconstruir força, estabilidade, coordenação e confiança nas demandas reais do dia a dia ou do esporte.',
  },
  {
    title: 'Reavaliação contínua',
    text: 'Os mesmos indicadores que guiam o início do plano ajudam a demonstrar a evolução e a decidir, com segurança, quando avançar de fase.',
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
    revealItems.forEach((item) => item.classList.add('reveal-pending'));
    root.classList.add('motion-ready');

    let observer: IntersectionObserver | undefined;
    let revealFallback = 0;
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
        { threshold: 0.04, rootMargin: '180px 0px 180px 0px' },
      );
      revealItems.forEach((item) => observer?.observe(item));
      revealFallback = window.setTimeout(() => {
        revealItems.forEach((item) => item.classList.add('is-visible'));
      }, 6000);
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(revealFallback);
      revealItems.forEach((item) => item.classList.remove('is-visible', 'reveal-pending'));
      root.classList.remove('motion-ready');
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
            <p className="mb-4 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/78 md:text-[11px]">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              5,0 no Google • 58 avaliações
            </p>
            <h1 className="max-w-[1320px] text-[clamp(3.7rem,10vw,10.8rem)] font-medium leading-[0.78] tracking-[-0.072em]">
              Movimento é
              <span className="block font-serif font-normal italic tracking-[-0.055em]">liberdade.</span>
            </h1>
          </div>
          <div className="mt-8 grid gap-6 border-t border-white/30 pt-5 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-[13px] leading-6 text-white/76 md:text-base md:leading-7">
              Fisioterapia ortopédica e esportiva com avaliação individual, testes objetivos e um plano por fases — do diagnóstico ao retorno seguro.
            </p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 md:text-[10px]">
              Agendar minha avaliação
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/35 transition group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <div className="marquee-wrap border-y border-black/15 bg-white py-4" aria-hidden="true">
        <div className="marquee-track text-[10px] font-semibold uppercase tracking-[0.26em]">
          {[0, 1].map((set) => (
            <div className="marquee-group" key={set}>
              {['Método por fases', 'Testes objetivos', 'Evidência clínica', 'Tecnologia aplicada', 'Reavaliação contínua', 'Retorno seguro'].map((word) => (
                <span className="flex items-center" key={`${set}-${word}`}>
                  <span className="mx-6 h-1 w-1 rounded-full bg-black" />
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="metodo" className="content-section bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid items-start gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div className="method-copy lg:sticky lg:top-20">
              <p className="eyebrow" data-reveal>Nosso método</p>
              <h2 className="mt-6 max-w-[760px] text-[clamp(3rem,5.8vw,6.8rem)] font-medium leading-[.9] tracking-[-0.06em]" data-reveal>
                Recuperação não combina com achismo.
                <span className="mt-2 block font-serif font-normal italic text-black/44">Cada fase precisa de um porquê.</span>
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-7 text-black/62 md:text-lg md:leading-8" data-reveal>
                Do diagnóstico à alta, o tratamento segue critérios clínicos, testes objetivos e condutas baseadas em evidências. Você entende onde está, o que vem a seguir e por que avançou.
              </p>
              <div className="mt-9" data-reveal>
                <ArrowLink href={whatsapp}>Agendar minha avaliação</ArrowLink>
              </div>
            </div>

            <figure className="method-visual relative min-h-[580px] overflow-hidden md:min-h-[760px]" data-reveal>
              <img
                src="/images/objective-tests.jpeg"
                alt="Fisioterapeuta acompanhando testes objetivos em um atleta"
                width="1066"
                height="1600"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-28 text-white md:p-9">
                <p className="max-w-sm text-sm leading-6 text-white/78">Dados para decidir. Presença clínica para transformar cada medida em um plano individual.</p>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="content-section bg-black px-5 py-20 text-white md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <p className="eyebrow text-white/50" data-reveal>O diferencial Fisio Pro</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start lg:gap-16">
            <h2 className="max-w-5xl text-[clamp(3.1rem,7.5vw,8.6rem)] font-medium leading-[.84] tracking-[-0.07em]" data-reveal>
              Mais que aliviar a dor. Preparar você para voltar.
            </h2>
            <p className="max-w-lg text-base leading-8 text-white/55 lg:pt-8" data-reveal>
              O objetivo não termina quando o incômodo diminui. A evolução continua até você recuperar função, confiança e capacidade para as demandas da sua vida.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
            <figure className="media-reveal h-[52svh] min-h-[420px] max-h-[680px] overflow-hidden" data-reveal>
              <img src="/images/clinical-technology-assessment-2026.jpg" alt="Fisioterapeuta utilizando tecnologia de avaliação e eletroestimulação em um paciente" width="1066" height="1600" loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
            </figure>
            <figure className="media-reveal h-[52svh] min-h-[420px] max-h-[680px] overflow-hidden" data-reveal>
              <img src="/images/performance-treadmill-2026.jpeg" alt="Fisioterapeuta acompanhando um atleta em avaliação de performance" width="1280" height="854" loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
            </figure>
          </div>
        </div>
      </section>

      <section id="especialidades" className="content-section bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="eyebrow" data-reveal>Especialidades</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(3rem,6.5vw,7.4rem)] font-medium leading-[.87] tracking-[-0.065em]" data-reveal>
                Cuidado para cada objetivo. Critérios para cada avanço.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-black/58 md:text-base" data-reveal>
              Para atletas, praticantes de atividade física ou quem quer voltar à rotina com mais mobilidade e menos limitação.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-4 lg:gap-6">
            {specialties.map((item) => (
              <article key={item.number} className="specialty-card" data-reveal>
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

      <section className="immersive-story relative h-[100svh] bg-black text-white">
        <div className="relative h-[100svh] overflow-hidden">
          <img
            src="/images/immersive-compression-recovery-2026.jpg"
            alt="Paciente em sessão de recuperação com botas de compressão e acompanhamento fisioterapêutico"
            width="854"
            height="1280"
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

      <section className="content-section border-t border-black/10 bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto grid max-w-[1640px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <p className="eyebrow" data-reveal>Do diagnóstico à alta</p>
            <h2 className="mt-6 max-w-xl text-[clamp(3rem,5vw,6rem)] font-medium leading-[.9] tracking-[-0.06em]" data-reveal>
              Um plano claro. Uma evolução que pode ser medida.
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

      <section className="content-section border-t border-black/10 bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow" data-reveal>Tecnologia aplicada com método</p>
              <h2 className="mt-6 max-w-3xl text-[clamp(3rem,5.8vw,6.6rem)] font-medium leading-[.89] tracking-[-0.065em]" data-reveal>
                Tecnologia não substitui o cuidado. Potencializa a estratégia.
              </h2>
            </div>
            <div className="lg:pt-24" data-reveal>
              <p className="max-w-xl text-base leading-8 text-black/62 md:text-lg">
                Recursos avançados entram quando fazem sentido para o seu caso e sempre fazem parte de um plano clínico maior.
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

          <div className="mt-14 grid gap-3 sm:grid-cols-3 md:mt-20 md:gap-5">
            <figure className="media-reveal h-[420px] overflow-hidden md:h-[560px] lg:h-[620px]" data-reveal>
              <img src="/images/clinical-device-2026.jpeg" alt="Tecnologia de avaliação aplicada durante o atendimento" width="1066" height="1600" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
            <figure className="media-reveal h-[420px] overflow-hidden md:h-[560px] lg:h-[620px]" data-reveal>
              <img src="/images/therapy-equipment-2026.jpeg" alt="Equipamentos de eletroterapia e laser utilizados pela Fisio Pro" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
            <figure className="media-reveal h-[420px] overflow-hidden md:h-[560px] lg:h-[620px]" data-reveal>
              <img src="/images/laser-treatment-2026.jpeg" alt="Aplicação de laser terapêutico no pé de um paciente" width="854" height="1280" loading="lazy" decoding="async" className="h-full w-full object-cover" />
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
            <div className="max-w-md" data-reveal>
              <p className="text-sm leading-7 text-white/58 md:text-base">
                Estrutura ampla, recursos funcionais e liberdade para transformar cada fase da recuperação em movimento real.
              </p>
              <div className="mt-6 hidden gap-2 md:flex">
                <Button type="button" variant="ghost" className="h-11 w-11 rounded-full border border-white/25 p-0 text-white hover:bg-white hover:text-black" aria-label="Foto anterior" onClick={() => moveGallery(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" className="h-11 w-11 rounded-full border border-white/25 p-0 text-white hover:bg-white hover:text-black" aria-label="Próxima foto" onClick={() => moveGallery(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div ref={galleryRef} className="space-gallery mt-10 grid grid-cols-2 gap-3 px-5 pb-4 md:mt-20 md:flex md:snap-x md:snap-mandatory md:gap-6 md:overflow-x-auto md:px-10 lg:px-14">
          {[
            ['/images/hero-space.jpeg', 'Vista vertical da área ampla de treinamento da Fisio Pro'],
            ['/images/space-hero-2026.jpeg', 'Vista panorâmica da estrutura Fisio Pro'],
            ['/images/space-equipment-2026.jpeg', 'Equipamentos funcionais organizados no espaço de treinamento'],
            ['/images/space-bike-2026.jpeg', 'Bicicleta e equipamentos de preparação física da Fisio Pro'],
          ].map(([src, alt], index) => (
            <figure key={src} className={`gallery-slide media-reveal relative shrink-0 overflow-hidden md:h-[62svh] md:min-h-[460px] md:snap-center ${
              index === 0
                ? 'col-span-2 aspect-[3/4] md:aspect-auto md:w-[62vw]'
                : index === 1
                  ? 'col-span-2 aspect-[16/10] md:aspect-auto md:w-[48vw]'
                  : 'col-span-1 aspect-[4/5] md:aspect-auto md:w-[42vw]'
            }`} data-reveal>
              <img
                src={src}
                alt={alt}
                width={index === 0 ? 854 : 1280}
                height={index === 0 ? 1280 : 854}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-white drop-shadow md:bottom-7 md:left-7">0{index + 1} / 04</span>
            </figure>
          ))}
        </div>
      </section>

      <section id="equipe" className="content-section bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow" data-reveal>Equipe Fisio Pro</p>
              <h2 className="mt-6 text-[clamp(3rem,5.6vw,6.4rem)] font-medium leading-[.9] tracking-[-0.065em]" data-reveal>
                Profissionais presentes em cada fase.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-black/58 lg:mt-24" data-reveal>
              Uma equipe que une raciocínio clínico, atualização constante e acompanhamento próximo para transformar dados em decisões seguras.
            </p>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
            {teamMembers.map((member, index) => (
              <article key={member.name} className="flex h-full flex-col" data-reveal>
                <figure className="team-portrait relative aspect-[4/3] min-h-0 overflow-hidden bg-black md:aspect-[16/10]">
                  <img
                    src={member.image}
                    alt={member.alt}
                    width={member.imageWidth}
                    height={member.imageHeight}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: member.objectPosition }}
                  />
                  <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-black text-[10px] font-semibold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </figure>

                <div className="flex flex-1 flex-col border-t border-black pt-5 md:pt-6">
                  <div>
                    <h3 className="max-w-[12ch] text-[clamp(2rem,3.15vw,3.75rem)] font-medium leading-[.95] tracking-[-0.055em]">{member.name}</h3>
                    <p className="mt-4 max-w-[34rem] text-[11px] font-semibold uppercase leading-5 tracking-[0.14em] text-black/48">{member.role}</p>
                  </div>

                  <p className="mt-6 max-w-xl font-serif text-[clamp(1.45rem,2.1vw,2.25rem)] italic leading-[1.15] tracking-[-0.025em] text-black/78">{member.tagline}</p>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-black/62">{member.bio}</p>

                  <div className="mt-7 grid gap-3 border-t border-black/15 pt-5 sm:grid-cols-[9rem_1fr]">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Formação & especializações</p>
                    <ul className="space-y-2 text-[15px] leading-7 text-black/68">
                      {member.formations.map((formation) => (
                        <li key={formation} className="border-b border-black/10 pb-2">{formation}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 grid gap-3 border-t border-black/15 pt-5 sm:grid-cols-[9rem_1fr]">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Experiência</p>
                    <ul className="space-y-2 text-[15px] leading-7 text-black/68">
                      {member.experience.map((item) => (
                        <li key={item} className="border-b border-black/10 pb-2">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t border-black/15 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Áreas de expertise</p>
                    <p className="mt-3 text-sm leading-7 text-black/68">{member.expertise}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="academy" className="academy-v2 content-section border-t border-black/10 bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
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
            <div className="mt-12" data-reveal>
              <div className="flex items-end justify-between gap-6 border-b border-black pb-4">
                <h3 className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">Cursos e materiais</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/42">Hotmart</span>
              </div>
              <div>
                {academyProducts.map((product, index) => (
                  <a
                    key={product.href}
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[34px_1fr_auto] gap-3 border-b border-black/20 py-5 transition-colors duration-300 hover:bg-black hover:px-4 hover:text-white md:grid-cols-[42px_1fr_auto] md:gap-5"
                  >
                    <span className="pt-1 text-[10px] font-semibold tracking-[0.12em] text-black/35 transition-colors group-hover:text-white/55">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <strong className="block text-base font-medium leading-6 md:text-lg">{product.title}</strong>
                      <span className="mt-1.5 block max-w-xl text-sm leading-6 text-black/55 transition-colors group-hover:text-white/65">{product.description}</span>
                    </span>
                    <ArrowUpRight className="mt-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-9" data-reveal>
              <ArrowLink href={academyInstagram}>Conhecer a Fisio Pro Academy</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="closing-cta border-t border-black/10 bg-white px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1640px]">
          <p className="eyebrow" data-reveal>Avaliação individual em Louveira</p>
          <h2 className="mt-8 max-w-[1450px] text-[clamp(3.4rem,9vw,10.4rem)] font-medium leading-[.8] tracking-[-0.075em]" data-reveal>
            Seu retorno começa com uma avaliação de verdade.
          </h2>
          <div className="mt-14 grid gap-9 border-t border-black/20 pt-7 md:mt-20 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-xl" data-reveal>
              <p className="text-lg leading-8 text-black/62">Conte o que está limitando você. A equipe orienta o melhor primeiro passo e encontra um horário para sua avaliação.</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-black/70"><MapPin className="h-4 w-4" aria-hidden="true" /> Vila Nova Louveira • Louveira, SP</p>
            </div>
            <div data-reveal><ArrowLink href={whatsapp}>Quero agendar minha avaliação</ArrowLink></div>
          </div>
        </div>
      </section>

      <footer className="footer-v2 bg-black px-5 pb-8 pt-10 text-white md:px-10 md:pb-10 md:pt-14 lg:px-14">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <a href="#inicio" aria-label="Fisio Pro — voltar ao início" className="inline-flex items-center gap-4">
                <img src="/images/mark-white.png" alt="" width="66" height="66" className="h-16 w-16 rounded-full" />
                <span className="text-xl font-semibold tracking-[0.2em]">FISIO PRO</span>
              </a>
              <p className="mt-8 max-w-lg text-3xl font-medium leading-tight tracking-[-0.035em] text-white/80 md:text-5xl">
                Ciência para mover.<br />Cuidado para evoluir.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="footer-contact-card group">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span><small>Agende pelo WhatsApp</small><strong>(19) 97126-5215</strong></span>
                <ArrowUpRight className="ml-auto h-4 w-4 opacity-45 transition group-hover:opacity-100" aria-hidden="true" />
              </a>
              <a href="tel:+5519971265215" className="footer-contact-card group">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span><small>Prefere ligar?</small><strong>Fale com a clínica</strong></span>
                <ArrowUpRight className="ml-auto h-4 w-4 opacity-45 transition group-hover:opacity-100" aria-hidden="true" />
              </a>
              <a href={instagram} target="_blank" rel="noreferrer" className="footer-contact-card group">
                <AtSign className="h-5 w-5" aria-hidden="true" />
                <span><small>Acompanhe nosso trabalho</small><strong>Instagram @fisiopro019</strong></span>
                <ArrowUpRight className="ml-auto h-4 w-4 opacity-45 transition group-hover:opacity-100" aria-hidden="true" />
              </a>
              <a href={googleMaps} target="_blank" rel="noreferrer" className="footer-contact-card group">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <span><small>Abra a rota no Google Maps</small><strong>R. Nícola Tarallo, 44</strong></span>
                <ArrowUpRight className="ml-auto h-4 w-4 opacity-45 transition group-hover:opacity-100" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 py-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/48">
            <a href="#metodo" className="hover:text-white">Método</a>
            <a href="#especialidades" className="hover:text-white">Especialidades</a>
            <a href="#espaco" className="hover:text-white">O espaço</a>
            <a href="#equipe" className="hover:text-white">Equipe</a>
            <a href="#academy" className="hover:text-white">Academy</a>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/32 sm:flex-row">
            <p>
              © 2026 Fisio Pro. Todos os direitos reservados.
              <span className="mt-2 block sm:ml-4 sm:mt-0 sm:inline">Desenvolvido por <a href="https://amarotech.com.br/" target="_blank" rel="noreferrer" className="text-white/65 underline decoration-white/25 underline-offset-4 transition hover:text-white">Amaro Tech</a>.</span>
            </p>
            <p>Fisioterapia • Reabilitação • Performance</p>
          </div>
        </div>
      </footer>

      <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a Fisio Pro pelo WhatsApp" className="whatsapp-float fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-[#071c0f] shadow-[0_14px_40px_rgba(0,0,0,.3)] md:bottom-6 md:right-6">
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
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
