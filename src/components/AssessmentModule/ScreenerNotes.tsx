import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ScreenerNotesProps {
  initialNotes?: string;
  className?: string;
  placeholder?: string;
  // onNotesChange?: (notes: string) => void; // Optional: To lift state up
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({
  initialNotes = "",
  className,
  placeholder = "Enter screener notes and qualitative feedback here...",
  // onNotesChange
}) => {
  const [notes, setNotes] = useState<string>(initialNotes);

  const handleNotesChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    // if (onNotesChange) {
    //   onNotesChange(newNotes);
    // }
  }, [/* onNotesChange */]);

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <Label htmlFor="screener-notes" className="text-base sm:text-lg font-semibold text-foreground">
        Screener Notes / Comments:
      </Label>
      <Textarea
        id="screener-notes"
        value={notes}
        onChange={handleNotesChange}
        placeholder={placeholder}
        className="min-h-[100px] sm:min-h-[120px] w-full text-sm sm:text-base bg-card border-border focus:ring-1 focus:ring-ring"
        rows={4} 
      />
    </div>
  );
};

export default ScreenerNotes;
