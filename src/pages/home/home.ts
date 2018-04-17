import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../database/database';
import { EventPage } from '../event/event';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public events = new Array(0);
  public db: Database;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = new Database();
	  this.db.setParams(navParams.data);

    this.db.query("Event", "favorites", ">=", 0, (documents) => {
      for (var i = 0; i < documents.length; i++) {
        if (documents[i]["id"] != "meta") {
          this.events[this.events.length] = documents[i];
          this.events[this.events.length-1]["image"] = "../../assets/imgs/example" + ( (i % 3) + 1 ).toString() + ".jpg";
        }
      }
    });

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

    db.delete("Event", "name", "cat", (count) => {
      alert(count);
    });

   */
  }

  slide(index) {
    var buttons = new Array(0);
    buttons[0] = document.getElementById("btnRecommended");
    buttons[1] = document.getElementById("btnPopular");
    buttons[2] = document.getElementById("btnToday");

    for (var i = 0; i < buttons.length; i++)
      buttons[i].style.borderBottom = "2px solid white";
    
    buttons[index].style.borderBottom = "2px solid blue";

    switch (index) {
      case 0:
        this.events = new Array(0);
        this.db.query("Event", "favorites", ">=", 0, (documents) => {
          for (var i = 0; i < documents.length; i++) {
            if (documents[i]["id"] != "meta") {
              this.events[this.events.length] = documents[i];
              this.events[this.events.length-1]["image"] = "../../assets/imgs/example" + ( (parseInt(Math.random() * 1000) % 3) + 1 ) + ".jpg";
            }
          }
        });
        break;
      case 1:
        this.events = new Array(0);
        this.db.orderedQuery("Event", "favorites", ">=", 5, (documents) => {
          for (var i = 0; i < documents.length; i++) {
            if (documents[i]["id"] != "meta") {
              this.events[this.events.length] = documents[i];
              this.events[this.events.length-1]["image"] = "../../assets/imgs/example" + ( (parseInt(Math.random() * 1000) % 3) + 1 ).toString() + ".jpg";
            }
          }
        });
      case 2:
        this.events = new Array(0);
        var t1 = Math.floor(new Date() / 1000) - 60*60*60*12;
        var t2 = Math.floor(new Date() / 1000) + 60*60*60*12;
        this.db.doubleOrderedQuery("Event", "start_time", ">=", t1, "start_time", "<=", t2, (documents) => {
          for (var i = 0; i < documents.length; i++) {
            if (documents[i]["id"] != "meta") {
              this.events[this.events.length] = documents[i];
              this.events[this.events.length-1]["image"] = "../../assets/imgs/example" + ( (parseInt(Math.random() * 1000) % 3) + 1 ).toString() + ".jpg";
            }
          }
        });
        break;
    }
  }

  openEventPage(event) {
    this.navCtrl.push(EventPage, {"event_id": event, "database_data": this.navParams.data});
  }
}

//arsailor89@yahoo.com
