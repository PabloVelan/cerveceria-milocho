import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, RequestOptions, Headers } from '@angular/http';
import {
  NavController, ModalController,
  Platform, NavParams, ToastController,
  ViewController, AlertController,
  Slides
} from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { environment } from '../../../app/environment';

@Component({
  selector: 'modal-triviaBenefits',
  templateUrl: 'triviaBenefits-modal-page.html'
})

export class TriviaBenefitsModalPage {
  todaysBenefit: any;
  trivia: Array<any>;
  incorrectSelected = '';
  correctSelected = '';
  optionSelected: boolean;
  prize: any;
  countDownText: any;
  counterInterval: any;
  @ViewChild(Slides) slides: Slides;
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
              public http: Http, private toastCtrl: ToastController, private storage: Storage, private fb: Facebook) {
    storage.ready().then(() => {
      this.http.get(environment.apiUrl + 'data/TodaysBenefit')
        .map(res => res.json())
        .subscribe(data => {
          let storedWonBenefitId;
          this.todaysBenefit = data;
          
          if (this.todaysBenefit) {
            storage.get('wonBenefitId').then((val) => {
              storedWonBenefitId = val;

              if (this.todaysBenefit.BenefitId == storedWonBenefitId) {
                storage.get('wonBenefitPrizeDescription').then((val) => { this.showAlert("Hoy te ganaste: " + val); });
              }
              else {
                this.getTrivia();
              }
            });
          }
        });
      });
  }

  initCounter(){
    clearInterval(this.counterInterval);
    let vm = this;
    let countdown = 9;

    this.countDownText = (countdown + 1).toString();

    this.counterInterval = setInterval(function() {
      countdown = --countdown;
      vm.countDownText = (countdown + 1).toString();
      
      if(vm.countDownText == '0')  {
        clearInterval(this.counterInterval);
        vm.optionSelected = true;
        vm.incorrectSelected = '0';
      }      
    }, 1000);
  }

  getTrivia() {
    this.http.get(environment.apiUrl + 'data/GetTriviaQuestions')
      .map(res => res.json())
      .subscribe(data => {
        this.trivia = data;
        this.initCounter();
      });
  }

  checkAnswer(selectedOption, item, slide) {
    this.optionSelected = true;
    if (selectedOption == item.Answer) {
      this.correctSelected = selectedOption;
      if (slide == 9) {
        this.storage.set('wonBenefitId', this.todaysBenefit.BenefitId);
        this.markRafflePrizeWon();        
      }
    }
    else {
      this.incorrectSelected = selectedOption;
    }
  }

  restart() {
    this.getTrivia();
    this.optionSelected = false;
    this.incorrectSelected = "";
    this.correctSelected = "";
    this.slides.slideTo(0, 500);
  }

  next(slide) {
    this.slides.slideNext(500, false);
    this.optionSelected = false;
    this.incorrectSelected = "";
    this.correctSelected = "";

    this.initCounter();
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

  showCodeAlert() {
    let alert = this.alertCtrl.create({
      title: 'Felicitaciones!',
      subTitle: 'El código es: ' + this.todaysBenefit.PrizeCode,
      buttons: ['OK']
    });
    alert.present();
  }

  presentWonToast(prize) {
    let toast = this.toastCtrl.create({
      message: '¡GANASTE! Pasa por milocho y canjea tu premio: ' + prize,
      position: 'bottom',
      closeButtonText: 'OK',
      cssClass: 'wonToast',
      showCloseButton: true
    });
    toast.present();
  }

  markRafflePrizeWon() {
    var headers = new Headers();
    let body = new String();
    headers.append("Accept", 'application/json; charset=utf-8');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });

    this.storage.get('clientEmail').then((val) => { 
      body = 'email=' + val;

      this.http.post(environment.apiUrl + 'data/MarkRafflePrizeWon', body, options)
        .subscribe(data => {
          this.storage.set('wonBenefitPrizeDescription', data.json());
          this.prize = data.json();
          this.presentWonToast(this.prize);
        });
    });    
  }
}
