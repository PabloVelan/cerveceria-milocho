import { Component } from '@angular/core';
import { environment } from '../../../app/environment';
import { NavController, ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'modal-points',
  templateUrl: 'points-modal-page.html'
})
export class PointsModalPage {
  items: Array<any>;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.items = new Array();
    let item1 = { message: '20% de descuento en papas 1870', points: 20 };
    let item2 = { message: 'Llevate gratis media pinta a eleccion con tu happy hour', points: 35 };
    let item3 = { message: '15% de descuento en happy hour', points: 20 };
    let item4 = { message: 'Solo Martes. 35% de descuento en tacos', points: 50 };
    let item5 = { message: '20% de descuento en happy hour', points: 30 };
    let item6 = { message: '10% de descuento en cervezas invitadas', points: 15 };
    let item7 = { message: '5% de descuento en pintas', points: 0 };
    let item8 = { message: '10% de descuento en cervezas de botella', points: 20 };

    this.items.push(item1);
    this.items.push(item2);
    this.items.push(item3);
    this.items.push(item4);
    this.items.push(item5);
    this.items.push(item6);
    this.items.push(item7);
    this.items.push(item8);
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
}
