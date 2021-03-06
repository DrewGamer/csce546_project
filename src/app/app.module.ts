import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EventPage } from '../pages/event/event';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoriesPage } from '../pages/categories/categories';
import { AccountPage } from '../pages/account/account';
import { PromotePage } from '../pages/promote/promote';
import { RegisterPage } from '../pages/register/register';
import { Database } from '../pages/database/database';
import { LocationSelect } from '../pages/location-select/location-select';
import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { Observable } from  "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


// AF2 Settings
export const firebaseConfig = {
	apiKey: "AIzaSyDpWKzqHOOjb6fZze1Hm00godzZQB4lw-Q",
    authDomain: "ionic-dcc89.firebaseapp.com",
    databaseURL: "https://ionic-dcc89.firebaseio.com",
    projectId: "ionic-dcc89",
    storageBucket: "",
    messagingSenderId: "337086689089"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CategoriesPage,
    PromotePage,
    AccountPage,
    RegisterPage,
    EventPage,
    Database,
    LocationSelect
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
    //AngularFirestore,
    //AngularFirestoreCollection,
    //AngularFirestoreDocument,    
    //Observable,
    AngularFireModule,    
    AngularFireDatabaseModule,
    AngularFireAuthModule,
	AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CategoriesPage,
    PromotePage,
    AccountPage,
    RegisterPage,
    EventPage,
    Database,
    LocationSelect
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Network,
    Connectivity,
    GoogleMaps,
    Facebook,
  ]
})
export class AppModule {}
