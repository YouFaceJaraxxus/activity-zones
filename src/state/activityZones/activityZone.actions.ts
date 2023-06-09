import { createAction, props } from '@ngrx/store';
import { ActivityZone } from 'src/types/ActivityZone';
import { ActivityZonesState } from './activityZone.reducers';

export const addActivityZone = createAction(
  '[ACTIVITY_ZONE] Add Activity Zone',
  props<Omit<ActivityZone, 'id'>>()
);
export const updateActivityZone = createAction(
  '[ACTIVITY_ZONE] Update Activity Zone',
  props<Partial<ActivityZone>>()
);
export const removeActivityZone = createAction(
  '[ACTIVITY_ZONE] Remove Activity Zone',
  props<Pick<ActivityZone, 'id'>>()
);
export const loadActivityZones = createAction(
  '[ACTIVITY_ZONE] Load Activity Zones'
);
export const updateActivityZonesScale = createAction(
  '[ACTIVITY_ZONE] Update Activity Zones Scale',
  props<Pick<ActivityZonesState, 'xScale' | 'yScale'>>()
);
