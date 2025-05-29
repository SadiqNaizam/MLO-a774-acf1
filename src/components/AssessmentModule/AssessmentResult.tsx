import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type AIQLevel = 'High' | 'Medium' | 'Low';
const AIQ_LEVELS: AIQLevel[] = ['High' as const, 'Medium' as const, 'Low' as const];

interface AssessmentResultProps {
  calculatedLevel: AIQLevel | null;
  className?: string;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ calculatedLevel = 'Low', className }) => {

  const checkboxStyle = cn(
    "w-5 h-5 sm:w-6 sm:h-6",
    "data-[state=checked]:bg-transparent text-accent-teal data-[state=checked]:border-accent-teal",
    "border-muted-foreground",
    "disabled:opacity-100" // Override default disabled opacity to keep it visually prominent
  );

  return (
    <div className={cn("py-4", className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-1">
        <h3 className="text-base sm:text-lg font-semibold text-foreground whitespace-nowrap">
          AIQ Level:
        </h3>
        {AIQ_LEVELS.map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <Checkbox
              id={`level-${level.toLowerCase()}`}
              checked={calculatedLevel === level}
              disabled 
              aria-label={`AIQ Level: ${level}${calculatedLevel === level ? ' (selected)' : ''}`}
              className={checkboxStyle}
            />
            <Label
              htmlFor={`level-${level.toLowerCase()}`}
              className={cn(
                "text-sm sm:text-base text-foreground cursor-pointer",
                calculatedLevel === level ? "font-semibold" : "font-normal"
              )}
            >
              {level}
            </Label>
          </div>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">
        (Auto calculated using above inputs)
      </p>
    </div>
  );
};

export default AssessmentResult;
