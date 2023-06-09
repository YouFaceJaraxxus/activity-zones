import { AppState } from './../../state/app.state';
import { ActivityZone } from './../../types/ActivityZone/index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityZoneComponent } from './activity-zone.component';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_X,
  DEFAULT_Y,
} from 'src/constants/activityZone';
import { Store, StoreModule, createReducer, on } from '@ngrx/store';
import { loadActivityZones } from 'src/state/activityZones/activityZone.actions';
import { ActivityZonesState } from 'src/state/activityZones/activityZone.reducers';
import { ActivityZoneCanvasComponent } from './ActivityZoneCanvas/activity-zone-canvas.component';
import { ActivityZoneFormComponent } from './ActivityZoneForm/activity-zone-form.component';
import { ActivityZoneRectangleComponent } from './ActivityZoneRectangle/activity-zone-rectangle.component ';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const initialState: ActivityZonesState = {
  activityZones: [],
  xScale: 1,
  yScale: 1,
};

const mockZone: ActivityZone = {
  id: String(Date.now()),
  color: DEFAULT_COLOR,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
  x: DEFAULT_X,
  y: DEFAULT_Y,
};

export const mockActivityZoneReducer = createReducer(
  initialState,
  on(loadActivityZones, () => {
    return {
      ...initialState,
      activityZones: [mockZone],
    };
  })
);

describe('ActivityZoneComponent', () => {
  let component: ActivityZoneComponent;
  let fixture: ComponentFixture<ActivityZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityZoneComponent, ActivityZoneCanvasComponent, ActivityZoneFormComponent, ActivityZoneRectangleComponent],
      imports: [StoreModule.forRoot({activityZones: mockActivityZoneReducer}, {}), FormsModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(ActivityZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('load activity zones', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have loaded the proper zones', () => {
      component.ngOnInit();

      component.allActivityZones$.subscribe((zones) => {
        expect(zones.length).toBe(1);
        expect(zones[0]).toBe(mockZone);
      });
    });
  });
});
