import { Component } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'modal-news',
  templateUrl: 'news-modal-page.html'
})
export class NewsModalPage {
  items: Array<any>;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.items = new Array();
    let item1 = { date: '30/04/2017', message: 'Solo por hoy 20% de descuento en papas 1870 por 250pts', icon: '' };
    let item2 = { date: '23/04/2017', message: 'Proba la nueva cerveza invitada de la semana', icon:'' };
    let item3 = { date: '22/04/2017', message: 'Nueva canilla en 1870 Avellaneda: Anteras IPA.', icon: '' };
    let item4 = { date: '19/04/2017', message: 'Hoy apertura BANFIELD. Te esperamos en Pavon 8888 desde las 18hs', icon: 'warning' };
    let item5 = { date: '16/04/2017', message: 'Solo por hoy 20% de descuento en happy hour por 200pts', icon: '' };
    let item6 = { date: '15/04/2017', message: 'Proba la nueva cerveza invitada de la semana', icon:'' };
    let item7 = { date: '15/04/2017', message: 'Nueva canilla en 1870 Avellaneda: Barlana IPA.', icon: 'warning' };
    let item8 = { date: '13/04/2017', message: 'Hoy apertura BANFIELD. Te esperamos en Pavon 8888 desde las 18hs', icon: 'warning' };
    let item9 = { date: '11/04/2017', message: 'Solo por hoy en 1870 Banfield 25% de descuento en papas 1870 por 200pts', icon: '' };
    let item10 = { date: '05/04/2017', message: 'Proba la nueva cerveza invitada de la semana', icon:'warning' };
    let item11 = { date: '05/04/2017', message: 'Nueva canilla en 1870 Avellaneda: Anteras IPA.', icon: '' };
    let item12 = { date: '03/04/2017', message: 'Hoy apertura BANFIELD. Te esperamos en Pavon 8888 desde las 18hs', icon: 'warning' };
    let item13 = { date: '02/04/2017', message: 'Solo por hoy 20% de descuento en papas 1870 por 250pts. Te esperamos!', icon: 'warning' };
    let item14 = { date: '01/04/2017', message: 'Proba la nueva cerveza invitada de la semana', icon:'' };
    let item15 = { date: '01/04/2017', message: 'Nueva canilla en 1870 Avellaneda: Anteras IPA.', icon: '' };
    let item16 = { date: '01/04/2017', message: 'Hoy apertura BANFIELD. Te esperamos en Pavon 8888 desde las 18hs', icon: 'warning' };

    this.items.push(item1);
    this.items.push(item2);
    this.items.push(item3);
    this.items.push(item4);
    this.items.push(item5);
    this.items.push(item6);
    this.items.push(item7);
    this.items.push(item8);
    this.items.push(item9);
    this.items.push(item10);
    this.items.push(item11);
    this.items.push(item12);
    this.items.push(item13);
    this.items.push(item14);
    this.items.push(item15);
    this.items.push(item16);
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
