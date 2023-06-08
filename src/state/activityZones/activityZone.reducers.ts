import { createReducer, on } from '@ngrx/store';
import {
  addActivityZone,
  removeActivityZone,
  updateActivityZone,
  updateActivityZonesScale,
} from './activityZone.actions';
import { ActivityZone } from 'src/types/ActivityZone';

export interface ActivityZonesState {
  activityZones: ActivityZone[];
  xScale: number;
  yScale: number;
}

export const initialState: ActivityZonesState = {
  activityZones: [
    {
      color: 'red',
      id: String(Date.now()),
      height: 100,
      width: 200,
      x: 10,
      y: 10,
    },
  ],
  xScale: 1,
  yScale: 1,
};

export const activityZoneReducer = createReducer(
  // Supply the initial state
  initialState,
  on(addActivityZone, (state, activityZone) => ({
    ...state,
    activityZones: [
      ...state.activityZones,
      { id: Date.now().toString(), ...activityZone },
    ],
  })),
  on(updateActivityZone, (state, activityZone) => ({
    ...state,
    activityZones: state.activityZones.map((az) => {
      if (az.id === activityZone.id) {
        return {
          ...az,
          ...activityZone,
        };
      }
      return az;
    }),
  })),
  on(updateActivityZonesScale, (state, { xScale, yScale }) => ({
    ...state,
    xScale,
    yScale,
  })),
  on(removeActivityZone, (state, { id }) => ({
    ...state,
    activityZones: state.activityZones.filter((az) => az.id !== id),
  }))
);
