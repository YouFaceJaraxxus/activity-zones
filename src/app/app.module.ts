import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityZoneCanvasComponent } from './ActivityZone/ActivityZoneCanvas/activity-zone-canvas.component';
import { ActivityZoneComponent } from './ActivityZone/activity-zone.component';
import { HomeComponent } from './Home/home.component';
import { StoreModule } from '@ngrx/store';
import { activityZoneReducer } from 'src/state/activityZones/activityZone.reducers';

@NgModule({
  declarations: [
    AppComponent,
    ActivityZoneComponent,
    HomeComponent,
    ActivityZoneCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({activityZones: activityZoneReducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
