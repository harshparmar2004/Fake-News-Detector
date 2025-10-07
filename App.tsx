
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from './types';
import { analyzeHeadline } from './services/geminiService';

 import Header from './components/Header';
import HeadlineInput from './components/HeadlineInput';
import ResultDisplay from './components/ResultDisplay';
import InitialState from './components/InitialState';

function App() {
  const [headline, setHeadline] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (headlineToAnalyze?: string) => {
    const currentHeadline = typeof headlineToAnalyze === 'string' ? headlineToAnalyze : headline;
    if (!currentHeadline.trim()) {
      setError('Please enter a headline to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeHeadline(currentHeadline);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the headline. The AI model may be overloaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [headline]);

  const handleExampleClick = (exampleHeadline: string) => {
    setHeadline(exampleHeadline);
    handleSubmit(exampleHeadline);
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_rgba(0,0,0,0)_70%)] text-white font-sans flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
        <Header />
        <main className="w-full">
          <HeadlineInput
            headline={headline}
            setHeadline={setHeadline}
            onSubmit={() => handleSubmit()}
            isLoading={isLoading}
          />
          {isLoading || error || result ? (
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              result={result}
            />
          ) : (
            <InitialState onExampleClick={handleExampleClick} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
