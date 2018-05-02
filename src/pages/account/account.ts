import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Database } from '../database/database';
import { RegisterPage } from '../register/register';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  registerPage = RegisterPage;
  username;
  password;
  db;
  isLoggedIn:boolean = false;
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl:LoadingController, private fb: Facebook) {
    this.db = new Database();
    this.db.setParams(navParams.data);

    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));

    /*
    //Get all documents in the "Event" collection.
    db.get("Event", (documents) => {
      var s = "";
      for (var i = 0; i < documents.length; i++) {
        s += i + " {\n";
        for (var field in documents[i]) {
          s += "\t" + field + ": " + documents[i][field] + "\n";
        }
        s += "}\n";
      }
      alert(s);
    });

    db.delete("Event", "name", "cat", (count) => {
      alert(count);
    });

   */
  }

  doSignIn() {
    let loader = this.loadCtrl.create({
      content: 'Loging in...',

    });
    loader.present();

    this.db.login(this.username, this.password, (status) => {
      if (status == "success") {
        this.db.currentUser( (user) => {
          alert(user);
          loader.dismissAll();
        });
      } else {
        alert(status);
        loader.dismissAll();
      }
    });
  }

  public doFacebookSignIn() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));

    /*this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      alert("Logged into Facebook!");
    })
    .catch(e => {
      console.log('Error logging into Facebook', e);
      alert("Error logging into Facebook");
    });

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);*/
  }

  doFacebookLogout() {
  this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log(res);
      this.users = res;
    })
    .catch(e => {
      console.log(e);
    });
  }

}
