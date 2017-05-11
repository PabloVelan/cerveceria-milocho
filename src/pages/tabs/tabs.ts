import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
// import { Device } from '@ionic-native/device';
// import { Sim } from '@ionic-native/sim';
// import { DeviceAccounts } from '@ionic-native/device-accounts';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ModalController } from 'ionic-angular';
import { NewsModalPage } from '../modals/news/news-modal-page';
import { PointsModalPage } from '../modals/points/points-modal-page';
import { LocationsModalPage } from '../modals/locations/locations-modal-page';
import { BeersModalPage } from '../modals/beers/beers-modal-page';
import { TriviaBenefitsModalPage } from '../modals/triviaBenefits/triviaBenefits-modal-page';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html', 
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;

  points: number;
  deviceId: string;
  deviceEmail: string;
  faceUser: string;
  faceEmail: string;
  facebookLogged: boolean;

  constructor(public http: Http, public modalCtrl: ModalController, private platform: Platform, 
              private fb: Facebook) {

    platform.ready().then(() => {
      // this.deviceId = this.device.uuid;

      // this.deviceAccounts.getEmail()
      //   .then(email => this.deviceEmail = email)
      //   .catch(error => console.error(error));
      this.fb.getLoginStatus()
        .then((res: FacebookLoginResponse) => {
          if(res.status != "connected") {
            this.facebookLogged = false;
          } else{
            this.facebookLogged = true;
            this.fb.api('/me', [])
                  .then((res: any) => this.faceUser = res.name)
                  .catch(e => console.log('Error logging into Facebook', e));
          }
        })
        .catch(e => console.log('Error logging into Facebook', e));      
    });
  }

  facebookLogin(){
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('/me', [])
          .then((res: any) => {
            this.faceUser = res.name;
            this.facebookLogged = res.name.length > 0;

            // mandan al server la info del user
            this.fb.api('/me?fields=email', [])
              .then((res: any) => {
                this.faceEmail = res.email;
                
                var headers = new Headers();
                headers.append("Accept", 'application/json; charset=utf-8');
                headers.append('Content-Type', 'application/x-www-form-urlencoded' );
                let options = new RequestOptions({ headers: headers });

                let body = 'name=' + this.faceUser + '&email=' +  this.faceEmail;

                this.http.post('http://168.181.185.53/api/data/AddOrUpdateClient', body, options)
                  .subscribe(data => {
                    console.log('update ok');
                  }, error => {
                    console.log(error);// Error getting the data
                  });
              })
              .catch(e => console.log('Error logging into Facebook', e));
          })
          .catch(e => console.log('Error logging into Facebook', e));
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  facebookLogout(){
    this.fb.logout().then(() => this.facebookLogged = false);
  }

  presentNewsModal() {
    let modal = this.modalCtrl.create(NewsModalPage);
    modal.present();
  }

  presentLocationsModal() {
    let modal = this.modalCtrl.create(LocationsModalPage);
    modal.present();
  }

  presentPointsModal() {
    let modal = this.modalCtrl.create(PointsModalPage);
    modal.present();
  }

  presentBeersModal() {
    let modal = this.modalCtrl.create(BeersModalPage);
    modal.present();
  }

  presentTriviaBenefitsModal() {
    let modal = this.modalCtrl.create(TriviaBenefitsModalPage);
    modal.present();
  }
}
