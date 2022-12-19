import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Data {
  id?: string;
  nama: string;
  berat: string;
  beli: number;
  persen: number;
  toko: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getDatas(): Observable<Data[]> {
    const notesRef = collection(this.firestore, 'datas');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Data[]>;
  }

  getDataById(id): Observable<Data> {
    const noteDocRef = doc(this.firestore, `datas/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Data>;
  }

  addData(data: Data) {
    const notesRef = collection(this.firestore, 'datas');
    return addDoc(notesRef, data);
  }

  deleteData(data: Data) {
    const noteDocRef = doc(this.firestore, `datas/${data.id}`);
    return deleteDoc(noteDocRef);
  }

  updateData(data: Data) {
    const noteDocRef = doc(this.firestore, `datas/${data.id}`);
    return updateDoc(noteDocRef, {
      nama: data.nama,
      berat: data.berat,
      beli: data.beli,
      persen: data.persen,
      toko: data.toko,
    });
  }
}
// </Note></Note></Note[]></Note[]>
