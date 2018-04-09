import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../database/database';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var db = new Database();
	db.setParams(navParams.data);


    /*

    //Login and get the current logged in user.
	db.login("blobman23@email.com", "blobman23", (status) => {
      if (status == "success") {
        db.currentUser( (user) => {
          alert(user);
        });
      } else {
        alert(status);
      }
    });

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

}

//arsailor89@yahoo.com
