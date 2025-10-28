
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', icon, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
    secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-700 focus:ring-slate-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {icon && <span className="mr-2 -ml-1 h-5 w-5">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
