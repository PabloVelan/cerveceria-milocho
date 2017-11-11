import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ModalController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';
import { environment } from '../../../app/environment';

@Component({
  selector: 'modal-news',
  templateUrl: 'news-modal-page.html'
})
export class NewsModalPage {
  items: Array<any>;
  shownNotification = null;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public http: Http) {
    this.items = new Array();

    this.http.get(environment.apiUrl + 'data/GetLastNotifications')
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  toggleNotification(id) {
    if(this.shownNotification === id){
      this.shownNotification = null;
    } else {
      this.shownNotification = id;
    }
  }

  isNotificationShown(id){
    return this.shownNotification === id;
  }
}
