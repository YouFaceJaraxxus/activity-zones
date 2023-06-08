import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivityZone } from 'src/types/ActivityZone';
import { fabric } from 'fabric';
import { AppState } from 'src/state/app.state';
import { Store } from '@ngrx/store';
import { removeActivityZone } from 'src/state/activityZones/activityZone.actions';

@Component({
  selector: 'app-activity-zone-rectangle',
  templateUrl: './activity-zone-rectangle.component.html',
  styleUrls: ['./activity-zone-rectangle.component.scss'],
})
export class ActivityZoneRectangleComponent implements OnInit, OnDestroy {
  @Input() activityZone!: ActivityZone;
  @Input() parentCanvas!: fabric.Canvas;
  zone!: fabric.Rect;

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

    const img = document.createElement('img');
    img.src = '../../../assets/delete.png';

    (fabric.Object.prototype.controls as any).deleteControl =
      new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: (_, transform) => {
          this.store.dispatch(removeActivityZone({ id: transform.target.name || "" }));
          this.parentCanvas.requestRenderAll();
          return true;
        },
        render: (ctx, left, top, styleOverride, fabricObject) => {
          const size = (this.zone.cornerSize || 10) * 2;
          ctx.save();
          ctx.translate(left, top);
          ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();
          styleOverride = {
            borderRadius: '50%',
          };
        },
      });

    this.parentCanvas.add(this.zone);
    this.parentCanvas.setActiveObject(this.zone);
  }

  ngOnDestroy() {
    this.parentCanvas.remove(this.zone);
  }

  constructor(private store: Store<AppState>) {}
}
