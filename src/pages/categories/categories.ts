import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../database/database';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  public categories = new Array(0);
  public events = new Array(0);
  public db: Database;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = new Database();
	  this.db.setParams(navParams.data);

    this.db.query("Event", "id", "==", "meta", (documents) => {
      if (documents) {
        this.categories = documents[0]["categories"].split(",");
        for (var i = 0; i < this.categories.length; i++) this.categories[i] = this.categories[i].trim();
      }
    });

  }
  openCategory(category) {
    this.db.get("Event", (documents) => {
      this.events = new Array(0);
      //Load all elements.
      for (var i = 0; i < documents.length; i++) {
        if (documents[i]["id"] != "meta") {
          this.events[this.events.length] = documents[i];
          var img = (Math.floor(Math.random() * 1000) % 3) + 1;
          this.events[this.events.length-1]["image"] = "../../assets/imgs/example" + img.toString() + ".jpg";
        }
      }
      //Remove elements not within the selected category.
      for (i = 0; i < this.events.length; i++) {
        var event_categories = this.events[i]["categories"].split(",");
        var found = false;
        for (var j = 0; j < event_categories.length; j++) {
          event_categories[j] = event_categories[j].trim();
          if (event_categories[j] == category) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.events.slice(i, 1);
          if (this.events.length == 0) break;
        }
      }
    });
    document.getElementById("categories-view").style.display = "none";
    document.getElementById("documents-view").style.display = "";
  }
}

//arsailor89@yahoo.com
