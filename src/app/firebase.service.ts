import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionName = 'suplayer';

  constructor(private firestore: Firestore) {}

  getData() {
    // const dataRef = collection(this.firestore, 'datas');
    // return collectionData(dataRef);
    // return this.firestore.collection(this.collectionName).snapsshotChanges();
  }

  add_Data(data) {
    // const addRef = collection(this.firestore, 'datas');
    // return addDoc(addRef, data);
  }
}
