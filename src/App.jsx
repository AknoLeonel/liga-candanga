import React, { useEffect, useRef, useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  ChevronRight, 
  Menu, 
  Search, 
  PlayCircle, 
  Clock, 
  TrendingUp, 
  Shield, 
  MapPin,
  X,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

// --- MOCK DATA ---

const PLACARES = [
  { id: 1, timeA: 'Brasília Futsal', golsA: 4, timeB: 'AJJR Futsal', golsB: 2, status: 'ENCERRADO' },
  { id: 2, timeA: 'Cresspom', golsA: 1, timeB: 'Minas Brasília', golsB: 1, status: 'ENCERRADO' },
  { id: 3, timeA: 'Aruc', golsA: 3, timeB: 'Planaltina', golsB: 5, status: 'ENCERRADO' },
  { id: 4, timeA: 'Ceilândia', golsA: 0, timeB: 'Real Brasília', golsB: 0, status: 'AO VIVO 2ºT' },
  { id: 5, timeA: 'Sobradinho', golsA: 0, timeB: 'Gama', golsB: 0, status: 'HOJE 20:00' },
];

const NOTICIAS_DESTAQUE = [
  {
    id: 1,
    titulo: "Final Histórica: Brasília Futsal vence clássico e assume liderança",
    categoria: "DESTAQUE",
    imagem: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1930&auto=format&fit=crop",
    resumo: "Em jogo eletrizante no Ginásio do Cruzeiro, equipe da capital mostra força defensiva."
  },
  {
    id: 2,
    titulo: "Revelação da temporada renova contrato",
    categoria: "MERCADO",
    imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop",
    resumo: "Artilheiro do campeonato fica para 2026."
  },
  {
    id: 3,
    titulo: "Guia da Rodada: Onde assistir aos jogos deste fim de semana",
    categoria: "SERVIÇO",
    imagem: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1886&auto=format&fit=crop",
    resumo: "Transmissões ao vivo pelo YouTube da Liga."
  }
];

const TABELA = [
  { pos: 1, time: "Brasília Futsal", pts: 24, j: 9, v: 8 },
  { pos: 2, time: "AJJR Futsal", pts: 21, j: 9, v: 7 },
  { pos: 3, time: "Aruc", pts: 18, j: 9, v: 6 },
  { pos: 4, time: "Real Brasília", pts: 15, j: 8, v: 4 },
  { pos: 5, time: "Planaltina", pts: 12, j: 9, v: 3 },
];

// --- UTILS & HOOKS ---

// Hook simples para animação ao rolar (substituindo ScrollTrigger)
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Animar apenas uma vez
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- COMPONENTS ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md py-2 shadow-lg border-b border-slate-800' : 'bg-slate-900 py-4 border-b border-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer group animate-fade-in-down">
          <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-yellow-400 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Trophy className="text-slate-900 w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white tracking-tighter leading-none">LIGA CANDANGA</span>
            <span className="text-xs text-yellow-400 font-semibold tracking-widest">FUTSAL DISTRITO FEDERAL</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-wide text-slate-300 animate-fade-in-down" style={{animationDelay: '100ms'}}>
          {['Notícias', 'Jogos', 'Campeonatos', 'Clubes', 'Social', 'Parceiros', 'Canais'].map((item) => (
            <a key={item} href="#" className="hover:text-green-400 transition-colors relative group py-2">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 animate-fade-in-down" style={{animationDelay: '200ms'}}>
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300">
            <Search size={20} />
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-slate-900 px-4 py-2 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:-translate-y-0.5">
            AO VIVO
          </button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 absolute w-full left-0 animate-fade-in shadow-2xl">
          <nav className="flex flex-col gap-4 text-center font-bold text-white">
            {['Notícias', 'Tabela', 'Jogos', 'Clubes', 'Vídeos'].map((item) => (
              <a key={item} href="#" className="py-2 hover:text-green-400 border-b border-slate-800">{item}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const ScoreTicker = () => {
  return (
    <div className="bg-slate-950 border-b border-slate-800 overflow-hidden whitespace-nowrap py-2 mt-[72px] md:mt-[88px] relative z-40">
      <div className="flex gap-8 animate-marquee pl-4 hover:pause">
        {[...PLACARES, ...PLACARES, ...PLACARES].map((jogo, idx) => (
          <div key={`${jogo.id}-${idx}`} className="inline-flex items-center gap-3 bg-slate-900 px-4 py-1.5 rounded border border-slate-800 min-w-[280px] hover:border-green-500/50 transition-colors cursor-pointer group">
            <div className="flex flex-col w-24 items-end">
              <span className="text-xs font-bold text-slate-300 group-hover:text-white">{jogo.timeA}</span>
              <span className="text-xs font-bold text-slate-300 group-hover:text-white">{jogo.timeB}</span>
            </div>
            <div className="flex flex-col items-center bg-slate-800 px-2 py-1 rounded group-hover:bg-green-500/20">
              <span className="text-sm font-black text-white leading-none">{jogo.golsA}</span>
              <span className="text-sm font-black text-white leading-none">{jogo.golsB}</span>
            </div>
            <div className="flex flex-col items-start w-20">
               <span className="text-[9px] font-black uppercase tracking-wider text-green-400">{jogo.status.split(' ')[0]}</span>
               {jogo.status.split(' ')[1] && <span className="text-[9px] font-bold text-slate-500">{jogo.status.split(' ')[1]}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[500px]">
        {/* Main Feature */}
        <div className="lg:col-span-8 relative group overflow-hidden rounded-2xl cursor-pointer shadow-2xl animate-slide-in-left">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/20 to-transparent z-10 opacity-90"></div>
          <img 
            src={NOTICIAS_DESTAQUE[0].imagem} 
            alt="Destaque" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full md:w-3/4">
            <span className="inline-block bg-green-500 text-black text-xs font-black px-2 py-1 rounded mb-3 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              {NOTICIAS_DESTAQUE[0].categoria}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
              {NOTICIAS_DESTAQUE[0].titulo}
            </h1>
            <p className="text-slate-300 hidden md:block text-lg border-l-4 border-yellow-400 pl-4">
              {NOTICIAS_DESTAQUE[0].resumo}
            </p>
          </div>
        </div>

        {/* Side Features */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {NOTICIAS_DESTAQUE.slice(1).map((news, idx) => (
            <div 
              key={news.id} 
              className="relative flex-1 group overflow-hidden rounded-xl cursor-pointer shadow-xl animate-slide-in-right"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors z-10"></div>
              <img 
                src={news.imagem} 
                alt={news.titulo} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1 block">
                  {news.categoria}
                </span>
                <h2 className="text-xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors">
                  {news.titulo}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dashboard = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-12 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px]"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Table */}
          <Reveal className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-t-4 border-green-500 flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase flex items-center gap-2">
                  <TrendingUp className="text-green-500" /> Classificação
                </h3>
                <button className="text-[10px] font-bold text-slate-500 hover:text-green-500 transition-colors border border-slate-200 dark:border-slate-600 px-2 py-1 rounded hover:border-green-500">
                    VER COMPLETA
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr className="text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-3 pl-6 text-left w-12">#</th>
                    <th className="py-3 text-left">Time</th>
                    <th className="py-3 text-center w-12">P</th>
                    <th className="py-3 text-center w-12">J</th>
                    <th className="py-3 text-center w-12 pr-6">V</th>
                    </tr>
                </thead>
                <tbody>
                    {TABELA.map((time, idx) => (
                    <tr key={idx} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-green-50 dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="py-4 pl-6">
                            <span className={`font-black flex items-center justify-center w-6 h-6 rounded ${idx < 4 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'text-slate-500'}`}>
                                {time.pos}
                            </span>
                        </td>
                        <td className="py-4 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                                <Shield size={12} className="text-slate-400" />
                            </div>
                            {time.time}
                        </td>
                        <td className="py-4 text-center font-black text-slate-900 dark:text-white">{time.pts}</td>
                        <td className="py-4 text-center text-slate-500 font-medium">{time.j}</td>
                        <td className="py-4 text-center text-slate-500 pr-6 font-medium">{time.v}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </Reveal>

          {/* Matches */}
          <Reveal delay={200} className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-t-4 border-yellow-400 flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase flex items-center gap-2">
                    <Calendar className="text-yellow-400" /> Agenda
                </h3>
                </div>
            </div>
            
            <div className="flex flex-col p-4 gap-3 flex-1">
              {[1, 2, 3].map((item, i) => (
                <div key={item} className="relative border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20 rounded-xl p-4 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all cursor-pointer group overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                  
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={10}/> SÁB, 26/09</span>
                    <span className="flex items-center gap-1 text-slate-400"><MapPin size={10}/> Ginásio do SESC</span>
                  </div>
                  
                  <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col items-center gap-2 w-1/3">
                      <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-full shadow-sm flex items-center justify-center font-bold text-xs">BRA</div>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate w-full text-center">Brasília</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center w-1/3">
                        <span className="text-2xl font-black text-slate-300 dark:text-slate-600">VS</span>
                        <span className="text-slate-500 font-mono text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded mt-1">15:00</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-1/3">
                      <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-full shadow-sm flex items-center justify-center font-bold text-xs">CEI</div>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate w-full text-center">Ceilândia</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-center">
                    <button className="text-xs font-black text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      COMPRAR INGRESSO <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Ads / Multimedia */}
          <Reveal delay={400} className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-900 rounded-xl p-8 text-white text-center flex flex-col items-center justify-center flex-1 relative overflow-hidden shadow-2xl group cursor-pointer border-t-4 border-indigo-400">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm border border-white/20 group-hover:border-yellow-400 transition-colors">
                    <PlayCircle size={40} className="text-white ml-1" />
                </div>
                <h4 className="text-3xl font-black mb-2 italic">LIGA PLAY</h4>
                <p className="text-blue-100 mb-8 max-w-[200px] mx-auto text-sm">Assista aos gols, defesas e melhores momentos da rodada passada.</p>
                <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-sm hover:bg-yellow-400 hover:text-black transition-all hover:scale-105 shadow-lg">
                    ASSISTIR AGORA
                </button>
              </div>
            </div>
            
             <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Trophy size={100} />
                </div>
                <h5 className="font-bold text-white mb-1">Seja Sócio Torcedor</h5>
                <p className="text-xs text-slate-400 mb-3">Apoie seu time e ganhe descontos.</p>
                <a href="#" className="text-green-400 text-xs font-bold hover:underline">SAIBA MAIS &rarr;</a>
             </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

const NewsGrid = () => {
    // Generate dummy news
    const newsItems = Array(6).fill(null).map((_, i) => ({
      id: i,
      tag: i % 2 === 0 ? "Feminino" : "Masculino",
      color: i % 2 === 0 ? "text-pink-500" : "text-blue-400",
      title: i === 0 ? "Brasília Futsal anuncia novo técnico para a sequência da temporada" : "Rodada do fim de semana tem média de 5 gols por jogo",
      time: `HÁ ${i + 2} HORAS`,
      image: `https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1740&auto=format&fit=crop&random=${i}`
    }));
  
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
             <h3 className="text-3xl font-black text-white border-l-8 border-green-500 pl-4 uppercase">Últimas Notícias</h3>
             <div className="flex gap-2">
                 <button className="w-10 h-10 rounded-full border border-slate-700 hover:border-green-500 hover:text-green-500 text-slate-400 flex items-center justify-center transition-colors">
                     <ChevronRight className="rotate-180" size={20}/>
                 </button>
                 <button className="w-10 h-10 rounded-full border border-slate-700 hover:border-green-500 hover:text-green-500 text-slate-400 flex items-center justify-center transition-colors">
                     <ChevronRight size={20}/>
                 </button>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100} className="bg-slate-900 rounded-2xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col h-full">
              <div className="h-52 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={item.image} alt="News" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 z-20 border border-white/10">
                  <Clock size={10} className="text-green-400" /> {item.time}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color} border border-slate-700 px-2 py-0.5 rounded`}>
                    {item.tag}
                    </span>
                </div>
                <h4 className="text-xl font-bold text-white leading-snug group-hover:text-green-400 transition-colors mb-4 flex-1">
                  {item.title}
                </h4>
                <div className="pt-4 border-t border-slate-800 flex items-center text-slate-400 text-sm font-bold group-hover:text-white transition-colors">
                  Ler matéria completa <ChevronRight size={16} className="text-green-500 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
};

const Footer = () => {
  return (
    <footer className="bg-black text-slate-400 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6 text-white">
               <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center text-black">
                    <Trophy size={24} />
               </div>
              <span className="font-black text-2xl tracking-tighter">LIGA CANDANGA</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-slate-500 max-w-sm">
              O maior portal de futsal do Distrito Federal. Acompanhe seu time do coração, estatísticas exclusivas e transmissões ao vivo.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-green-500 hover:text-black hover:border-green-500 transition-all cursor-pointer hover:-translate-y-1">
                    <Icon size={18}/>
                  </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Campeonatos</h5>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-green-400 cursor-pointer transition-colors">Série Ouro</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Série Prata</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Feminino Adulto</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Sub-20</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Veteranos</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Institucional</h5>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-green-400 cursor-pointer transition-colors">Sobre a Liga</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Regulamentos</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Transparência</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Seja um Parceiro</li>
              <li className="hover:text-green-400 cursor-pointer transition-colors">Fale Conosco</li>
            </ul>
          </div>

          <div className="md:col-span-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h5 className="text-white font-bold mb-2 uppercase tracking-wider text-sm">Newsletter</h5>
            <p className="text-xs mb-4 text-slate-500">Receba resultados e notícias exclusivas.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Seu e-mail principal" className="bg-black border border-slate-800 rounded px-4 py-3 text-sm focus:outline-none focus:border-green-500 text-white transition-colors" />
              <button className="bg-green-500 text-black font-black py-3 rounded hover:bg-green-400 transition-colors text-sm uppercase tracking-wide">
                Inscrever-se Agora
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; 2025 Liga Candanga de Futsal. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Termos de Uso</span>
            <span className="hover:text-white cursor-pointer transition-colors">Política de Privacidade</span>
            <span className="hover:text-white cursor-pointer transition-colors">Gerenciar Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500 selection:text-black">
      {/* CSS Animations & Utilities */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Adjusted for tripled content */
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0; /* Starts invisible */
        }
        .animate-fade-in {
            animation: fadeInDown 0.3s ease-out forwards;
        }
        
        .hover\\:pause:hover {
            animation-play-state: paused;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a; 
        }
        ::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #22c55e; 
        }
      `}</style>

      <Header />
      <ScoreTicker />
      
      <main>
        <HeroSection />
        <Dashboard />
        <NewsGrid />
      </main>

      <Footer />
    </div>
  );
};

export default App;