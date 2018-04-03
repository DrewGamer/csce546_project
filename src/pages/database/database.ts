import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-database',
  templateUrl: 'database.html',
  providers: [AngularFireAuth]
})
export class Database {

  constructor() {
  }

  async login(username, password, success, failure) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      if (result) {
        success();
      } 
    } catch (e) {
      failure(e);
    }
  }

  /*async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      } 
    } catch (e) {
      alert(e);
    }
  }

  async register() {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      alert(e);
    }
  }*/
}
