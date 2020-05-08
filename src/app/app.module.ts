import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DrawMapComponent } from './draw-map/draw-map.component';
import { MapHeatComponent } from './map-heat/map-heat.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DrawMapComponent,
    MapHeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
