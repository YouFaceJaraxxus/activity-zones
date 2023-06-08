import { createAction, props } from "@ngrx/store";
import { ActivityZone } from "src/types/ActivityZone";

export const addActivityZone = createAction('[ACTIVITY_ZONE] Add Activity Zone', props<Omit<ActivityZone, "id">>());
export const updateActivityZone = createAction('[ACTIVITY_ZONE] Update Activity Zone', props<Partial<ActivityZone>>());
export const removeActivityZone = createAction('[ACTIVITY_ZONE] Remove Activity Zone', props<{id: string}>());