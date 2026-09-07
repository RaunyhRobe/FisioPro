'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  MoveRight,
  X,
} from 'lucide-react';

const whatsapp = 'https://wa.me/5519971282430?text=Olá%2C%20gostaria%20de%20agendar%20uma%20avaliação%20na%20Fisio%20Pro.';

const specialties = [
  {
    index: '01',
    title: 'Fisioterapia esportiva',
    text: 'Estratégias individualizadas para tratar lesões, recuperar potência e preparar um retorno seguro ao esporte.',
    image: '/images/mobility-youth.jpeg',
  },
  {
    index: '02',
    title: 'Ortopedia e trauma',
    text: 'Cuidado preciso para dores, limitações de movimento e reabilitação após lesões ou procedimentos cirúrgicos.',
    image: '/images/ultrasound-treatment.jpeg',
  },
  {
    index: '03',
    title: 'Recovery & performance',
    text: 'Recursos de recuperação e treino funcional para quem deseja evoluir com consistência, segurança e confiança.',
    image: '/images/recovery-compression.jpeg',
  },
];

const process = [
  ['01', 'Escuta', 'Entendemos sua história, rotina e o que você quer voltar a fazer.'],
  ['02', 'Avaliação', 'Investigamos movimento, força e função para enxergar além do sintoma.'],
  ['03', 'Estratégia', 'Construímos um plano claro, progressivo e adaptado à sua realidade.'],
  ['04', 'Evolução', 'Acompanhamos cada resposta do corpo até a autonomia e a performance.'],
];

function ArrowLink({ children, href, inverse = false }: { children: React.ReactNode; href: string; inverse?: boolean }) {
  return (
    <a
      href={href}
      className={`arrow-link group inline-flex items-center gap-5 rounded-full border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] transition duration-500 ${
        inverse ? 'border-white/25 hover:bg-white hover:text-black' : 'border-black/25 hover:bg-black hover:text-white'
      }`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

export function FisioProSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | undefined;
    let frame = 0;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        anchors: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="overflow-clip bg-background text-foreground">
      <section className="hero-shell relative min-h-[100svh] overflow-hidden bg-black text-white">
        <img
          className="hero-image absolute inset-0 h-full w-full object-cover opacity-70"
          src="/images/hero-space.jpeg"
          alt="Espaço amplo de reabilitação e performance da Fisio Pro"
        />
        <div className="hero-shade absolute inset-0" />

        <header className="relative z-30 flex items-center justify-between px-5 py-5 md:px-10 md:py-7 lg:px-14">
          <a href="#inicio" aria-label="Fisio Pro — início" className="flex items-center gap-3">
            <img src="/images/mark-white.png" alt="" className="h-11 w-11 rounded-full object-cover" />
            <span className="text-sm font-medium tracking-[0.24em]">FISIO PRO</span>
          </a>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.16em] lg:flex" aria-label="Navegação principal">
            <a href="#metodo" className="nav-link">Método</a>
            <a href="#especialidades" className="nav-link">Especialidades</a>
            <a href="#espaco" className="nav-link">O espaço</a>
            <a href="#equipe" className="nav-link">Equipe</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group hidden items-center gap-3 rounded-full border border-white/35 bg-white/5 px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] backdrop-blur-md transition hover:bg-white hover:text-black sm:flex"
            >
              Agende sua avaliação
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white/5 backdrop-blur-md lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div id="inicio" className="relative z-10 flex min-h-[calc(100svh-92px)] flex-col justify-end px-5 pb-8 md:px-10 md:pb-10 lg:px-14 lg:pb-12">
          <p className="hero-kicker mb-4 text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs">Fisioterapia • Reabilitação • Performance</p>
          <h1 className="hero-title max-w-[1180px] text-[clamp(3.6rem,10.5vw,10.5rem)] font-medium leading-[0.78] tracking-[-0.065em]">
            Movimento é
            <span className="block font-serif font-normal italic tracking-[-0.04em]">liberdade.</span>
          </h1>
          <div className="hero-meta mt-8 flex items-end justify-between gap-6 border-t border-white/25 pt-5 md:mt-10">
            <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Cuidado preciso para você recuperar confiança, superar limites e voltar ao que faz a vida pulsar.
            </p>
            <a href="#metodo" className="group flex shrink-0 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/70">
              <span className="hidden sm:inline">Descubra a Fisio Pro</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition group-hover:bg-white group-hover:text-black">
                <ArrowDown className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <div className="marquee-wrap border-y border-black/10 bg-[#ece9e2] py-4" aria-hidden="true">
        <div className="marquee-track text-[11px] font-medium uppercase tracking-[0.28em]">
          {Array.from({ length: 2 }).map((_, repetition) => (
            <div className="flex shrink-0 items-center" key={repetition}>
              {['Ciência', 'Movimento', 'Cuidado', 'Performance', 'Autonomia', 'Resultado'].map((word) => (
                <span className="flex items-center" key={`${repetition}-${word}`}><span className="mx-7 h-1 w-1 rounded-full bg-black" />{word}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="metodo" className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
            <div data-reveal className="reveal-up">
              <p className="eyebrow">Nosso método</p>
              <p className="mt-5 max-w-xs text-sm leading-7 text-black/58">
                Não cuidamos apenas de uma dor. Cuidamos do movimento que conecta você à sua rotina, ao esporte e às pessoas.
              </p>
            </div>
            <div data-reveal className="reveal-up">
              <h2 className="display-copy text-[clamp(2.9rem,6.6vw,7.5rem)] font-medium leading-[.94] tracking-[-0.055em]">
                Seu corpo não é um protocolo. <span className="font-serif font-normal italic text-black/45">É uma história em movimento.</span>
              </h2>
            </div>
          </div>

          <div className="mt-20 grid items-end gap-8 md:mt-32 md:grid-cols-[1.35fr_.65fr] md:gap-12">
            <figure data-reveal className="reveal-image image-frame h-[60vh] min-h-[440px] overflow-hidden md:h-[760px]">
              <img src="/images/treadmill.jpeg" alt="Avaliação funcional acompanhada por fisioterapeuta" className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <div data-reveal className="reveal-up pb-3 md:pb-10">
              <span className="font-serif text-7xl italic text-black/15 md:text-9xl">01</span>
              <h3 className="mt-6 max-w-md text-2xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">Escuta clínica, olhar humano e precisão em cada escolha.</h3>
              <p className="mt-6 max-w-sm text-sm leading-7 text-black/60 md:text-base">
                Avaliação individual, recursos tecnológicos e acompanhamento próximo se encontram em um plano construído para o seu momento.
              </p>
              <div className="mt-9"><ArrowLink href={whatsapp}>Comece sua jornada</ArrowLink></div>
            </div>
          </div>
        </div>
      </section>

      <section id="especialidades" className="bg-[#0a0a0a] px-5 py-24 text-white md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
            <div data-reveal className="reveal-up">
              <p className="eyebrow text-white/55">Especialidades</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.06em]">Cuidado que acompanha o seu ritmo.</h2>
            </div>
            <p data-reveal className="reveal-up max-w-sm text-sm leading-7 text-white/55 md:text-base">Da primeira avaliação ao retorno completo, cada etapa existe para devolver segurança ao seu movimento.</p>
          </div>

          <div className="divide-y divide-white/15 border-y border-white/15">
            {specialties.map((item) => (
              <article key={item.index} data-reveal className="specialty-row reveal-up group grid gap-6 py-8 md:grid-cols-[80px_1fr_1fr_48px] md:items-center md:gap-8 md:py-10">
                <span className="text-xs tracking-[0.2em] text-white/40">{item.index}</span>
                <h3 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">{item.title}</h3>
                <p className="max-w-md text-sm leading-7 text-white/55">{item.text}</p>
                <span className="hidden h-11 w-11 place-items-center rounded-full border border-white/20 transition duration-500 group-hover:rotate-[-12deg] group-hover:bg-white group-hover:text-black md:grid"><ArrowUpRight className="h-4 w-4" /></span>
                <div className="specialty-preview pointer-events-none absolute right-[18%] z-20 hidden h-64 w-48 overflow-hidden lg:block">
                  <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-[1.25fr_.75fr]">
            <figure data-reveal className="reveal-image image-frame h-[480px] overflow-hidden md:h-[680px]">
              <img src="/images/functional-older.jpeg" alt="Treino funcional individualizado na Fisio Pro" className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <figure data-reveal className="reveal-image image-frame h-[480px] overflow-hidden md:mt-28 md:h-[560px]">
              <img src="/images/laser-foot.jpeg" alt="Tecnologia aplicada ao cuidado fisioterapêutico" className="h-full w-full object-cover" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-[#d9d5cc] px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div data-reveal className="reveal-up lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow">Uma jornada clara</p>
              <h2 className="mt-7 max-w-lg text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[.92] tracking-[-0.055em]">Do incômodo à confiança.</h2>
              <p className="mt-7 max-w-sm text-sm leading-7 text-black/60">Você entende o que está acontecendo, participa das decisões e percebe sua evolução em cada fase.</p>
            </div>
            <div className="border-t border-black/20">
              {process.map(([number, title, text]) => (
                <article key={number} data-reveal className="reveal-up grid grid-cols-[52px_1fr] gap-4 border-b border-black/20 py-8 md:grid-cols-[70px_.55fr_1fr] md:gap-8 md:py-12">
                  <span className="pt-2 text-xs tracking-[0.2em] text-black/40">{number}</span>
                  <h3 className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">{title}</h3>
                  <p className="col-start-2 max-w-md text-sm leading-7 text-black/60 md:col-start-auto md:text-base">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section relative min-h-[92svh] overflow-hidden bg-black text-white">
        <img src="/images/mobility-youth.jpeg" alt="Atendimento individual para evolução do movimento" className="absolute inset-0 h-full w-full object-cover opacity-65" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.75))]" />
        <div className="relative z-10 flex min-h-[92svh] flex-col justify-between px-5 py-8 md:px-10 md:py-12 lg:px-14">
          <p className="eyebrow text-white/60">Fisio Pro</p>
          <blockquote data-reveal className="reveal-up max-w-[1250px] text-[clamp(3rem,7.5vw,8rem)] font-medium leading-[.88] tracking-[-0.06em]">Voltar não basta. Queremos que você volte <span className="font-serif font-normal italic">melhor.</span></blockquote>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div data-reveal className="reveal-up">
              <p className="eyebrow">Tecnologia com propósito</p>
              <h2 className="mt-7 max-w-2xl text-[clamp(3rem,5.8vw,6.4rem)] font-medium leading-[.91] tracking-[-0.06em]">Recursos modernos. Decisões humanas.</h2>
            </div>
            <div data-reveal className="reveal-up lg:pt-24">
              <p className="max-w-lg text-lg leading-8 text-black/62">A tecnologia amplia o olhar clínico — nunca o substitui. Cada recurso é escolhido porque faz sentido para seu objetivo e para a fase atual do tratamento.</p>
              <ul className="mt-10 divide-y divide-black/15 border-y border-black/15 text-sm uppercase tracking-[0.14em]">
                {['Avaliação funcional', 'Terapia manual', 'Eletroterapia e laser', 'Treinamento terapêutico', 'Recovery'].map((item) => (
                  <li key={item} className="flex items-center justify-between py-4"><span>{item}</span><MoveRight className="h-4 w-4 text-black/35" /></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
            <figure data-reveal className="reveal-image image-frame col-span-2 h-[480px] overflow-hidden md:col-span-7 md:h-[720px]">
              <img src="/images/electrotherapy.jpeg" alt="Atendimento com eletroterapia" className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <figure data-reveal className="reveal-image image-frame col-span-1 h-80 overflow-hidden md:col-span-5 md:mt-28 md:h-[510px]">
              <img src="/images/equipment.jpeg" alt="Equipamentos de fisioterapia da clínica" className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <figure data-reveal className="reveal-image image-frame col-span-1 h-80 overflow-hidden md:col-span-4 md:-mt-32 md:h-[500px]">
              <img src="/images/compression-care.jpeg" alt="Sessão de recovery com compressão pneumática" className="h-full w-full object-cover" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section id="espaco" className="bg-white py-24 md:py-36 lg:py-44">
        <div className="px-5 md:px-10 lg:px-14">
          <div className="mx-auto mb-16 flex max-w-[1500px] flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
            <div data-reveal className="reveal-up">
              <p className="eyebrow">Nosso espaço</p>
              <h2 className="mt-7 max-w-4xl text-[clamp(3.2rem,7vw,7.6rem)] font-medium leading-[.88] tracking-[-0.065em]">Amplo para evoluir. Próximo para acolher.</h2>
            </div>
            <p data-reveal className="reveal-up max-w-sm text-sm leading-7 text-black/58">Ambiente completo para avaliação, tratamento e treinamento — com liberdade para o corpo se expressar.</p>
          </div>
        </div>
        <div data-reveal className="reveal-image h-[78svh] min-h-[560px] overflow-hidden">
          <img src="/images/studio-panorama.jpeg" alt="Vista panorâmica da estrutura Fisio Pro" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="grid gap-4 px-5 pt-4 md:grid-cols-[.68fr_1.32fr] md:gap-6 md:px-10 md:pt-6 lg:px-14">
          <figure data-reveal className="reveal-image image-frame h-[460px] overflow-hidden md:h-[620px]">
            <img src="/images/space-bw.jpeg" alt="Detalhes da área de treinamento" className="h-full w-full object-cover" loading="lazy" />
          </figure>
          <figure data-reveal className="reveal-image image-frame h-[460px] overflow-hidden md:h-[620px]">
            <img src="/images/studio-wide.jpeg" alt="Equipamentos na área funcional da Fisio Pro" className="h-full w-full object-cover" loading="lazy" />
          </figure>
        </div>
      </section>

      <section id="equipe" className="bg-[#0a0a0a] px-5 py-24 text-white md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div data-reveal className="reveal-up">
              <p className="eyebrow text-white/55">Equipe Fisio Pro</p>
              <h2 className="mt-7 text-[clamp(3rem,5vw,6rem)] font-medium leading-[.92] tracking-[-0.06em]">Presença que transmite confiança.</h2>
            </div>
            <p data-reveal className="reveal-up max-w-2xl text-xl leading-9 text-white/60 lg:mt-24">Profissionais que unem raciocínio clínico, atualização constante e uma vontade genuína de ver cada pessoa voltar ao seu melhor.</p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-24 md:gap-7">
            <figure data-reveal className="team-card reveal-image relative h-[650px] overflow-hidden md:h-[800px]">
              <img src="/images/therapist-giovanni.jpeg" alt="Fisioterapeuta da equipe Fisio Pro" className="h-full w-full object-cover" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent px-6 pb-7 pt-24">
                <div><p className="text-xl font-medium">Especialistas em movimento</p><p className="mt-1 text-sm text-white/55">Ciência, escuta e cuidado</p></div><ArrowUpRight className="h-5 w-5" />
              </figcaption>
            </figure>
            <figure data-reveal className="team-card reveal-image relative h-[650px] overflow-hidden sm:mt-28 md:h-[800px]">
              <img src="/images/therapist-rauny.jpeg" alt="Fisioterapeuta da equipe Fisio Pro" className="h-full w-full object-cover" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent px-6 pb-7 pt-24">
                <div><p className="text-xl font-medium">Atendimento próximo</p><p className="mt-1 text-sm text-white/55">Estratégia para cada história</p></div><ArrowUpRight className="h-5 w-5" />
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="academy-section px-5 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div data-reveal className="reveal-up flex min-h-[360px] items-center justify-center bg-white p-8 md:min-h-[500px]">
            <img src="/images/logo-academy.jpg" alt="Fisio Pro Academy — Ciência, Ensino, Resultados" className="academy-logo w-full max-w-xl mix-blend-multiply" loading="lazy" />
          </div>
          <div data-reveal className="reveal-up">
            <p className="eyebrow">Fisio Pro Academy</p>
            <h2 className="mt-7 max-w-2xl text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.92] tracking-[-0.06em]">Conhecimento que também se movimenta.</h2>
            <p className="mt-8 max-w-lg text-base leading-8 text-black/60">Um braço da marca dedicado à troca de conhecimento, à formação e ao desenvolvimento de profissionais que buscam mais ciência e resultado na prática.</p>
            <div className="mt-10"><ArrowLink href="https://www.instagram.com/fisiopro19/">Conheça a Academy</ArrowLink></div>
          </div>
        </div>
      </section>

      <section id="contato" className="relative overflow-hidden bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-14 lg:py-40">
        <div className="contact-glow absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-white/8 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div data-reveal className="reveal-up">
            <p className="eyebrow text-white/55">Seu próximo movimento começa aqui</p>
            <h2 className="mt-8 max-w-[1250px] text-[clamp(3.5rem,8.5vw,9.5rem)] font-medium leading-[.82] tracking-[-0.07em]">Vamos construir a sua melhor versão?</h2>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-10 border-t border-white/20 pt-8 md:mt-20 md:flex-row md:items-end">
            <div data-reveal className="reveal-up space-y-3 text-sm text-white/60">
              <a href="tel:+5519971282430" className="block text-xl text-white transition hover:text-white/60">(19) 97128-2430</a>
              <a href="https://www.instagram.com/fisiopro19/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white"><span aria-hidden="true">@</span>fisiopro19</a>
            </div>
            <div data-reveal className="reveal-up"><ArrowLink href={whatsapp} inverse>Agendar avaliação</ArrowLink></div>
          </div>
        </div>
      </section>

      <footer className="bg-black px-5 pb-8 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1500px] border-t border-white/15 pt-8">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <a href="#inicio" className="block h-16 w-56 overflow-hidden" aria-label="Fisio Pro — voltar ao início">
              <img src="/images/logo-horizontal-white.png" alt="Fisio Pro" className="brand-lockup h-full w-full object-cover" />
            </a>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-white/45">
              <a href="#metodo" className="hover:text-white">Método</a>
              <a href="#especialidades" className="hover:text-white">Especialidades</a>
              <a href="#espaco" className="hover:text-white">O espaço</a>
              <a href="#equipe" className="hover:text-white">Equipe</a>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.12em] text-white/35 sm:flex-row">
            <p>© 2026 Fisio Pro. Todos os direitos reservados.</p>
            <p>Ciência para mover. Cuidado para evoluir.</p>
          </div>
        </div>
      </footer>

      <div className={`fixed inset-0 z-50 bg-[#0a0a0a] text-white transition duration-700 lg:hidden ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="flex items-center justify-between px-5 py-5 md:px-10">
          <span className="text-sm font-medium tracking-[0.24em]">FISIO PRO</span>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-white/30" aria-label="Fechar menu" onClick={closeMenu}><X className="h-4 w-4" /></button>
        </div>
        <nav className="flex h-[calc(100%-90px)] flex-col justify-center px-5 md:px-10" aria-label="Menu móvel">
          {[
            ['Método', '#metodo'], ['Especialidades', '#especialidades'], ['O espaço', '#espaco'], ['Equipe', '#equipe'],
          ].map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu} className="flex items-center justify-between border-t border-white/15 py-5 text-4xl tracking-[-0.04em] last:border-b sm:text-6xl">
              <span>{label}</span><span className="text-xs text-white/35">0{index + 1}</span>
            </a>
          ))}
          <a href={whatsapp} onClick={closeMenu} className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em]">Agende sua avaliação <ArrowRight className="h-4 w-4" /></a>
        </nav>
      </div>
    </main>
  );
}
