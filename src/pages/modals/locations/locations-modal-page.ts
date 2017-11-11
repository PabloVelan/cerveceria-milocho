import { Component, ViewChild  } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController, Slides } from 'ionic-angular';

@Component({
  selector: 'modal-locations',
  templateUrl: 'locations-modal-page.html'
})
export class LocationsModalPage {
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  avellanedaPictures: any;
  banfieldPictures: any;
  beerStationPictures: any;
  selectedAvellanedaPic: number;
  selectedBanfieldPic: number;
  selectedBeerStationPic: number;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.selectedSegment = 'avellaneda';
    this.slides = [
      {
        id: "avellaneda",
        title: "Avellaneda"
      },
      {
        id: "banfield",
        title: "Banfield"
      },
      {
        id: "beerStation",
        title: "Beer Station"
      }
    ];

    this.selectedAvellanedaPic = 0;
    this.selectedBanfieldPic = 0;
    this.selectedBeerStationPic = 0;

    this.avellanedaPictures = ['url(\'assets/img/localavellaneda.jpg\')', 'url(\'assets/img/avellaneda1.jpg\')', 'url(\'assets/img/avellaneda2.jpg\')', 'url(\'assets/img/avellaneda3.jpg\')'];
    this.banfieldPictures = ['url(\'assets/img/localbanfield.jpg\')', 'url(\'assets/img/banfield1.jpg\')', 'url(\'assets/img/banfield2.jpg\')', 'url(\'assets/img/banfield3.jpg\')'];
    this.beerStationPictures = ['url(\'assets/img/localavellaneda.jpg\')', 'url(\'assets/img/avellaneda1.jpg\')', 'url(\'assets/img/avellaneda2.jpg\')', 'url(\'assets/img/avellaneda3.jpg\')'];
  }

  avellanedaBackground(){
    return 'url(\'assets/img/localavellaneda.jpg\')';
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
