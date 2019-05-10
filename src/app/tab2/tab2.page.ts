import { Component, OnInit, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,  AfterViewInit {
  map: mapboxgl.Map;
  style: 'mapbox://style/mapbox/outdoors-v9';
  lat = -34.886983;
  lng = -56.144963;

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.buildmap();
  }

  buildmap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZjRjdW5kMDIiLCJhIjoiY2p2aGNmemMyMDBxbzRhbzNxb3pydWV0eCJ9.wV6Ce8jWiMkdtUF-jKM8Kg';
    const map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-56.16324 , -34.91035],
    zoom: 10
    });

    // map.addControl(new mapboxgl.NavigationControl());

    console.log('log this map: ' + this.map);
  }

}
