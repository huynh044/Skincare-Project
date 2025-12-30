import React from 'react';
import { CartItem, Language } from '../types';
import { TEXTS } from '../locales';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  language: Language;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemove,
  language 
}) => {
  const t = TEXTS[language];
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col animate-fade-in">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-surface-warm">
          <h2 className="text-xl font-serif text-brand-dark flex items-center gap-2">
            <ShoppingBag size={20} /> {t.cart.title}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-neutral-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-light">{t.cart.empty}</p>
              <Button variant="outline" onClick={onClose}>{t.cart.continue}</Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-primary/20 transition-colors bg-white shadow-sm">
                <div className="w-20 h-20 shrink-0 bg-brand-light/30 rounded-lg p-2 border border-brand-primary/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-brand-dark leading-tight mb-1">{item.name}</h4>
                    <p className="text-xs text-brand-primary font-bold">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-brand-primary disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-brand-primary"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-surface-warm">
            <div className="flex justify-between items-end mb-6">
              <span className="text-sm text-neutral-500 font-light">{t.cart.subtotal}</span>
              <span className="text-2xl font-serif text-brand-dark">{formatPrice(total)}</span>
            </div>
            <Button fullWidth className="py-4 shadow-lg shadow-brand-primary/10 flex justify-between items-center group">
              {t.cart.checkout}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[10px] text-center text-neutral-400 mt-4">
              Free shipping on orders over 500.000₫
            </p>
          </div>
        )}
      </div>
    </>
  );
};