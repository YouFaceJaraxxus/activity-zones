import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_X,
  DEFAULT_Y,
} from 'src/constants/activityZone';
import { StoreModule, createReducer, on } from '@ngrx/store';
import {
  ActivityZonesState,
  activityZoneReducer,
} from 'src/state/activityZones/activityZone.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityZone } from 'src/types/ActivityZone';
import { ActivityZoneFormComponent } from './activity-zone-form.component';
import { addActivityZone } from 'src/state/activityZones/activityZone.actions';

const mockZone: ActivityZone = {
  id: String(Date.now()),
  color: DEFAULT_COLOR,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
  x: DEFAULT_X,
  y: DEFAULT_Y,
};

const initialState: ActivityZonesState = {
  activityZones: [],
  xScale: 1,
  yScale: 1,
};

export const mockActivityZoneReducer = createReducer(
  // Supply the initial state
  initialState,
  on(addActivityZone, (state, _) => {
    const newState = {
      ...state,
      activityZones: [...state.activityZones, mockZone],
    };
    return newState;
  })
);

describe('ActivityZoneFormComponent', () => {
  let component: ActivityZoneFormComponent;
  let fixture: ComponentFixture<ActivityZoneFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityZoneFormComponent],
      imports: [
        StoreModule.forRoot({ activityZones: mockActivityZoneReducer }, {}),
        FormsModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(ActivityZoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add zone on add zone click', () => {
    const addButton =
      fixture.debugElement.nativeElement.querySelector('button');
    addButton.click();
    addButton.click();

    component.allActivityZones$.subscribe((zones) => {
      expect(zones.length).toBe(2);
      expect(zones[0]).toBe(mockZone);
      expect(zones[1]).toBe(mockZone);
    });
  });
});
