import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllActivityZones } from 'src/state/activityZones/activityZone.selectors';
import { AppState } from 'src/state/app.state';
import {fabric} from "fabric";
import { CANVAS_RATIO } from 'src/constants/common';

@Component({
  selector: 'app-activity-zone-canvas',
  templateUrl: './activity-zone-canvas.component.html',
  styleUrls: ['./activity-zone-canvas.component.scss'],
})
export class ActivityZoneCanvasComponent implements OnInit {
  public allActivityZones$ = this.store.select(selectAllActivityZones);
  public canvas!: fabric.Canvas;
  
  isObjectMoving: boolean = false;
  activeObject!: fabric.Object | undefined;

  onZoneMoving(event: fabric.IEvent<MouseEvent>){
    this.isObjectMoving = true;
    this.activeObject = event.target;
  }

  onZoneMouseUp(event: fabric.IEvent<MouseEvent>){
    if (this.isObjectMoving){
      this.isObjectMoving = false;
      console.log("CAPTCHA!", event);
      console.log("CAPTCHA!", this.activeObject?.get("name"));
    } 
  }

  ngOnInit(){
    const canvasWrapper = document.getElementById("activity-zone-canvas-wrapper");
    if(!canvasWrapper){
      return;
    }

    this.canvas = new fabric.Canvas("activity-zone-canvas", {});


    this.canvas.on('object:moving', this.onZoneMoving);
    this.canvas.on('mouse:up', this.onZoneMouseUp);

    const resizeCanvas = () => {
      this.canvas.setWidth(canvasWrapper.clientWidth);
      this.canvas.setHeight(canvasWrapper.clientWidth / CANVAS_RATIO);
      this.canvas.renderAll();
    }
    window.addEventListener("resize", resizeCanvas, false);

    resizeCanvas();
  }

  constructor(private store: Store<AppState>) {}
}
