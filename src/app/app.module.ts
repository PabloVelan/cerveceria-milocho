import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsModalPage } from '../pages/modals/news/news-modal-page';
import { PointsModalPage } from '../pages/modals/points/points-modal-page';
import { LocationsModalPage } from '../pages/modals/locations/locations-modal-page';
import { BeersModalPage } from '../pages/modals/beers/beers-modal-page';
import { TriviaBenefitsModalPage } from '../pages/modals/triviaBenefits/triviaBenefits-modal-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Device } from '@ionic-native/device';
// import { Sim } from '@ionic-native/sim';
// import { DeviceAccounts } from '@ionic-native/device-accounts';
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from './environment';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsModalPage,
    LocationsModalPage,
    PointsModalPage,
    BeersModalPage,
    TriviaBenefitsModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsModalPage,
    LocationsModalPage,
    PointsModalPage,
    BeersModalPage,
    TriviaBenefitsModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
