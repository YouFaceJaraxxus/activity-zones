import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityZoneFormComponent } from './activity-zone-form.component';

describe('ActivityZoneFormComponent', () => {
  let component: ActivityZoneFormComponent;
  let fixture: ComponentFixture<ActivityZoneFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityZoneFormComponent]
    });
    fixture = TestBed.createComponent(ActivityZoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
