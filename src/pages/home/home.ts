import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var db = new Database();
	db.setParams(navParams.data);

    //Login and get the current logged in user.
	/*db.login("blobman23@email.com", "blobman23", (status) => {
      if (status == "success") {
        db.currentUser( (user) => {
          alert(user);
        });
      } else {
        alert(status);
      }
    });*/

    //Get all documents in the "Event" collection.
    /*db.query("Event", "id", "==", "gillbychjcVYw6DhakGY", (documents) => {
	  var s = "";
      for (var i = 0; i < documents.length; i++) {
        s += i + " {\n";
        for (var field in documents[i]) {
          s += "\t" + field + ": " + documents[i][field] + "\n";
        }
        s += "}\n";
      }
      alert(s);
    });*/


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


  slideDidChange($scope) {
    alert($scope);
  }

  slide(index) {
    var buttons = new Array(0);
    buttons[0] = document.getElementById("btnRecommended");
    buttons[1] = document.getElementById("btnPopular");
    buttons[2] = document.getElementById("btnToday");

    for (var i = 0; i < buttons.length; i++)
      buttons[i].style.borderBottom = "2px solid white";
    
    buttons[index].style.borderBottom = "2px solid blue";
  }
}

//arsailor89@yahoo.com
