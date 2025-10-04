
import React from 'react';

interface HeadlineInputProps {
  headline: string;
  setHeadline: (headline: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const HeadlineInput: React.FC<HeadlineInputProps> = ({ headline, setHeadline, onSubmit, isLoading }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg shadow-lg border border-blue-500/20">
      <textarea
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a news headline here..."
        className="w-full h-28 bg-gray-900 text-gray-200 p-3 rounded-md border-2 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors duration-300 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !headline.trim()}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Headline'
        )}
      </button>
    </div>
  );
};

export default HeadlineInput;
