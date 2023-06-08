import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivityZone } from 'src/types/ActivityZone';
import { fabric } from 'fabric';

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
    const {x, y, width, height, color, id} = this.activityZone;
    this.zone = new fabric.Rect({
      left: x,
      top: y,
      fill: color,
      width,
      height,
      name: id,
    });

    this.parentCanvas.add(this.zone);
  }

  ngOnDestroy(){
    this.parentCanvas.remove(this.zone);
  }
}
