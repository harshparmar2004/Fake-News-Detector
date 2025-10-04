
export interface AnalysisResult {
  classification: 'Real' | 'Fake';
  confidence: number;
  explanation: string;
}
