import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addActivityZone } from 'src/state/activityZones/activityZone.actions';
import { AppState } from 'src/state/app.state';

@Component({
  selector: 'app-activity-zone-form',
  templateUrl: './activity-zone-form.component.html',
  styleUrls: ['./activity-zone-form.component.scss'],
})
export class ActivityZoneFormComponent {
  constructor(private store: Store<AppState>) {}

  addActivityZoneForm = new FormGroup({
    x: new FormControl<number>(0, { nonNullable: true }),
    y: new FormControl<number>(0, { nonNullable: true }),
    color: new FormControl<string>("", { nonNullable: true }),
    width: new FormControl<number>(0, { nonNullable: true }),
    height: new FormControl<number>(0, { nonNullable: true }),
  });

  addNewZone() {
    this.store.dispatch(
      addActivityZone(this.addActivityZoneForm.getRawValue())
    );
    this.addActivityZoneForm.reset();
  }
}
