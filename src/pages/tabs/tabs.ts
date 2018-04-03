import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  public database_data = {};
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.database_data["afAuth"] = afAuth;
    this.database_data["afs"] = afs;
  }
}
