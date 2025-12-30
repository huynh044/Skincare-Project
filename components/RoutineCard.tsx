import React from 'react';
import { RoutineBundle, Language } from '../types';
import { ArrowRight, Droplet, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { TEXTS } from '../locales';

interface RoutineCardProps {
  routine: RoutineBundle;
  onClick: () => void;
  language: Language;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onClick, language }) => {
  const t = TEXTS[language];
  return (
    <div className="bg-white border border-gray-100 p-8 flex flex-col h-full hover:shadow-hover transition-all duration-300 group rounded-xl hover:-translate-y-1 relative overflow-hidden">
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="mb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary bg-brand-light px-3 py-1 rounded-full">
          {routine.targetAudience[language]}
        </span>
      </div>
      <h3 className="text-2xl font-serif text-brand-dark mb-3">{routine.name[language]}</h3>
      <p className="text-sm text-neutral-500 mb-8 flex-grow leading-relaxed">
        {routine.description[language]}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-50">
        <div className="flex items-center gap-2 text-brand-dark/70 text-xs font-medium">
          <Droplet size={16} className="text-brand-accent" />
          <span>{routine.steps.length} {t.common.products}</span>
        </div>
        <div className="flex items-center gap-2 text-brand-dark/70 text-xs font-medium">
          <ShieldCheck size={16} className="text-brand-accent" />
          <span>{t.common.beginnerSafe}</span>
        </div>
      </div>

      <Button variant="outline" onClick={onClick} className="w-full flex items-center justify-between group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
        {t.routine.view} <ArrowRight size={16} />
      </Button>
    </div>
  );
};