import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header'; // Relative import for sibling component

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start w-full h-screen bg-background text-foreground", // As per Layout Requirements.overall.definition
        className
      )}
    >
      <Header />
      <main className="flex-grow w-full flex flex-col gap-6 p-6"> {/* As per Layout Requirements.mainContent.layout, added flex-grow */}
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
