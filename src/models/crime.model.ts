export interface CrimeRangeTime {
  max: number;
  min: number;
}

export interface CrimePredictionFilters {
  time: any;
  rangeTime: CrimeRangeTime;
}
