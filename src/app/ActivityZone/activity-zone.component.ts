import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadActivityZones } from 'src/state/activityZones/activityZone.actions';
import { selectAllActivityZones } from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';
import { ActivityZone } from 'src/types/ActivityZone';

@Component({
  selector: 'app-activity-zone',
  templateUrl: './activity-zone.component.html',
  styleUrls: ['./activity-zone.component.scss'],
})
export class ActivityZoneComponent implements OnInit {
  public allActivityZones$ = this.store.select(selectAllActivityZones);
  activityZones!: ActivityZone[];

  listActivityZones() {
    console.log('zones', this.activityZones);
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadActivityZones());
    this.allActivityZones$.subscribe((zones) => {
      this.activityZones = zones;
    });
  }
}
