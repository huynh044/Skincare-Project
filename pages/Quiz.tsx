import React, { useState } from 'react';
import { QuizState, RoutineBundle, Language } from '../types';
import { ROUTINES } from '../constants';
import { generateSkinAnalysis } from '../services/geminiService';
import { Button } from '../components/Button';
import { Check, ChevronRight, Loader2, AlertCircle, Droplets, Sun, Activity, Zap, XCircle } from 'lucide-react';
import { TEXTS } from '../locales';

interface QuizProps {
  onComplete: (routine: RoutineBundle, analysis: string) => void;
  language: Language;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, language }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<QuizState>({
    skinType: '',
    concern: '',
    sensitivity: '',
    experience: ''
  });

  const t = TEXTS[language].quiz;

  const handleSelect = (key: keyof QuizState, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      await finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setLoading(true);
    let matchedRoutineId = 'aging-normal';
    if (answers.skinType === 'oily' || answers.concern === 'acne') {
      matchedRoutineId = 'acne-oily';
    } else if (answers.skinType === 'dry' || answers.sensitivity === 'high') {
      matchedRoutineId = 'dry-sensitive';
    }

    const matchedRoutine = ROUTINES.find(r => r.id === matchedRoutineId) || ROUTINES[0];
    const analysis = await generateSkinAnalysis(answers, language);

    setLoading(false);
    onComplete(matchedRoutine, analysis);
  };

  const renderOption = (key: keyof QuizState, value: string, label: string, description?: string, icon?: React.ReactNode) => {
    const isSelected = answers[key] === value;
    return (
      <button
        onClick={() => handleSelect(key, value)}
        className={`w-full text-left p-6 rounded-xl border-2 transition-all flex items-center gap-5 group
          ${isSelected 
            ? 'border-brand-primary bg-brand-light/20 dark:bg-brand-primary/10 shadow-sm' 
            : 'border-white dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-brand-primary/30 dark:hover:border-brand-primary/30 hover:bg-white/80 dark:hover:bg-neutral-800 shadow-soft'}`}
      >
        {icon && (
          <div className={`p-3 rounded-full transition-colors ${isSelected ? 'bg-brand-primary text-white' : 'bg-brand-light dark:bg-neutral-800 text-brand-primary group-hover:bg-brand-primary/10'}`}>
            {icon}
          </div>
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
             <span className={`font-serif text-lg ${isSelected ? 'text-brand-dark dark:text-white' : 'text-neutral-700 dark:text-neutral-300'}`}>{label}</span>
             {isSelected && <div className="bg-brand-primary text-white p-1 rounded-full"><Check size={14} /></div>}
          </div>
          {description && <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">{description}</p>}
        </div>
      </button>
    );
  };

  // Specialized card for visual selection in Step 2
  const renderVisualOption = (value: string, label: string, imgUrl: string) => {
    const isSelected = answers.concern === value;
    return (
      <button
        onClick={() => handleSelect('concern', value)}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-all group text-left
          ${isSelected ? 'border-brand-primary shadow-lg scale-[1.02]' : 'border-transparent shadow-soft hover:shadow-hover'}`}
      >
        <img 
          src={imgUrl} 
          alt={label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            // Fallback content handled by parent background color or pseudo element if needed, 
            // but hiding broken image reveals bg color
            e.currentTarget.parentElement?.classList.add('bg-brand-light');
          }}
        />
        <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-brand-primary/80' : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-brand-primary/40'}`}>
            <div className="absolute bottom-0 left-0 w-full p-4 text-white flex justify-between items-center">
                <span className="font-serif text-lg">{label}</span>
                {isSelected && <div className="bg-white text-brand-primary rounded-full p-1"><Check size={14}/></div>}
            </div>
        </div>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in text-brand-dark dark:text-neutral-200">
        <Loader2 className="animate-spin mb-6 text-brand-primary" size={48} />
        <h3 className="text-2xl font-serif mb-2">{t.loadingTitle}</h3>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md text-sm leading-relaxed">
          {t.loadingDesc}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/60 dark:text-brand-primary/80 mb-3">
          <span>{t.step} {step} / 4</span>
          <span>{t.profileBuilder}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-brand-primary h-full transition-all duration-700 ease-out rounded-full" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Skin Type */}
      {step === 1 && (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-3">{t.s1.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">{t.s1.desc}</p>
          </div>
          <div className="grid gap-4">
            {renderOption('skinType', 'oily', t.s1.oily, undefined, <Droplets size={20}/>)}
            {renderOption('skinType', 'dry', t.s1.dry, undefined, <Sun size={20}/>)}
            {renderOption('skinType', 'combination', t.s1.combo, undefined, <Activity size={20}/>)}
            {renderOption('skinType', 'normal', t.s1.normal, undefined, <Check size={20}/>)}
          </div>
        </div>
      )}

      {/* Step 2: Concern - Visual Grid */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in">
          <div>
             <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-3">{t.s2.title}</h2>
             <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">{t.s2.desc}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {renderVisualOption('acne', t.s2.acne, 'https://images.unsplash.com/photo-1550575118-287ae49e45b3?q=80&w=600&auto=format&fit=crop')}
            {renderVisualOption('aging', t.s2.aging, 'https://plus.unsplash.com/premium_photo-1664195156641-766b1a5e1d55?q=80&w=600&auto=format&fit=crop')}
            {renderVisualOption('pigmentation', t.s2.pigmentation, 'https://images.unsplash.com/photo-1560690069-450f3408092d?q=80&w=600&auto=format&fit=crop')}
            {renderVisualOption('dullness', t.s2.dullness, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600&auto=format&fit=crop')}
          </div>
        </div>
      )}

      {/* Step 3: Sensitivity */}
      {step === 3 && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-3">{t.s3.title}</h2>
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-5 rounded-lg text-blue-800 dark:text-blue-200 text-sm flex gap-3 items-start border border-blue-100/50 dark:border-blue-900/30">
             <AlertCircle size={20} className="mt-0.5 shrink-0"/>
             <span className="leading-relaxed">{t.s3.warning}</span>
          </div>
          <div className="space-y-4">
            {renderOption('sensitivity', 'high', t.s3.high, t.s3.highDesc)}
            {renderOption('sensitivity', 'low', t.s3.low, t.s3.lowDesc)}
          </div>
        </div>
      )}

      {/* Step 4: Experience */}
      {step === 4 && (
        <div className="space-y-8 animate-fade-in">
           <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-3">{t.s4.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">{t.s4.desc}</p>
           </div>
          <div className="space-y-4">
            {renderOption('experience', 'beginner', t.s4.beg, t.s4.begDesc, <div className="text-sm font-bold border border-current rounded px-1.5 py-0.5">1</div>)}
            {renderOption('experience', 'intermediate', t.s4.int, t.s4.intDesc, <div className="text-sm font-bold border border-current rounded px-1.5 py-0.5">2</div>)}
            {renderOption('experience', 'advanced', t.s4.adv, t.s4.advDesc, <div className="text-sm font-bold border border-current rounded px-1.5 py-0.5">3</div>)}
          </div>
        </div>
      )}

      <div className="mt-10 pt-10 border-t border-gray-100 dark:border-neutral-800 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={
            (step === 1 && !answers.skinType) ||
            (step === 2 && !answers.concern) ||
            (step === 3 && !answers.sensitivity) ||
            (step === 4 && !answers.experience)
          }
          className="flex items-center gap-3 px-8"
        >
          {step === 4 ? t.build : t.next} <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Quiz;