import { ChangeDetectorRef, Component } from '@angular/core';
//import { FirebaseService } from '../../firebase.service';

import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm: string;
  notes: Note[] = [];

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.dataService.getNotes().subscribe((res) => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Tambahakan Barang',
      inputs: [
        {
          name: 'nbarang',
          placeholder: 'Nama Barang',
          type: 'text',
        },
        {
          name: 'bbarang',
          placeholder: 'Berat Barang',
          type: 'text',
        },
        {
          name: 'hbeli',
          placeholder: 'Harga Beli',
          type: 'number',
        },
        {
          name: 'hjual',
          placeholder: 'Harga Jual',
          type: 'number',
        },
        {
          name: 'ntoko',
          placeholder: 'Nama Toko',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({
              nama: res.nbarang,
              berat: res.bbarang,
              beli: res.hbeli,
              jual: res.hjual,
              toko: res.ntoko,
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
    });

    await modal.present();
  }
}
