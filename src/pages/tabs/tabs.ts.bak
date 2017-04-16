import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ModalController } from 'ionic-angular';
import { NewsModalPage } from '../modals/news/news-modal-page';
import { PointsModalPage } from '../modals/points/points-modal-page';
import { LocationsModalPage } from '../modals/locations/locations-modal-page';
import 'rxjs/add/operator/map';

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

  constructor(public http: Http, public modalCtrl: ModalController) {
    this.http.get('https://www.random.org/integers/?num=1&min=1&max=2000&col=1&base=10&format=plain&rnd=new')
      .map(res => res.json())
      .subscribe(data => {
        this.points = data;
    });
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
}
