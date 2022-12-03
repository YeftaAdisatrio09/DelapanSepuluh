import { Component, Input, OnInit } from '@angular/core';
import { Note, DataService } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  note: Note = null;
  hasil: number = 0;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  jumlah(val1, val2) {
    this.hasil = (parseFloat(val1) * (100 + parseFloat(val2))) / 100;

    return this.hasil;
  }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe((res) => {
      this.note = res;
    });
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Data Terhapus!.',
      duration: 2000,
    });
    toast.present();
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Data Berubah!.',
      duration: 2000,
    });
    toast.present();
  }
}
