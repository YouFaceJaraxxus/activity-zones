import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivityZone } from 'src/types/ActivityZone';
import { fabric } from 'fabric';
import { AppState } from 'src/state/app.state';
import { Store } from '@ngrx/store';
import { selectAllActivityZonesScales } from 'src/state/activityZones/activityZone.selectors';

@Component({
  selector: 'app-activity-zone-rectangle',
  templateUrl: './activity-zone-rectangle.component.html',
  styleUrls: ['./activity-zone-rectangle.component.scss'],
})
export class ActivityZoneRectangleComponent implements OnInit, OnDestroy {
  @Input() activityZone!: ActivityZone;
  @Input() parentCanvas!: fabric.Canvas;
  zone!: fabric.Rect;
  public scales$ = this.store.select(selectAllActivityZonesScales);

  ngOnInit() {
    const { x, y, width, height, color, id } = this.activityZone;
    this.zone = new fabric.Rect({
      left: x,
      top: y,
      fill: color,
      width,
      height,
      name: id,
      lockRotation: true,
      opacity: 0.5,
      hasControls: true,
    });

    this.parentCanvas.add(this.zone);
    this.parentCanvas.setActiveObject(this.zone);

    this.scales$.subscribe(({ xScale, yScale }) => {

      this.zone.set('left', x * xScale);
      this.zone.set('top', y * yScale);
      this.zone.set('width', width * xScale);
      this.zone.set('height', height * yScale);

      this.zone.setCoords();
    });
  }

  ngOnDestroy() {
    this.parentCanvas.remove(this.zone);
  }

  constructor(private store: Store<AppState>) {}
}
