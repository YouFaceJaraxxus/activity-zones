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

    // create a rectangle with angle=45
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45,
    });
    console.log('canvas', this.parentCanvas);

    this.parentCanvas.add(rect);
  }
}
