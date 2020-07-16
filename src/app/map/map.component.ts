import { Component, OnInit } from '@angular/core'; 
// import * as L from 'leaflet.markercluster';
import * as data from '../policy.json';
declare let L;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map;
  policy: any = data.policies;
  markerArray = [];
  poplocation : any;
 
  constructor() { }
  
  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 4
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});



tiles.addTo(this.map);



var cities = L.layerGroup().addTo(this.map);
    
var mbAttr = '';
var markers = new L.MarkerClusterGroup();
for(var i = 0, l = Object.keys(this.policy).length; i <= l-1; i++){
  markers.addLayer(L.marker([ this.policy[i].location_lat,this.policy[i].location_lng]).bindPopup(this.policy[i].original_property_addr))
  }

this.map.addLayer(markers);

var steman = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
}),
 cyclOSM = L.tileLayer('https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}), JusticeMap_plurality = L.tileLayer('http://www.justicemap.org/tile/{size}/plural/{z}/{x}/{y}.png', {
  attribution: '<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
  bounds: [[14, -180], [72, -56]]
});
var baseLayers = {
  "cyclOSM": cyclOSM,
  "Esri_WorldImagery":Esri_WorldImagery,
  "steman": steman,
  "Stadia_AlidadeSmoothDark":Stadia_AlidadeSmoothDark 
};

var overlays = {
  "Cities": cities
};
L.control.layers(baseLayers, overlays).addTo(this.map);

var editableLayers = new L.FeatureGroup();
this.map.addLayer(editableLayers);

// define custom marker
var MyCustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 24),
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Information_icon4_orange.svg'
  }
});


var drawPluginOptions = {
  position: 'topright',
  draw: {
    polyline: {
      shapeOptions: {
        color: '#f357a1',
        weight: 10
      }
    },
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#bada55'
      },
    
    },
    circle: false, // Turns off this drawing tool
    rectangle: {
      shapeOptions: {
        clickable: false
      }
    },
    marker: {
      icon: new MyCustomMarker()
    }
  },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: false
  }
};





// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawPluginOptions);
this.map.addControl(drawControl);


// var editableLayers = new L.FeatureGroup();
// this.map.addLayer(editableLayers);


 this.map.on('draw:created', function(e) {
  
  var type = e.layerType,
    layer = e.layer;
    console.log(layer);
    // console.log(layer._latlngs[0].length);
    // console.log(layer._latlngs[0][0]);
    // console.log(layer._latlngs[0][1]);
    // console.log(layer._latlngs[0][1].lat);

    var latlongs = [];

    var length=(layer._latlngs[0].length)
    console.log(length);
    
  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }
  if (type === 'polygon') {
    var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs());
    for (let i = 0; i < length-1 ; i=i+2) {
      latlongs.push(layer._latlngs[0][i]);
      alert(i);
    }
  }
  if (type === 'rectangle') {
    var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs());
    for (let i = 0; i < length ; i++) {
      latlongs.push(layer._latlngs[0][i]);
      alert(i);
    }
  }

  editableLayers.addLayer(layer);
});


}
 

  

  ngOnInit(): void {
    
  }

}
