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

  //Overwrites "id" with "document" inside of "collection" and returns "success" on completion or an error message on failure. 
  async overwrite(collection, id, document, return_function) {
    this.afs.collection(collection).doc(id).set(document).then( () => {
      return_function("success");
    }).catch( () => {
      return_function("failure");
    });
  }

  //Gets every document inside of "collection" and returns it as an array. 
  async get(collection, return_function) {
    var col = this.afs.collection(collection);
    col.valueChanges().subscribe( items => {
      var documents = new Array(items.length);
      for (var i = 0; i < items.length; i++) {
        documents[i] = {};
        for (var item in items[i]) {
          documents[i][item] = items[i][item];
        }
      }
      return_function(documents);
    });
  }

  //Gets documents inside of "collection" and returns it as an array. 
  //Only returns documents in which the field is related to the match by the comparator.
  async query(collection, field, comparator, match, return_function) {
    if (field == "id") {
      var docRef = this.afs.collection(collection).doc(match);
      docRef.ref.get().then( (document) => {
        if (document.exists) {
          var documents = new Array(1);
          documents[0] = document.data();
          return_function(documents);
        } else {
          return_function(undefined);
        }
      }).catch( (error) => {
        return_function(undefined);
      });
      return;
    }
    //var count = undefined;
    var col = this.afs.collection(collection, ref => {
      return ref.where(field, comparator, match);
    });
    col.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }).subscribe( items => {
      var documents = new Array(items.length);
      for (var i = 0; i < items.length; i++) {
        documents[i] = {};
        for (var item in items[i]) {
          documents[i][item] = items[i][item];
        }
      }
      return_function(documents);
      //if (count == undefined) count = documents.length;
      //if (documents.length == 0) return_function(count);
    });
    
  }

  //Gets documents inside of "collection" and returns it as an array. 
  //Only returns documents in which the field is related to the match by the comparator.
  //Orders by the field "order".
  async orderedQuery(collection, field, comparator, match, return_function) {
    if (field == "id") {
      var docRef = this.afs.collection(collection).doc(match);
      docRef.ref.get().then( (document) => {
        if (document.exists) {
          var documents = new Array(1);
          documents[0] = document.data();
          return_function(documents);
        } else {
          return_function(undefined);
        }
      }).catch( (error) => {
        return_function(undefined);
      });
      return;
    }
    //var count = undefined;
    var col = this.afs.collection(collection, ref => {
      return ref.orderBy(field).where(field, comparator, match);
    });
    col.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }).subscribe( items => {
      var documents = new Array(items.length);
      for (var i = 0; i < items.length; i++) {
        documents[i] = {};
        for (var item in items[i]) {
          documents[i][item] = items[i][item];
        }
      }
      return_function(documents);
      //if (count == undefined) count = documents.length;
      //if (documents.length == 0) return_function(count);
    });
    
  }


  //Gets documents inside of "collection" and returns it as an array. 
  //Only returns documents in which the field is related to the match by the comparator.
  //Orders by the field "order".
  async doubleOrderedQuery(collection, field1, comparator1, match1, field2, comparator2, match2, return_function) {
    
    //var count = undefined;
    var col = this.afs.collection(collection, ref => {
      return ref.orderBy(field1).where(field1, comparator1, match1).where(field2, comparator2, match2);
    });
    col.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }).subscribe( items => {
      var documents = new Array(items.length);
      for (var i = 0; i < items.length; i++) {
        documents[i] = {};
        for (var item in items[i]) {
          documents[i][item] = items[i][item];
        }
      }
      return_function(documents);
      //if (count == undefined) count = documents.length;
      //if (documents.length == 0) return_function(count);
    });
    
  }
  //Deletes all documents in "collection" in which the "field" equals "match".
  //Returns the number of items deleted.
  async delete(collection, field, match, return_function) {
    var count = -1;
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
      if (count == -1) count = documents.length;
      if (documents.length == 0) {
        col.snapshotChanges().map( actions => {} ).subscribe( documents => {} );
        col = null;
        return_function(count);
      } 
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

  getDateFromTime(time) {
    var date = new Date(time * 1000);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }

  /*
  Event {
    date: 
    title: 
    description: 
    
  }

  */


}
