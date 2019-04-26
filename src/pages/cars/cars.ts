import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";


@IonicPage({
  name : "cars"
})
@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {

   cars : Array<any> = [
    {
      brand : "Toyota",
      color : "Red",
      img : "toyota.png"
    },
     {
       brand : "Porsche",
       color : "Black",
     img : "porsche.jpg"
     },
     {
       brand : "Nissan",
       color : "White",
       img : "nissan.jpg"
     }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarsPage');
  }

  goMap(car)
  {
    this.navCtrl.push(HomePage  , {car : car})
  }
}
