import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from '../app/map/map.component'
import { DrawMapComponent } from '../app/draw-map/draw-map.component'
import { MapHeatComponent } from './map-heat/map-heat.component';

const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  {path: 'map-draw', component: DrawMapComponent },
  {path: 'map-heat', component: MapHeatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
