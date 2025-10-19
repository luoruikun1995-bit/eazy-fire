export type LifeStyle = 'single' | 'dink' | 'two_children';

export interface IncomePercentile {
  p10: number;
  p20: number;
  p30: number;
  p40: number;
  p50: number;
  p60: number;
  p70: number;
  p80: number;
  p90: number;
  p99: number;
}

export interface WealthStatus {
  level: { CN: string; EN: string };
  description: { CN: string; EN: string };
}

export interface CityDescription {
  author: string;
  date: string;
  content: { CN: string; EN: string };
}

export interface CityData {
  name: { CN: string; EN: string };
  incomePercentiles: Record<LifeStyle, IncomePercentile>;
  wealthMapping: Record<LifeStyle, Record<string, WealthStatus>>;
  descriptions: CityDescription[];
}