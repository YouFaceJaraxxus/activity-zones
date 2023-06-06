import { addActivityZone } from './../../state/activityZones/activityZone.actions';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeActivityZone } from 'src/state/activityZones/activityZone.actions';
import { selectAllActivityZones } from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';
import { ActivityZone } from 'src/types/ActivityZone';

@Component({
  selector: 'app-activity-zone',
  templateUrl: './activity-zone.component.html',
  styleUrls: ['./activity-zone.component.scss'],
})
export class ActivityZoneComponent {
  public allActivityZones$ = this.store.select(selectAllActivityZones);

  removeActivityZone(activityZone: ActivityZone) {
    this.store.dispatch(removeActivityZone({ id: activityZone.id }));
  }

  constructor(private store: Store<AppState>) {}
}
