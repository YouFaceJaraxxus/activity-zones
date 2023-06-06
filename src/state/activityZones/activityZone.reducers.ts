import { createReducer, on } from '@ngrx/store';
import {
  addActivityZone,
  removeActivityZone,
} from './activityZone.actions';
import { ActivityZone } from 'src/types/ActivityZone';

export interface ActivityZonesState {
  activityZones: ActivityZone[];
}

export const initialState: ActivityZonesState = {
    activityZones: [{
        color: "red",
        id: "1",
        height: 100,
        width: 200,
        x: 10,
        y: 10
    }],
};

export const activityZoneReducer = createReducer(
  // Supply the initial state
  initialState,
  on(addActivityZone, (state, activityZone) => ({
    ...state,
    activityZones: [...state.activityZones, { id: Date.now().toString(), ...activityZone }],
  })),
  on(removeActivityZone, (state, { id }) => ({
    ...state,
    activityZones: state.activityZones.filter((az) => az.id !== id),
  })),
);