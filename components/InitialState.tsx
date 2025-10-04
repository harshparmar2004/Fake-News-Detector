
import React from 'react';

interface InitialStateProps {
  onExampleClick: (headline: string) => void;
}

const examples = [
  "BREAKING: Scientists Discover Talking Squirrels in Amazon Rainforest, Demand Tiny Microphones",
  "City Council Approves Funding for New Downtown Park Renovation Project",
  "Study Shows Video Games Now Officially More Popular Than All Other Forms of Entertainment Combined",
  "Local Library to Host Annual Summer Reading Challenge for All Ages",
];

const InitialState: React.FC<InitialStateProps> = ({ onExampleClick }) => {
  return (
    <div className="mt-8 text-center animate-fade-in p-4 border border-gray-800 rounded-lg bg-gray-900/30">
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Ready to Analyze?</h2>
        <p className="text-gray-400 mb-6">Enter a headline above or try one of these examples:</p>
        <div className="flex flex-col gap-3">
            {examples.map((example, index) => (
                <button
                    key={index}
                    onClick={() => onExampleClick(example)}
                    className="w-full text-left p-3 bg-gray-800/50 rounded-md hover:bg-blue-500/20 border border-transparent hover:border-blue-500/50 transition-all duration-200 text-gray-300 hover:text-white"
                >
                    {example}
                </button>
            ))}
        </div>
    </div>
  );
};

export default InitialState;
