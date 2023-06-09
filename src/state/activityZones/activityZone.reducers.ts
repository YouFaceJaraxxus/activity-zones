import { createReducer, on } from '@ngrx/store';
import {
  addActivityZone,
  loadActivityZones,
  removeActivityZone,
  updateActivityZone,
  updateActivityZonesScale,
} from './activityZone.actions';
import { ActivityZone } from 'src/types/ActivityZone';
import { ACTIVITY_ZONES_LOCAL_STORAGE_KEY } from 'src/constants/activityZone';

export interface ActivityZonesState {
  activityZones: ActivityZone[];
  xScale: number;
  yScale: number;
}

export const initialState: ActivityZonesState = {
  activityZones: [],
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
  on(updateActivityZone, (state, activityZone) => {
    const newState = {
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
    };

    try {
      const activityZonesJSON = JSON.stringify(newState);
      localStorage.setItem(ACTIVITY_ZONES_LOCAL_STORAGE_KEY, activityZonesJSON);
    } catch (error) {
      console.log('error when serializing and saving activity zones', error);
    }

    return newState;
  }),
  on(loadActivityZones, (state) => {
    const activityZonesJSON = localStorage.getItem(
      ACTIVITY_ZONES_LOCAL_STORAGE_KEY
    );
    if (!activityZonesJSON) {
      return state;
    }
    try {
      const parsedState = JSON.parse(activityZonesJSON) as ActivityZonesState;
      return parsedState;
    } catch (error) {
      console.log('error when loading local storage data', error);
      return state;
    }
  }),
  on(removeActivityZone, (state, { id }) => ({
    ...state,
    activityZones: state.activityZones.filter((az) => az.id !== id),
  })),
  on(updateActivityZonesScale, (state, { xScale, yScale }) => ({
    ...state,
    xScale,
    yScale,
  }))
);
// localStorage.setItem(ZONES_LOCAL_STORAGE_KEY, JSON.stringify(zones))
