import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllActivityZones } from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';
import {fabric} from "fabric";

@Component({
  selector: 'app-activity-zone-canvas',
  templateUrl: './activity-zone-canvas.component.html',
  styleUrls: ['./activity-zone-canvas.component.scss'],
})
export class ActivityZoneCanvasComponent implements OnInit {
  public allActivityZones$ = this.store.select(selectAllActivityZones);
  public canvas!: fabric.Canvas;

  ngOnInit(){
    this.canvas = new fabric.Canvas("activity-zone-parent-canvas", {});
  }

  constructor(private store: Store<AppState>) {}
}
