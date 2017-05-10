import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { 
  NavController, ModalController, 
  Platform, NavParams, ToastController,
  ViewController, AlertController, 
  Slides } from 'ionic-angular';

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
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public http: Http, private toastCtrl: ToastController, private storage: Storage) {

      storage.ready().then(() => {
        this.http.get('http://168.181.185.53/api/data/TodaysBenefit')
          .map(res => res.json())
          .subscribe(data => {
            let storedWonBenefitId;
            this.todaysBenefit = data;
            if (this.todaysBenefit) { 
              storage.get('wonBenefitId').then((val) => { 
                storedWonBenefitId = val; 

                if(this.todaysBenefit.BenefitId == storedWonBenefitId){
                  storage.get('wonBenefitPrizeCode').then((val) => { this.showAlert("Tu codigo de premio de hoy es: " + val); });
                }
                else {
                  this.getTrivia();
                }
              });
            };
        });       
     });    
  }

  getTrivia() {
    this.http.get('http://168.181.185.53/api/data/GetTriviaQuestions')
      .map(res => res.json())
      .subscribe(data => {
        this.trivia = data;
    });
  }

  checkAnswer(selectedOption, item, slide) {
    this.optionSelected = true;
    if(selectedOption == item.Answer) {
      this.correctSelected = selectedOption;
      if(slide == 9) { 
        this.storage.set('wonBenefitId', this.todaysBenefit.BenefitId);
        this.storage.set('wonBenefitPrizeCode', this.todaysBenefit.PrizeCode);
        this.presentWonToast();
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
    if(slide == 9) {
      this.showCodeAlert();
    }
    else {
      this.slides.slideNext(500, false);
      this.optionSelected = false;
      this.incorrectSelected = "";
      this.correctSelected = "";
    }
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

  presentWonToast() {
    let toast = this.toastCtrl.create({
      message: '¡GANASTE!',
      position: 'bottom',
      closeButtonText: 'OK',
      cssClass: 'wonToast',
      showCloseButton: true
    });
    toast.present();
  }
}
