import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityZoneRectangleComponent } from './activity-zone-rectangle.component ';

describe('ActivityZoneRectangleComponent', () => {
  let component: ActivityZoneRectangleComponent;
  let fixture: ComponentFixture<ActivityZoneRectangleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityZoneRectangleComponent]
    });
    fixture = TestBed.createComponent(ActivityZoneRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});