import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityZoneCanvasComponent } from './activity-zone-canvas.component';

describe('ActivityZoneCanvasComponent', () => {
  let component: ActivityZoneCanvasComponent;
  let fixture: ComponentFixture<ActivityZoneCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityZoneCanvasComponent]
    });
    fixture = TestBed.createComponent(ActivityZoneCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
