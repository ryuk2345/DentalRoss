import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightCircle, Zap, ShieldCheck, Truck, Menu, X, Search, MapPin, BadgeCheck, Package, Headphones, ChevronDown, Send, MessageCircle, Camera, Share2, Mail, Phone } from 'lucide-react';

const catalogItems = [
  { id: 1, category: "cirugia", name: "Agujas Cortas y Largas", brand: "NOP SPIDENT", desc: "Agujas dentales descartables para la aplicación de anestesia local en diferentes técnicas.", price: "S/ 25.00" },
  { id: 2, category: "profilaxis", name: "Pasta Profiláctica", brand: "MAQUIRA", desc: "Pasta para profilaxis dental indicada en la limpieza y pulido durante tratamientos odontológicos.", price: "S/ 20.00" },
  { id: 3, category: "impresion", name: "Alginato Hygedent", brand: "HYGEDENT", desc: "Material de impresión a base de alginato de alta fidelidad para modelos de estudio y trabajo.", price: "Consultar" },
  { id: 4, category: "estetica", name: "Adhesivo Ámbar Universal", brand: "FGM", desc: "Adhesivo odontológico para procedimientos restaurativos, compatible con múltiples sistemas adhesivos.", price: "S/ 98.00" },
  { id: 5, category: "estetica", name: "Microbrush", brand: "DENTAL ROSS", desc: "Aplicadores descartables para la colocación precisa de soluciones y materiales dentales.", price: "S/ 10.00" },
  { id: 6, category: "bioseguridad", name: "Campo Descartable", brand: "DENTAL ROSS", desc: "Campos desechables impermeables con barrera plástica de alta protección para el paciente.", price: "Consultar" },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [waMessage, setWaMessage] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Forzar reproducción del video para evitar bloqueos del navegador
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Inicio', 'Nosotros', 'Catálogo', 'Sedes'];

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  };

  const Logo = ({ className = "" }) => (
    <img src="/LOGO.png" alt="Dental Ross" className={`object-contain flex-shrink-0 ${className}`} />
  );

  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sendWa = (msg: string) => {
    const phoneNumber = "51900000000";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setWaMessage('');
    setIsWaOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen font-body text-text overflow-x-hidden bg-surface-bg">
      {/* Hero Section */}
      <div className="relative w-full min-h-[680px] lg:min-h-[750px] flex items-center overflow-hidden">
        {/* Hero Background Image */}
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Layered gradient overlay for readability */}
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, rgba(13,20,100,0.55) 0%, rgba(34,50,194,0.45) 50%, rgba(10,15,37,0.65) 100%)'
        }}></div>

        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f25]/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5 sm:py-6'}`}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="h-12 sm:h-14 brightness-0 invert hover:scale-105 transition-transform cursor-pointer" />
            </div>
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm sm:text-base font-semibold text-white/90 hover:text-accent transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href="#catalogo" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                Ver Catálogo
              </a>
              <button onClick={() => sendWa("Hola Dental Ross, deseo cotizar unos insumos.")} className="bg-accent text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg hover:scale-105 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
                Cotizar Ahora
              </button>
            </div>
            <button className="md:hidden p-2 -mr-2 text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </nav>

        <main className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 w-full" style={{ paddingTop: 'clamp(40px, 8vw, 72px)' }}>
          <div className="max-w-[650px]">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase text-accent mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Stock Real en Lima
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="font-heading text-[clamp(1.65rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-white mb-[24px]">
              Tu Botica Dental <Zap size={28} color="#5DBEBD" className="inline-block relative -top-[4px] mx-1" /> Respuestas <span className="text-accent">Al Instante.</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="font-body text-[clamp(0.9rem,2.5vw,1.1rem)] leading-[1.65] opacity-90 mb-10 text-white/90">
              Proveemos insumos odontológicos <ShieldCheck size={20} className="inline-block relative -top-[2px] mx-1 text-accent"/> 100% originales para tu clínica. Cotiza en tiempo real y recibe tus pedidos de forma <Truck size={20} className="inline-block relative -top-[2px] mx-1 text-accent"/> express.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => sendWa("Hola Dental Ross, necesito cotizar unos insumos.")} className="bg-accent text-white rounded-[50px] py-[17px] px-[24px] font-semibold text-[clamp(0.9rem,2vw,1rem)] shadow-[0_4px_24px_rgba(93,190,189,0.4)] min-w-[210px] inline-flex items-center justify-between gap-[32px] hover:scale-[1.04] hover:brightness-110 active:scale-[0.96] transition-all">
                <span>Cotizar Insumos</span>
                <ArrowRightCircle size={20} />
              </button>
              <a href="#catalogo" className="inline-flex justify-center items-center bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-[50px] py-[17px] px-[24px] font-semibold text-[clamp(0.9rem,2vw,1rem)] hover:bg-white/20 transition-all">
                Ver Catálogo
              </a>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Proposition Section */}
      <section className="bg-white py-20 px-5 sm:px-8 border-b border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto text-[#0f172a]">
          <div className="text-center mb-16">
            <span className="text-[#2232C2] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Excelencia Clínica</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">¿Por qué somos tu aliado estratégico?</h2>
            <div className="w-12 h-1 bg-[#2232C2] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BadgeCheck, title: "Productos Originales", desc: "Trabajamos únicamente con marcas líderes mundiales y distribuidores certificados con factura legal." },
              { icon: Package, title: "Disponibilidad Inmediata", desc: "Contamos con stock real y físico en nuestras sedes de San Luis y Surco para entrega al instante." },
              { icon: Headphones, title: "Asesoría Profesional", desc: "Olvídate de los bots. Recibe respuestas y cotizaciones elaboradas por especialistas en menos de 5 minutos." },
              { icon: Truck, title: "Envíos Express", desc: "Entregas programadas el mismo día o express en menos de 2 horas para emergencias en clínica." },
            ].map((prop, idx) => (
              <div key={idx} className="bg-[#f8fafc] p-8 rounded-xl border border-[#e2e8f0] hover:bg-white hover:shadow-xl hover:border-[#2232C2]/20 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#2232C2]/5 rounded-lg flex items-center justify-center text-[#2232C2] mb-6 group-hover:bg-[#2232C2] group-hover:text-white transition-colors duration-300">
                  <prop.icon size={24} />
                </div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">{prop.title}</h3>
                <p className="text-[#475569] text-xs leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section className="bg-[#f8fafc] py-20 px-5 sm:px-8" id="nosotros">
        <div className="max-w-[1280px] mx-auto text-[#0f172a]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative bg-white p-2 rounded-xl shadow-lg border border-[#e2e8f0] group overflow-hidden">
                <img src="/imagen 2.png" alt="Showroom" className="w-full h-auto rounded-lg object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-6 left-6 bg-[#2232C2]/95 text-white text-[10px] font-bold tracking-widest px-4 py-2 rounded-lg uppercase shadow-lg">Showroom Dental Ross</div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#2232C2] font-bold tracking-[0.2em] text-xs uppercase block">Sobre Nosotros</span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">Distribución Exclusiva y Garantía Odontológica</h2>
              <div className="w-12 h-1 bg-[#2232C2] rounded-full"></div>
              <p className="text-sm text-[#475569] leading-relaxed">
                En <strong>Botica Dental Ross</strong>, nos dedicamos a resolver una de las principales necesidades de los odontólogos modernos: contar con insumos originales en el momento preciso. Entendemos que un paciente en el sillón clínico no puede esperar, por lo que hemos estructurado nuestro servicio bajo los principios de velocidad, stock físico real y un portafolio de marcas de prestigio global.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#e2e8f0]">
                <div>
                  <div className="text-2xl font-extrabold text-[#2232C2]">100%</div>
                  <div className="text-[10px] font-bold tracking-wide text-[#64748b] uppercase">Productos Originales</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#2232C2]">&lt; 2 Horas</div>
                  <div className="text-[10px] font-bold tracking-wide text-[#64748b] uppercase">Envío Express Promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-white py-20 px-5 sm:px-8" id="catalogo">
        <div className="max-w-[1280px] mx-auto text-[#0f172a]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#2232C2] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Catálogo Oficial</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Explora nuestros Insumos</h2>
            <div className="w-12 h-1 bg-[#2232C2] mx-auto mt-4 mb-6 rounded-full"></div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Buscar resina, anestesia, guantes..." className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm focus:outline-none focus:border-[#2232C2] focus:ring-1 focus:ring-[#2232C2] transition-all" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 border-b border-[#e2e8f0] pb-4">
              {[
                { id: 'all', label: 'Todas las Líneas' },
                { id: 'estetica', label: 'Estética y Restauración' },
                { id: 'cirugia', label: 'Anestesia y Cirugía' },
                { id: 'profilaxis', label: 'Profilaxis' },
                { id: 'bioseguridad', label: 'Bioseguridad' },
                { id: 'impresion', label: 'Impresión' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveFilter(tab.id)} className={`px-5 py-2.5 rounded-lg border text-xs font-bold tracking-wider uppercase transition-all duration-200 ${activeFilter === tab.id ? 'bg-[#2232C2] text-white border-[#2232C2]' : 'border-[#e2e8f0] text-[#475569] hover:border-[#2232C2] hover:text-[#2232C2]'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-[#e2e8f0] hover:shadow-xl hover:border-[#2232C2]/20 transition-all duration-300 flex flex-col overflow-hidden">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-[9px] font-black tracking-widest text-[#2232C2] bg-[#2232C2]/5 border border-[#2232C2]/10 px-2.5 py-1 rounded-lg uppercase">{item.brand}</span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Stock Físico</span>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-tight mb-2">{item.name}</h3>
                  <p className="text-[#475569] text-xs leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-between items-center gap-4">
                  <div className="text-sm font-extrabold text-[#2232C2]">{item.price}</div>
                  <button onClick={() => sendWa(`Hola Dental Ross, deseo cotizar ${item.name} de ${item.brand}.`)} className="bg-[#2232C2] text-white text-[10px] font-bold px-4 py-2.5 rounded-lg hover:bg-[#1a269c] active:scale-95 transition-all tracking-wider uppercase">
                    Cotizar
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#e2e8f0] rounded-xl bg-[#f8fafc] max-w-md mx-auto mt-8">
              <Search className="mx-auto text-[#64748b] mb-3" size={32} />
              <h3 className="font-bold text-sm uppercase tracking-wider mb-1">No se encontraron productos</h3>
              <p className="text-xs text-[#475569] max-w-xs mx-auto leading-relaxed">Prueba con otra palabra clave o limpia el filtro de búsqueda.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5 sm:px-8 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto text-[#0f172a]">
          <div className="text-center mb-16">
            <span className="text-[#2232C2] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Soporte Directo</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Preguntas Frecuentes</h2>
            <div className="w-12 h-1 bg-[#2232C2] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {[
              { q: "¿Los productos cuentan con stock inmediato?", a: "Sí, mantenemos un inventario 100% físico y actualizado en nuestras sedes de San Luis y Surco. Cada artículo listado en nuestra web está físicamente disponible para recojo inmediato o envío el mismo día." },
              { q: "¿Cómo garantizan la originalidad de los insumos?", a: "Importamos y compramos directamente a distribuidores autorizados de las marcas que comercializamos (como 3M, Coltene, Newcaina). Entregamos todos nuestros insumos con comprobante de pago legal que certifica los números de lote oficiales." },
              { q: "¿Cuál es el tiempo de despacho en Lima?", a: "Ofrecemos despacho express en menos de 2 horas para casos críticos dentro de nuestra zona de cobertura en Lima Metropolitana. Para envíos estándar, el tiempo de entrega es el mismo día si confirmas tu pedido antes de las 3:00 PM." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white border border-[#e2e8f0] rounded-xl transition-all duration-300 shadow-sm hover:border-[#2232C2]/20 open:border-[#2232C2]/30">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold uppercase text-xs tracking-wider">
                  {faq.q}
                  <ChevronDown className="transition-transform duration-300 group-open:rotate-180 text-[#2232C2]" size={20} />
                </summary>
                <div className="px-6 pb-6 text-[#475569] text-xs leading-relaxed border-t border-[#e2e8f0] pt-5">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sedes */}
      <section className="py-20 px-5 sm:px-8 bg-white" id="sedes">
        <div className="max-w-[1280px] mx-auto text-[#0f172a]">
          <div className="text-center mb-16">
            <span className="text-[#2232C2] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Ubicaciones</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Nuestras Sedes en Lima</h2>
            <div className="w-12 h-1 bg-[#2232C2] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0] flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#2232C2]/5 rounded-lg flex items-center justify-center text-[#2232C2] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Sede San Luis</h3>
                    <p className="text-[#475569] text-xs mt-1">Av. San Luis 1449, San Luis, Lima</p>
                  </div>
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#e2e8f0] bg-slate-100">
                  <iframe allowFullScreen height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.408151978709!2d-77.000000!3d-12.083333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86800000000%3A0x0!2sAv.%20San%20Luis%201449%2C%20San%20Luis%2015021!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe" style={{border: 0}} width="100%"></iframe>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0] flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#2232C2]/5 rounded-lg flex items-center justify-center text-[#2232C2] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Sede Surco</h3>
                    <p className="text-[#475569] text-xs mt-1">Av. Primavera 244, Chacarilla, Santiago de Surco</p>
                  </div>
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#e2e8f0] bg-slate-100">
                  <iframe allowFullScreen height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.123456789!2d-76.99!3d-12.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c80000000000%3A0x0!2sAv.%20Primavera%20244%2C%20Santiago%20de%20Surco!5e0!3m2!1ses!2spe!4v1700000000001!5m2!1ses!2spe" style={{border: 0}} width="100%"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f25] text-white py-16 px-5 sm:px-8 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-8">
            <div className="md:col-span-5 space-y-6">
              <Logo className="h-14 brightness-0 invert" />
              <p className="text-white/60 leading-relaxed text-xs max-w-sm font-medium">Líderes en importación y distribución de insumos odontológicos certificados en Lima. Agilidad, calidad y stock real al servicio de tu clínica.</p>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Líneas Clínicas</h4>
              <nav className="flex flex-col gap-3 text-xs text-white/70">
                <a href="#catalogo" className="hover:text-white">Estética y Restauración</a>
                <a href="#catalogo" className="hover:text-white">Cirugía e Implantología</a>
              </nav>
            </div>
            <div className="md:col-span-4 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Contacto</h4>
              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-center gap-3"><Mail className="text-accent" size={16}/><p className="text-white/80">ventas@boticadentalross.com</p></div>
                <div className="flex items-center gap-3"><Phone className="text-accent" size={16}/><p className="text-white/80">+51 (01) 680-4567</p></div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {isWaOpen && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="w-[320px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] overflow-hidden mb-4 origin-bottom-right text-[#0f172a]">
              <div className="bg-[#2232C2] text-white p-4 flex items-center gap-3">
                <div className="relative"><Logo className="w-10 h-10 rounded-full bg-white object-contain p-1 border border-white/20" /><span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-[#2232C2] rounded-full absolute bottom-0 right-0"></span></div>
                <div><h4 className="font-bold text-xs uppercase tracking-wider">Asistencia Dental Ross</h4><p className="text-[10px] text-emerald-300 font-medium">En línea • Responde de inmediato</p></div>
              </div>
              <div className="p-5 bg-slate-50 space-y-4 max-h-[300px] overflow-y-auto">
                <div className="flex items-start gap-2 max-w-[85%]"><div className="bg-white p-3 rounded-lg text-xs shadow-sm border border-[#e2e8f0]">¡Hola! 👋 Bienvenido a Dental Ross. ¿Qué insumos necesitas cotizar hoy?</div></div>
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Consultas rápidas:</p>
                  {["Cotizar resinas 3M", "Consultar stock de Anestésicos", "Coordinar un envío Express"].map((msg, i) => (
                    <button key={i} onClick={() => sendWa(`Hola Dental Ross, me interesa: ${msg}`)} className="w-full text-left bg-white border border-[#e2e8f0] hover:border-[#2232C2]/30 p-2.5 rounded-lg text-[11px] font-medium text-[#2232C2] shadow-sm hover:bg-[#2232C2]/5 transition-all">💬 {msg}</button>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-white border-t border-[#e2e8f0] flex items-center gap-2">
                <input type="text" value={waMessage} onChange={e => setWaMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendWa(waMessage)} placeholder="Escribe tu consulta..." className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2232C2]" />
                <button onClick={() => sendWa(waMessage)} className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba5a] transition-all"><Send size={16} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsWaOpen(!isWaOpen)} className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform z-[101] relative">
          {isWaOpen ? <X size={28} /> : <MessageCircle size={32} />}
          {!isWaOpen && <span className="absolute -top-1 -right-1 bg-[#2232C2] text-white border-2 border-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold animate-bounce">1</span>}
        </button>
      </div>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-[110] bg-[#0a0f25]/50 backdrop-blur-[6px]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="fixed right-0 top-0 w-[min(88vw,360px)] h-[100dvh] bg-[#2232C2] shadow-2xl z-[120] flex flex-col">
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
                <Logo className="h-10 brightness-0 invert" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-white"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + i * 0.07, duration: 0.4 }} className="text-2xl font-bold text-white hover:text-accent transition-colors">{link}</motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
