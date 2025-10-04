
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

const ResultCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const isReal = result.classification === 'Real';
  const cardColor = isReal ? 'border-green-400/80' : 'border-blue-500/80';
  const textColor = isReal ? 'text-green-400' : 'text-blue-400';
  const confidenceColor = isReal ? 'bg-green-500' : 'bg-blue-500';
  
  const Icon: React.FC<{ className?: string }> = ({ className }) => 
    isReal ? (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

  return (
    <div className={`mt-6 bg-gray-900/60 p-6 rounded-lg shadow-xl border-t-4 ${cardColor} animate-fade-in`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className={`w-10 h-10 ${textColor}`} />
        <h2 className={`text-2xl font-bold ${textColor}`}>{result.classification} News</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-1">Confidence</p>
        <div className="w-full bg-gray-800 rounded-full h-4">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ease-out ${confidenceColor}`} 
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
        <p className={`text-right font-semibold text-lg ${textColor} mt-1`}>{result.confidence.toFixed(0)}%</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm mb-1">Explanation</p>
        <p className="text-gray-200 italic">"{result.explanation}"</p>
      </div>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
    <div className="mt-6 bg-gray-900/60 p-6 rounded-lg shadow-xl border-t-4 border-gray-700 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
      </div>
      <div className="mb-4">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="w-full bg-gray-800 rounded-full h-4">
          <div className="h-4 rounded-full bg-gray-700"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-1/6 mt-2 ml-auto"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-5 bg-gray-700 rounded w-full"></div>
        <div className="h-5 bg-gray-700 rounded w-3/4 mt-2"></div>
      </div>
    </div>
  );

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, result }) => {
  return (
    <div className="mt-8 min-h-[280px]">
      {isLoading && <LoadingSkeleton />}
      {error && !isLoading && (
        <div className="text-center p-4 bg-blue-900/50 border border-blue-700 rounded-lg text-blue-300 animate-fade-in">
          <p className="font-bold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      )}
      {result && !isLoading && <ResultCard result={result} />}
    </div>
  );
};

export default ResultDisplay;
