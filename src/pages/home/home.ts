import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';

declare  let google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("map") mapElement;
  @ViewChild("panel") panelElement;


     latAndLng1 = new google.maps.LatLng(-34.397 , 150.644);
    latAndLng2 = new google.maps.LatLng(-30.397 , 140.644);
    latAndLng3 = new google.maps.LatLng(-32.500 , 142.700);
    latAndLng4 = new google.maps.LatLng(-34.600 , 144.800);

    language : string = "ar";
    region : string = "EG";
    isArabic : boolean = true;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter()
  {
    this.initMap();
  }

  initMap()
  {
     let map = new google.maps.Map(this.mapElement.nativeElement , {
       center : this.latAndLng1,
       zoom : 6,
       mapTypeId : 'roadmap'
     });

     let marker1 = new google.maps.Marker({
       map : map,
       position : this.latAndLng1,
       animation : google.maps.Animation.DROP,
         draggable : true,
         zIndex:99999999
     });

      let shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
      };

    let marker2 = new google.maps.Marker({
      map : map,
      position : this.latAndLng2,
      animation : google.maps.Animation.DROP,
        shape: shape,
        title : "Flag marker",
        draggable : true,
        zIndex:99999999
    });

      let marker3 = new google.maps.Marker({
          map : map,
          position : this.latAndLng3,
          animation : google.maps.Animation.DROP,
          shape: shape,
          title : "Flag marker",
          draggable : true
      });

      let marker4 = new google.maps.Marker({
          map : map,
          position : this.latAndLng4,
          animation : google.maps.Animation.DROP,
          shape: shape,
          title : "Flag marker",
          draggable : true
      });
    // Implementing info window

      let infowindow = new google.maps.InfoWindow({
          content : "Lorem ipsum dolor sit emit"
      });

      marker1.addListener('click' , function () {
          infowindow.open(map, marker1);
      });

      marker2.addListener('click' , function () {
          infowindow.open(map, marker2);
      });

      marker1.addListener('position_changed', ()=>
      {
         this.latAndLng1 = marker1.getPosition();
          this.calcDestination(map);
      });

      marker2.addListener('position_changed', ()=>
      {
          this.latAndLng2 = marker2.getPosition();
          this.calcDestination(map);
      });
      //implementing the directions and distance
       this.calcDestination(map);

  }

  calcDestination(map)
  {
      let directionService = new google.maps.DirectionsService();
      let directionDisplay = new google.maps.DirectionsRenderer();

      directionDisplay.setMap(map);
      directionDisplay.setPanel(this.panelElement.nativeElement);

      let request = {
          origin : this.latAndLng1,
          destination : this.latAndLng2,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
      };

      directionService.route(request , function (response , status)
      {
          if (status == "OK")
          {
              directionDisplay.setDirections(response)
          }
      });

      let service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
          origins: [this.latAndLng1],
          destinations: [this.latAndLng2],
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false
      }, function (response, status) {
          if (status == "OK")
          {
              let distance = response.rows[0].elements[0].distance.text;
              let duration = response.rows[0].elements[0].duration.text;

              console.log("Distance :" + distance);
              console.log("Duration :" + duration);
          }
          else
          {
              console.log("Unable to find the distance via road.");
          }
      });
  }

  // changeLanguage()
  // {
  //    // if(this.isArabic)
  //    // {
  //    //   this.language = "en";
  //    //   this.region = "US";
  //    //   this.isArabic = false;
  //    // }
  //    // else
  //    // {
  //    //   this.language = "ar";
  //    //   this.region = "EG";
  //    //   this.isArabic = true;
  //    // }
  // }
}
