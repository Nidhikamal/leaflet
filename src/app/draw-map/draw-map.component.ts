import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import * as L from 'leaflet-draw';
import { addressPoints} from '../../assets/realworl-1000';
declare let L;

@Component({
  selector: 'app-draw-map',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.css']
})
export class DrawMapComponent implements OnInit {
private map;
addressPoints;
  constructor() { }
  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    var osmAttribution =
    'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var leafletRadarAttribution =
    '<a href="https://github.com/rwev/leaflet-radar">Radar</a>';

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: [
    osmAttribution,
    leafletRadarAttribution
].join(" | ")
});
tiles.addTo(this.map);
L.control.radar({}).addTo(this.map);

this.addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

var heat = L.heatLayer(this.addressPoints).addTo(this.map);

var marker = L.marker([40.711529, -74.080891]).addTo(this.map);
var featureGroup = L.featureGroup().addTo(this.map);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: featureGroup
            }
        }).addTo(this.map);

        this.map.on('draw:created', function(e) {

            // Each time a feaute is created, it's added to the over arching feature group
            featureGroup.addLayer(e.layer);
        });
 // on click, clear all layers
 document.getElementById('delete').onclick = function(e) {
    featureGroup.clearLayers();
}

document.getElementById('export').onclick = function(e) {
    // Extract GeoJson from featureGroup
    var data = featureGroup.toGeoJSON();
}


  }

  ngOnInit(): void {
    
  }

}
