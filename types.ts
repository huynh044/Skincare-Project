export type Language = 'en' | 'vn';

export interface LocalizedString {
  en: string;
  vn: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'Acid' | 'Vitamin' | 'Hydrator' | 'Oil' | 'Cleanser' | 'Sunscreen';
  activeIngredient?: string;
  description: LocalizedString;
  phLevel?: string;
  format: string;
  image: string;
  price: number; // Added price
}

export interface RoutineStep {
  order: number;
  timeOfDay: 'AM' | 'PM' | 'BOTH';
  product: Product;
  instruction: LocalizedString;
}

export interface RoutineBundle {
  id: string;
  name: LocalizedString;
  targetAudience: LocalizedString;
  description: LocalizedString;
  steps: RoutineStep[];
  safetyNotes: LocalizedString[];
}

export interface QuizState {
  skinType: 'oily' | 'dry' | 'combination' | 'normal' | '';
  concern: 'acne' | 'aging' | 'pigmentation' | 'dullness' | '';
  sensitivity: 'high' | 'low' | '';
  experience: 'beginner' | 'intermediate' | 'advanced' | '';
}

export interface CartItem extends Product {
  quantity: number;
}

export type PageView = 'home' | 'quiz' | 'routines' | 'learn';