import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_X,
  DEFAULT_Y,
} from 'src/constants/activityZone';
import { addActivityZone } from 'src/state/activityZones/activityZone.actions';
import {
  selectAllActivityZones,
} from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';

@Component({
  selector: 'app-activity-zone-form',
  templateUrl: './activity-zone-form.component.html',
  styleUrls: ['./activity-zone-form.component.scss'],
})
export class ActivityZoneFormComponent {
  constructor(private store: Store<AppState>) {}
  public allActivityZones$ = this.store.select(selectAllActivityZones);

  addActivityZoneForm = new FormGroup({
    color: new FormControl<string>(DEFAULT_COLOR, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  addNewZone() {
    this.store.dispatch(
      addActivityZone({
        ...this.addActivityZoneForm.getRawValue(),
        height: DEFAULT_HEIGHT,
        width: DEFAULT_WIDTH,
        x: DEFAULT_X,
        y: DEFAULT_Y,
      })
    );
  }
}
