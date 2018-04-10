import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Database } from '../database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	password: string = '';
	username: string = '';
	verify: string = '';
	email: string = '';
	db;
  public database_data = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl:LoadingController, public afAuth: AngularFireAuth, public afs: AngularFirestore) {
  	
    this.database_data["afAuth"] = afAuth;
    this.database_data["afs"] = afs;
    this.db = new Database();
    this.db.setParams(this.database_data);
  }

  doRegister()
  {
  	let loader = this.loadCtrl.create({
      content: 'Signing up...',

    });
    loader.present();

    var isSignedUp = false;

  	this.db.register(this.email, this.password, (status) => {
      if (status == "success") {
        this.db.currentUser( (user) => {
        	isSignedUp = true;
        	alert(user);
        	loader.dismissAll();
        });
      } else {
        alert(status);
        loader.dismissAll();
      }
  	});
  	loader.dismissAll();

  	if (isSignedUp)
      this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
