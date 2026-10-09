export interface LiteraryWork {
  id: string;
  title: string;
  russianTitle: string;
  year: number;
  genre: 'Poetry Collection' | 'Essay & Prose' | 'Long Poem' | 'Play';
  description: string;
  quoteEn: string;
  quoteRu: string;
  excerptEn: string;
  excerptRu: string;
  significance: string;
  color: string;
}

export type AtmosphereMode = 'twilight' | 'amber' | 'stockholm' | 'venice';

export interface CameraPreset {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  target: [number, number, number];
}

export interface InteractiveTarget {
  type: 'work' | 'nobel' | 'character' | 'desk' | 'window';
  data?: LiteraryWork;
  title?: string;
}
