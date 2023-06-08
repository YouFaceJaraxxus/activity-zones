import {
  Component,
  Input,
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
export class ActivityZoneRectangleComponent implements OnInit {
  @Input() activityZone!: ActivityZone;
  @Input() parentCanvas!: fabric.Canvas;


  ngOnInit() {
    console.log("this.parentCanvas", this.parentCanvas);

    const {x, y, width, height, color} = this.activityZone;
    var rect = new fabric.Rect({
      left: x,
      top: y,
      fill: color,
      width,
      height,
    });
    console.log('canvas', this.parentCanvas);

    this.parentCanvas.add(rect);
  }
}
