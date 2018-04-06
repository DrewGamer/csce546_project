import { Component } from '@angular/core';

import { CategoriesPage } from '../categories/categories';
import { AccountPage } from '../account/account';
import { PromotePage } from '../promote/promote';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoriesPage;
  tab3Root = PromotePage;
  tab4Root = AccountPage;

  public database_data = {};
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.database_data["afAuth"] = afAuth;
    this.database_data["afs"] = afs;
  }
}
