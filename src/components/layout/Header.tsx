import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        "flex justify-between items-center py-4 px-6 bg-card text-foreground", // Using bg-card as per standard theme for surface-like elements
        className
      )}
    >
      {/* Logo Section */}
      <div>
        <div className="text-xl font-bold text-foreground">ASCENDION</div>
        <p className="text-xs text-muted-foreground">Engineering to elevate life</p>
      </div>

      {/* Title Section */}
      <div className="text-right">
        <h1 className="text-3xl font-extrabold text-foreground">AI QUOTIENT (AIQ) ASSESSMENT</h1>
        <p className="text-base text-muted-foreground mt-1">
          SCREENING AI-FRIENDLY TALENT
        </p>
      </div>
    </header>
  );
};

export default Header;
