import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllActivityZones } from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';
import { fabric } from 'fabric';
import { CANVAS_RATIO } from 'src/constants/common';
import { updateActivityZone } from 'src/state/activityZones/activityZone.actions';

@Component({
  selector: 'app-activity-zone-canvas',
  templateUrl: './activity-zone-canvas.component.html',
  styleUrls: ['./activity-zone-canvas.component.scss'],
})
export class ActivityZoneCanvasComponent implements OnInit {
  public allActivityZones$ = this.store.select(selectAllActivityZones);
  public canvas!: fabric.Canvas;

  ngOnInit() {
    const canvasWrapper = document.getElementById(
      'activity-zone-canvas-wrapper'
    );
    if (!canvasWrapper) {
      return;
    }

    this.canvas = new fabric.Canvas('activity-zone-canvas', {});

    this.canvas.on('object:modified', (event: fabric.IEvent<MouseEvent>) => {
      try {
        if (event.target) {
          const {
            name: id,
            left: x,
            top: y,
            width = 0,
            height = 0,
            scaleX = 0,
            scaleY = 0,
          } = event?.target;

          this.store.dispatch(
            updateActivityZone({
              id,
              x,
              y,
              width: width * scaleX,
              height: height * scaleY,
            })
          );
        }
      } catch (error) {
        console.log('Error when updating shape', error);
      }
    });

    const resizeCanvas = () => {
      this.canvas.setWidth(canvasWrapper.clientWidth);
      this.canvas.setHeight(canvasWrapper.clientWidth / CANVAS_RATIO);
      this.canvas.renderAll();
    };
    window.addEventListener('resize', resizeCanvas, false);

    resizeCanvas();
  }

  constructor(private store: Store<AppState>) {}
}
