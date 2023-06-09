import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/app.state';
import { fabric } from 'fabric';
import { CANVAS_RATIO, HEIGHT_BASE, WIDTH_BASE } from 'src/constants/screen';
import {
  removeActivityZone,
  updateActivityZone,
  updateActivityZonesScale,
} from 'src/state/activityZones/activityZone.actions';
import { ActivityZone } from 'src/types/ActivityZone';

@Component({
  selector: 'app-activity-zone-canvas',
  templateUrl: './activity-zone-canvas.component.html',
  styleUrls: ['./activity-zone-canvas.component.scss'],
})
export class ActivityZoneCanvasComponent implements OnInit {
  @Input() activityZones!: ActivityZone[];
  public canvas!: fabric.Canvas;

  ngOnInit() {
    const canvasWrapper = document.getElementById(
      'activity-zone-canvas-wrapper'
    );
    if (!canvasWrapper) {
      return;
    }

    this.canvas = new fabric.Canvas('activity-zone-canvas', {});

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
          this.store.dispatch(
            removeActivityZone({ id: transform.target.name || '' })
          );
          this.canvas.requestRenderAll();
          return true;
        },
        render: (ctx, left, top, styleOverride, fabricObject) => {
          const size = 20;
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

    this.canvas.on('object:modified', (event: fabric.IEvent<MouseEvent>) => {
      try {
        const canvasWidth = canvasWrapper.clientWidth;
        const canvasHeight = canvasWrapper.clientWidth;
        if (event.target) {
          const {
            name: id,
            left: x = 0,
            top: y = 0,
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
          } = event?.target;

          this.store.dispatch(
            updateActivityZone({
              id,
              x: x / (canvasWidth / WIDTH_BASE),
              y: y / (canvasHeight / HEIGHT_BASE),
              width: (width * scaleX) / (canvasWidth / WIDTH_BASE),
              height: (height * scaleY) / (canvasHeight / HEIGHT_BASE),
            })
          );
        }
      } catch (error) {
        console.log('Error when updating shape', error);
      }
    });

    const resizeCanvas = () => {
      const canvasWidth = canvasWrapper.clientWidth;
      const canvasHeight = canvasWrapper.clientWidth;
      this.canvas.setWidth(canvasWidth);
      this.canvas.setHeight(canvasHeight / CANVAS_RATIO);

      this.store.dispatch(
        updateActivityZonesScale({
          xScale: canvasWidth / WIDTH_BASE,
          yScale: canvasHeight / HEIGHT_BASE,
        })
      );

      this.canvas.renderAll();
    };
    window.addEventListener('resize', resizeCanvas, false);

    resizeCanvas();
  }

  constructor(private store: Store<AppState>) {}
}
