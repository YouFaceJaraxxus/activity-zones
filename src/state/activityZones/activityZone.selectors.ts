import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivityZonesState } from './activityZone.reducers';

export const selectActivityZones = (state: AppState) => state.activityZones;
export const selectAllActivityZones = createSelector(
    selectActivityZones,
  (state: ActivityZonesState) => state.activityZones
);