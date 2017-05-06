import { Component, ViewChild, trigger, transition, style, animate, state } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController, AlertController, Slides } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
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

    let craftBeer1 = { 
      Name: 'Cream Ale', 
      Description: 'Cerveza rubia, ligera y cristalina. De gran tomabilidad, bajo amargor. Ideal para acompañar cualquier comida.',
      TechnicalData: { Alc: 5, Ibu: 20, Srm: 4, Og: 1050 },
      Brewer: { Name: 'Berlina' },
      Avialability: [ { Name: 'Avellaneda'}, { Name: 'Banfield'} ] 
    };
    let craftBeer2 = { 
      Name: 'IPA', 
      Description: 'Cerveza con mucho lupulo que va como trompada',
      TechnicalData: { Alc: 6, Ibu: 30, Srm: 7, Og: 1760 },
      Brewer: { Name: 'Recifes' },
      Avialability: [ { Name: 'Avellaneda'}] 
    };
    this.craftBeers.push(craftBeer1);
    this.craftBeers.push(craftBeer2);
    
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
