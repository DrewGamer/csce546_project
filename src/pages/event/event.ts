import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../database/database';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  public event = new Array(0);
  public db: Database;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = new Database();
    this.db.setParams(navParams.data["database_data"]);

    this.db.query("Event", "id", "==", navParams.data["event_id"], (documents) => {
      for (var i in documents[0]) {
        this.event[this.event.length] = documents[0][i];
      }
      var img = (Math.floor(Math.random() * 1000) % 3) + 1;
      this.event["image"] = "../../assets/imgs/example" + img.toString() + ".jpg";
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  doFavorite() {
    alert("Event favorited!");
  }

  doAttend() {
    alert("Your are now attending this event!");
  }
}

