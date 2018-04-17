import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Database } from '../database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocationSelect } from '../location-select/location-select';

@Component({
  selector: 'page-promote',
  templateUrl: 'promote.html'
})
export class PromotePage {

  imagePreview;
  eventPhoto;
  date = new Date().toDateString();
  name;
  category;
  startTime;
  endTime;
  description;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera:Camera, public modalCtrl:ModalController) {
    var db = new Database();
    db.setParams(navParams.data);
    this.imagePreview = "http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png";

    db.get("Event", (documents) => {
      var s = "";
      for (var i = 0; i < documents.length; i++) {
        s += i + " {\n";
        for (var field in documents[i]) {
          s += "\t" + field + ": " + documents[i][field] + "\n";
        }
        s += "}\n";
      }
      console.log(s);
    });


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

  takePhoto() {
    const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

    this.camera.getPicture(options).then((imageData) => {
      this.eventPhoto = imageData;
    }, (err) => {
      // Handle error
    });

    this.imagePreview = this.eventPhoto;
    this.ionViewWillEnter();
  }

  saveItem()
  {
    this.name = "";
    this.category = "";
    this.startTime = "";
    this.endTime = "";
    this.description = "";
  }

  launchLocationPage() {
    let modal = this.modalCtrl.create(LocationSelect);
 
        modal.onDidDismiss((location) => {
            console.log(location);
        });
 
        modal.present();
  }

  ionViewWillEnter() {

  }

}
