import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest rounded-sm";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-dark shadow-sm hover:shadow-md",
    secondary: "bg-brand-light text-brand-primary hover:bg-[#FADADD]", // Updated hover to match pink theme
    outline: "border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white",
    accent: "bg-brand-accent text-white hover:bg-[#D9707C]" // Updated hover to match pink theme
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};