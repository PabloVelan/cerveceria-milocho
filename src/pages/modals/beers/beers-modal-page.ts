import { Component, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ModalController, Platform, NavParams, ViewController, AlertController, Slides } from 'ionic-angular';
import { environment } from '../../../app/environment';

@Component({
  selector: 'modal-beers',
  templateUrl: 'beers-modal-page.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})

export class BeersModalPage {
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  bottleBeers: Array<any>;
  craftBeers: Array<any>;
  shownGroup = null;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public http: Http) {

    class BottleBeer{ Name: string; Beers: Array<any>; }
    
    this.bottleBeers = new Array();
    this.craftBeers = new Array();

    this.selectedSegment = 'tiradas';
    this.slides = [
      {
        id: "tiradas",
        title: "Tiradas"
      },
      {
        id: "botellas",
        title: "Botellas"
      }
    ];

    this.http.get(environment.apiUrl + 'data/GetAllCraftBeers')
      .map(res => res.json())
      .subscribe(data => {
        this.craftBeers = data;
    });

    this.http.get(environment.apiUrl + 'data/GetAllBottleBeers')
      .map(res => res.json())
      .subscribe(data => {
        for(let i = 0; i < data.length; i++) {
          let country;
          country = data[i].Country.Name;

          if(!this.bottleBeers[country]) this.bottleBeers[country] = [];

          this.bottleBeers[country].push(data[i]);
        }
        
        let bottleBeersAux = this.bottleBeers;

        this.bottleBeers = Object.keys(bottleBeersAux).map(function (key) { 
          let c = new BottleBeer(); 
          c.Name = key; 
          c.Beers = bottleBeersAux[key]; 
          return c; 
        });
    });
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Notificación',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });

    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    let index = slider.getActiveIndex();
    if (index >= this.slides.length) {
      index = this.slides.length - 1;
    }
    const currentSlide = this.slides[index];
    this.selectedSegment = currentSlide.id;

    this.shownGroup = null;
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };
}
