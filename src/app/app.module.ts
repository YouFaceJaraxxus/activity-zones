import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityZoneCanvasComponent } from './ActivityZone/ActivityZoneCanvas/activity-zone-canvas.component';
import { ActivityZoneComponent } from './ActivityZone/activity-zone.component';
import { HomeComponent } from './Home/home.component';
import { StoreModule } from '@ngrx/store';
import { activityZoneReducer } from 'src/state/activityZones/activityZone.reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityZoneFormComponent } from './ActivityZone/ActivityZoneForm/activity-zone-form.component';
import { ActivityZoneRectangleComponent } from './ActivityZone/ActivityZoneRectangle/activity-zone-rectangle.component ';
import { NavbarComponent } from './Navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ActivityZoneComponent,
    HomeComponent,
    ActivityZoneCanvasComponent,
    ActivityZoneFormComponent,
    ActivityZoneRectangleComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({activityZones: activityZoneReducer}, {}),
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
