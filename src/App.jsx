import React, { useEffect, useRef, useState } from 'react';
import { 
  Calendar, ChevronRight, Menu, Search, PlayCircle, Clock, 
  TrendingUp, Shield, MapPin, X, Instagram, Facebook, Twitter, 
  Moon, Sun, Users, Video, ChevronDown, Radio, Lock, Youtube, Star
} from 'lucide-react';

// CORREÇÃO: Como a imagem está na pasta 'public', não usamos import.
// A barra "/" refere-se à raiz da pasta public.
const logoLiga = "/logoligasemfundo.png";

// --- MOCK DATA ---

const PLACARES = [
  { id: 1, timeA: 'Brasília Futsal', golsA: 4, timeB: 'AJJR Futsal', golsB: 2, status: 'ENCERRADO', liga: 'Série Ouro' },
  { id: 2, timeA: 'Cresspom', golsA: 1, timeB: 'Minas Brasília', golsB: 1, status: 'ENCERRADO', liga: 'Feminino' },
  { id: 3, timeA: 'Aruc', golsA: 3, timeB: 'Planaltina', golsB: 5, status: 'ENCERRADO', liga: 'Sub-20' },
  { id: 4, timeA: 'Ceilândia', golsA: 0, timeB: 'Real Brasília', golsB: 0, status: 'AO VIVO 2ºT', liga: 'Série Ouro' },
  { id: 5, timeA: 'Sobradinho', golsA: 0, timeB: 'Gama', golsB: 0, status: 'HOJE 20:00', liga: 'Série Prata' },
];

const NOTICIAS_DESTAQUE = [
  {
    id: 1,
    titulo: "Brasília Futsal vence clássico e assume liderança isolada",
    categoria: "SÉRIE OURO",
    imagem: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1930&auto=format&fit=crop",
    resumo: "Em jogo eletrizante no Ginásio do Cruzeiro, equipe da capital mostra força defensiva e garante vaga.",
    autor: "Redação LCF",
    data: "17 DEZ, 2025"
  },
  {
    id: 2,
    titulo: "Revelação do Candanguinha 2024 renova contrato",
    categoria: "MERCADO",
    imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop",
    resumo: "Artilheiro do campeonato fica para a temporada 2026 visando o Brasileiro de Ligas.",
    autor: "Assessoria",
    data: "16 DEZ, 2025"
  },
  {
    id: 3,
    titulo: "Guia da Rodada: Saiba onde assistir aos jogos decisivos",
    categoria: "SERVIÇO",
    imagem: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1886&auto=format&fit=crop",
    resumo: "Transmissões ao vivo pela TV Candanga no YouTube e Band.",
    autor: "Mídia LCF",
    data: "15 DEZ, 2025"
  }
];

const TABELA = [
  { pos: 1, time: "Brasília Futsal", pts: 24, j: 9, v: 8, sg: 15, emblem: "BRA" },
  { pos: 2, time: "AJJR Futsal", pts: 21, j: 9, v: 7, sg: 12, emblem: "AJR" },
  { pos: 3, time: "Aruc", pts: 18, j: 9, v: 6, sg: 8, emblem: "ARU" },
  { pos: 4, time: "Real Brasília", pts: 15, j: 8, v: 4, sg: 2, emblem: "REA" },
  { pos: 5, time: "Planaltina", pts: 12, j: 9, v: 3, sg: -5, emblem: "PLA" },
];

const CLUBES = [
  { id: 1, nome: "Brasília Futsal", cidade: "Brasília", historia: "Fundado em 1999, maior campeão do DF.", emblem: "BRA" },
  { id: 2, nome: "AJJR Futsal", cidade: "Taguatinga", historia: "Foco na formação de atletas de base.", emblem: "AJR" },
  { id: 3, nome: "Aruc", cidade: "Cruzeiro", historia: "Tradicional clube cultural e esportivo.", emblem: "ARU" },
  { id: 4, nome: "Planaltina EC", cidade: "Planaltina", historia: "A força da torcida do norte.", emblem: "PEC" },
];

const PARCEIROS = [
  { id: 1, nome: "BAND", tipo: "Mídia Oficial", resumo: "Transmissão exclusiva dos jogos finais." },
  { id: 2, nome: "BRB", tipo: "Patrocinador Master", resumo: "Banco de Brasília, apoiando o esporte local." },
  { id: 3, nome: "Secretaria de Esportes", tipo: "Apoio Institucional", resumo: "Fomento ao esporte no Distrito Federal." },
  { id: 4, nome: "GDF", tipo: "Governo", resumo: "Governo do Distrito Federal." },
];

// --- HOOKS & UTILS ---

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  return { theme, toggleTheme };
};

const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transformClass = {
    up: isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
    left: isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0',
    right: isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0',
  }[direction];

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out transform ${transformClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const NavItem = ({ label, href = "#", active, hasSubmenu, submenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        href={href} 
        className={`flex items-center gap-1 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${active ? 'text-brand-green' : 'text-slate-300 dark:text-slate-400 hover:text-brand-yellow dark:hover:text-brand-yellow'}`}
      >
        {label}
        {hasSubmenu && <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        {active && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green shadow-[0_0_10px_rgba(0,153,51,0.8)]"></span>}
      </a>
      
      {hasSubmenu && isOpen && (
        <div className="absolute top-full left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-2 min-w-[180px] flex flex-col z-50 animate-fade-in-down">
          {submenuItems.map((item, idx) => (
             <a key={idx} href={item.href} className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-green transition-colors border-b border-transparent hover:border-l-4 hover:border-l-brand-green">
               {item.label}
             </a>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileMenuItem = ({ label, href = "#" }) => (
  <a href={href} className="block py-4 text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 hover:text-brand-green hover:pl-2 transition-all">
    {label}
  </a>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-brand-green pl-4">
    <div>
      {subtitle && <span className="block text-brand-yellow font-bold text-xs uppercase tracking-[0.2em] mb-1">{subtitle}</span>}
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tight">
        {title}
      </h2>
    </div>
    <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-brand-green to-transparent rounded-full opacity-50"></div>
  </div>
);

const SectionSeparator = ({ color = "green" }) => (
  <div className={`h-2 w-full bg-gradient-to-r ${color === "green" ? "from-brand-green via-emerald-600 to-slate-900" : "from-brand-yellow via-orange-500 to-slate-900"}`}></div>
);

// --- MAIN COMPONENTS ---

const Header = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-slate-200 dark:border-slate-800 py-2 shadow-lg' : 'bg-transparent border-transparent py-4 bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3 group cursor-pointer z-50">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/5 rounded-full backdrop-blur-sm p-1 border border-white/10 shadow-lg group-hover:scale-105 transition-transform">
                 <img src={logoLiga} alt="Logo Liga Candanga" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-2xl font-black tracking-tighter leading-none text-slate-900 dark:text-white group-hover:text-brand-green transition-colors">
                  LIGA <span className="text-brand-yellow">CANDANGA</span>
                </h1>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-slate-600 dark:text-slate-400 uppercase">Distrito Federal</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-lg">
              <NavItem label="Início" href="#" active />
              <NavItem 
                label="Campeonatos" 
                href="#campeonatos"
                hasSubmenu 
                submenuItems={[
                  { label: 'Tabela de Classificação', href: '#tabela' },
                  { label: 'Clubes Filiados', href: '#clubes' },
                  { label: 'Agenda de Jogos', href: '#agenda' }
                ]}
              />
              <NavItem label="Notícias" href="#noticias" />
              <NavItem label="Parceiros" href="#parceiros" />
              <NavItem label="TV Candanga" href="#youtube" />
              <NavItem label="Sobre" href="#footer" />
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="hidden md:flex p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Alternar Tema"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="hidden md:flex gap-2">
                 <a href="https://www.youtube.com" target="_blank" className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Youtube size={20}/></a>
                 <a href="https://www.instagram.com" target="_blank" className="p-2 text-slate-400 hover:text-pink-600 transition-colors"><Instagram size={20}/></a>
              </div>

              {/* Mobile Toggle */}
              <button 
                className="lg:hidden p-2 text-slate-900 dark:text-white z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-40 transition-transform duration-300 lg:hidden flex flex-col pt-24 px-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
          <MobileMenuItem label="Início" />
          <MobileMenuItem label="Campeonatos (Tabela, Jogos)" />
          <MobileMenuItem label="Clubes Filiados" />
          <MobileMenuItem label="Notícias" />
          <MobileMenuItem label="Patrocinadores" />
          <MobileMenuItem label="TV Candanga (Ao Vivo)" />
          <MobileMenuItem label="Rádio Liga" />
          <MobileMenuItem label="Administração (Lídio)" />
        </nav>
        
        <div className="mt-auto pb-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold">
            <span>Modo Escuro</span>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-brand-green' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <button className="w-full bg-brand-yellow text-slate-900 py-3 rounded-lg font-black uppercase shadow-lg hover:brightness-110 transition-all">
            Área do Associado
          </button>
        </div>
      </div>
    </>
  );
};

const ScoreTicker = () => (
  <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden whitespace-nowrap pt-[80px] md:pt-[100px] pb-2 relative z-30">
    <div className="absolute left-0 top-[80px] md:top-[100px] bottom-2 w-8 md:w-20 bg-gradient-to-r from-slate-100 dark:from-slate-900 to-transparent z-40"></div>
    <div className="absolute right-0 top-[80px] md:top-[100px] bottom-2 w-8 md:w-20 bg-gradient-to-l from-slate-100 dark:from-slate-900 to-transparent z-40"></div>
    
    <div className="flex gap-4 animate-marquee pl-4 hover:pause">
      {[...PLACARES, ...PLACARES, ...PLACARES].map((jogo, idx) => (
        <div key={`${jogo.id}-${idx}`} className={`inline-flex flex-col justify-center min-w-[200px] md:min-w-[240px] bg-white dark:bg-slate-800 p-2 md:p-3 rounded-lg border hover:border-brand-green transition-colors cursor-pointer shadow-sm ${idx % 2 === 0 ? 'border-l-4 border-l-brand-green border-slate-200 dark:border-slate-700' : 'border-l-4 border-l-brand-yellow border-slate-200 dark:border-slate-700'}`}>
          <div className="flex justify-between items-center mb-1 border-b border-slate-100 dark:border-slate-700 pb-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{jogo.liga}</span>
             <span className={`text-[10px] font-black uppercase ${jogo.status.includes('AO VIVO') ? 'text-red-500 animate-pulse' : 'text-brand-green'}`}>
               {jogo.status}
             </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">{jogo.timeA}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{jogo.golsA}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">{jogo.timeB}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{jogo.golsB}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Hero = () => (
  <section className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-8 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop" alt="Futsal background" className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent opacity-95 dark:opacity-90"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <Reveal direction="up" className="max-w-2xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
          <img src={logoLiga} alt="Logo" className="w-4 h-4 object-contain" /> Temporada 2025
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 drop-shadow-2xl">
          O FUTURO DO <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-green">FUTSAL</span> <br/>
          COMEÇA AQUI.
        </h1>
        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-lg border-l-4 border-brand-yellow pl-6">
          A Liga Candanga é o palco dos maiores talentos do Centro-Oeste. 
          Mais de 100 equipes, cobertura profissional e prêmios exclusivos.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#tabela" className="bg-brand-green hover:bg-green-600 text-white px-8 py-4 rounded-lg font-black uppercase tracking-wide transition-all shadow-[0_4px_20px_rgba(0,153,51,0.4)] flex items-center gap-2 group">
             Ver Tabela <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
          </a>
          <a href="#youtube" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-lg font-bold uppercase tracking-wide transition-all flex items-center gap-3">
             <PlayCircle size={20} className="text-brand-yellow"/> TV Candanga
          </a>
        </div>
      </Reveal>
      
      {/* Dynamic Floating Card */}
      <Reveal direction="left" delay={200} className="hidden lg:block relative">
         <div className="relative z-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl animate-float">
            <div className="flex items-start gap-4 mb-4">
               <img src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1740&auto=format&fit=crop" className="w-24 h-24 rounded-lg object-cover border-2 border-brand-yellow" alt="Destaque"/>
               <div>
                 <span className="text-brand-yellow text-xs font-bold uppercase">Ao Vivo na Rádio</span>
                 <h3 className="text-white font-bold text-lg leading-tight mt-1">Sintonize na emoção do futsal!</h3>
                 <a href="#" className="text-brand-green text-xs font-black mt-2 inline-flex items-center gap-1 hover:underline"><Radio size={14}/> OUVIR AGORA</a>
               </div>
            </div>
         </div>
      </Reveal>
    </div>
  </section>
);

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('jogos'); // jogos | videos

    return (
    <section id="tabela" className="py-16 md:py-24 bg-white dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 relative z-10">
        
        <SectionTitle title="Campeonatos" subtitle="Tabela & Jogos" />

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Tabela Principal */}
            <Reveal className="lg:col-span-2">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green to-brand-yellow"></div>
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                    <div className="flex gap-4">
                    <button className="text-sm font-black uppercase text-brand-green border-b-2 border-brand-green pb-1">Série Ouro</button>
                    <button className="text-sm font-bold uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors pb-1">Série Prata</button>
                    <button className="text-sm font-bold uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors pb-1">Feminino</button>
                    </div>
                    <button className="text-xs font-bold text-slate-500 hover:text-brand-green flex items-center gap-1">
                    Ver Completa <ChevronRight size={12}/>
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider">
                    <tr>
                        <th className="py-4 pl-6 text-left w-14">Pos</th>
                        <th className="py-4 text-left">Clube</th>
                        <th className="py-4 text-center w-12 text-slate-900 dark:text-white">PTS</th>
                        <th className="py-4 text-center w-12">J</th>
                        <th className="py-4 text-center w-12 hidden md:table-cell">V</th>
                        <th className="py-4 text-center w-12 hidden md:table-cell">SG</th>
                        <th className="py-4 text-center w-24 pr-6">Últimos</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {TABELA.map((time, idx) => (
                        <tr key={idx} className="hover:bg-white dark:hover:bg-slate-800 transition-colors group">
                        <td className="py-4 pl-6">
                            <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs ${idx === 0 ? 'bg-brand-yellow text-slate-900 shadow-md' : idx < 4 ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                            {time.pos}º
                            </span>
                        </td>
                        <td className="py-4">
                            <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                {time.emblem}
                            </div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-green transition-colors">{time.time}</span>
                            </div>
                        </td>
                        <td className="py-4 text-center font-black text-slate-900 dark:text-white text-base">{time.pts}</td>
                        <td className="py-4 text-center text-slate-500 dark:text-slate-400 font-medium">{time.j}</td>
                        <td className="py-4 text-center text-slate-500 dark:text-slate-400 font-medium hidden md:table-cell">{time.v}</td>
                        <td className="py-4 text-center text-slate-500 dark:text-slate-400 font-medium hidden md:table-cell">{time.sg}</td>
                        <td className="py-4 pr-6">
                            <div className="flex justify-center gap-1">
                                {[1,1,1,0,1].map((r, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${r ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                ))}
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </Reveal>

            {/* Sidebar / Agenda */}
            <Reveal delay={200} className="flex flex-col gap-6">
                <div id="agenda" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
                        <Calendar size={18} className="text-brand-green"/> Agenda
                        </h4>
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button 
                                onClick={() => setActiveTab('jogos')}
                                className={`px-3 py-1 text-xs font-bold rounded transition-all ${activeTab === 'jogos' ? 'bg-white dark:bg-slate-700 shadow text-brand-green' : 'text-slate-400'}`}
                            >JOGOS</button>
                            <button 
                                onClick={() => setActiveTab('videos')}
                                className={`px-3 py-1 text-xs font-bold rounded transition-all ${activeTab === 'videos' ? 'bg-white dark:bg-slate-700 shadow text-brand-yellow' : 'text-slate-400'}`}
                            >VÍDEOS</button>
                        </div>
                    </div>

                    {activeTab === 'jogos' ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border-l-2 border-l-brand-green hover:border-brand-green transition-all cursor-pointer">
                                    <div className="flex flex-col items-center min-w-[3rem] border-r border-slate-200 dark:border-slate-700 pr-3 mr-3">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">DEZ</span>
                                    <span className="text-xl font-black text-slate-800 dark:text-white">18</span>
                                    </div>
                                    <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold dark:text-white">Brasília</span>
                                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-300">19:30</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold dark:text-white">Ceilândia</span>
                                        <span className="text-[10px] text-brand-green font-bold">Gin. SESC</span>
                                    </div>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-brand-green transition-colors uppercase tracking-wide">
                                Ver calendário completo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-fade-in-down">
                            <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Resumo"/>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={40} className="text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                                    <span className="text-white text-xs font-bold">Resumo da Rodada #14</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">Confira os gols e melhores momentos da rodada com a análise de Julia.</p>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-2">
                                <Youtube size={14} /> VER NO CANAL
                            </button>
                        </div>
                    )}
                </div>
            </Reveal>
        </div>
        </div>
    </section>
    );
};

const ClubsSection = () => (
  <section id="clubes" className="py-16 bg-slate-50 dark:bg-slate-900/50">
    <SectionSeparator color="green" />
    <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
           <SectionTitle title="Clubes Filiados" subtitle="Quem faz a Liga" />
           <button className="bg-brand-yellow hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-black uppercase shadow-lg hover:shadow-yellow-500/20 flex items-center gap-2 transition-all hover:-translate-y-1">
             <Users size={18} /> Login do Associado
           </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {CLUBES.map((clube) => (
             <Reveal key={clube.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:border-brand-green transition-all group">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 flex items-center justify-center font-bold text-2xl text-slate-300 group-hover:bg-white group-hover:shadow-md transition-all">
                    {clube.emblem}
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{clube.nome}</h3>
                <span className="text-xs font-bold text-brand-green uppercase tracking-wider mb-3 flex items-center gap-1">
                    <MapPin size={10} /> {clube.cidade}
                </span>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                    {clube.historia}
                </p>
                <button className="mt-4 text-xs font-bold text-slate-400 hover:text-brand-green border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full hover:border-brand-green transition-all">
                    Ver Perfil
                </button>
             </Reveal>
           ))}
        </div>
    </div>
  </section>
);

const NewsSection = () => (
  <section id="noticias" className="py-16 bg-white dark:bg-slate-950">
    <SectionSeparator color="yellow" />
    <div className="container mx-auto px-4 mt-12">
      <SectionTitle title="Últimas Notícias" subtitle="Fique por dentro" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NOTICIAS_DESTAQUE.map((news, idx) => (
          <Reveal key={news.id} delay={idx * 150} className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${idx % 2 === 0 ? 'border-brand-green/30 shadow-green-900/5' : 'border-brand-yellow/30 shadow-yellow-900/5'}`}>
            <div className="relative h-48 overflow-hidden">
              <img src={news.imagem} alt={news.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
              <span className={`absolute top-4 left-4 text-white text-[10px] font-black px-2 py-1 rounded shadow-md uppercase tracking-wide ${idx % 2 === 0 ? 'bg-brand-green' : 'bg-brand-yellow text-black'}`}>
                {news.categoria}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                <Clock size={12} /> {news.data} • {news.autor}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-brand-green transition-colors">
                {news.titulo}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                {news.resumo}
              </p>
              <a href="#" className={`inline-flex items-center text-xs font-black uppercase transition-colors gap-1 ${idx % 2 === 0 ? 'text-brand-green' : 'text-brand-yellow'}`}>
                Ler mais <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PartnersSection = () => (
  <section id="parceiros" className="py-16 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900">
    <div className="container mx-auto px-4">
      <SectionTitle title="Parceiros" subtitle="Quem apoia o Futsal" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PARCEIROS.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:border-brand-green/50 transition-colors cursor-pointer group">
                <div className="h-16 flex items-center justify-center font-black text-2xl text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors uppercase mb-2">
                    {p.nome}
                </div>
                <span className="text-[10px] font-bold text-brand-green uppercase mb-2">{p.tipo}</span>
                <p className="text-xs text-slate-500">{p.resumo}</p>
            </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="footer" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-4 border-brand-green relative">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-1">
               <img src={logoLiga} alt="Logo Liga Candanga" className="w-full h-full object-contain" />
             </div>
             <div className="leading-tight">
               <h4 className="font-black text-white text-xl">LIGA CANDANGA</h4>
               <span className="text-[10px] uppercase tracking-widest text-brand-yellow">Futsal DF</span>
             </div>
          </div>
          <p className="text-sm leading-relaxed mb-6 max-w-sm">
            Fomentando o futsal no Distrito Federal, proporcionando desenvolvimento técnico e social através de competições de alto nível. O futuro do futsal começa aqui.
          </p>
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all" title="Instagram"><Instagram size={18}/></a>
             <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all" title="YouTube"><Youtube size={18}/></a>
             <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all" title="Rádio Liga"><Radio size={18}/></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Navegação</h5>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-brand-green transition-colors">Tabela</a></li>
            <li><a href="#" className="hover:text-brand-green transition-colors">Clubes</a></li>
            <li><a href="#" className="hover:text-brand-green transition-colors">Notícias</a></li>
            <li><a href="#" className="hover:text-brand-green transition-colors">TV Candanga</a></li>
            <li><a href="#" className="hover:text-brand-green transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Newsletter</h5>
          <p className="text-xs mb-4">Receba notícias e resultados no seu e-mail.</p>
          <form className="flex flex-col gap-2">
             <input type="email" placeholder="Seu melhor e-mail" className="bg-slate-900 border border-slate-800 text-white text-sm px-4 py-3 rounded focus:outline-none focus:border-brand-green transition-colors" />
             <button className="bg-brand-green hover:bg-green-600 text-white font-bold py-3 rounded text-sm uppercase transition-colors">
               Inscrever-se
             </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
        <p>&copy; 2025 Liga Candanga de Futsal. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white flex items-center gap-1 text-brand-yellow font-bold"><Lock size={12}/> Administração (Lídio)</a>
          <a href="#" className="hover:text-white">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- APP ROOT ---

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === 'dark' ? 'dark' : ''}`}>
      <style>{`
        /* CSS Customizado para animações e scrollbar */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-fade-in-down {
            animation: fadeInDown 0.2s ease-out forwards;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#0f172a' : '#f1f5f9'};
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#334155' : '#cbd5e1'};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #009933;
        }
      `}</style>
      
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <ScoreTicker />
        <Hero />
        <Dashboard />
        <ClubsSection />
        <NewsSection />
        <PartnersSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;