import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllActivityZones } from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';

@Component({
  selector: 'app-activity-zone',
  templateUrl: './activity-zone.component.html',
  styleUrls: ['./activity-zone.component.scss'],
})
export class ActivityZoneComponent {
  public allActivityZones$ = this.store.select(selectAllActivityZones);

  constructor(private store: Store<AppState>) {}
}
