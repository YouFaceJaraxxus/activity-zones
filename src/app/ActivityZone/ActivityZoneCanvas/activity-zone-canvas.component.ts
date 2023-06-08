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

    const resizeCanvas = () => {
      this.canvas.setWidth(window.innerWidth);
      this.canvas.setHeight(window.innerWidth * (9/16));
      this.canvas.renderAll();
    }
    window.addEventListener("resize", resizeCanvas, false);

    resizeCanvas();
  }

  constructor(private store: Store<AppState>) {}
}
