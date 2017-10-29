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
