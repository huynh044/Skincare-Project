import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { PageView, RoutineBundle, Language, CartItem, Product } from './types';
import { ROUTINES, PRODUCTS } from './constants';
import { Menu, X, Microscope, ArrowRight, Shield, Beaker, Sun, Moon, Info, Sparkles, Globe, Leaf, ImageOff, ShoppingBag, Droplets, FlaskConical, Star, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Quiz from './pages/Quiz';
import { RoutineCard } from './components/RoutineCard';
import { Button } from './components/Button';
import { CartDrawer } from './components/CartDrawer';
import { chatWithDermBot } from './services/geminiService';
import { TEXTS } from './locales';

// --- Hero Slider Component ---
const HeroSlider = ({ onStartQuiz, language }: { onStartQuiz: () => void, language: Language }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const t = TEXTS[language];

    const slides = [
        {
            id: 1,
            title: t.hero.title,
            subtitle: t.hero.subtitle,
            desc: t.hero.desc,
            image: PRODUCTS.NIACINAMIDE.image,
            bgColor: "bg-rose-50 dark:bg-rose-950/30",
            accentColor: "text-brand-primary",
            activeTag: "Sebum Control",
            ph: "pH 5.50"
        },
        {
            id: 2,
            title: language === 'vn' ? "Phục hồi độ ẩm" : "Restore Hydration",
            subtitle: language === 'vn' ? "Cấp nước đa tầng" : "Multi-Depth Hydration",
            desc: language === 'vn' ? "Axit Hyaluronic siêu tinh khiết giúp da căng mọng ngay lập tức mà không gây nhờn rít." : "Ultra-pure Hyaluronic Acid provides instant plumping hydration without greasiness.",
            image: PRODUCTS.HA_B5.image,
            bgColor: "bg-blue-50 dark:bg-slate-900/50",
            accentColor: "text-blue-500",
            activeTag: "Hydration",
            ph: "pH 6.50"
        },
        {
            id: 3,
            title: language === 'vn' ? "Tái tạo bề mặt" : "Resurface & Glow",
            subtitle: language === 'vn' ? "Sáng da mờ thâm" : "Radiance Boosting",
            desc: language === 'vn' ? "Tẩy tế bào chết nhẹ nhàng với Glycolic Acid 7% để mang lại làn da tươi sáng, đều màu hơn." : "Gentle exfoliation with 7% Glycolic Acid to reveal brighter, more even-toned skin.",
            image: PRODUCTS.GLYCOLIC_TONER.image,
            bgColor: "bg-amber-50 dark:bg-yellow-950/20",
            accentColor: "text-amber-500",
            activeTag: "Exfoliation",
            ph: "pH 3.60"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-[650px] md:h-[750px] overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500 group">
            
            {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-center ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    } ${slide.bgColor}`}
                >
                    {/* Background Pattern/Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/40 to-transparent dark:from-black/40"></div>
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/40 dark:bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-20">
                        {/* Text Content */}
                        <div className={`space-y-8 transform transition-all duration-1000 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur text-brand-dark dark:text-neutral-200 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full border border-gray-100 dark:border-neutral-700 shadow-sm">
                                <Microscope size={12} className={slide.accentColor} /> 
                                {t.hero.tag}
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-serif text-brand-dark dark:text-neutral-100 leading-tight">
                                {slide.title} <br/>
                                <span className={`${slide.accentColor} italic`}>{slide.subtitle}</span>
                            </h1>
                            
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed font-light">
                                {slide.desc}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={onStartQuiz} className="min-w-[200px] shadow-glow hover:shadow-lg transition-all">{t.hero.ctaPrimary}</Button>
                                <Link to="/routines">
                                    <Button variant="outline" className="min-w-[200px] border-brand-dark/20 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white dark:hover:text-brand-dark hover:bg-white">{t.hero.ctaSecondary}</Button>
                                </Link>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
                            {/* Floating Tech Specs */}
                            <div className={`absolute top-10 right-0 md:right-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-4 rounded-xl shadow-soft border border-gray-100 dark:border-neutral-800 z-30 transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className={`flex items-center gap-2 mb-2 ${slide.accentColor}`}>
                                    <FlaskConical size={16} />
                                    <span className="text-[10px] font-bold uppercase">Active</span>
                                </div>
                                <p className="text-xs font-serif text-brand-dark dark:text-neutral-200 leading-tight">{slide.activeTag}</p>
                            </div>

                            <div className={`absolute bottom-20 left-0 md:left-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-4 rounded-xl shadow-soft border border-gray-100 dark:border-neutral-800 z-30 transform transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className={`flex items-center gap-2 mb-2 ${slide.accentColor}`}>
                                    <Droplets size={16} />
                                    <span className="text-[10px] font-bold uppercase">pH Level</span>
                                </div>
                                <p className="text-xs font-serif text-brand-dark dark:text-neutral-200 leading-tight">{slide.ph}</p>
                            </div>

                            {/* Main Image with Ken Burns Effect */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-white/20 dark:to-black/20 rounded-full blur-3xl transform scale-75 ${index === currentSlide ? 'animate-pulse' : ''}`}></div>
                                <img 
                                    src={slide.image} 
                                    alt={slide.title}
                                    className={`relative w-auto h-[80%] md:h-[90%] object-contain drop-shadow-2xl filter contrast-105 transform transition-transform duration-[20s] ease-linear ${index === currentSlide ? 'scale-110 translate-y-[-10px]' : 'scale-100'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-brand-primary' : 'bg-gray-300 dark:bg-neutral-700 hover:bg-brand-primary/50'}`}
                    />
                ))}
            </div>

            {/* Nav Arrows */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 text-brand-dark dark:text-white">
                <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 text-brand-dark dark:text-white">
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

// --- Sub-components for pages ---

const Home = ({ onStartQuiz, language, onAddToCart }: { onStartQuiz: () => void, language: Language, onAddToCart: (p: Product) => void }) => {
  const t = TEXTS[language];
  const navigate = useNavigate();
  
  // Select specific products for the spotlight section
  const spotlightProducts = [PRODUCTS.NIACINAMIDE, PRODUCTS.HA_B5, PRODUCTS.GLYCOLIC_TONER];

  return (
    <div className="animate-fade-in">
      {/* Replaced static Hero with Dynamic Slider */}
      <HeroSlider onStartQuiz={onStartQuiz} language={language} />

      {/* Value Props */}
      <section className="py-24 px-6 bg-white dark:bg-neutral-900 border-y border-brand-primary/5 dark:border-neutral-800 relative z-20 transition-colors duration-500">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 rounded-2xl hover:bg-brand-light/40 dark:hover:bg-brand-dark/10 transition-colors duration-500 group">
            <div className="w-14 h-14 bg-brand-light dark:bg-neutral-800 text-brand-primary flex items-center justify-center mb-4 rounded-full group-hover:scale-110 transition-transform">
              <Beaker size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-brand-dark dark:text-neutral-100">Clinical Formulations</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              We use therapeutic concentrations of active ingredients. No fillers, no fragrance, just functional chemistry.
            </p>
          </div>
          <div className="space-y-4 p-8 rounded-2xl hover:bg-brand-light/40 dark:hover:bg-brand-dark/10 transition-colors duration-500 group">
            <div className="w-14 h-14 bg-brand-light dark:bg-neutral-800 text-brand-primary flex items-center justify-center mb-4 rounded-full group-hover:scale-110 transition-transform">
              <Shield size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-brand-dark dark:text-neutral-100">Safety First</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Conflicts between actives (like Retinol and Vitamin C) are automatically flagged and separated in your routine.
            </p>
          </div>
          <div className="space-y-4 p-8 rounded-2xl hover:bg-brand-light/40 dark:hover:bg-brand-dark/10 transition-colors duration-500 group">
            <div className="w-14 h-14 bg-brand-light dark:bg-neutral-800 text-brand-primary flex items-center justify-center mb-4 rounded-full group-hover:scale-110 transition-transform">
              <Info size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-brand-dark dark:text-neutral-100">Transparent Education</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Understand exactly what you are putting on your skin and why. We demystify the science of skincare.
            </p>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Essential Molecules Spotlight */}
      <section className="py-24 px-6 bg-white dark:bg-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">The Foundation</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white mt-4 mb-4">Essential Molecules</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">High-purity actives designed to target specific skin concerns effectively.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {spotlightProducts.map((product) => (
              <div key={product.id} className="group relative bg-surface-warm dark:bg-neutral-950 rounded-3xl p-8 border border-gray-100 dark:border-neutral-800 transition-all duration-500 hover:shadow-hover hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col">
                
                {/* Lab Spec Badge */}
                <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur border border-brand-primary/10 dark:border-neutral-700 px-3 py-1 rounded text-[10px] font-mono text-brand-dark dark:text-neutral-200">
                        pH: {product.phLevel || 'N/A'}
                    </div>
                </div>

                {/* Image Container */}
                <div className="relative h-64 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 border border-gray-100 dark:border-neutral-800"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="relative h-full w-auto object-contain drop-shadow-md transform group-hover:-translate-y-4 group-hover:scale-110 transition-transform duration-500 z-10"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                   <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary/80">{product.type}</span>
                       <div className="flex gap-0.5 text-brand-accent">
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                          <Star size={10} fill="currentColor" />
                       </div>
                   </div>
                   <h3 className="text-xl font-serif text-brand-dark dark:text-neutral-100 mb-3 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                   <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                     {product.description[language]}
                   </p>
                   
                   {/* Tech Specs */}
                   <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="bg-white dark:bg-neutral-900 px-3 py-2 rounded border border-gray-100 dark:border-neutral-800">
                        <span className="block text-[10px] text-gray-400 uppercase">Format</span>
                        <span className="text-xs font-medium text-brand-dark dark:text-neutral-200">{product.format}</span>
                      </div>
                      <div className="bg-white dark:bg-neutral-900 px-3 py-2 rounded border border-gray-100 dark:border-neutral-800">
                        <span className="block text-[10px] text-gray-400 uppercase">Target</span>
                        <span className="text-xs font-medium text-brand-dark dark:text-neutral-200">{product.activeIngredient || 'General'}</span>
                      </div>
                   </div>
                </div>

                {/* Action */}
                <div className="mt-auto pt-6 border-t border-gray-200/50 dark:border-neutral-800 flex justify-between items-center">
                   <span className="font-mono font-medium text-brand-dark dark:text-brand-light">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                   </span>
                   <button 
                     onClick={() => onAddToCart(product)}
                     className="w-10 h-10 rounded-full bg-brand-dark dark:bg-white text-white dark:text-brand-dark flex items-center justify-center hover:bg-brand-primary dark:hover:bg-brand-light dark:hover:text-brand-primary transition-colors shadow-lg shadow-brand-dark/20"
                   >
                      <Plus size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Routines Preview */}
      <section className="py-24 px-6 bg-surface-warm dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-brand-dark dark:text-white mb-3">{t.routine.standard}</h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t.routine.standardDesc}</p>
            </div>
            <Link to="/routines" className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent pb-1">
              {t.routine.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {ROUTINES.slice(0, 3).map(routine => (
              <RoutineCard 
                key={routine.id} 
                routine={routine} 
                language={language}
                onClick={() => navigate(`/routines/${routine.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const RoutinesList = ({ language }: { language: Language }) => {
    const navigate = useNavigate();
    const t = TEXTS[language];
    return (
        <div className="max-w-6xl mx-auto py-20 px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white mb-6 transition-colors">{t.routine.curated}</h1>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed transition-colors">
                  {t.routine.curatedDesc}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {ROUTINES.map(routine => (
                <RoutineCard 
                    key={routine.id} 
                    routine={routine} 
                    language={language}
                    onClick={() => navigate(`/routines/${routine.id}`)}
                />
                ))}
            </div>
        </div>
    );
};

// Component to handle image loading errors for product images
const ProductImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-brand-light/30 border border-brand-primary/10 text-brand-primary/40 ${className}`}>
        <ImageOff size={24} />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

const RoutineDetail = ({ id, analysis, language, onAddBundle }: { id?: string, analysis?: string, language: Language, onAddBundle: (products: Product[]) => void }) => {
    const routine = ROUTINES.find(r => r.id === id) || ROUTINES[0];
    const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');
    const [botResponse, setBotResponse] = useState<string | null>(null);
    const [question, setQuestion] = useState('');
    const [asking, setAsking] = useState(false);
    
    const t = TEXTS[language];

    const askBot = async () => {
        if(!question.trim()) return;
        setAsking(true);
        const res = await chatWithDermBot(question, routine.name[language], language);
        setBotResponse(res);
        setAsking(false);
    }

    const handleAddBundle = () => {
        // Extract unique products from all steps
        const uniqueProducts = Array.from(new Map(routine.steps.map(step => [step.product.id, step.product])).values());
        onAddBundle(uniqueProducts);
    };

    const steps = routine.steps.filter(s => s.timeOfDay === activeTab || s.timeOfDay === 'BOTH');

    return (
        <div className="max-w-6xl mx-auto py-12 px-6 animate-fade-in">
            {analysis && (
                <div className="mb-12 p-8 bg-gradient-to-r from-brand-light to-white dark:from-neutral-900 dark:to-neutral-900 border border-brand-primary/10 dark:border-neutral-800 rounded-2xl relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary"></div>
                    <div className="flex items-center gap-2 mb-4 text-brand-primary font-medium">
                        <Sparkles size={18} />
                        <h3 className="uppercase tracking-widest text-xs font-bold">{t.routine.analysisTitle}</h3>
                    </div>
                    <p className="text-brand-dark dark:text-neutral-200 text-lg leading-relaxed font-serif italic">
                        "{analysis}"
                    </p>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <div className="mb-12">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary bg-brand-light dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-brand-primary/5 dark:border-neutral-700">
                            {routine.targetAudience[language]}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white mt-6 mb-4 transition-colors">{routine.name[language]}</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed transition-colors">{routine.description[language]}</p>
                    </div>

                    {/* Time of Day Toggle */}
                    <div className="flex border-b border-gray-200 dark:border-neutral-800 mb-10 gap-8">
                        <button 
                            className={`pb-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${activeTab === 'AM' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300'}`}
                            onClick={() => setActiveTab('AM')}
                        >
                            <Sun size={18} /> {t.routine.am}
                        </button>
                        <button 
                            className={`pb-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${activeTab === 'PM' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300'}`}
                            onClick={() => setActiveTab('PM')}
                        >
                            <Moon size={18} /> {t.routine.pm}
                        </button>
                    </div>

                    {/* Steps List */}
                    <div className="space-y-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-4 -translate-x-1/2 top-6 bottom-6 w-px bg-gray-200 dark:bg-neutral-800 -z-10"></div>
                        
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex gap-8 group">
                                <div className="flex flex-col items-center pt-2">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border-2 border-brand-primary text-brand-primary flex items-center justify-center text-sm font-bold z-10 transition-all group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm transition-all hover:shadow-hover hover:border-brand-primary/20 dark:hover:border-brand-primary/20 flex flex-col md:flex-row gap-6 items-start group-hover:-translate-y-1">
                                        <div className="shrink-0 bg-brand-light/30 dark:bg-neutral-800 p-2 rounded-xl border border-brand-primary/5 dark:border-neutral-700">
                                             <ProductImage 
                                                src={step.product.image} 
                                                alt={step.product.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        </div>
                                       
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div className="text-[10px] uppercase tracking-wider font-bold text-brand-primary/60 dark:text-brand-primary/80 mb-2">
                                                    {step.product.type} {step.product.activeIngredient && `• ${step.product.activeIngredient}`}
                                                </div>
                                                <span className="text-[10px] font-mono text-gray-400">{step.product.format}</span>
                                            </div>
                                            
                                            <h4 className="font-serif text-xl text-brand-dark dark:text-neutral-100 mb-2">{step.product.name}</h4>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">{step.product.description[language]}</p>
                                            <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-dark dark:text-neutral-300 bg-brand-light/50 dark:bg-neutral-800 px-3 py-1.5 rounded-md border border-brand-primary/5 dark:border-neutral-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                                                Usage: {step.instruction[language]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                     {/* Summary Card */}
                    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-soft sticky top-24 transition-colors">
                        <h3 className="font-serif text-xl text-brand-dark dark:text-neutral-100 mb-6 flex items-center gap-3">
                            <ShieldCheck size={20} className="text-brand-accent" /> {t.routine.safety}
                        </h3>
                        <ul className="space-y-4 mb-8">
                            {routine.safetyNotes.map((note, i) => (
                                <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400 flex gap-3 items-start">
                                    <span className="text-brand-accent mt-1.5">•</span> 
                                    <span className="leading-relaxed">{note[language]}</span>
                                </li>
                            ))}
                        </ul>
                        <Button fullWidth onClick={handleAddBundle} className="py-4 shadow-lg shadow-brand-primary/20">{t.routine.add}</Button>
                    </div>

                    {/* Bot Interaction */}
                     <div className="bg-gradient-to-br from-brand-light/50 to-white dark:from-neutral-900 dark:to-neutral-900 border border-brand-primary/10 dark:border-neutral-800 p-6 rounded-2xl shadow-sm transition-colors">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-brand-primary mb-4 flex items-center gap-2">
                             <Sparkles size={14} /> {t.routine.ask}
                        </h3>
                        <div className="space-y-3">
                            {botResponse ? (
                                <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm text-sm text-neutral-700 dark:text-neutral-300 mb-4 border border-gray-100 dark:border-neutral-700 relative">
                                    <div className="absolute -left-2 top-4 w-4 h-4 bg-white dark:bg-neutral-800 border-l border-b border-gray-100 dark:border-neutral-700 transform rotate-45"></div>
                                    <span className="font-bold block text-xs uppercase mb-2 text-brand-primary">DermBot:</span>
                                    <p className="leading-relaxed">{botResponse}</p>
                                    <button onClick={() => setBotResponse(null)} className="text-xs text-brand-accent font-medium mt-3 hover:underline">Ask another question</button>
                                </div>
                            ) : (
                                <>
                                    <textarea 
                                        rows={3}
                                        placeholder={t.routine.askPlaceholder} 
                                        className="w-full text-sm p-3 rounded-lg border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white dark:bg-neutral-800 dark:text-neutral-200 resize-none"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                    <Button 
                                        variant="secondary" 
                                        fullWidth 
                                        onClick={askBot} 
                                        disabled={asking || !question}
                                        className="text-xs"
                                    >
                                        {asking ? t.routine.consulting : t.routine.askBtn}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Learn = () => (
    <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white mb-12 text-center transition-colors">Ingredient Dictionary</h1>
        <div className="grid gap-8">
            {[
                {
                    title: "Niacinamide (Vitamin B3)",
                    type: "Vitamin",
                    desc: "Indicated for reducing the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by zinc salt of pyrrolidone carboxylic acid to balance visible aspects of sebum activity.",
                    tags: ["Regulates Sebum", "Brightens", "Strengthens Barrier"]
                },
                {
                    title: "Retinol (Vitamin A)",
                    type: "Retinoid",
                    desc: "Encourages cell turnover to reduce the appearance of fine lines, photodamage, and general skin aging. Note: Retinoids can make the skin more sensitive to UV radiation.",
                    tags: ["Anti-Aging", "Textural Irregularities"]
                },
                {
                    title: "Direct Acids (AHA/BHA)",
                    type: "Exfoliant",
                    desc: "Alpha Hydroxy Acids (AHAs) exfoliate the topmost surface of the skin for a brighter and more even appearance. Beta Hydroxy Acids (BHAs) also exfoliate the skin with an extended function to help clear pore congestion.",
                    tags: ["Exfoliation", "Radiance", "Deep Cleaning"]
                }
            ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-soft border border-gray-100 dark:border-neutral-800 hover:border-brand-primary/20 dark:hover:border-brand-primary/30 transition-all hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                         <h2 className="text-2xl font-serif text-brand-dark dark:text-neutral-100">{item.title}</h2>
                         <span className="bg-brand-light dark:bg-neutral-800 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{item.type}</span>
                    </div>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                        {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold text-brand-primary/70">
                        {item.tags.map(tag => (
                             <span key={tag} className="bg-gray-50 dark:bg-neutral-800 px-2 py-1 rounded border border-gray-100 dark:border-neutral-700 dark:text-neutral-400">{tag}</span> 
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

function ShieldCheck({size, className}: {size?: number, className?: string}) {
     return <Shield size={size} className={className} />;
}


// --- Main App Component ---

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<{routine: RoutineBundle, analysis: string} | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
    } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
      if (theme === 'light') {
          setTheme('dark');
          localStorage.theme = 'dark';
          document.documentElement.classList.add('dark');
      } else {
          setTheme('light');
          localStorage.theme = 'light';
          document.documentElement.classList.remove('dark');
      }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vn' : 'en');
  };

  const addToCart = (products: Product[]) => {
      setCart(prevCart => {
          const newCart = [...prevCart];
          products.forEach(product => {
              const existingItemIndex = newCart.findIndex(item => item.id === product.id);
              if (existingItemIndex > -1) {
                  // If exists, just increment quantity
                  newCart[existingItemIndex].quantity += 1;
              } else {
                  // Else add new item
                  newCart.push({ ...product, quantity: 1 });
              }
          });
          return newCart;
      });
      setIsCartOpen(true);
  };

  // Helper for single product add
  const addSingleToCart = (product: Product) => {
      addToCart([product]);
  }

  const updateCartQuantity = (id: string, delta: number) => {
      setCart(prevCart => prevCart.map(item => {
          if (item.id === id) {
              return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }
          return item;
      }));
  };

  const removeFromCart = (id: string) => {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wrapper for routing logic
  const AppContent = () => {
    const navigate = useNavigate();
    const t = TEXTS[language].nav;

    const handleQuizComplete = (routine: RoutineBundle, analysis: string) => {
        setQuizResult({ routine, analysis });
        navigate(`/routines/${routine.id}`);
    };

    return (
        <div className="min-h-screen bg-surface-warm dark:bg-neutral-950 text-clinical-black dark:text-neutral-200 font-sans flex flex-col selection:bg-brand-accent selection:text-white transition-colors duration-300">
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            language={language}
          />

          {/* Navigation */}
          <nav className="border-b border-brand-primary/5 dark:border-neutral-800 sticky top-0 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-xl z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group" onClick={() => setQuizResult(null)}>
                <img 
                    src="https://raw.githubusercontent.com/huynh044/DogvsCat/f1c29b77a4b5e334d3f942763d36090ab1aa5d62/logo.png
" 
                    alt="The Ordinary+" 
                    className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105 filter dark:invert" 
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-dark dark:text-neutral-200">
                <Link to="/quiz" className="hover:text-brand-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-primary after:transition-all hover:after:w-full">{t.quiz}</Link>
                <Link to="/routines" className="hover:text-brand-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-primary after:transition-all hover:after:w-full">{t.routines}</Link>
                <Link to="/learn" className="hover:text-brand-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-primary after:transition-all hover:after:w-full">{t.learn}</Link>
                
                <div className="h-4 w-px bg-gray-300 dark:bg-neutral-700 mx-2"></div>

                <button 
                  onClick={toggleTheme}
                  className="p-2 text-neutral-500 hover:text-brand-primary transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                <button 
                  onClick={toggleLanguage} 
                  className="flex items-center gap-1 text-neutral-500 hover:text-brand-primary uppercase text-[10px] font-bold border border-gray-200 dark:border-neutral-700 hover:border-brand-primary px-3 py-1.5 rounded-full transition-all"
                >
                  <Globe size={12} /> {language}
                </button>
                
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-brand-dark dark:text-neutral-200 hover:text-brand-primary transition-colors"
                >
                    <ShoppingBag size={20} />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </button>

                <Button variant="primary" className="py-2.5 px-6 text-[10px] shadow-soft" onClick={() => navigate('/quiz')}>
                    {t.build}
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="flex items-center gap-4 md:hidden">
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-brand-dark dark:text-neutral-200"
                  >
                    <ShoppingBag size={20} />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </button>
                <button 
                    className="text-brand-dark dark:text-neutral-200"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 p-6 flex flex-col gap-6 animate-fade-in shadow-xl z-40 h-[calc(100vh-5rem)]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif text-brand-dark dark:text-neutral-100">{t.home}</Link>
                <Link to="/quiz" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif text-brand-dark dark:text-neutral-100">{t.quiz}</Link>
                <Link to="/routines" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif text-brand-dark dark:text-neutral-100">{t.routines}</Link>
                <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif text-brand-dark dark:text-neutral-100">{t.learn}</Link>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                     <button onClick={() => {toggleLanguage(); setMobileMenuOpen(false);}} className="text-lg font-medium flex items-center gap-2 text-brand-primary">
                        <Globe size={18} /> {language === 'en' ? 'Vietnamese' : 'English'}
                    </button>
                    <button onClick={() => {toggleTheme();}} className="text-lg font-medium flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                        {theme === 'light' ? <><Moon size={18} /> Dark Mode</> : <><Sun size={18} /> Light Mode</>}
                    </button>
                </div>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Home onStartQuiz={() => navigate('/quiz')} language={language} onAddToCart={addSingleToCart} />} />
                <Route path="/quiz" element={<Quiz onComplete={handleQuizComplete} language={language} />} />
                <Route path="/routines" element={<RoutinesList language={language} />} />
                <Route path="/routines/:id" element={<WrapperRoutineDetail analysis={quizResult?.analysis} language={language} onAddBundle={addToCart} />} />
                <Route path="/learn" element={<Learn />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-brand-dark text-white py-16 px-6 relative overflow-hidden mt-12">
             {/* Decorative leaf icon */}
             <Leaf className="absolute -top-10 -right-10 text-brand-primary opacity-20 w-64 h-64" />
             
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <img 
                            src="https://raw.githubusercontent.com/huynh044/DogvsCat/f1c29b77a4b5e334d3f942763d36090ab1aa5d62/logo.png
" 
                            alt="The Ordinary+" 
                            className="h-12 w-auto object-contain bg-surface-warm rounded p-1" 
                        />
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                        Independent platform for building personalized skincare regimens based on clinical science and dermatological principles.
                    </p>
                </div>
                <div>
                    <h5 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-brand-primary">Explore</h5>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link to="/quiz" className="hover:text-white transition-colors">{t.quiz}</Link></li>
                        <li><Link to="/routines" className="hover:text-white transition-colors">{t.routines}</Link></li>
                        <li><Link to="/learn" className="hover:text-white transition-colors">{t.learn}</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-brand-primary">Legal</h5>
                     <ul className="space-y-4 text-sm text-gray-300">
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Disclaimer</li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-brand-primary">Disclaimer</h5>
                     <p className="text-xs text-gray-500 leading-relaxed">
                        This site is a demo and is not affiliated with DECIEM or The Ordinary. 
                        Consult a dermatologist for medical skin conditions.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-white/10 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Ordinary.Architect. All rights reserved.
            </div>
          </footer>
        </div>
    );
  }

  return (
    <HashRouter>
        <AppContent />
    </HashRouter>
  );
};

// Wrapper to extract params for detail page
const WrapperRoutineDetail = ({analysis, language, onAddBundle}: {analysis?: string, language: Language, onAddBundle: (products: Product[]) => void}) => {
    const { id } = useParams();
    return <RoutineDetail id={id} analysis={analysis} language={language} onAddBundle={onAddBundle} />;
}

export default App;