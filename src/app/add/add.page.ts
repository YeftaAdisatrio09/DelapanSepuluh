import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Note, DataService } from '../services/data.service';

// import { NgxMaskModule, IConfig } from 'ng2-currency-mask';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  note = {} as Note;
  hasil: number = 0;
  constructor(
    private dataService: DataService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  jumlah(val1, val2) {
    this.hasil = (parseFloat(val1) * (100 + parseFloat(val2))) / 100;

    return this.hasil;
  }

  ngOnInit() {}

  async addData(note: Note) {
    let loader = this.loadingController.create({
      message: 'Mohon Tunggu...',
    });
    (await loader).present();

    try {
      this.dataService.addNote({
        nama: note.nama,
        berat: note.berat,
        beli: note.beli,
        persen: note.persen,
        toko: note.toko,
      });
    } catch (e) {
      this.showToast('error..');
    }

    (await loader).dismiss();

    this.navController.navigateRoot('home');

    // const notesRef = collection(this.firestore, 'notes');
    // return addDoc(notesRef, data);
  }

  showToast(message: string) {
    this.toastController
      .create({
        message: message,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
  }
}
