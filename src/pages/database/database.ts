import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-database',
  templateUrl: 'database.html'
})
export class Database {

  public afAuth: AngularFireAuth
  public afs: AngularFirestore;
  constructor() {
	//this.afAuth = obj["afAuth"];
  }

  //Sets up the parameters of the database.
  setParams(obj) {
    this.afAuth = obj["afAuth"];
    this.afs = obj["afs"];  
  }

  //Returns the current logged in user.
  async currentUser(return_function) {
    this.afAuth.authState.subscribe( (user_data) => {
      return_function(user_data.email);
    });
  }

  //Creates a new "document" inside of "collection" and returns "success" on completion or an error message on failure. 
  async set(collection, document, return_function) {
    this.afs.collection(collection).add(document).then( (docRef) => {
        return_function("success");
      }).catch( (e) => {
        return_function(e.toString());
      });
  }

  //Gets every document inside of "collection" and returns it as an array. 
  async get(collection, return_function) {
    var col = this.afs.collection(collection);
    col.valueChanges().subscribe( items => {
      var documents = new Array(items.length);
      for (var i = 0; i < items.length; i++) {
        for (var item in items[i]) {
          documents[i] = {};
          documents[i][item] = items[i][item];
        }
      }
      return_function(documents);
    });
  }

  //Deletes all documents in "collection" in which the "field" equals "match".
  //Returns the number of items deleted.
  async delete(collection, field, match, return_function) {
    var count = undefined;
    var col = this.afs.collection(collection, ref => {
      return ref.where(field, "==", match);
    });
    col.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }).subscribe( documents => {
      for (var i = 0; i < documents.length; i++) {
        var id = documents[i]["id"];
        col.doc(id).delete();
      }
      if (count == undefined) count = documents.length;
      if (documents.length == 0) return_function(count);
    });
  }


  //Logs in with "username" and "password" and returns "success" or an error message if it failed.
  async login(username, password, return_function) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      if (result) {
        return_function("success");
      } else {
        return_function(result);
      }
    } catch (e) {
        return_function(e.toString());
    }
  }

  //Registers a user with "username" and "password" and returns "success" or an error message if it failed.  
  async register(username, password, return_function) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      if (result) {
        return_function("success");
      } else {
        return_function(result);
      }
    } catch (e) {
        return_function(e.toString());
    }
  }

  /*
  Event {
    date: 
    title: 
    description: 
    
  }

  */


}
