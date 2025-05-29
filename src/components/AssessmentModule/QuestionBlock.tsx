import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface Question {
  id: string;
  number: string;
  text: string;
  subText?: string;
}

const assessmentQuestionsData: Question[] = [
  { id: 'q1', number: '01', text: "Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?", subText: "(Looks for curiosity and initiative)" },
  { id: 'q2', number: '02', text: "How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?", subText: "(Assesses awareness and interest)" },
  { id: 'q3', number: '03', text: "Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)", subText: "(Gauges willingness to experiment)" },
  { id: 'q4', number: '04', text: "Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?", subText: "(Tests ability to identify practical AI opportunities)" },
  { id: 'q5', number: '05', text: "Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?", subText: "(Evaluates adaptability)" },
  { id: 'q6', number: '06', text: "Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step" },
];

export type ResponseState = 'relevant' | 'non-relevant' | 'none';
export interface QuestionResponses {
  [questionId: string]: ResponseState;
}

const initialResponsesData: QuestionResponses = {
  q1: 'relevant' as const,
  q2: 'non-relevant' as const,
  q3: 'relevant' as const,
  q4: 'non-relevant' as const,
  q5: 'relevant' as const,
  q6: 'non-relevant' as const,
};

interface QuestionBlockProps {
  className?: string;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ className }) => {
  const [questions] = useState<Question[]>(assessmentQuestionsData);
  const [responses, setResponses] = useState<QuestionResponses>(initialResponsesData);

  const handleResponseChange = useCallback((questionId: string, type: 'relevant' | 'non-relevant') => {
    setResponses(prevResponses => {
      const currentResponse = prevResponses[questionId];
      let newState: ResponseState;

      if (type === 'relevant') {
        newState = currentResponse === 'relevant' ? 'none' : 'relevant';
      } else { // type === 'non-relevant'
        newState = currentResponse === 'non-relevant' ? 'none' : 'non-relevant';
      }
      
      return { ...prevResponses, [questionId]: newState };
    });
  }, []);

  const checkboxStyle = cn(
    "w-5 h-5 sm:w-6 sm:h-6",
    "data-[state=checked]:bg-transparent text-accent-teal data-[state=checked]:border-accent-teal",
    "border-muted-foreground"
  );

  return (
    <div className={cn("space-y-6 sm:space-y-8", className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-4 sm:gap-x-8">
        <div>{/* Empty cell for question column header */}</div>
        <span className="text-sm font-medium text-foreground text-center">Relevant</span>
        <span className="text-sm font-medium text-foreground text-center">Non-Relevant</span>
      </div>
      {questions.map((question) => (
        <div 
          key={question.id} 
          className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-4 sm:gap-x-8 border-b border-border pb-6 last:border-b-0 last:pb-0"
        >
          <div className="flex items-start">
            <span className="text-lg sm:text-xl font-semibold text-accent-blue mr-3 sm:mr-4 pt-0.5 select-none">
              {question.number}
            </span>
            <div>
              <p className="text-base sm:text-md text-foreground">
                {question.text}
              </p>
              {question.subText && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {question.subText}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-center pt-1">
            <Checkbox
              id={`${question.id}-relevant`}
              checked={responses[question.id] === 'relevant'}
              onCheckedChange={() => handleResponseChange(question.id, 'relevant')}
              aria-label={`Mark question ${question.number} as relevant`}
              className={checkboxStyle}
            />
          </div>

          <div className="flex justify-center pt-1">
            <Checkbox
              id={`${question.id}-non-relevant`}
              checked={responses[question.id] === 'non-relevant'}
              onCheckedChange={() => handleResponseChange(question.id, 'non-relevant')}
              aria-label={`Mark question ${question.number} as non-relevant`}
              className={checkboxStyle}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionBlock;
