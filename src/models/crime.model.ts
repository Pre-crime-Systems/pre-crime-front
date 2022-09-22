export interface CrimeTimeRange {
  max: number;
  min: number;
}

export interface CrimePredictionFilters {
  timeRange: CrimeTimeRange;
}

export interface CrimeSelectFilter {
  label: string;
  value: any;
}

export interface CrimeHistoricalFilters {
  typeCrime: CrimeSelectFilter;
  subtypeCrime: CrimeSelectFilter;
  modalityCrime: CrimeSelectFilter;
}
