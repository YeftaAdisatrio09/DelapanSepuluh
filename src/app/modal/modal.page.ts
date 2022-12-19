import { Component, Input, OnInit } from '@angular/core';
import { Data, DataService } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  data: Data = null;
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
    this.dataService.getDataById(this.id).subscribe((res) => {
      this.data = res;
    });
  }

  async deleteNote() {
    await this.dataService.deleteData(this.data);
    const toast = await this.toastCtrl.create({
      message: 'Data Terhapus!.',
      duration: 2000,
    });
    toast.present();
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.dataService.updateData(this.data);
    const toast = await this.toastCtrl.create({
      message: 'Data Berubah!.',
      duration: 2000,
    });
    toast.present();
  }
}
