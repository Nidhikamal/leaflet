import { Component, OnInit } from '@angular/core';
import * as data from '../policy.json';
declare let L;
import { addressPoints} from '../../assets/policy';


@Component({
  selector: 'app-map-heat',
  templateUrl: './map-heat.component.html',
  styleUrls: ['./map-heat.component.css']
})
export class MapHeatComponent implements OnInit {
private map;
addressPoints;
policy: any = data.policies;
  constructor() { }
  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});



tiles.addTo(this.map);
this.addressPoints = (this.policy[0].location_lat).concat(this.policy[0].location_lng);
  alert(this.addressPoints);
// alert(p.location_lat);
//  for(var i = 0, l = Object.keys(this.policy).length; i <= l-1; i++){
//  this.addressPoints = (this.policy[i].location_lat).concat(this.policy[i].location_lng);
//   alert(this.addressPoints);
// }
this.addressPoints = addressPoints.map(function (p) { return [p.location_lat, p.location_lng]; })
var heat = L.heatLayer(this.addressPoints).addTo(this.map);
// }
// var marker =L.marker([40.711529, -72.080891]).addTo(this.map);
// var heat = L.heatLayer(40.711529, -74.080891).addTo(this.map);
// var heat = L.heatLayer(40.711529, -72.080891).addTo(this.map);
// var heat = L.heatLayer(40.711529, -70.080891).addTo(this.map);
var cities = L.layerGroup().addTo(this.map);
    
var mbAttr = '';
// var markers = new L.MarkerClusterGroup();
// for(var i = 0, l = Object.keys(this.policy).length; i <= l-1; i++){
//   markers.addLayer(L.marker([ this.policy[i].location_lat,this.policy[i].location_lng]).bindPopup(this.policy[i].original_property_addr).addTo(cities))
//   }
//this.map.addLayer(markers);
  }
  ngOnInit(): void {
  }

}
