export interface CrimeTimeRange {
  max: number;
  min: number;
}

export interface CrimePredictionFilters {
  timeRange: CrimeTimeRange;
}

export interface CrimeHistoricalFilters {
  typeCrimeId: number;
  subtypeCrimeId: number;
  modalityCrimeId: number;
}
